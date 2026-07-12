import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { ayanamshaDeg, toSiderealDeg } from './ayanamsha.js';
import { nakshatraOf, NAKSHATRA_NAMES } from './nakshatra.js';
import { computeVimshottariMahadashas, DASHA_PERIOD_YEARS, TOTAL_CYCLE_YEARS } from './vimshottari-dasha.js';
import { J2000_JD } from '../time/julian-day.js';

describe('sidereal/ayanamsha', () => {
  it('на эпоху J2000 совпадает с табличной константой', () => {
    expect(ayanamshaDeg('lahiri', J2000_JD)).toBeCloseTo(23.85675, 3);
  });

  it('toSiderealDeg корректно вычитает айанамшу по модулю 360', () => {
    expect(toSiderealDeg(10, 24)).toBeCloseTo(346, 9);
  });

  it('property: значение всегда в [0,360) для широкого диапазона дат', () => {
    fc.assert(
      fc.property(fc.double({ min: J2000_JD - 40000, max: J2000_JD + 40000, noNaN: true }), (jdTT) => {
        const v = ayanamshaDeg('lahiri', jdTT);
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThan(360);
      }),
    );
  });
});

describe('sidereal/nakshatra', () => {
  it('0° сидерической долготы — первая накшатра (Ашвини), пада 1', () => {
    const n = nakshatraOf(0);
    expect(n.index).toBe(0);
    expect(n.name).toBe('Ашвини');
    expect(n.pada).toBe(1);
  });

  it('27 накшатр покрывают ровно 360° без пропусков', () => {
    expect(NAKSHATRA_NAMES).toHaveLength(27);
    const n = nakshatraOf(359.999);
    expect(n.index).toBe(26);
  });

  it('property: индекс всегда 0..26, пада 1..4', () => {
    fc.assert(
      fc.property(fc.double({ min: 0, max: 359.999, noNaN: true }), (lon) => {
        const n = nakshatraOf(lon);
        expect(n.index).toBeGreaterThanOrEqual(0);
        expect(n.index).toBeLessThan(27);
        expect(n.pada).toBeGreaterThanOrEqual(1);
        expect(n.pada).toBeLessThanOrEqual(4);
      }),
    );
  });
});

describe('sidereal/vimshottari-dasha', () => {
  it('сумма 9 стандартных периодов = 120 лет', () => {
    const sum = Object.values(DASHA_PERIOD_YEARS).reduce((a, b) => a + b, 0);
    expect(sum).toBe(120);
    expect(TOTAL_CYCLE_YEARS).toBe(120);
  });

  it('Луна ровно в начале накшатры (0° внутри неё) даёт полный период владыки первым периодом', () => {
    const periods = computeVimshottariMahadashas(0); // 0° — начало Ашвини, владыка Кету (7 лет)
    expect(periods[0]!.lord).toBe('ketu');
    expect(periods[0]!.startAgeYears).toBe(0);
    expect(periods[0]!.endAgeYears).toBeCloseTo(7, 9);
  });

  it('периоды идут подряд без разрывов (endAge[i] === startAge[i+1])', () => {
    const periods = computeVimshottariMahadashas(123.456);
    expect(periods).toHaveLength(9);
    for (let i = 0; i < periods.length - 1; i++) {
      expect(periods[i]!.endAgeYears).toBeCloseTo(periods[i + 1]!.startAgeYears, 9);
    }
  });

  it('property: возраста монотонно возрастают, первый период короче или равен полному', () => {
    fc.assert(
      fc.property(fc.double({ min: 0, max: 359.999, noNaN: true }), (lon) => {
        const periods = computeVimshottariMahadashas(lon);
        expect(periods[0]!.endAgeYears).toBeLessThanOrEqual(DASHA_PERIOD_YEARS[periods[0]!.lord] + 1e-9);
        for (let i = 0; i < periods.length - 1; i++) {
          expect(periods[i + 1]!.startAgeYears).toBeGreaterThanOrEqual(periods[i]!.startAgeYears);
        }
      }),
    );
  });
});
