import { describe, expect, it } from 'vitest';
import type { Bodies } from '@stassist/shared';
import {
  ASPECT_VALENCE,
  MAX_SCAN_DAYS,
  MERCURY_RETRO_PENALTY,
  findElectiveWindows,
  scoreElectiveMoment,
  transitPositionsAt,
} from './find-electives.js';

describe('ASPECT_VALENCE (правило 3)', () => {
  it('гармоничные аспекты положительны, напряжённые — отрицательны, соединение нейтрально', () => {
    expect(ASPECT_VALENCE.trine).toBeGreaterThan(0);
    expect(ASPECT_VALENCE.sextile).toBeGreaterThan(0);
    expect(ASPECT_VALENCE.square).toBeLessThan(0);
    expect(ASPECT_VALENCE.opposition).toBeLessThan(0);
    expect(ASPECT_VALENCE.conjunction).toBe(0);
  });
});

describe('transitPositionsAt', () => {
  it('возвращает 10 тел (Солнце, Луна, 8 планет) с валидными долготами', () => {
    const positions = transitPositionsAt(new Date('2026-07-12T12:00:00Z'));
    expect(positions).toHaveLength(10);
    expect(positions.map((p) => p.key).sort()).toEqual(
      ['jupiter', 'mars', 'mercury', 'moon', 'neptune', 'pluto', 'saturn', 'sun', 'uranus', 'venus'].sort(),
    );
    for (const p of positions) {
      expect(p.longitudeDeg).toBeGreaterThanOrEqual(0);
      expect(p.longitudeDeg).toBeLessThan(360);
    }
  });
});

describe('scoreElectiveMoment', () => {
  it('пустой натал → 0 аспектов, score определяется только штрафами (void/ретро)', () => {
    const result = scoreElectiveMoment({}, new Date('2026-07-12T12:00:00Z'));
    expect(result.aspects).toHaveLength(0);
  });

  it('ретроградный Меркурий: флаг ставится всегда, штраф — только при weighRetrogradeMercury=true', () => {
    // Находим реальный момент ретроградности Меркурия сканированием (без опоры на память о датах).
    let retrogradeMoment: Date | null = null;
    for (let d = 0; d < 366 && !retrogradeMoment; d += 2) {
      const t = new Date(Date.UTC(2024, 0, 1 + d, 12));
      const mercury = transitPositionsAt(t).find((p) => p.key === 'mercury')!;
      if (mercury.speedLongDegPerDay < 0) retrogradeMoment = t;
    }
    expect(retrogradeMoment).not.toBeNull();

    const empty: Partial<Bodies> = {};
    const withPenalty = scoreElectiveMoment(empty, retrogradeMoment!, { weighRetrogradeMercury: true });
    const withoutPenalty = scoreElectiveMoment(empty, retrogradeMoment!, { weighRetrogradeMercury: false });

    expect(withPenalty.mercuryRetrograde).toBe(true);
    expect(withoutPenalty.mercuryRetrograde).toBe(true);
    expect(withoutPenalty.score).toBe(0); // без натальных тел и без штрафа — 0 (void может тоже быть 0 в этот час)
    expect(withPenalty.score - withoutPenalty.score).toBeLessThanOrEqual(-Math.abs(MERCURY_RETRO_PENALTY) + 1e-9);
  });
});

describe('findElectiveWindows (правила 1, 8-9)', () => {
  const NATAL: Partial<Bodies> = {
    sun: {
      longitudeDeg: 45,
      latitudeDeg: 0,
      distanceAu: null,
      speedLongDegPerDay: 1,
      isRetrograde: false,
      signIndex: 1,
      signDegree: 15,
      houseNumber: null,
    },
    moon: {
      longitudeDeg: 200,
      latitudeDeg: 0,
      distanceAu: null,
      speedLongDegPerDay: 13,
      isRetrograde: false,
      signIndex: 6,
      signDegree: 20,
      houseNumber: null,
    },
  };

  it('отклоняет интервал toUtc <= fromUtc', () => {
    const from = new Date('2026-08-01T00:00:00Z');
    expect(() => findElectiveWindows(NATAL, from, from)).toThrow();
    expect(() => findElectiveWindows(NATAL, from, new Date(from.getTime() - 1000))).toThrow();
  });

  it('отклоняет интервал длиннее MAX_SCAN_DAYS', () => {
    const from = new Date('2026-01-01T00:00:00Z');
    const to = new Date(from.getTime() + (MAX_SCAN_DAYS + 5) * 24 * 60 * 60 * 1000);
    expect(() => findElectiveWindows(NATAL, from, to)).toThrow();
  });

  it(
    'возвращает окна, отсортированные по peakScore по убыванию, каждое строго выше порога',
    () => {
      const from = new Date('2026-08-01T00:00:00Z');
      const to = new Date('2026-08-08T00:00:00Z');
      const windows = findElectiveWindows(NATAL, from, to);

      for (let i = 1; i < windows.length; i++) {
        expect(windows[i - 1]!.peakScore).toBeGreaterThanOrEqual(windows[i]!.peakScore);
      }
      for (const w of windows) {
        expect(w.peakScore).toBeGreaterThan(0);
        expect(new Date(w.startUtc).getTime()).toBeLessThanOrEqual(new Date(w.endUtc).getTime());
        expect(w.topAspects.length).toBeLessThanOrEqual(3);
      }
    },
    20_000,
  );

  it(
    'детерминирована: два прогона с одним входом дают идентичный результат',
    () => {
      const from = new Date('2026-09-01T00:00:00Z');
      const to = new Date('2026-09-05T00:00:00Z');
      const a = findElectiveWindows(NATAL, from, to);
      const b = findElectiveWindows(NATAL, from, to);
      expect(a).toEqual(b);
    },
    20_000,
  );
});
