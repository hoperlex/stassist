/** Поиск момента точного аспекта между ДВУМЯ движущимися телами (нужно для void-of-course). */
import { brentRoot, scanForBracket } from './brent.js';
import { angularSeparationDegrees } from '../util/angles.js';
import type { LongitudeProviderTT } from './longitude-search.js';

export function findAllTimesOfRelativeAspect(
  longitudeFnA: LongitudeProviderTT,
  longitudeFnB: LongitudeProviderTT,
  aspectAngleDeg: number,
  ttStart: number,
  ttEnd: number,
  scanStepDays: number,
): number[] {
  const f = (t: number): number => angularSeparationDegrees(longitudeFnA(t), longitudeFnB(t)) - aspectAngleDeg;
  const results: number[] = [];
  let cursor = ttStart;
  while (cursor < ttEnd) {
    const windowEnd = Math.min(cursor + scanStepDays, ttEnd);
    const bracket = scanForBracket(f, cursor, windowEnd, windowEnd - cursor);
    if (bracket) {
      const [a, b] = bracket;
      results.push(a === b ? a : brentRoot(f, a, b, { tol: 1e-8, maxIter: 100 }));
    }
    cursor = windowEnd;
  }
  return results;
}
