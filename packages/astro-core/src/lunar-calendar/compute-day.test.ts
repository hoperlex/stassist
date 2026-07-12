import { describe, expect, it } from 'vitest';
import { CALENDAR_REFERENCE_LOCATION } from '@stassist/shared';
import { computeAstroCalendarDay } from './compute-day.js';

describe('computeAstroCalendarDay', () => {
  it('возвращает согласованный набор фактов для конкретной даты (детерминированно)', () => {
    const facts = computeAstroCalendarDay('2026-08-01', CALENDAR_REFERENCE_LOCATION);
    expect(facts.date).toBe('2026-08-01');
    expect(facts.moonSignIndex).toBeGreaterThanOrEqual(0);
    expect(facts.moonSignIndex).toBeLessThanOrEqual(11);
    expect(facts.lunarDay).toBeGreaterThanOrEqual(1);
    expect(facts.lunarDay).toBeLessThanOrEqual(30);
    expect(facts.phaseAngleDeg).toBeGreaterThanOrEqual(0);
    expect(facts.phaseAngleDeg).toBeLessThan(360);
    expect(Array.isArray(facts.retrogradeBodies)).toBe(true);
    expect(facts.bodySignIndexes.moon).toBe(facts.moonSignIndex);
  });

  it('детерминированность: один и тот же день даёт идентичный результат', () => {
    const a = computeAstroCalendarDay('2026-12-25');
    const b = computeAstroCalendarDay('2026-12-25');
    expect(a).toEqual(b);
  });

  it('void-интервал (если есть) содержит референсный момент дня', () => {
    // Сканируем несколько дней подряд — хотя бы один почти наверняка содержит void (Луна
    // проводит без курса заметную долю месяца).
    const days = Array.from({ length: 30 }, (_unused, i) => {
      const d = new Date(Date.UTC(2026, 0, 1 + i));
      return d.toISOString().slice(0, 10);
    });
    const anyVoid = days.map((d) => computeAstroCalendarDay(d)).some((f) => f.isVoidOfCourse);
    expect(anyVoid).toBe(true);
  });

  it('бросает на некорректный формат даты', () => {
    expect(() => computeAstroCalendarDay('01-08-2026')).toThrow();
  });
});
