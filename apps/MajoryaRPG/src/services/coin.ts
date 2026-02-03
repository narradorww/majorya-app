export type CoinSide = 'Cara' | 'Coroa';

/**
 * Flips a coin for luck-based mechanics.
 * Returns 'Cara' (Heads) or 'Coroa' (Tails).
 */
export const flipCoin = (): CoinSide => {
  return Math.random() < 0.5 ? 'Cara' : 'Coroa';
};
