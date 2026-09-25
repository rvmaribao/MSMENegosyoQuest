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

  it('preserves separate ten-question Pre-Test and Post-Test banks', () => {
    expect(preTestQuestions).toHaveLength(10);
    expect(postTestQuestions).toHaveLength(10);
    expect(preTestQuestions.map(question => question.id)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(postTestQuestions.map(question => question.id)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('aligns game questions with their customer, prompt, marketing, data, toolbox, safety, and finale competencies', () => {
    const categories = (bank: typeof preTestQuestions) => bank.slice(3).map(question => question.category);
    expect(categories(preTestQuestions)).toEqual(['Customer Service', 'Prompting', 'Digital Marketing', 'Sales & Inventory Data', 'AI Toolbox', 'AI Safety', 'Business Growth']);
    expect(categories(postTestQuestions)).toEqual(['Customer Service', 'Prompting', 'Digital Marketing', 'Sales & Inventory Data', 'AI Toolbox', 'AI Safety', 'Business Growth']);
  });
});