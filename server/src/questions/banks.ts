import type { AssessmentType } from '@prisma/client';
import { postTestQuestions } from './postTest.js';
import { preTestQuestions } from './preTest.js';

const banks = { PRE: preTestQuestions, POST: postTestQuestions } as const;

export function questionIdsFor(type: AssessmentType) {
  return banks[type].map(question => `${type.toLowerCase()}-${question.id}`);
}

export function questionCountFor(type: AssessmentType) {
  return banks[type].length;
}