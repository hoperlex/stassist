import { describe, expect, it } from 'vitest';
import { mapAstroCalendarRowToDay } from './map-row-to-day.js';
import type { AstroCalendarRow } from '../repositories/astro-calendar-repository.js';

function fakeRow(overrides: Partial<AstroCalendarRow> = {}): AstroCalendarRow {
  return {
    id: '00000000-0000-0000-0000-000000000000',
    date: '2026-08-15',
    moonSignIntervals: [{ signIndex: 4 }],
    lunarDays: [{ lunarDay: 12 }],
    voids: [],
    phases: { phaseName: 'waxing_gibbous', phaseAngleDeg: 100 },
    retrogrades: ['mercury'],
    ingresses: [{ body: 'moon', signIndex: 4 }],
    computed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  } as AstroCalendarRow;
}

describe('mapAstroCalendarRowToDay', () => {
  it('маппит строку без void в isVoidOfCourse=false', () => {
    const day = mapAstroCalendarRowToDay(fakeRow());
    expect(day.date).toBe('2026-08-15');
    expect(day.moonSignIndex).toBe(4);
    expect(day.lunarDay).toBe(12);
    expect(day.isVoidOfCourse).toBe(false);
    expect(day.voidFromIso).toBeNull();
    expect(day.retrogradeBodies).toEqual(['mercury']);
  });

  it('маппит строку с void в isVoidOfCourse=true и границы интервала', () => {
    const row = fakeRow({ voids: [{ fromIso: '2026-08-15T08:00:00.000Z', toIso: '2026-08-15T14:00:00.000Z' }] });
    const day = mapAstroCalendarRowToDay(row);
    expect(day.isVoidOfCourse).toBe(true);
    expect(day.voidFromIso).toBe('2026-08-15T08:00:00.000Z');
    expect(day.voidToIso).toBe('2026-08-15T14:00:00.000Z');
  });
});
