import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { Question } from '../../types';
import { publicInteractionConfig } from '../../assessment/interactions';

type Props = { question: Question; index: number; children: ReactNode };

export function AssessmentShell({ question, index, children }: Props) {
  const config = publicInteractionConfig(question.position);
  return <main className="assessment-page"><header className="assessment-header"><Link className="brand" to="/"><span className="sun">✦</span> MSME <strong>NEGOSYO QUEST</strong></Link><span className="journey-tag">{config.journey}</span></header><section className="assessment-stage"><div className="question-header"><div><span>CHALLENGE {index + 1} OF 10</span><strong>{question.category}</strong></div><progress value={index + 1} max={10} aria-label={`Challenge ${index + 1} of 10`} /></div><p className="interaction-label">{config.interactionType.replaceAll('_', ' ')}</p><h1>{question.question}</h1>{children}</section></main>;
}