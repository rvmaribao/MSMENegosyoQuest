export const interactionTypes = ['STANDARD', 'CATCH_CUSTOMER', 'PROMPT_BUILDER', 'MARKETING_SWIPE', 'DATA_HUNT', 'TOOLBOX_MATCH', 'RED_FLAG_RUSH', 'BOSS_BATTLE'] as const;
export type InteractionType = typeof interactionTypes[number];

const interactionByPosition: Record<number, InteractionType> = {
  1: 'STANDARD', 2: 'STANDARD', 3: 'STANDARD', 4: 'CATCH_CUSTOMER', 5: 'PROMPT_BUILDER',
  6: 'MARKETING_SWIPE', 7: 'DATA_HUNT', 8: 'TOOLBOX_MATCH', 9: 'RED_FLAG_RUSH', 10: 'BOSS_BATTLE',
};

export function interactionForPosition(position: number): InteractionType {
  return interactionByPosition[position] ?? 'STANDARD';
}

export function journeyLabel(position: number) {
  if (position <= 3) return 'AI READY';
  if (position <= 6) return 'AI ASSISTED';
  if (position <= 9) return 'AI POWERED';
  return 'DIGITAL NEGOSYANTE';
}

export function publicInteractionConfig(position: number) {
  return { interactionType: interactionForPosition(position), journey: journeyLabel(position) };
}