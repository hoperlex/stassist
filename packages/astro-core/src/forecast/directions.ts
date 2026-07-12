/** Символические дирекции: +k° в год ко всем точкам натала (чистая арифметика). */
import { normalizeDegrees } from '../util/angles.js';

/** Стандартная ставка «1° в год» (Naibod-подобные варианты — расширение на будущее). */
export const DEFAULT_DIRECTION_RATE_DEG_PER_YEAR = 1;

export function symbolicDirectedLongitudeDeg(
  natalLongitudeDeg: number,
  ageYears: number,
  ratePerYearDeg: number = DEFAULT_DIRECTION_RATE_DEG_PER_YEAR,
): number {
  return normalizeDegrees(natalLongitudeDeg + ageYears * ratePerYearDeg);
}
