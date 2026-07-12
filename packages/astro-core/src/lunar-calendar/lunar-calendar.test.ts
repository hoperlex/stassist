import { describe, expect, it } from 'vitest';
import * as AE from 'astronomy-engine';
import fc from 'fast-check';
import { moonPhaseAngleDeg, moonPhaseName, nextMoonQuarter } from './phases.js';
import { findLunarDay } from './lunar-days.js';

describe('lunar-calendar/phases', () => {
  it('фазовый угол в известное новолуние близок к 0°/360°', () => {
    // Новолуние 2000-01-06 ~18:14 UTC (общеизвестная дата, см. любые лунные календари).
    const time = AE.MakeTime(new Date('2000-01-06T18:14:00Z'));
    const angle = moonPhaseAngleDeg(time);
    const distFromZero = Math.min(angle, 360 - angle);
    expect(distFromZero).toBeLessThan(2);
    expect(moonPhaseName(angle)).toBe('new');
  });

  it('property: фазовый угол всегда в [0,360)', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1950, max: 2050 }),
        fc.integer({ min: 0, max: 11 }),
        fc.integer({ min: 1, max: 27 }),
        (year, month, day) => {
          const time = AE.MakeTime(new Date(Date.UTC(year, month, day, 12, 0, 0)));
          const angle = moonPhaseAngleDeg(time);
          expect(angle).toBeGreaterThanOrEqual(0);
          expect(angle).toBeLessThan(360);
        },
      ),
    );
  });

  it('nextMoonQuarter возвращает одну из 4 главных фаз в будущем', () => {
    const q = nextMoonQuarter(AE.MakeTime(new Date('2024-01-01T00:00:00Z')));
    expect(['new', 'first_quarter', 'full', 'last_quarter']).toContain(q.phase);
    expect(q.time.ut).toBeGreaterThan(AE.MakeTime(new Date('2024-01-01T00:00:00Z')).ut);
  });
});

describe('lunar-calendar/lunar-days', () => {
  it('находит текущий лунный день (1..~30) без исключений для набора дат/мест', () => {
    const observer = new AE.Observer(55.75, 37.62, 0);
    for (const iso of ['2024-01-15T12:00:00Z', '2024-06-01T00:00:00Z', '1990-06-15T14:30:00Z']) {
      const result = findLunarDay(observer, AE.MakeTime(new Date(iso)));
      expect(result.dayNumber).toBeGreaterThanOrEqual(1);
      expect(result.dayNumber).toBeLessThanOrEqual(32);
    }
  });
});
