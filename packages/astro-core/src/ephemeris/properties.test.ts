/**
 * Свойства-инварианты позиций (см. промт Ф1 §«Верификация» и docs/roadmap/31 §7):
 *  - непрерывность долгот (маленький шаг времени → маленькое изменение долготы, без скачков
 *    кроме ожидаемого перехода через 0°/360°, который уже учтён в `shortestDeltaDegrees`);
 *  - ретроградность ⇔ отрицательная скорость — проверяется САМОСОГЛАСОВАННО: если скорость в
 *    момент t отрицательна (заметно, не около стояния), то долгота в t+dt меньше долготы в t
 *    по кратчайшей дуге, и наоборот. Не зависит от стороннего источника (см. обоснование в
 *    cross-validation.test.ts, почему флаг `is_retrograde` пакета `ephemeris` не используется).
 */
import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import * as AE from 'astronomy-engine';
import { sunApparentPosition } from './sun-vsop87.js';
import { bodyGeocentricPosition, PLANET_BODIES } from './planets.js';
import { shortestDeltaDegrees } from '../util/angles.js';

function randomDate(year: number, month: number, day: number, hour: number): Date {
  return new Date(Date.UTC(year, month, day, hour, 0, 0));
}

const ALL_BODIES = ['sun', 'moon', ...PLANET_BODIES] as const;

function longitudeOf(body: (typeof ALL_BODIES)[number], time: AE.AstroTime): number {
  return body === 'sun' ? sunApparentPosition(time).longitudeDeg : bodyGeocentricPosition(body, time).longitudeDeg;
}

function speedOf(body: (typeof ALL_BODIES)[number], time: AE.AstroTime): number {
  return body === 'sun'
    ? sunApparentPosition(time).speedLongDegPerDay
    : bodyGeocentricPosition(body, time).speedLongDegPerDay;
}

describe('ephemeris/properties: непрерывность долгот', () => {
  it('малый шаг времени (1 час) не даёт скачка долготы больше физически разумного', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1900, max: 2050 }),
        fc.integer({ min: 0, max: 11 }),
        fc.integer({ min: 1, max: 27 }),
        fc.integer({ min: 0, max: 22 }),
        fc.constantFrom(...ALL_BODIES),
        (year, month, day, hour, body) => {
          const t1 = AE.MakeTime(randomDate(year, month, day, hour));
          const t2 = t1.AddDays(1 / 24);
          const lon1 = longitudeOf(body, t1);
          const lon2 = longitudeOf(body, t2);
          const diff = Math.abs(shortestDeltaDegrees(lon1, lon2));
          // Самое быстрое тело — Луна, ~13°/сутки => ~0.6°/час; берём широкий, но конечный запас.
          expect(diff).toBeLessThan(1);
        },
      ),
      { numRuns: 150 },
    );
  });
});

describe('ephemeris/properties: ретроградность ⇔ отрицательная скорость', () => {
  it('знак скорости совпадает с направлением изменения долготы на малом шаге', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1900, max: 2050 }),
        fc.integer({ min: 0, max: 11 }),
        fc.integer({ min: 1, max: 27 }),
        fc.constantFrom(...PLANET_BODIES), // Солнце/Луна физически не ретроградны — не включаем
        (year, month, day, body) => {
          const t1 = AE.MakeTime(randomDate(year, month, day, 12));
          const speed = speedOf(body, t1);
          if (Math.abs(speed) < 0.02) return; // пропускаем окрестность стояния

          const dt = 0.1; // сутки — достаточно мало относительно периодов стояний планет
          const lonBefore = longitudeOf(body, t1.AddDays(-dt));
          const lonAfter = longitudeOf(body, t1.AddDays(dt));
          const trend = shortestDeltaDegrees(lonBefore, lonAfter); // >0 — долгота растёт (директно)

          const isRetrograde = speed < 0;
          if (isRetrograde) {
            expect(trend).toBeLessThan(0);
          } else {
            expect(trend).toBeGreaterThan(0);
          }
        },
      ),
      { numRuns: 200 },
    );
  });
});
