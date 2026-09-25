import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { seedQuestionBanks } from './seedQuestions.js';

const db = new PrismaClient();
try {
  await db.$transaction(async tx => {
    await seedQuestionBanks(tx);
  });
  console.log('Question banks ready. Admin credentials come exclusively from server environment variables.');
} finally {
  await db.$disconnect();
}
