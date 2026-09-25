import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createApp } from '../src/app.js';
import type { Config } from '../src/config.js';
import { seedQuestionBanks } from '../prisma/seedQuestions.js';

const testDatabaseUrl = process.env.TEST_DATABASE_URL;
const integration = testDatabaseUrl && process.env.DATABASE_URL === testDatabaseUrl ? describe : describe.skip;
const db = testDatabaseUrl ? new PrismaClient({ datasources: { db: { url: testDatabaseUrl } } }) : null;
const config: Config = {
  DATABASE_URL: testDatabaseUrl ?? 'postgresql://unused', JWT_SECRET: 'test-jwt-secret-that-is-long-enough',
  ADMIN_USERNAME: 'facilitator', ADMIN_PASSWORD: 'test-password-that-is-long-enough',
  FRONTEND_URL: 'http://127.0.0.1:5173', PORT: 4000, NODE_ENV: 'test', TRUST_PROXY: 0,
};
const app = createApp(config);

integration('25-question assessment integration', () => {
  const createdParticipantIds: string[] = [];
  let preAnswers: Array<{ questionId: string; selectedOption: number }> = [];

  async function participant() {
    const response = await request(app).post('/api/participants').send({ fullName: 'Integration Participant', businessName: 'Test Negosyo', location: 'Quezon City', industry: 'Retail', email: `integration-${crypto.randomUUID()}@example.test` });
    expect(response.status).toBe(201);
    createdParticipantIds.push(response.body.id);
    return response.body.id as string;
  }

  beforeAll(async () => {
    if (!db) return;
    await seedQuestionBanks(db);
    const questions = await db.question.findMany({ where: { type: 'PRE' }, orderBy: { position: 'asc' }, select: { id: true, correctAnswer: true } });
    preAnswers = questions.map(question => ({ questionId: question.id, selectedOption: question.correctAnswer }));
    await db.appSetting.upsert({ where: { key: 'global' }, create: { key: 'global', postTestOpen: false }, update: { postTestOpen: false } });
  });

  afterAll(async () => {
    if (!db) return;
    await db.assessmentAttempt.deleteMany({ where: { participantId: { in: createdParticipantIds } } });
    await db.participant.deleteMany({ where: { id: { in: createdParticipantIds } } });
    await db.$disconnect();
  });

  it('seeds both banks idempotently with exactly 25 questions', async () => {
    if (!db) return;
    await seedQuestionBanks(db);
    await seedQuestionBanks(db);
    await expect(db.question.count({ where: { type: 'PRE', id: { in: Array.from({ length: 25 }, (_, index) => `pre-${index + 1}`) } } })).resolves.toBe(25);
    await expect(db.question.count({ where: { type: 'POST', id: { in: Array.from({ length: 25 }, (_, index) => `post-${index + 1}`) } } })).resolves.toBe(25);
  });

  it('returns 25 Pre questions without answer keys', async () => {
    const response = await request(app).get('/api/assessment/pre/questions');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(25);
    expect(response.body[0]).not.toHaveProperty('correctAnswer');
  });

  it('rejects incomplete, duplicate, unknown, and wrong-assessment submissions', async () => {
    const cases = [
      preAnswers.slice(0, 24),
      [...preAnswers.slice(0, 24), preAnswers[0]],
      [...preAnswers.slice(0, 24), { questionId: 'pre-999', selectedOption: 0 }],
      [...preAnswers.slice(0, 24), { questionId: 'post-25', selectedOption: 1 }],
    ];
    for (const answers of cases) {
      const response = await request(app).post('/api/assessment/pre/submit').send({ participantId: await participant(), answers });
      expect(response.status).toBe(400);
    }
  });

  it('scores a valid 25-answer submission at 2,500 XP and reports a denominator of 25', async () => {
    const id = await participant();
    const response = await request(app).post('/api/assessment/pre/submit').send({ participantId: id, answers: preAnswers });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ score: 25, maximumScore: 25, xpEarned: 2500, pre: 25, preMaximumScore: 25 });
  });

  it('keeps Post-Test locking enforced and returns 25 answer-key-free questions once unlocked', async () => {
    const id = await participant();
    await request(app).post('/api/assessment/pre/submit').send({ participantId: id, answers: preAnswers }).expect(200);
    await request(app).get(`/api/assessment/post/questions?participantId=${id}`).expect(423);
    if (!db) return;
    await db.appSetting.update({ where: { key: 'global' }, data: { postTestOpen: true } });
    const response = await request(app).get(`/api/assessment/post/questions?participantId=${id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(25);
    expect(response.body[0]).not.toHaveProperty('correctAnswer');
  });
});