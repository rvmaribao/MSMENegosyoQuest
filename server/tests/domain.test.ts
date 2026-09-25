import { describe, expect, it } from 'vitest';
import { AppError, rankParticipants, requirePostAccess, scoreAnswers } from '../src/domain.js';

describe('assessment rules', () => {
  const questions = Array.from({ length: 25 }, (_, index) => ({ id: `q-${index}`, correctAnswer: index % 4, options: ['a', 'b', 'c', 'd'] }));

  it('calculates scores from known questions instead of client-supplied values', () => {
    const answers = questions.map(question => ({ questionId: question.id, selectedOption: question.correctAnswer }));
    expect(scoreAnswers(questions, answers).score).toBe(25);
  });

  it('rejects incomplete, duplicate, unknown, and wrong-bank submissions', () => {
    const validAnswers = questions.map(question => ({ questionId: question.id, selectedOption: question.correctAnswer }));
    expect(() => scoreAnswers(questions, validAnswers.slice(0, 24))).toThrow(AppError);
    expect(() => scoreAnswers(questions, [...validAnswers.slice(0, 24), validAnswers[0]])).toThrow(AppError);
    expect(() => scoreAnswers(questions, [...validAnswers.slice(0, 24), { questionId: 'post-25', selectedOption: 1 }])).toThrow(AppError);
    expect(() => scoreAnswers(questions, [...validAnswers.slice(0, 24), { questionId: 'pre-999', selectedOption: 1 }])).toThrow(AppError);
  });

  it('requires both a completed Pre-Test and an open global Post-Test', () => {
    expect(() => requirePostAccess(false, true)).toThrow(AppError);
    expect(() => requirePostAccess(true, false)).toThrow(AppError);
    expect(() => requirePostAccess(true, true)).not.toThrow();
  });
});

describe('leaderboard ranking', () => {
  it('uses post score, improvement, then completion time', () => {
    const time = new Date('2026-01-01T00:00:00Z');
    const ranked = rankParticipants([
      { id: 'later', fullName: 'Later', businessName: 'B', attempts: [{ id: 'pre-1', type: 'PRE' as const, score: 7, startedAt: time, completedAt: time }, { id: 'post-1', type: 'POST' as const, score: 9, startedAt: time, completedAt: new Date('2026-01-02T00:00:00Z') }] },
      { id: 'higher-improvement', fullName: 'Higher', businessName: 'B', attempts: [{ id: 'pre-2', type: 'PRE' as const, score: 5, startedAt: time, completedAt: time }, { id: 'post-2', type: 'POST' as const, score: 9, startedAt: time, completedAt: new Date('2026-01-03T00:00:00Z') }] },
      { id: 'high-score', fullName: 'High', businessName: 'B', attempts: [{ id: 'pre-3', type: 'PRE' as const, score: 9, startedAt: time, completedAt: time }, { id: 'post-3', type: 'POST' as const, score: 10, startedAt: time, completedAt: new Date('2026-01-04T00:00:00Z') }] },
    ]);
    expect(ranked.map(row => row.id)).toEqual(['high-score', 'higher-improvement', 'later']);
  });
});