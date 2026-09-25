import { useState } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, ShieldAlert, Sparkles } from 'lucide-react';
import type { InteractionType } from '../../assessment/interactions';
import type { Question } from '../../types';

type Props = { question: Question; interactionType: InteractionType; selectedOption?: number; onSelect: (option: number) => void };
type ChoiceProps = Omit<Props, 'interactionType'>;

function ChoiceButton({ option, optionIndex, selectedOption, onSelect, className = '' }: { option: string; optionIndex: number; selectedOption?: number; onSelect: (option: number) => void; className?: string }) {
  return <button type="button" className={`game-choice ${selectedOption === optionIndex ? 'selected' : ''} ${className}`} onClick={() => onSelect(optionIndex)} aria-pressed={selectedOption === optionIndex}><b>{String.fromCharCode(65 + optionIndex)}</b><span>{option}</span></button>;
}

export function StandardQuestion({ question, selectedOption, onSelect }: ChoiceProps) { return <div className="choice-grid standard-grid">{question.options.map((option, index) => <ChoiceButton key={option} option={option} optionIndex={index} selectedOption={selectedOption} onSelect={onSelect} />)}</div>; }

export function CatchCustomerGame({ question, selectedOption, onSelect }: ChoiceProps) { return <section className="game-surface customer-chat" aria-label="Customer response choices"><div className="game-intro"><MessageCircle size={20} /><span>CATCH THE CUSTOMER</span><p>Tap the most helpful AI-assisted reply. The bubbles pause when you choose.</p></div><div className="chat-bubbles">{question.options.map((option, index) => <ChoiceButton key={option} option={option} optionIndex={index} selectedOption={selectedOption} onSelect={onSelect} className={`bubble bubble-${index + 1}`} />)}</div></section>; }

export function PromptBuilderGame({ question, selectedOption, onSelect }: ChoiceProps) { return <section className="game-surface prompt-builder"><div className="game-intro"><Sparkles size={20} /><span>BUILD THE PROMPT</span><p>Pick the prompt blueprint you would give your AI assistant.</p></div><div className="prompt-slots" aria-hidden="true">{['ROLE', 'TASK', 'BUSINESS CONTEXT', 'AUDIENCE', 'OUTPUT FORMAT'].map(slot => <span key={slot}>{slot}</span>)}</div><div className="choice-grid">{question.options.map((option, index) => <ChoiceButton key={option} option={option} optionIndex={index} selectedOption={selectedOption} onSelect={onSelect} className="prompt-choice" />)}</div></section>; }

export function MarketingSwipeGame({ question, selectedOption, onSelect }: ChoiceProps) { const [visible, setVisible] = useState(selectedOption ?? 0); const choose = (index: number) => { setVisible(index); onSelect(index); }; const option = question.options[visible]; return <section className="game-surface marketing-swipe"><div className="game-intro"><span>MARKETING SWIPE</span><p>Browse business approaches, then choose the one you would test.</p></div><div className="carousel"><button type="button" aria-label="Previous approach" onClick={() => setVisible((visible + question.options.length - 1) % question.options.length)}><ChevronLeft /></button><ChoiceButton option={option} optionIndex={visible} selectedOption={selectedOption} onSelect={choose} className="carousel-card" /><button type="button" aria-label="Next approach" onClick={() => setVisible((visible + 1) % question.options.length)}><ChevronRight /></button></div><div className="carousel-dots" role="tablist">{question.options.map((option, index) => <button type="button" key={option} aria-label={`Approach ${index + 1}`} aria-selected={visible === index} onClick={() => setVisible(index)} />)}</div></section>; }

export function DataHuntGame({ question, selectedOption, onSelect }: ChoiceProps) { return <section className="game-surface data-hunt"><div className="game-intro"><span>NEGOSYO DATA HUNT</span><p>Tap the clue or analysis direction that would help a business owner decide.</p></div><div className="dashboard-clues">{question.options.map((option, index) => <ChoiceButton key={option} option={option} optionIndex={index} selectedOption={selectedOption} onSelect={onSelect} className="data-clue" />)}</div></section>; }

export function ToolboxMatchGame({ question, selectedOption, onSelect }: ChoiceProps) { return <section className="game-surface toolbox-match"><div className="game-intro"><span>AI TOOLBOX MATCH</span><p>Match the business problem with the most useful AI capability.</p></div><div className="match-problem"><span>BUSINESS NEED</span><strong>Choose the best AI-assisted next move</strong></div><div className="choice-grid">{question.options.map((option, index) => <ChoiceButton key={option} option={option} optionIndex={index} selectedOption={selectedOption} onSelect={onSelect} className="tool-choice" />)}</div></section>; }

export function RedFlagRushGame({ question, selectedOption, onSelect }: ChoiceProps) { return <section className="game-surface red-flag"><div className="game-intro"><ShieldAlert size={20} /><span>RED FLAG RUSH</span><p>Spot the risky AI action. Take your time: the timer is only a focus cue.</p></div><div className="focus-meter" aria-hidden="true"><i /></div><div className="choice-grid">{question.options.map((option, index) => <ChoiceButton key={option} option={option} optionIndex={index} selectedOption={selectedOption} onSelect={onSelect} className="flag-choice" />)}</div></section>; }

export function BossBattleGame({ question, selectedOption, onSelect }: ChoiceProps) { const [stage, setStage] = useState(0); const stages = ['PROBLEM', 'AI ASSIST', 'HUMAN DECISION']; return <section className="game-surface boss-battle"><div className="game-intro"><span>NEGOSYO BOSS BATTLE</span><p>Save the negosyo: work through the mission, then choose the final decision.</p></div><div className="boss-steps">{stages.map((label, index) => <button type="button" key={label} className={stage === index ? 'active' : ''} onClick={() => setStage(index)}><b>{index + 1}</b>{label}</button>)}</div>{stage < 2 ? <div className="boss-brief"><strong>{stage === 0 ? 'A business needs useful context before AI can help.' : 'Ask AI for analysis or a draft, not an unchecked business decision.'}</strong><button type="button" className="game-next" onClick={() => setStage(stage + 1)}>NEXT MISSION STEP <ChevronRight size={16} /></button></div> : <div className="choice-grid">{question.options.map((option, index) => <ChoiceButton key={option} option={option} optionIndex={index} selectedOption={selectedOption} onSelect={onSelect} className="boss-choice" />)}</div>}</section>; }

export function QuestionRenderer({ question, interactionType, selectedOption, onSelect }: Props) {
  const props = { question, selectedOption, onSelect };
  switch (interactionType) {
    case 'CATCH_CUSTOMER': return <CatchCustomerGame {...props} />;
    case 'PROMPT_BUILDER': return <PromptBuilderGame {...props} />;
    case 'MARKETING_SWIPE': return <MarketingSwipeGame {...props} />;
    case 'DATA_HUNT': return <DataHuntGame {...props} />;
    case 'TOOLBOX_MATCH': return <ToolboxMatchGame {...props} />;
    case 'RED_FLAG_RUSH': return <RedFlagRushGame {...props} />;
    case 'BOSS_BATTLE': return <BossBattleGame {...props} />;
    default: return <StandardQuestion {...props} />;
  }
}