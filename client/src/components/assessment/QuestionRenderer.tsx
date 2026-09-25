import { useState } from 'react';
import { BarChart3, Bot, Calculator, CheckCircle2, ChevronLeft, ChevronRight, Coffee, Code, Globe, Lock, Megaphone, MessageCircle, ReceiptText, Scale, Search, ShieldAlert, ShieldCheck, Sparkles, TriangleAlert, Usb, Users } from 'lucide-react';
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

function ChapterGame({ title, instruction, scene, question, selectedOption, onSelect, className = '' }: ChoiceProps & { title: string; instruction: string; scene: React.ReactNode; className?: string }) {
  return <section className={`game-surface chapter-game ${className}`} aria-label={title}><div className="game-intro"><Sparkles size={20} /><span>{title}</span><p>{instruction}</p></div>{scene}<div className="choice-grid chapter-choices">{question.options.map((option, index) => <ChoiceButton key={option} option={option} optionIndex={index} selectedOption={selectedOption} onSelect={onSelect} />)}</div></section>;
}

function SceneTile({ icon: Icon, label }: { icon: typeof Bot; label: string }) { return <span className="scene-tile"><Icon size={22} aria-hidden="true" /><b>{label}</b></span>; }

export function AiDefinitionGame(props: ChoiceProps) { return <ChapterGame {...props} title="AI OR NOT AI?" instruction="Move a definition into your AI understanding. Pick the description that fits." className="ai-definition" scene={<div className="digital-board" aria-hidden="true"><span className="board-target"><Bot size={28} /> AI</span><SceneTile icon={Globe} label="INTERNET" /><SceneTile icon={Bot} label="INTELLIGENCE" /><SceneTile icon={Code} label="PROGRAMMING" /><SceneTile icon={Calculator} label="AUTOMATION" /></div>} />; }

export function FindTheAiGame(props: ChoiceProps) { return <ChapterGame {...props} title="FIND THE AI" instruction="Look around the negosyo counter. Which tool is powered by AI?" className="find-ai" scene={<div className="business-counter" aria-hidden="true"><SceneTile icon={Bot} label="AI CHATBOT" /><SceneTile icon={Calculator} label="CALCULATOR" /><SceneTile icon={Usb} label="USB DRIVE" /><SceneTile icon={ReceiptText} label="RECEIPT BOOK" /></div>} />; }

export function ProductivityGame(props: ChoiceProps) { return <ChapterGame {...props} title="BEAT THE TASK PILE" instruction="Choose the business action, then watch the repetitive work line up for an assistant." className="productivity-game" scene={<div className="task-pile" aria-hidden="true"><span>Customer messages</span><span>Captions</span><span>Reports</span><span>Inventory notes</span><span>Product descriptions</span><Bot size={42} /></div>} />; }

export function ContentFactoryGame(props: ChoiceProps) { return <ChapterGame {...props} title="CONTENT FACTORY" instruction="Send an idea through the content studio, then select the approach you would use." className="content-factory" scene={<div className="content-studio" aria-hidden="true"><Megaphone size={26} /><span className="machine">AI CONTENT<br />MACHINE</span><span className="phone-preview">ISLA BREW<br /><small>Fresh ideas, owner reviewed.</small></span></div>} />; }

export function AiToolboxGame(props: ChoiceProps) { return <ChapterGame {...props} title="AI TOOLBOX" instruction="Explore where an assistant can lend a hand across a business." className="ai-toolbox-game" scene={<div className="toolbox-stations" aria-hidden="true"><SceneTile icon={Megaphone} label="MARKETING" /><SceneTile icon={MessageCircle} label="CUSTOMER SERVICE" /><SceneTile icon={BarChart3} label="DATA ANALYSIS" /></div>} />; }

export function DecisionRoomGame(props: ChoiceProps) { return <ChapterGame {...props} title="DECISION ROOM" instruction="Customer reviews go through AI analysis. Choose the owner’s next move at the decision gate." className="decision-room" scene={<div className="decision-flow" aria-hidden="true"><span>Customer<br />reviews</span><ChevronRight /><span><Bot size={20} /> AI analysis</span><ChevronRight /><span className="gate">Decision<br />gate</span></div>} />; }

export function PromptPowerGame(props: ChoiceProps) { return <ChapterGame {...props} title="PROMPT POWER METER" instruction="Compare a vague request with a useful business brief. The meter shows your selected card, not correctness." className="prompt-power" scene={<div className="prompt-console" aria-hidden="true"><span>Make a post.</span><ChevronRight /><strong>Create a friendly Facebook caption for a local coffee shop promoting iced coffee to students.</strong><i /></div>} />; }

export function FactCheckGame(props: ChoiceProps) { return <ChapterGame {...props} title="FACT-CHECK DETECTIVE" instruction="Inspect a fictional competitor information brief and choose your verification action." className="fact-check" scene={<div className="detective-card" aria-hidden="true"><Search size={30} /><span>AI GENERATED BRIEF</span><strong>Product details need an independent source check.</strong></div>} />; }

export function AiAutopilotGame(props: ChoiceProps) { return <ChapterGame {...props} title="AI AUTOPILOT" instruction="Balance human judgment with AI assistance. Select the business outcome you think matters." className="autopilot" scene={<div className="balance-board" aria-hidden="true"><span>HUMAN<br />JUDGMENT</span><Scale size={38} /><span>AI<br />AUTOPILOT</span></div>} />; }

export function QualityControlGame(props: ChoiceProps) { return <ChapterGame {...props} title="QUALITY CONTROL" instruction="An AI draft travels toward publish. Choose the principle that belongs at the check station." className="quality-control" scene={<div className="content-conveyor" aria-hidden="true"><span>AI<br />GENERATES</span><ChevronRight /><span className="check-station"><ShieldCheck size={22} /> HUMAN CHECK</span><ChevronRight /><span>PUBLISH</span></div>} />; }

export function PrivacyShieldGame(props: ChoiceProps) { return <ChapterGame {...props} title="PRIVACY SHIELD" instruction="Customer data is approaching an AI portal. Choose what the business should consider first." className="privacy-shield" scene={<div className="privacy-flow" aria-hidden="true"><div><span>NAME</span><span>PHONE</span><span>EMAIL</span><span>PURCHASE HISTORY</span></div><ShieldCheck size={42} /><Lock size={27} /></div>} />; }

export function HumanReviewGame(props: ChoiceProps) { return <ChapterGame {...props} title="CATCH THE AI MISTAKE" instruction="Review fictional business outputs. There is no timer; choose the likely result of skipping human review." className="human-review" scene={<div className="mistake-stream" aria-hidden="true"><span>P500 <b>to</b> P5,000</span><span>OPEN MONDAY <b>to</b> OPEN SUNDAY</span><span>10% DISCOUNT <b>to</b> 100% DISCOUNT</span><TriangleAlert size={28} /></div>} />; }

export function AiTeamGame(props: ChoiceProps) { return <ChapterGame {...props} title="BUILD YOUR AI TEAM" instruction="Choose a workflow, then imagine the handoff between business owner and AI assistant." className="ai-team" scene={<div className="team-flow" aria-hidden="true"><span><Users size={26} /> BUSINESS OWNER</span><span className="team-arrow">↔</span><span><Bot size={26} /> AI ASSISTANT</span></div>} />; }

export function AdInspectorGame(props: ChoiceProps) { const [inspected, setInspected] = useState(false); return <ChapterGame {...props} title="AD INSPECTOR" instruction="Inspect the fictional ad, then choose what the owner should do before publishing." className="ad-inspector" scene={<div className={`ad-scene ${inspected ? 'inspected' : ''}`}><div><Coffee size={27} /><strong>ISLA BREW<br />ICED COFFEE</strong><b>FREE REFILL ALL DAY</b></div><aside><TriangleAlert size={20} /> Business information: no free refill promotion.</aside><button type="button" className="inspect-button" onClick={() => setInspected(value => !value)} aria-pressed={inspected}><Search size={16} /> {inspected ? 'INSPECTED' : 'INSPECT AD'}</button></div>} />; }

export function DigitalNegosyanteFinale(props: ChoiceProps) { return <ChapterGame {...props} title="THE DIGITAL NEGOSYANTE CHALLENGE" instruction="Complete the business journey, then make the final responsible-AI decision." className="digital-finale" scene={<div className="final-journey" aria-hidden="true"><span>BUSINESS<br />PROBLEM</span><ChevronRight /><span>AI<br />ASSISTANCE</span><ChevronRight /><span>VERIFY</span><ChevronRight /><span>PROTECT<br />DATA</span><ChevronRight /><span>HUMAN<br />DECISION</span><CheckCircle2 size={25} /></div>} />; }

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
    case 'AI_DEFINITION': return <AiDefinitionGame {...props} />;
    case 'FIND_THE_AI': return <FindTheAiGame {...props} />;
    case 'PRODUCTIVITY': return <ProductivityGame {...props} />;
    case 'CONTENT_FACTORY': return <ContentFactoryGame {...props} />;
    case 'AI_TOOLBOX': return <AiToolboxGame {...props} />;
    case 'DECISION_ROOM': return <DecisionRoomGame {...props} />;
    case 'PROMPT_POWER': return <PromptPowerGame {...props} />;
    case 'FACT_CHECK': return <FactCheckGame {...props} />;
    case 'AI_AUTOPILOT': return <AiAutopilotGame {...props} />;
    case 'QUALITY_CONTROL': return <QualityControlGame {...props} />;
    case 'PRIVACY_SHIELD': return <PrivacyShieldGame {...props} />;
    case 'HUMAN_REVIEW': return <HumanReviewGame {...props} />;
    case 'AI_TEAM': return <AiTeamGame {...props} />;
    case 'AD_INSPECTOR': return <AdInspectorGame {...props} />;
    case 'DIGITAL_NEGOSYANTE': return <DigitalNegosyanteFinale {...props} />;
    default: return <StandardQuestion {...props} />;
  }
}