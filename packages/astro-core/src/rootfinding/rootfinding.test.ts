import { describe, expect, it } from 'vitest';
import * as AE from 'astronomy-engine';
import { brentRoot, scanForBracket } from './brent.js';
import { findNextIngress } from './ingresses.js';
import { findExactTransitAspects } from './transits.js';
import { findMoonVoidOfCourse } from './void-of-course.js';
import { findSolarReturnNearAge, findLunarReturnNearMonth } from './returns.js';
import { ttToAstroTime } from './longitude-search.js';
import { sunApparentLongitudeDeg } from '../ephemeris/sun-vsop87.js';
import { bodyGeocentricPosition, PLANET_BODIES } from '../ephemeris/planets.js';
import { angularSeparationDegrees } from '../util/angles.js';

describe('rootfinding/brent', () => {
  it('находит корень x²−2=0 (√2) с высокой точностью', () => {
    const root = brentRoot((x) => x * x - 2, 0, 2);
    expect(root).toBeCloseTo(Math.SQRT2, 9);
  });

  it('scanForBracket находит интервал смены знака', () => {
    const bracket = scanForBracket((x) => x - 3.5, 0, 10, 1);
    expect(bracket).not.toBeNull();
    expect(bracket![0]).toBeLessThanOrEqual(3.5);
    expect(bracket![1]).toBeGreaterThanOrEqual(3.5);
  });
});

describe('rootfinding/ingresses', () => {
  it('находит ингресс Солнца в Овен около известной даты весеннего равноденствия', () => {
    const afterTT = AE.MakeTime(new Date('2024-03-01T00:00:00Z')).tt;
    const longitudeFn = (tt: number): number => sunApparentLongitudeDeg(ttToAstroTime(tt));
    const ingress = findNextIngress(longitudeFn, afterTT, 1, 60);
    expect(ingress).not.toBeNull();
    const date = ttToAstroTime(ingress!.tt).date;
    // Равноденствие 2024 — 2024-03-20 (± сутки допуска на реализацию теста).
    expect(date.getUTCFullYear()).toBe(2024);
    expect(date.getUTCMonth()).toBe(2); // март (0-индексация)
    expect(Math.abs(date.getUTCDate() - 20)).toBeLessThanOrEqual(1);
    expect(ingress!.toSignIndex).toBe(0); // Овен
  });
});

describe('rootfinding/transits: точный транзитный аспект', () => {
  it('транзитное Солнце образует точное соединение с самим собой (0°) раз в год — солнечный день рождения', () => {
    const natalTT = AE.MakeTime(new Date('2000-06-15T12:00:00Z')).tt;
    const natalLon = sunApparentLongitudeDeg(ttToAstroTime(natalTT));
    const longitudeFn = (tt: number): number => sunApparentLongitudeDeg(ttToAstroTime(tt));
    const times = findExactTransitAspects(longitudeFn, natalLon, 0, natalTT + 300, natalTT + 400, 1);
    expect(times.length).toBeGreaterThanOrEqual(1);
  });
});

describe('rootfinding/returns: соляр/лунар', () => {
  it('соляр находится около годовщины и Солнце там точно равно натальной долготе', () => {
    const natalTT = AE.MakeTime(new Date('1990-06-15T14:30:00Z')).tt;
    const natalLon = sunApparentLongitudeDeg(ttToAstroTime(natalTT));
    const returnTT = findSolarReturnNearAge(natalLon, natalTT, 30);
    expect(returnTT).not.toBeNull();
    const returnLon = sunApparentLongitudeDeg(ttToAstroTime(returnTT!));
    expect(angularSeparationDegrees(returnLon, natalLon)).toBeLessThan(1 / 3600); // <1″
    // Соляр должен быть примерно через 30 лет (в пределах нескольких суток от годовщины).
    expect(Math.abs(returnTT! - (natalTT + 30 * 365.24219))).toBeLessThan(3);
  });

  it('лунар находится около указанного месяца и Луна там точно равна натальной долготе', () => {
    const natalTT = AE.MakeTime(new Date('1990-06-15T14:30:00Z')).tt;
    const natalLon = bodyGeocentricPosition('moon', ttToAstroTime(natalTT)).longitudeDeg;
    const returnTT = findLunarReturnNearMonth(natalLon, natalTT, 5);
    expect(returnTT).not.toBeNull();
    const returnLon = bodyGeocentricPosition('moon', ttToAstroTime(returnTT!)).longitudeDeg;
    expect(angularSeparationDegrees(returnLon, natalLon)).toBeLessThan(1 / 3600);
  });

  it('производительность: соляр находится за ≤200мс (бюджет Ф1)', () => {
    const natalTT = AE.MakeTime(new Date('1990-06-15T14:30:00Z')).tt;
    const natalLon = sunApparentLongitudeDeg(ttToAstroTime(natalTT));
    findSolarReturnNearAge(natalLon, natalTT, 10); // прогрев
    const start = performance.now();
    findSolarReturnNearAge(natalLon, natalTT, 10);
    expect(performance.now() - start).toBeLessThan(200);
  });
});

describe('rootfinding/void-of-course', () => {
  it('находит void-of-course Луны без исключений, с согласованными полями', () => {
    const referenceTT = AE.MakeTime(new Date('2024-06-01T00:00:00Z')).tt;
    const moonFn = (tt: number): number => bodyGeocentricPosition('moon', ttToAstroTime(tt)).longitudeDeg;
    const others = new Map(
      [...PLANET_BODIES, 'sun' as const].map((b) => [
        b,
        (tt: number): number =>
          b === 'sun' ? sunApparentLongitudeDeg(ttToAstroTime(tt)) : bodyGeocentricPosition(b, ttToAstroTime(tt)).longitudeDeg,
      ]),
    );
    const result = findMoonVoidOfCourse(moonFn, others, referenceTT);
    expect(result).not.toBeNull();
    expect(result!.ingressTT).toBeGreaterThan(result!.voidStartTT - 1e-6);
  });
});
