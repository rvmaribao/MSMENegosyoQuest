import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { preTestQuestions } from '../src/questions/preTest.js';
import { postTestQuestions } from '../src/questions/postTest.js';

const db = new PrismaClient();
try {
  await db.$transaction(async tx => {
    // Never revise a question after an answer exists, preserving completed assessment history.
    for (const [type, bank] of [['PRE', preTestQuestions], ['POST', postTestQuestions]] as const) {
      for (const { id, ...question } of bank) {
        const questionId = `${type.toLowerCase()}-${id}`;
        const data = { ...question, type, position: id };
        const existing = await tx.question.findUnique({ where: { id: questionId }, select: { answers: { select: { attemptId: true }, take: 1 } } });
        if (!existing) await tx.question.create({ data: { ...data, id: questionId } });
        else if (existing.answers.length === 0) await tx.question.update({ where: { id: questionId }, data });
      }
    }
    // Re-deploying never re-locks or opens an existing training session.
    await tx.appSetting.upsert({ where: { key: 'global' }, create: { key: 'global', postTestOpen: false }, update: {} });
  });
  console.log('Question banks ready. Admin credentials come exclusively from server environment variables.');
} finally {
  await db.$disconnect();
}
