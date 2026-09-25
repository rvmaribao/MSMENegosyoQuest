import { describe, expect, it } from 'vitest';
import { interactionForPosition, interactionTypes, publicInteractionConfig } from '../../client/src/assessment/interactions.js';
import { postTestQuestions } from '../src/questions/postTest.js';
import { preTestQuestions } from '../src/questions/preTest.js';

describe('assessment interaction metadata', () => {
  it('maps all ten questions to the intended interaction sequence', () => {
    expect(Array.from({ length: 10 }, (_, index) => interactionForPosition(index + 1))).toEqual([
      'STANDARD', 'STANDARD', 'STANDARD', 'CATCH_CUSTOMER', 'PROMPT_BUILDER',
      'MARKETING_SWIPE', 'DATA_HUNT', 'TOOLBOX_MATCH', 'RED_FLAG_RUSH', 'BOSS_BATTLE',
    ]);
    expect(interactionTypes).toHaveLength(8);
  });

  it('keeps scoring and correct-answer data out of public interaction configuration', () => {
    for (let position = 1; position <= 10; position += 1) {
      const config = publicInteractionConfig(position) as Record<string, unknown>;
      expect(config).not.toHaveProperty('correctAnswer');
      expect(config).not.toHaveProperty('isCorrect');
      expect(config).not.toHaveProperty('answer');
    }
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