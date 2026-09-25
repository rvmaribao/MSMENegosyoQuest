import type { PrismaClient } from '@prisma/client';
import { postTestQuestions } from '../src/questions/postTest.js';
import { preTestQuestions } from '../src/questions/preTest.js';

type SeedDatabase = Pick<PrismaClient, 'question' | 'appSetting'>;

export async function seedQuestionBanks(db: SeedDatabase) {
  for (const [type, bank] of [['PRE', preTestQuestions], ['POST', postTestQuestions]] as const) {
    for (const { id, ...question } of bank) {
      const questionId = `${type.toLowerCase()}-${id}`;
      const data = { ...question, type, position: id };
      const existing = await db.question.findUnique({ where: { id: questionId }, select: { answers: { select: { attemptId: true }, take: 1 } } });
      if (!existing) await db.question.create({ data: { ...data, id: questionId } });
      else if (existing.answers.length === 0) await db.question.update({ where: { id: questionId }, data });
    }
  }
  await db.appSetting.upsert({ where: { key: 'global' }, create: { key: 'global', postTestOpen: false }, update: {} });
}