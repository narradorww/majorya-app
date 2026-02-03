export interface RollResult {
  dice: number[];
  successes: number;
  isCriticalSuccess: boolean;
  isCriticalFailure: boolean;
  total: number;
}

/**
 * Rolls a number of D6 dice based on the attribute value.
 * Success: 4, 5, 6
 * Critical Success: More than half of dice are 6s
 * Critical Failure: More than half of dice are 1s
 */
export const rollAttribute = (attributeValue: number): RollResult => {
  const count = Math.max(0, Math.floor(attributeValue));
  if (count === 0) {
    return {
      dice: [],
      successes: 0,
      isCriticalSuccess: false,
      isCriticalFailure: false,
      total: 0,
    };
  }

  const dice = Array.from(
    { length: count },
    () => Math.floor(Math.random() * 6) + 1,
  );
  const successes = dice.filter(d => d >= 4).length;
  const sixes = dice.filter(d => d === 6).length;
  const ones = dice.filter(d => d === 1).length;
  const total = dice.reduce((a, b) => a + b, 0);

  // "Mais da metade" implies strictly greater than count / 2
  const isCriticalSuccess = sixes > count / 2;
  const isCriticalFailure = ones > count / 2;

  return { dice, successes, isCriticalSuccess, isCriticalFailure, total };
};
