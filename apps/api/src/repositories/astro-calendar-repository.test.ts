/**
 * `daysInMonth` — чистая функция (без I/O), используется и здесь (`findAstroCalendarMonth`), и в
 * `apps/api/src/lunar-calendar/lazy-generate.ts` (`ensureAstroCalendarMonth`, находка
 * [lunnyj-kalendar-empty]) для решения «весь ли месяц уже посчитан». Остальные функции этого
 * модуля трогают БД — покрываются integration-тестами (см. §1 конвенций реализации), не здесь.
 */
import { describe, expect, it } from 'vitest';
import { daysInMonth } from './astro-calendar-repository.js';

describe('daysInMonth', () => {
  it('31 день у января', () => {
    expect(daysInMonth('2026-01')).toBe(31);
  });

  it('30 дней у апреля', () => {
    expect(daysInMonth('2026-04')).toBe(30);
  });

  it('29 дней у февраля в високосном году', () => {
    expect(daysInMonth('2028-02')).toBe(29);
  });

  it('28 дней у февраля в невисокосном году', () => {
    expect(daysInMonth('2026-02')).toBe(28);
  });

  it('31 день у декабря', () => {
    expect(daysInMonth('2026-12')).toBe(31);
  });
});
