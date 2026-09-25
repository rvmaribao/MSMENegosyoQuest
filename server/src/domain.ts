export class AppError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
export type AnswerInput = { questionId: string; selectedOption: number };
export type ScoringQuestion = { id: string; correctAnswer: number; options: string[] };
export function scoreAnswers(questions: ScoringQuestion[], answers: AnswerInput[]) {
  if (questions.length !== 10) throw new AppError(503, 'Assessment questions are not ready. Please contact your facilitator.');
  if (answers.length !== 10 || new Set(answers.map(a => a.questionId)).size !== 10) throw new AppError(400, 'Answer all 10 questions exactly once.');
  const graded = answers.map(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question || !Number.isInteger(answer.selectedOption) || answer.selectedOption < 0 || answer.selectedOption >= question.options.length) throw new AppError(400, 'One or more answers are invalid.');
    return { ...answer, isCorrect: answer.selectedOption === question.correctAnswer };
  });
  return { score: graded.filter(a => a.isCorrect).length, answers: graded };
}
export function requirePostAccess(open: boolean, preComplete: boolean) {
  if (!preComplete) throw new AppError(403, 'Complete the Pre-Test first.');
  if (!open) throw new AppError(423, 'Training muna, Negosyante! Your facilitator has locked the Post-Test.');
}
export function requireUnfinished(completedAt: Date | null) {
  if (completedAt) throw new AppError(409, 'This assessment has already been submitted.');
}
export function improvement(pre: number | null, post: number | null): number | null {
  return pre === null || post === null ? null : post - pre;
}
export function progression(xp: number) {
  if (xp >= 1500) return 'DIGITAL NEGOSYANTE';
  if (xp >= 1000) return 'GROWING MSME';
  if (xp >= 400) return 'STARTUP';
  return 'IDEA';
}
export function performanceMessage(score: number) {
  if (score <= 3) return 'Every negosyo starts somewhere. Training arc activated. 🚀';
  if (score <= 6) return "May diskarte na! Let's sharpen those digital skills.";
  if (score <= 8) return 'Digital Negosyante in the making. 👏';
  return 'Grabe, ready na ang negosyo brain! 🔥';
}
export type AttemptSummary = { type: 'PRE' | 'POST'; score: number | null; completedAt: Date | null; startedAt: Date; id: string };
export function summarize(attempts: AttemptSummary[]) {
  const pre = attempts.find(a => a.type === 'PRE' && a.completedAt)?.score ?? null;
  const post = attempts.find(a => a.type === 'POST' && a.completedAt)?.score ?? null;
  const xp = ((pre ?? 0) + (post ?? 0)) * 100;
  return { pre, post, improvement: improvement(pre, post), xp, level: progression(xp), status: post !== null ? 'COMPLETE' : pre !== null ? 'PRE_COMPLETE' : 'REGISTERED' };
}
type Rankable = { id: string; fullName: string; businessName: string; attempts: AttemptSummary[] };
export function rankParticipants(participants: Rankable[]) {
  const rows = participants.map(p => ({
    id: p.id, fullName: p.fullName, businessName: p.businessName, ...summarize(p.attempts),
    preCompletedAt: p.attempts.find(a => a.type === 'PRE')?.completedAt ?? null,
    postCompletedAt: p.attempts.find(a => a.type === 'POST')?.completedAt ?? null,
  })).filter(p => p.pre !== null);
  rows.sort((a, b) => {
    if (a.post !== null || b.post !== null) {
      if (a.post === null) return 1;
      if (b.post === null) return -1;
      return b.post - a.post || (b.improvement ?? 0) - (a.improvement ?? 0) || Number(a.postCompletedAt) - Number(b.postCompletedAt) || a.id.localeCompare(b.id);
    }
    return (b.pre ?? 0) - (a.pre ?? 0) || Number(a.preCompletedAt) - Number(b.preCompletedAt) || a.id.localeCompare(b.id);
  });
  return rows.map((p, index) => ({ ...p, rank: index + 1 }));
}
