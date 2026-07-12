import { describe, expect, it } from 'vitest';
import { buildAstroCalendarWindow, dateRangeIso } from './build-window.js';

describe('dateRangeIso', () => {
  it('строит последовательные календарные даты, включая переход через границу месяца', () => {
    expect(dateRangeIso('2026-01-30', 4)).toEqual(['2026-01-30', '2026-01-31', '2026-02-01', '2026-02-02']);
  });
});

describe('buildAstroCalendarWindow', () => {
  it('строит окно заданной длины, первый день — без ингрессов (нет предыдущего дня)', () => {
    const window = buildAstroCalendarWindow('2026-08-01', 5);
    expect(window).toHaveLength(5);
    expect(window[0]!.signIngresses).toEqual([]);
    expect(window.map((d) => d.date)).toEqual(['2026-08-01', '2026-08-02', '2026-08-03', '2026-08-04', '2026-08-05']);
  });

  it('луна за ~30 дней хотя бы раз меняет знак — фиксируется в signIngresses', () => {
    const window = buildAstroCalendarWindow('2026-08-01', 30);
    const moonIngresses = window.flatMap((d) => d.signIngresses).filter((i) => i.body === 'moon');
    expect(moonIngresses.length).toBeGreaterThan(0);
  });
});
