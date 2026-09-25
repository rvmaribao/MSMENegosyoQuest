import { describe, expect, it } from 'vitest';
import { interactionForPosition, interactionTypes, publicInteractionConfig } from '../../client/src/assessment/interactions.js';
import { postTestQuestions } from '../src/questions/postTest.js';
import { preTestQuestions } from '../src/questions/preTest.js';

describe('assessment interaction metadata', () => {
  it('maps both assessment chapters to the intended interaction sequence', () => {
    expect(Array.from({ length: 25 }, (_, index) => interactionForPosition(index + 1))).toEqual([
      'STANDARD', 'STANDARD', 'STANDARD', 'CATCH_CUSTOMER', 'PROMPT_BUILDER',
      'MARKETING_SWIPE', 'DATA_HUNT', 'TOOLBOX_MATCH', 'RED_FLAG_RUSH', 'BOSS_BATTLE',
      'AI_DEFINITION', 'FIND_THE_AI', 'PRODUCTIVITY', 'CONTENT_FACTORY', 'AI_TOOLBOX',
      'DECISION_ROOM', 'PROMPT_POWER', 'FACT_CHECK', 'AI_AUTOPILOT', 'QUALITY_CONTROL',
      'PRIVACY_SHIELD', 'HUMAN_REVIEW', 'AI_TEAM', 'AD_INSPECTOR', 'DIGITAL_NEGOSYANTE',
    ]);
    expect(interactionTypes).toHaveLength(23);
  });

  it('keeps scoring and correct-answer data out of public interaction configuration', () => {
    for (let position = 1; position <= 25; position += 1) {
      const config = publicInteractionConfig(position) as Record<string, unknown>;
      expect(config).not.toHaveProperty('correctAnswer');
      expect(config).not.toHaveProperty('isCorrect');
      expect(config).not.toHaveProperty('answer');
    }
  });

  it('labels the new chapter ranges without exposing answer metadata', () => {
    expect(publicInteractionConfig(11).journey).toBe('DISCOVER AI');
    expect(publicInteractionConfig(16).journey).toBe('USE AI WISELY');
    expect(publicInteractionConfig(21).journey).toBe('RESPONSIBLE AI');
    expect(publicInteractionConfig(25).journey).toBe('BECOME A DIGITAL NEGOSYANTE');
  });

  it('preserves the original questions and appends complete 25-question banks', () => {
    expect(preTestQuestions).toHaveLength(25);
    expect(postTestQuestions).toHaveLength(25);
    expect(preTestQuestions.map(question => question.id)).toEqual(Array.from({ length: 25 }, (_, index) => index + 1));
    expect(postTestQuestions.map(question => question.id)).toEqual(Array.from({ length: 25 }, (_, index) => index + 1));
    expect(preTestQuestions[10]).toMatchObject({ question: 'What is Artificial Intelligence (AI)?', correctAnswer: 1 });
    expect(preTestQuestions[24]).toMatchObject({ question: 'Which statement BEST describes responsible AI use for MSMEs?', correctAnswer: 1 });
  });

  it('aligns game questions with their customer, prompt, marketing, data, toolbox, safety, and finale competencies', () => {
    const categories = (bank: typeof preTestQuestions) => bank.slice(3).map(question => question.category);
    const originalCompetencies = ['Customer Service', 'Prompting', 'Digital Marketing', 'Sales & Inventory Data', 'AI Toolbox', 'AI Safety', 'Business Growth'];
    expect(categories(preTestQuestions).slice(0, 7)).toEqual(originalCompetencies);
    expect(categories(postTestQuestions).slice(0, 7)).toEqual(originalCompetencies);
    expect(categories(postTestQuestions)).toEqual(categories(preTestQuestions));
  });
});