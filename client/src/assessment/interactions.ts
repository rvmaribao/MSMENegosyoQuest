export const interactionTypes = ['STANDARD', 'CATCH_CUSTOMER', 'PROMPT_BUILDER', 'MARKETING_SWIPE', 'DATA_HUNT', 'TOOLBOX_MATCH', 'RED_FLAG_RUSH', 'BOSS_BATTLE', 'AI_DEFINITION', 'FIND_THE_AI', 'PRODUCTIVITY', 'CONTENT_FACTORY', 'AI_TOOLBOX', 'DECISION_ROOM', 'PROMPT_POWER', 'FACT_CHECK', 'AI_AUTOPILOT', 'QUALITY_CONTROL', 'PRIVACY_SHIELD', 'HUMAN_REVIEW', 'AI_TEAM', 'AD_INSPECTOR', 'DIGITAL_NEGOSYANTE'] as const;
export type InteractionType = typeof interactionTypes[number];

const interactionByPosition: Record<number, InteractionType> = {
  1: 'STANDARD', 2: 'STANDARD', 3: 'STANDARD', 4: 'CATCH_CUSTOMER', 5: 'PROMPT_BUILDER',
  6: 'MARKETING_SWIPE', 7: 'DATA_HUNT', 8: 'TOOLBOX_MATCH', 9: 'RED_FLAG_RUSH', 10: 'BOSS_BATTLE',
  11: 'AI_DEFINITION', 12: 'FIND_THE_AI', 13: 'PRODUCTIVITY', 14: 'CONTENT_FACTORY', 15: 'AI_TOOLBOX',
  16: 'DECISION_ROOM', 17: 'PROMPT_POWER', 18: 'FACT_CHECK', 19: 'AI_AUTOPILOT', 20: 'QUALITY_CONTROL',
  21: 'PRIVACY_SHIELD', 22: 'HUMAN_REVIEW', 23: 'AI_TEAM', 24: 'AD_INSPECTOR', 25: 'DIGITAL_NEGOSYANTE',
};

export function interactionForPosition(position: number): InteractionType {
  return interactionByPosition[position] ?? 'STANDARD';
}

export function journeyLabel(position: number) {
  if (position >= 25) return 'BECOME A DIGITAL NEGOSYANTE';
  if (position >= 21) return 'RESPONSIBLE AI';
  if (position >= 16) return 'USE AI WISELY';
  if (position >= 11) return 'DISCOVER AI';
  if (position <= 3) return 'AI READY';
  if (position <= 6) return 'AI ASSISTED';
  if (position <= 9) return 'AI POWERED';
  return 'DIGITAL NEGOSYANTE';
}

export function publicInteractionConfig(position: number) {
  return { interactionType: interactionForPosition(position), journey: journeyLabel(position) };
}