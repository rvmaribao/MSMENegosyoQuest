import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { interactionForPosition } from '../assessment/interactions';
import { api, ApiError, participantId } from '../api';
import { AssessmentShell } from '../components/assessment/AssessmentShell';
import { QuestionRenderer } from '../components/assessment/QuestionRenderer';
import type { Question, Result } from '../types';

type Props = { type: 'PRE' | 'POST' };

export function AssessmentPage({ type }: Props) {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [index, setIndex] = useState(0);
  const [error, setError] = useState('');
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    const id = participantId();
    if (type === 'POST' && !id) { navigate('/register'); return; }
    api<Question[]>(`/assessment/${type.toLowerCase()}/questions${type === 'POST' ? `?participantId=${id}` : ''}`)
      .then(setQuestions)
      .catch(cause => { setError(cause instanceof Error ? cause.message : 'Unable to load this assessment.'); if (cause instanceof ApiError && cause.status === 423) navigate('/post-locked'); });
  }, [navigate, type]);
  if (error && !questions.length) return <main className="assessment-error"><p role="alert">{error}</p><Link className="button primary" to="/results">VIEW MY RESULTS</Link></main>;
  if (!questions.length) return <main className="assessment-error">Loading your negosyo journey...</main>;
  const question = questions[index];
  const selectedOption = answers[question.id];
  const allAnswered = Object.keys(answers).length === questions.length;
  const choose = (option: number) => setAnswers(current => ({ ...current, [question.id]: option }));
  async function submit() {
    const id = participantId();
    if (!id) return navigate('/register');
    setBusy(true);
    try {
      const result = await api<Result>(`/assessment/${type.toLowerCase()}/submit`, { method: 'POST', body: JSON.stringify({ participantId: id, answers: Object.entries(answers).map(([questionId, selectedOption]) => ({ questionId, selectedOption })) }) });
      sessionStorage.setItem('negosyo-result', JSON.stringify(result));
      navigate(type === 'PRE' ? '/pre-results' : '/results');
    } catch (cause) { setConfirming(false); setError(cause instanceof Error ? cause.message : 'Unable to submit your assessment.'); } finally { setBusy(false); }
  }
  return <AssessmentShell question={question} index={index} total={questions.length}><QuestionRenderer key={question.id} question={question} interactionType={interactionForPosition(question.position)} selectedOption={selectedOption} onSelect={choose} />{selectedOption !== undefined && <p className="choice-saved" role="status"><CheckCircle2 size={16} /> Choice saved. Review it before final submission.</p>}{error && <p className="notice" role="alert">{error}</p>}<div className="assessment-actions"><button type="button" className="button subtle" disabled={index === 0} onClick={() => setIndex(index - 1)}><ChevronLeft size={18} /> BACK</button>{index < questions.length - 1 ? <button type="button" className="button primary" disabled={selectedOption === undefined} onClick={() => setIndex(index + 1)}>NEXT <ChevronRight size={18} /></button> : <button type="button" className="button primary" disabled={!allAnswered} onClick={() => setConfirming(true)}>REVIEW ANSWERS <CheckCircle2 size={18} /></button>}</div>{confirming && <div className="dialog-backdrop"><section className="dialog" role="dialog" aria-modal="true" aria-labelledby="submit-title"><p className="eyebrow">FINAL CHECK</p><h2 id="submit-title">Ready na? Final answer na talaga?</h2><p>Your choices are saved. The secure score is calculated only after submission.</p><div className="dialog-actions"><button type="button" className="button subtle" onClick={() => setConfirming(false)}>KEEP REVIEWING</button><button type="button" className="button primary" disabled={busy} onClick={submit}>{busy ? 'SUBMITTING...' : `SUBMIT ${type === 'PRE' ? 'PRE' : 'POST'}-TEST`}</button></div></section></div>}</AssessmentShell>;
}