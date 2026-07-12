import { describe, expect, it } from 'vitest';
import { sharePositionsSchema } from '@stassist/shared';
import type { DaySkyFact } from '../horoscope/astro-day-facts.js';
import { buildSkyDayPayload, buildTransitSnapshot } from './build-sky-day.js';

describe('buildTransitSnapshot', () => {
  it('снапшот — валидный SharePositions без домов и без ПД по построению', () => {
    const snapshot = buildTransitSnapshot('2026-07-13');
    expect(sharePositionsSchema.safeParse(snapshot).success).toBe(true);
    expect(snapshot.meta.noHouses).toBe(true);
    expect(snapshot.houses).toEqual([]);
    // ПД-полей нет ни на верхнем уровне, ни в meta (whitelist через .parse)
    const keys = new Set([...Object.keys(snapshot), ...Object.keys(snapshot.meta)]);
    for (const banned of ['input', 'birthDate', 'birthTime', 'place', 'lat', 'lon', 'name', 'tzId']) {
      expect(keys.has(banned)).toBe(false);
    }
  });

  it('детерминирован от даты (референсный час опорной локации)', () => {
    const a = buildTransitSnapshot('2026-07-13');
    const b = buildTransitSnapshot('2026-07-13');
    expect(a).toEqual(b);
  });

  it('все 10 тел присутствуют, долготы в [0, 360), signIndex согласован с долготой', () => {
    const snapshot = buildTransitSnapshot('2026-07-13');
    const bodies = Object.entries(snapshot.bodies);
    expect(bodies.length).toBeGreaterThanOrEqual(10);
    for (const [, pos] of bodies) {
      if (!pos) continue;
      expect(pos.longitudeDeg).toBeGreaterThanOrEqual(0);
      expect(pos.longitudeDeg).toBeLessThan(360);
      expect(pos.signIndex).toBe(Math.min(11, Math.floor(pos.longitudeDeg / 30)));
      expect(pos.houseNumber).toBeNull();
    }
  });

  it('невалидный dayKey отклоняется', () => {
    expect(() => buildTransitSnapshot('13.07.2026')).toThrow();
  });
});

describe('buildSkyDayPayload', () => {
  it('собирает payload из фактов и события без потерь', () => {
    const fact: DaySkyFact = {
      date: '2026-07-13',
      moonSignIndex: 4,
      lunarDay: 12,
      phaseName: 'waxing_gibbous',
      isVoidOfCourse: false,
      retrogradeBodies: ['mercury'],
      signIngresses: [],
    };
    const payload = buildSkyDayPayload(fact, [{ bodyA: 'sun', bodyB: 'moon', angle: 'square', orbDeg: 1.1 }], {
      kind: 'retro_station',
      body: 'mercury',
    });
    expect(payload.event.kind).toBe('retro_station');
    expect(payload.notableAspects).toHaveLength(1);
    expect(payload.lunarDay).toBe(12);
    expect(payload.retrogradeBodies).toEqual(['mercury']);
  });
});
