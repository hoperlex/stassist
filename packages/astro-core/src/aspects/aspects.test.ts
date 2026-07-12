import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { detectAspects, type AspectableBody } from './index.js';

describe('aspects/detectAspects', () => {
  it('находит соединение в пределах орбиса', () => {
    const bodies: AspectableBody[] = [
      { key: 'sun', longitudeDeg: 10, speedLongDegPerDay: 1 },
      { key: 'moon', longitudeDeg: 14, speedLongDegPerDay: 13 },
    ];
    const aspects = detectAspects(bodies, { aspectSet: 'major_minor' });
    expect(aspects).toHaveLength(1);
    expect(aspects[0]!.angleName).toBe('conjunction');
    expect(aspects[0]!.orbDeg).toBeCloseTo(4, 6);
  });

  it('не находит аспект вне орбиса', () => {
    const bodies: AspectableBody[] = [
      { key: 'sun', longitudeDeg: 0, speedLongDegPerDay: 1 },
      { key: 'moon', longitudeDeg: 20, speedLongDegPerDay: 13 },
    ];
    const aspects = detectAspects(bodies, { aspectSet: 'major_minor' });
    expect(aspects).toHaveLength(0);
  });

  it('применяющийся (applying) аспект — орбис сокращается со временем', () => {
    // Луна (13°/сутки) ПОЗАДИ Солнца (1°/сутки) и нагоняет его — separation=4° сокращается до 0.
    const bodies: AspectableBody[] = [
      { key: 'sun', longitudeDeg: 10, speedLongDegPerDay: 1 },
      { key: 'moon', longitudeDeg: 6, speedLongDegPerDay: 13 },
    ];
    const aspects = detectAspects(bodies, { aspectSet: 'major' });
    expect(aspects[0]!.applying).toBe(true);
  });

  it('расходящийся (separating) аспект — орбис растёт', () => {
    // Луна (13°/сутки) уже ВПЕРЕДИ Солнца (1°/сутки) и уходит дальше — separation=4° растёт.
    const bodies: AspectableBody[] = [
      { key: 'sun', longitudeDeg: 10, speedLongDegPerDay: 1 },
      { key: 'moon', longitudeDeg: 14, speedLongDegPerDay: 13 },
    ];
    const aspects = detectAspects(bodies, { aspectSet: 'major' });
    expect(aspects[0]!.applying).toBe(false);
  });

  it('результат не зависит от порядка тел во входном массиве (симметрия)', () => {
    const a: AspectableBody = { key: 'sun', longitudeDeg: 100, speedLongDegPerDay: 1 };
    const b: AspectableBody = { key: 'venus', longitudeDeg: 191, speedLongDegPerDay: 1.2 };
    const r1 = detectAspects([a, b], { aspectSet: 'major_minor' });
    const r2 = detectAspects([b, a], { aspectSet: 'major_minor' });
    expect(r1).toHaveLength(1);
    expect(r2).toHaveLength(1);
    expect(r1[0]!.angleName).toBe(r2[0]!.angleName);
    expect(r1[0]!.orbDeg).toBeCloseTo(r2[0]!.orbDeg, 9);
    expect(r1[0]!.applying).toBe(r2[0]!.applying);
  });

  it('property: орбис найденного аспекта всегда ≤ допустимого', () => {
    fc.assert(
      fc.property(
        fc.double({ min: 0, max: 360, noNaN: true }),
        fc.double({ min: 0, max: 360, noNaN: true }),
        fc.double({ min: -15, max: 15, noNaN: true }),
        fc.double({ min: -15, max: 15, noNaN: true }),
        (lonA, lonB, spA, spB) => {
          const aspects = detectAspects(
            [
              { key: 'sun', longitudeDeg: lonA, speedLongDegPerDay: spA },
              { key: 'mars', longitudeDeg: lonB, speedLongDegPerDay: spB },
            ],
            { aspectSet: 'major_minor' },
          );
          for (const asp of aspects) {
            expect(asp.orbDeg).toBeLessThanOrEqual(asp.orbAllowedDeg + 1e-9);
          }
        },
      ),
      { numRuns: 200 },
    );
  });
});
