/** Точные транзитные аспекты к неподвижной натальной точке. */
import { normalizeDegrees } from '../util/angles.js';
import { findAllTimesOfLongitude, type LongitudeProviderTT } from './longitude-search.js';

/**
 * Моменты, когда транзитное тело образует точный аспект `aspectAngleDeg` к натальной долготе.
 * Для несимметричных углов (не 0/180) ищутся ОБЕ ветви (natal+angle, natal-angle).
 */
export function findExactTransitAspects(
  transitLongitudeFn: LongitudeProviderTT,
  natalLongitudeDeg: number,
  aspectAngleDeg: number,
  ttStart: number,
  ttEnd: number,
  scanStepDays: number,
): number[] {
  const targets = new Set<number>([
    normalizeDegrees(natalLongitudeDeg + aspectAngleDeg),
    normalizeDegrees(natalLongitudeDeg - aspectAngleDeg),
  ]);
  const results: number[] = [];
  for (const target of targets) {
    results.push(...findAllTimesOfLongitude(transitLongitudeFn, target, ttStart, ttEnd, scanStepDays));
  }
  return results.sort((a, b) => a - b);
}
