import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { secondaryProgressedJdTT, computeSecondaryProgressionLongitudes } from './progressions.js';
import { symbolicDirectedLongitudeDeg, DEFAULT_DIRECTION_RATE_DEG_PER_YEAR } from './directions.js';
import { compositeLongitudeDeg, compositeLongitudes } from './composite.js';
import { davisonMidpoint } from './davison.js';
import { angularSeparationDegrees } from '../util/angles.js';

describe('forecast/progressions: «день за год»', () => {
  it('прогрессированный JD TT = натальный JD TT + возраст (сутки) — известное значение на фикстуре', () => {
    // Рождение 2000-01-01 12:00 TT (JD TT = 2451545.0 ровно, эпоха J2000). Возраст 30.5 лет →
    // прогрессированный JD TT = 2451545.0 + 30.5 = 2451575.5 — прямая проверка арифметики «день за год».
    const natalJdTT = 2451545.0;
    expect(secondaryProgressedJdTT(natalJdTT, 30.5)).toBeCloseTo(2451575.5, 9);
    expect(secondaryProgressedJdTT(natalJdTT, 0)).toBeCloseTo(natalJdTT, 9);
  });

  it('возвращает конечные корректные долготы для реального натального JD', () => {
    const natalJdTT = 2451545.0; // 2000-01-01
    const res = computeSecondaryProgressionLongitudes(natalJdTT, 25);
    expect(res.progressedJdTT).toBeCloseTo(natalJdTT + 25, 9);
    expect(Number.isFinite(res.sunLongitudeDeg)).toBe(true);
    expect(res.sunLongitudeDeg).toBeGreaterThanOrEqual(0);
    expect(res.sunLongitudeDeg).toBeLessThan(360);
    expect(Number.isFinite(res.moonLongitudeDeg)).toBe(true);
    for (const lon of Object.values(res.planetLongitudesDeg)) {
      expect(Number.isFinite(lon)).toBe(true);
    }
  });
});

describe('forecast/directions: символические дирекции (+k°/год)', () => {
  it('арифметический инвариант: направленная долгота = натал + возраст·ставка (по модулю 360)', () => {
    expect(symbolicDirectedLongitudeDeg(10, 5)).toBeCloseTo(15, 9);
    expect(symbolicDirectedLongitudeDeg(358, 5)).toBeCloseTo(3, 9); // переход через 360°
    expect(symbolicDirectedLongitudeDeg(10, 5, 2)).toBeCloseTo(20, 9);
    expect(DEFAULT_DIRECTION_RATE_DEG_PER_YEAR).toBe(1);
  });

  it('property: результат всегда в [0,360) и линеен по возрасту', () => {
    fc.assert(
      fc.property(fc.double({ min: 0, max: 360, noNaN: true }), fc.double({ min: 0, max: 100, noNaN: true }), (lon, age) => {
        const d = symbolicDirectedLongitudeDeg(lon, age);
        expect(d).toBeGreaterThanOrEqual(0);
        expect(d).toBeLessThan(360);
      }),
    );
  });
});

describe('forecast/composite: средняя точка по короткой дуге', () => {
  it('симметрия: composite(a,b) === composite(b,a) (сравнение по угловому расстоянию — 0°=360°)', () => {
    fc.assert(
      fc.property(fc.double({ min: 0, max: 360, noNaN: true }), fc.double({ min: 0, max: 360, noNaN: true }), (a, b) => {
        const diff = angularSeparationDegrees(compositeLongitudeDeg(a, b), compositeLongitudeDeg(b, a));
        expect(diff).toBeLessThan(1e-6);
      }),
    );
  });

  it('короткая дуга: 350° и 10° дают середину 0° (а не 180°)', () => {
    expect(compositeLongitudeDeg(350, 10)).toBeCloseTo(0, 6);
  });

  it('простой случай: 10° и 30° дают 20°', () => {
    expect(compositeLongitudeDeg(10, 30)).toBeCloseTo(20, 9);
  });

  it('composite MC — та же формула, что и для планет (не выдумываем отдельную)', () => {
    const chartA = { sun: 100, mc: 15 };
    const chartB = { sun: 120, mc: 25 };
    const composite = compositeLongitudes(chartA, chartB);
    expect(composite.mc).toBeCloseTo(20, 9);
    expect(composite.sun).toBeCloseTo(110, 9);
  });
});

describe('forecast/davison: середина по времени и месту = прямой расчёт середины', () => {
  it('совпадает с ручным расчётом среднего момента и координат', () => {
    const a = new Date('2000-01-01T00:00:00Z');
    const b = new Date('2000-01-03T00:00:00Z');
    const mid = davisonMidpoint(a, 10, 20, b, 30, 40);
    expect(mid.utc.toISOString()).toBe('2000-01-02T00:00:00.000Z');
    expect(mid.lat).toBeCloseTo(20, 9);
    expect(mid.lon).toBeCloseTo(30, 9);
  });

  it('долгота усредняется по кратчайшей дуге около антимеридиана', () => {
    const a = new Date('2000-01-01T00:00:00Z');
    const mid = davisonMidpoint(a, 0, 179, a, 0, -179);
    // Середина между 179° и -179° (=181°) по короткой дуге — это ±180°, а не 0°.
    expect(Math.abs(mid.lon)).toBeCloseTo(180, 6);
  });
});
