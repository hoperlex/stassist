import { describe, expect, it } from 'vitest';
import { personalCycles } from './personal-cycles.js';

describe('personalCycles — персональные год/месяц/день', () => {
  it('день рождения 15.06, текущая дата 12.07.2026 → год=4, месяц=2, день=5', () => {
    // персональный год = редукция(15+6+2026) = редукция(2047) = 2+0+4+7=13 → 1+3=4
    // персональный месяц = редукция(4+7) = редукция(11) = 1+1=2
    // персональный день = редукция(2+12) = редукция(14) = 1+4=5
    const result = personalCycles(
      { day: 15, month: 6 },
      { day: 12, month: 7, year: 2026 },
    );
    expect(result.personalYear).toBe(4);
    expect(result.personalMonth).toBe(2);
    expect(result.personalDay).toBe(5);
  });

  it('день рождения 01.01, текущая дата 01.01.2026 → год=3, месяц=4, день=5', () => {
    // персональный год = редукция(1+1+2026) = редукция(2028) = 2+0+2+8=12 → 1+2=3
    // персональный месяц = редукция(3+1) = 4 (уже ≤9)
    // персональный день = редукция(4+1) = 5 (уже ≤9)
    const result = personalCycles(
      { day: 1, month: 1 },
      { day: 1, month: 1, year: 2026 },
    );
    expect(result.personalYear).toBe(3);
    expect(result.personalMonth).toBe(4);
    expect(result.personalDay).toBe(5);
  });
});
