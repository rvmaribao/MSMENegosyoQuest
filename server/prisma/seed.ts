import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { preTestQuestions } from '../src/questions/preTest.js';
import { postTestQuestions } from '../src/questions/postTest.js';

const db = new PrismaClient();
try {
  await db.$transaction(async tx => {
    // Existing questions are deliberately immutable; do not change an active assessment's key.
    for (const [type, bank] of [['PRE', preTestQuestions], ['POST', postTestQuestions]] as const) {
      await tx.question.createMany({
        data: bank.map(({ id, ...question }) => ({ ...question, id: `${type.toLowerCase()}-${id}`, type, position: id })),
        skipDuplicates: true,
      });
    }
    // Re-deploying never re-locks or opens an existing training session.
    await tx.appSetting.upsert({ where: { key: 'global' }, create: { key: 'global', postTestOpen: false }, update: {} });
  });
  console.log('Question banks ready. Admin credentials come exclusively from server environment variables.');
} finally {
  await db.$disconnect();
}
