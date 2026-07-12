import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { lifePathCompatibilityScore, toCompatibilityBase } from './compatibility.js';

describe('toCompatibilityBase', () => {
  it('приводит мастер-числа к базовым (11→2, 22→4)', () => {
    expect(toCompatibilityBase(11)).toBe(2);
    expect(toCompatibilityBase(22)).toBe(4);
  });

  it('обычные числа 1–9 не меняются', () => {
    expect(toCompatibilityBase(7)).toBe(7);
  });
});

describe('lifePathCompatibilityScore', () => {
  it('совпадающие числа дают максимальную оценку (расстояние 0 → 100)', () => {
    expect(lifePathCompatibilityScore(5, 5).score).toBe(100);
  });

  it('мастер-число 11 сравнивается как базовое 2', () => {
    // 11→2, 2 и 2: расстояние 0 → 100
    expect(lifePathCompatibilityScore(11, 2).score).toBe(100);
  });

  it('property: compat(a,b) === compat(b,a) для всех пар из {1..9,11,22}', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22];
    fc.assert(
      fc.property(fc.constantFrom(...values), fc.constantFrom(...values), (a, b) => {
        expect(lifePathCompatibilityScore(a, b).score).toBe(
          lifePathCompatibilityScore(b, a).score,
        );
      }),
    );
  });
});
