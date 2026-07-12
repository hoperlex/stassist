/**
 * Соляр/лунар — момент возврата транзитного Солнца/Луны к натальной долготе.
 *
 * КРИТИЧНО: цель поиска соляра — долгота натального Солнца, посчитанная ТЕМ ЖЕ модулем
 * VSOP87 (`ephemeris/sun-vsop87.ts`), что и текущее положение транзитного Солнца в ходе
 * поиска корня — единый движок для натала и цели соляра (см. ACCURACY.md, находки Ф1 §7).
 * Лунар аналогично использует один и тот же модуль позиций Луны (`ephemeris/planets.ts`) и для
 * натальной, и для транзитной Луны.
 */
import { sunApparentLongitudeDeg } from '../ephemeris/sun-vsop87.js';
import { bodyGeocentricPosition } from '../ephemeris/planets.js';
import { findTimeOfLongitude, ttToAstroTime } from './longitude-search.js';

const TROPICAL_YEAR_DAYS = 365.24219;
const SIDEREAL_MONTH_DAYS = 27.321661;

/** Ищет момент (TT-сутки), когда Солнце возвращается к `natalSunLongitudeDeg`, около `approxTT ± windowDays`. */
export function findSolarReturnTT(
  natalSunLongitudeDeg: number,
  approxTT: number,
  windowDays = 3,
): number | null {
  const longitudeFn = (tt: number): number => sunApparentLongitudeDeg(ttToAstroTime(tt));
  return findTimeOfLongitude(longitudeFn, natalSunLongitudeDeg, approxTT - windowDays, approxTT + windowDays, 0.5);
}

/** Удобный вход: `natalTT` — TT рождения, `yearsElapsed` — сколько лет прошло (может быть дробным). */
export function findSolarReturnNearAge(
  natalSunLongitudeDeg: number,
  natalTT: number,
  yearsElapsed: number,
): number | null {
  const approx = natalTT + yearsElapsed * TROPICAL_YEAR_DAYS;
  return findSolarReturnTT(natalSunLongitudeDeg, approx, 3);
}

export function findLunarReturnTT(
  natalMoonLongitudeDeg: number,
  approxTT: number,
  windowDays = 2,
): number | null {
  const longitudeFn = (tt: number): number => bodyGeocentricPosition('moon', ttToAstroTime(tt)).longitudeDeg;
  return findTimeOfLongitude(
    longitudeFn,
    natalMoonLongitudeDeg,
    approxTT - windowDays,
    approxTT + windowDays,
    0.2,
  );
}

export function findLunarReturnNearMonth(
  natalMoonLongitudeDeg: number,
  natalTT: number,
  monthsElapsed: number,
): number | null {
  const approx = natalTT + monthsElapsed * SIDEREAL_MONTH_DAYS;
  return findLunarReturnTT(natalMoonLongitudeDeg, approx, 2);
}
