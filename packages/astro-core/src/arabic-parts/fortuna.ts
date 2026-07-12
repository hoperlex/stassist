/**
 * Арабские части: Фортуна (день/ночь по секте) + каркас для добавления других частей той же
 * геометрической конструкции (Asc + точка1 − точка2, с переменой знака по секте).
 */
import { normalizeDegrees } from '../util/angles.js';

/** Секта карты: Солнце выше горизонта (относительно Asc, долгота Солнца в дугe Dsc→Asc) → день. */
export function isDaySect(sunLongitudeDeg: number, ascDeg: number): boolean {
  return normalizeDegrees(sunLongitudeDeg - ascDeg) >= 180;
}

export interface ArabicPartResult {
  readonly longitudeDeg: number;
  readonly formula: 'day' | 'night';
}

/** Общая конструкция части: Asc + a − b (день) или Asc + b − a (ночь). */
export function computeArabicPart(
  ascDeg: number,
  pointAWhenDayDeg: number,
  pointBWhenDayDeg: number,
  isDay: boolean,
): ArabicPartResult {
  const longitudeDeg = isDay
    ? normalizeDegrees(ascDeg + pointAWhenDayDeg - pointBWhenDayDeg)
    : normalizeDegrees(ascDeg + pointBWhenDayDeg - pointAWhenDayDeg);
  return { longitudeDeg, formula: isDay ? 'day' : 'night' };
}

/** Фортуна: день — Asc+Луна−Солнце; ночь — Asc+Солнце−Луна. */
export function fortunaLongitudeDeg(
  ascDeg: number,
  sunLongitudeDeg: number,
  moonLongitudeDeg: number,
): ArabicPartResult {
  const isDay = isDaySect(sunLongitudeDeg, ascDeg);
  return computeArabicPart(ascDeg, moonLongitudeDeg, sunLongitudeDeg, isDay);
}
