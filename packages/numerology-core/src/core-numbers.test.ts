import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { lifePathNumber, nameNumbers } from './core-numbers.js';
import { normalizeName } from './text-utils.js';

describe('lifePathNumber — число жизненного пути (ЧЖП)', () => {
  it('29.02.2000: цифры 2,9,0,2,2,0,0,0 → сумма 15 → 1+5=6 (не мастер-число)', () => {
    const result = lifePathNumber({ day: 29, month: 2, year: 2000 });
    expect(result.digitSum).toBe(15);
    expect(result.lifePathNumber).toBe(6);
  });

  it('29.09.2000: цифры 2,9,0,9,2,0,0,0 → сумма 22 → мастер-число 22, не редуцируется', () => {
    const result = lifePathNumber({ day: 29, month: 9, year: 2000 });
    expect(result.digitSum).toBe(22);
    expect(result.lifePathNumber).toBe(22);
  });

  it('29.09.2007: цифры 2,9,0,9,2,0,0,7 → сумма 29 → 2+9=11 → мастер-число 11', () => {
    const result = lifePathNumber({ day: 29, month: 9, year: 2007 });
    expect(result.digitSum).toBe(29);
    expect(result.lifePathNumber).toBe(11);
  });

  it('property: ЧЖП всегда в множестве {1..9, 11, 22} для дат 1900-01-01..2100-12-31', () => {
    const allowed = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22]);
    fc.assert(
      fc.property(
        fc.date({
          min: new Date(Date.UTC(1900, 0, 1)),
          max: new Date(Date.UTC(2100, 11, 31)),
          noInvalidDate: true,
        }),
        (date) => {
          const result = lifePathNumber({
            day: date.getUTCDate(),
            month: date.getUTCMonth() + 1,
            year: date.getUTCFullYear(),
          });
          expect(allowed.has(result.lifePathNumber)).toBe(true);
        },
      ),
    );
  });
});

describe('nameNumbers — числа по имени (пифагорейская система, кириллица)', () => {
  it('normalizeName убирает всё, кроме букв А-Я/Ё, и приводит к верхнему регистру', () => {
    expect(normalizeName('Иван-Петров 123')).toBe('ИВАНПЕТРОВ');
  });

  it('ИВАН: И=1,В=3,А=1,Н=6 → сумма 11 (мастер-число, не редуцируется)', () => {
    const result = nameNumbers('Иван');
    expect(result.normalizedName).toBe('ИВАН');
    // выражение: 1+3+1+6=11 → мастер-число
    expect(result.expressionNumber).toBe(11);
    // душа (гласные И,А): 1+1=2
    expect(result.soulUrgeNumber).toBe(2);
    // личность (согласные В,Н): 3+6=9
    expect(result.personalityNumber).toBe(9);
  });

  it('ПЁТР: П=8,Ё=7,Т=2,Р=9 → сумма 26 → 2+6=8', () => {
    const result = nameNumbers('пётр');
    expect(result.normalizedName).toBe('ПЁТР');
    // выражение: 26 → 8
    expect(result.expressionNumber).toBe(8);
    // душа (гласная Ё=7): уже ≤9 → 7
    expect(result.soulUrgeNumber).toBe(7);
    // личность (согласные П=8,Т=2,Р=9): сумма 19 → 1+9=10 → 1+0=1
    expect(result.personalityNumber).toBe(1);
  });

  it('бросает ошибку, если после нормализации в имени не осталось букв', () => {
    expect(() => nameNumbers('123 --- ')).toThrow();
  });
});
