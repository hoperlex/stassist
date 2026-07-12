import { describe, expect, it } from 'vitest';
import * as AE from 'astronomy-engine';
import fc from 'fast-check';
import { computeHouses, POLAR_LATITUDE_LIMIT_DEG } from './index.js';
import { normalizeDegrees, shortestDeltaDegrees } from '../util/angles.js';
import { ascLongitudeDeg, mcLongitudeDeg } from './ascendant-mc.js';

const MOSCOW = { lat: 55.75, lon: 37.62 };

function sumOfHouseSizes(cusps: readonly number[]): number {
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const a = cusps[i]!;
    const b = cusps[(i + 1) % 12]!;
    sum += normalizeDegrees(b - a) || 360;
  }
  return sum;
}

describe('houses/ascendant-mc: Asc/MC проверены против прямого построения через горизонт astronomy-engine', () => {
  it('Asc — геометрическое пересечение эклиптики с горизонтом (без рефракции), в пределах 1e-4°', () => {
    const time = AE.MakeTime(new Date('2000-06-15T12:00:00Z'));
    const observer = new AE.Observer(MOSCOW.lat, MOSCOW.lon, 0);
    const eps = AE.e_tilt(time).tobl;
    const gastHours = AE.SiderealTime(time);
    const ramc = normalizeDegrees(gastHours * 15 + MOSCOW.lon);

    const asc = ascLongitudeDeg(ramc, eps, MOSCOW.lat);
    const mc = mcLongitudeDeg(ramc, eps);

    function altitudeAt(lambdaDeg: number): number {
      const sph = new AE.Spherical(0, lambdaDeg, 1);
      const vec = AE.VectorFromSphere(sph, time);
      const eqd = AE.RotateVector(AE.Rotation_ECT_EQD(time), vec);
      const hor = AE.RotateVector(AE.Rotation_EQD_HOR(time, observer), eqd);
      return AE.HorizonFromVector(hor, '').lat;
    }

    // Асцендент лежит на горизонте (высота ~0) геометрически.
    expect(Math.abs(altitudeAt(asc))).toBeLessThan(1e-4);
    // MC — на меридиане (азимут ровно 180 для наблюдателя севернее тропиков).
    const sph = new AE.Spherical(0, mc, 1);
    const vec = AE.VectorFromSphere(sph, time);
    const eqd = AE.RotateVector(AE.Rotation_ECT_EQD(time), vec);
    const hor = AE.RotateVector(AE.Rotation_EQD_HOR(time, observer), eqd);
    const az = AE.HorizonFromVector(hor, '').lon;
    expect(Math.abs(az - 180)).toBeLessThan(1e-4);
  });
});

describe('houses/index: инварианты для всех систем', () => {
  const systems = ['placidus', 'koch', 'regiomontanus', 'porphyry', 'equal', 'whole_sign'] as const;
  const time = AE.MakeTime(new Date('1990-03-21T09:15:00Z'));
  const jdUT = time.ut + 2451545.0;
  const jdTT = time.tt + 2451545.0;

  // Равнодомная и целознаковая системы НЕ используют MC/IC как куспиды 10/4 (это их определяющее
  // свойство, не баг) — угловая сверка 1/4/7/10 применима только к квадрантным системам.
  const quadrantSystems = new Set(['placidus', 'koch', 'regiomontanus', 'porphyry']);

  for (const system of systems) {
    it(`${system}: сумма размеров 12 домов = 360°`, () => {
      const res = computeHouses({ time, jdUT, jdTT, latDeg: MOSCOW.lat, lonDeg: MOSCOW.lon, system });
      expect(res.cusps).toHaveLength(12);
      expect(sumOfHouseSizes(res.cusps)).toBeCloseTo(360, 5);
      // Дом 1 = Asc везде, КРОМЕ целознаковой (там дом 1 = начало знака Asc, а не сам Asc).
      if (system !== 'whole_sign') {
        expect(res.cusps[0]).toBeCloseTo(res.ascDeg, 5);
      }
    });

    if (quadrantSystems.has(system)) {
      it(`${system}: куспиды 1/4/7/10 = Asc/IC/Dsc/MC (квадрантная система)`, () => {
        const res = computeHouses({ time, jdUT, jdTT, latDeg: MOSCOW.lat, lonDeg: MOSCOW.lon, system });
        expect(res.cusps[0]).toBeCloseTo(res.ascDeg, 5);
        expect(res.cusps[3]).toBeCloseTo(res.icDeg, 5);
        expect(res.cusps[6]).toBeCloseTo(res.dscDeg, 5);
        expect(res.cusps[9]).toBeCloseTo(res.mcDeg, 5);
      });
    }

    it(`${system}: противоположные дома лежат на противоположных долготах`, () => {
      const res = computeHouses({ time, jdUT, jdTT, latDeg: MOSCOW.lat, lonDeg: MOSCOW.lon, system });
      for (let i = 0; i < 6; i++) {
        const diff = Math.abs(shortestDeltaDegrees(res.cusps[i]!, res.cusps[i + 6]!));
        expect(Math.abs(diff - 180)).toBeLessThan(1e-6);
      }
    });
  }

  it('Плацидус/Кох за полярным кругом фоллбэчат на Порфирия с флагом', () => {
    const res = computeHouses({
      time,
      jdUT,
      jdTT,
      latDeg: 70,
      lonDeg: MOSCOW.lon,
      system: 'placidus',
    });
    expect(res.fallbackApplied).toBe(true);
    expect(res.usedSystem).toBe('porphyry');
    expect(Math.abs(MOSCOW.lat)).toBeLessThan(POLAR_LATITUDE_LIMIT_DEG); // документирует порог
  });

  it('property: для случайных широт/долгот/дат все системы дают монотонные по домам, корректные куспиды', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1950, max: 2050 }),
        fc.integer({ min: 0, max: 11 }),
        fc.integer({ min: 1, max: 27 }),
        fc.double({ min: -60, max: 60, noNaN: true }),
        fc.double({ min: -179, max: 179, noNaN: true }),
        fc.constantFrom(...systems),
        (year, month, day, lat, lon, system) => {
          const t = AE.MakeTime(new Date(Date.UTC(year, month, day, 12, 0, 0)));
          const res = computeHouses({
            time: t,
            jdUT: t.ut + 2451545.0,
            jdTT: t.tt + 2451545.0,
            latDeg: lat,
            lonDeg: lon,
            system,
          });
          expect(res.cusps).toHaveLength(12);
          expect(sumOfHouseSizes(res.cusps)).toBeCloseTo(360, 3);
          for (const c of res.cusps) {
            expect(c).toBeGreaterThanOrEqual(0);
            expect(c).toBeLessThan(360);
          }
        },
      ),
      { numRuns: 60 },
    );
  });
});
