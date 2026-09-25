import { randomBytes } from 'node:crypto';
import bcrypt from 'bcryptjs';
import { AssessmentType, Prisma, PrismaClient } from '@prisma/client';
import { AppError, rankParticipants, requirePostAccess, scoreAnswers, summarize, type AnswerInput } from './domain.js';

const db = new PrismaClient();
const participantSelect = {
  id: true, fullName: true, businessName: true, location: true, industry: true,
  email: true, mobile: true, consentAt: true, createdAt: true, updatedAt: true,
  attempts: { select: { id: true, type: true, score: true, startedAt: true, completedAt: true } },
} satisfies Prisma.ParticipantSelect;

export type ParticipantRegistration = {
  fullName: string; businessName: string; location: string; industry: string; email?: string; mobile?: string;
};

function details(participant: Prisma.ParticipantGetPayload<{ select: typeof participantSelect }>) {
  return { ...participant, ...summarize(participant.attempts) };
}

export async function registerParticipant(input: ParticipantRegistration) {
  const recoveryHash = await bcrypt.hash(randomBytes(32).toString('hex'), 12);
  try {
    const participant = await db.participant.create({ data: { ...input, email: input.email || null, mobile: input.mobile || null, recoveryHash }, select: participantSelect });
    return details(participant);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw new AppError(409, 'A participant with that email is already registered.');
    }
    throw error;
  }
}

export async function getParticipant(id: string) {
  const participant = await db.participant.findUnique({ where: { id }, select: participantSelect });
  if (!participant) throw new AppError(404, 'Participant not found.');
  return details(participant);
}

async function access(participantId: string, type: AssessmentType) {
  const [participant, setting] = await Promise.all([
    db.participant.findUnique({ where: { id: participantId }, select: { id: true, attempts: { select: { id: true, type: true, score: true, startedAt: true, completedAt: true } } } }),
    db.appSetting.findUnique({ where: { key: 'global' } }),
  ]);
  if (!participant) throw new AppError(404, 'Participant not found.');
  const summary = summarize(participant.attempts);
  if (type === 'POST') requirePostAccess(setting?.postTestOpen ?? false, summary.pre !== null);
  if ((type === 'PRE' ? summary.pre : summary.post) !== null) throw new AppError(409, 'This assessment has already been submitted.');
}

export async function assessmentQuestions(type: AssessmentType, participantId?: string) {
  if (type === 'POST') {
    if (!participantId) throw new AppError(400, 'participantId is required for the Post-Test.');
    await access(participantId, type);
  }
  const questions = await db.question.findMany({ where: { type }, orderBy: { position: 'asc' }, select: { id: true, position: true, category: true, question: true, options: true } });
  if (questions.length !== 10) throw new AppError(503, 'Assessment questions are not ready. Please contact your facilitator.');
  return questions;
}

export async function submitAssessment(type: AssessmentType, participantId: string, answers: AnswerInput[]) {
  return db.$transaction(async tx => {
    const participant = await tx.participant.findUnique({ where: { id: participantId }, select: { id: true, attempts: { select: { id: true, type: true, score: true, startedAt: true, completedAt: true } } } });
    if (!participant) throw new AppError(404, 'Participant not found.');
    const summary = summarize(participant.attempts);
    if (type === 'POST') {
      const setting = await tx.appSetting.findUnique({ where: { key: 'global' } });
      requirePostAccess(setting?.postTestOpen ?? false, summary.pre !== null);
    }
    if ((type === 'PRE' ? summary.pre : summary.post) !== null) throw new AppError(409, 'This assessment has already been submitted.');
    const questions = await tx.question.findMany({ where: { type }, orderBy: { position: 'asc' }, select: { id: true, correctAnswer: true, options: true } });
    const graded = scoreAnswers(questions, answers);
    try {
      const attempt = await tx.assessmentAttempt.create({
        data: {
          participantId, type, score: graded.score, completedAt: new Date(),
          answers: { create: graded.answers.map(answer => ({ questionId: answer.questionId, selectedOption: answer.selectedOption, isCorrect: answer.isCorrect })) },
        },
        select: { id: true, score: true, startedAt: true, completedAt: true },
      });
      const attempts = [...participant.attempts, { ...attempt, type }];
      const result = summarize(attempts);
      return { assessment: type, score: graded.score, maximumScore: 10, xpEarned: graded.score * 100, completedAt: attempt.completedAt, ...result };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') throw new AppError(409, 'This assessment has already been submitted.');
      throw error;
    }
  }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
}

export async function assessmentStatus(participantId: string) {
  const [participant, setting] = await Promise.all([getParticipant(participantId), db.appSetting.findUnique({ where: { key: 'global' } })]);
  return { ...participant, postTestOpen: setting?.postTestOpen ?? false, postTestAvailable: participant.pre !== null && (setting?.postTestOpen ?? false) && participant.post === null };
}

export async function leaderboard() {
  const participants = await db.participant.findMany({ select: { id: true, fullName: true, businessName: true, attempts: { select: { id: true, type: true, score: true, startedAt: true, completedAt: true } } } });
  return rankParticipants(participants).map(({ id, fullName, businessName, rank, pre, post, improvement, xp, level }) => ({ id, fullName, businessName, rank, pre, post, improvement, xp, level }));
}

export async function adminParticipants(query: string, status?: string) {
  const normalized = query.trim();
  const participants = await db.participant.findMany({
    where: normalized ? { OR: [{ fullName: { contains: normalized, mode: 'insensitive' } }, { businessName: { contains: normalized, mode: 'insensitive' } }, { email: { contains: normalized, mode: 'insensitive' } }] } : undefined,
    orderBy: { createdAt: 'desc' }, select: participantSelect,
  });
  return participants.map(details).filter(participant => !status || participant.status === status);
}

export async function adminParticipant(id: string) {
  const participant = await db.participant.findUnique({
    where: { id },
    select: { ...participantSelect, attempts: { select: { id: true, type: true, score: true, startedAt: true, completedAt: true, answers: { select: { questionId: true, selectedOption: true, isCorrect: true } } } } },
  });
  if (!participant) throw new AppError(404, 'Participant not found.');
  return { ...participant, ...summarize(participant.attempts) };
}

export async function deleteParticipant(id: string) {
  try { await db.participant.delete({ where: { id } }); } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') throw new AppError(404, 'Participant not found.');
    throw error;
  }
}

export async function resetAssessment(participantId: string, type: AssessmentType) {
  await db.$transaction(async tx => {
    const participant = await tx.participant.findUnique({ where: { id: participantId }, select: { id: true } });
    if (!participant) throw new AppError(404, 'Participant not found.');
    await tx.assessmentAttempt.deleteMany({ where: { participantId, type: type === 'PRE' ? { in: ['PRE', 'POST'] } : 'POST' } });
  });
}

export async function postTestSetting() {
  const setting = await db.appSetting.upsert({ where: { key: 'global' }, create: { key: 'global', postTestOpen: false }, update: {} });
  return { postTestOpen: setting.postTestOpen, updatedAt: setting.updatedAt };
}

export async function updatePostTestSetting(postTestOpen: boolean) {
  const setting = await db.appSetting.upsert({ where: { key: 'global' }, create: { key: 'global', postTestOpen }, update: { postTestOpen } });
  return { postTestOpen: setting.postTestOpen, updatedAt: setting.updatedAt };
}

export async function dashboard() {
  const participants = await adminParticipants('');
  const completedPre = participants.filter(item => item.pre !== null);
  const completedPost = participants.filter(item => item.post !== null);
  const average = (items: Array<number | null>) => {
    const values = items.filter((item): item is number => item !== null);
    return values.length ? values.reduce((total, item) => total + item, 0) / values.length : null;
  };
  return {
    totalParticipants: participants.length, preTestCompleted: completedPre.length, postTestCompleted: completedPost.length,
    averagePreTest: average(completedPre.map(item => item.pre)), averagePostTest: average(completedPost.map(item => item.post)),
    averageImprovement: average(completedPost.map(item => item.improvement)),
  };
}

export async function analytics() {
  const participants = await adminParticipants('');
  const industry = Object.entries(participants.reduce<Record<string, number>>((counts, participant) => {
    counts[participant.industry] = (counts[participant.industry] ?? 0) + 1;
    return counts;
  }, {})).map(([name, count]) => ({ name, count }));
  return { ...(await dashboard()), industry };
}

export async function disconnectDatabase() { await db.$disconnect(); }