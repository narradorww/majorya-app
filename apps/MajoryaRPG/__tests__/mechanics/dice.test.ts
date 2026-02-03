import { rollAttribute } from '../../src/services/dice';

describe('Dice Service', () => {
  it('should return correct number of dice', () => {
    const result = rollAttribute(3);
    expect(result.dice).toHaveLength(3);
  });

  it('should handle zero attribute value', () => {
    const result = rollAttribute(0);
    expect(result.dice).toHaveLength(0);
    expect(result.successes).toBe(0);
  });

  it('should calculate successes correctly (4, 5, 6)', () => {
    // Mock Math.random to return known values
    // 0.1 -> 1, 0.5 -> 4, 0.9 -> 6
    const randomSpy = jest.spyOn(Math, 'random');
    
    // Dice 1: 0.0 -> 1 (Fail)
    // Dice 2: 0.6 -> 4 (Success)
    // Dice 3: 0.9 -> 6 (Success)
    randomSpy.mockReturnValueOnce(0.0)
             .mockReturnValueOnce(0.6)
             .mockReturnValueOnce(0.9);

    const result = rollAttribute(3);
    expect(result.dice).toEqual([1, 4, 6]);
    expect(result.successes).toBe(2);
    
    randomSpy.mockRestore();
  });

  it('should detect critical success (>50% are 6s)', () => {
    const randomSpy = jest.spyOn(Math, 'random');
    // 3 dice: 6, 6, 1
    // >50% (2 > 1.5) are 6s
    randomSpy.mockReturnValueOnce(0.99) // 6
             .mockReturnValueOnce(0.99) // 6
             .mockReturnValueOnce(0.0); // 1

    const result = rollAttribute(3);
    expect(result.isCriticalSuccess).toBe(true);
    expect(result.isCriticalFailure).toBe(false);

    randomSpy.mockRestore();
  });

  it('should detect critical failure (>50% are 1s)', () => {
    const randomSpy = jest.spyOn(Math, 'random');
    // 3 dice: 1, 1, 6
    // >50% (2 > 1.5) are 1s
    randomSpy.mockReturnValueOnce(0.0) // 1
             .mockReturnValueOnce(0.0) // 1
             .mockReturnValueOnce(0.99); // 6

    const result = rollAttribute(3);
    expect(result.isCriticalSuccess).toBe(false);
    expect(result.isCriticalFailure).toBe(true);

    randomSpy.mockRestore();
  });
});
