/**
 * Общий примитив root-finding поверх долгот: «найти момент времени, когда тело окажется на
 * заданной эклиптической долготе». Используется для точных транзитных аспектов, ингрессов,
 * соляров/лунаров, void-of-course. Домен времени — TT-сутки от J2000 (`AstroTime.tt`), это же
 * пространство, в котором работают VSOP87-Солнце и astronomy-engine.
 */
import * as AE from 'astronomy-engine';
import { brentRoot, scanForBracket } from './brent.js';
import { shortestDeltaDegrees } from '../util/angles.js';

export type LongitudeProviderTT = (ttDays: number) => number;

export function ttToAstroTime(ttDays: number): AE.AstroTime {
  return AE.AstroTime.FromTerrestrialTime(ttDays);
}

/**
 * Ищет момент (TT-сутки), когда `longitudeFn(t) == targetDeg` (по кратчайшей дуге), сканируя
 * `[ttStart,ttEnd]` с шагом `scanStepDays` в поисках смены знака и уточняя методом Брента.
 * Возвращает `null`, если в интервале нет пересечения (или их несколько — только первое).
 */
export function findTimeOfLongitude(
  longitudeFn: LongitudeProviderTT,
  targetDeg: number,
  ttStart: number,
  ttEnd: number,
  scanStepDays = 1,
): number | null {
  const f = (t: number): number => shortestDeltaDegrees(targetDeg, longitudeFn(t));
  const bracket = scanForBracket(f, ttStart, ttEnd, scanStepDays);
  if (!bracket) return null;
  const [a, b] = bracket;
  if (a === b) return a;
  return brentRoot(f, a, b, { tol: 1e-8, maxIter: 100 });
}

/** Возвращает ВСЕ пересечения в интервале (например для сканирования нескольких ингрессов). */
export function findAllTimesOfLongitude(
  longitudeFn: LongitudeProviderTT,
  targetDeg: number,
  ttStart: number,
  ttEnd: number,
  scanStepDays = 1,
): number[] {
  const f = (t: number): number => shortestDeltaDegrees(targetDeg, longitudeFn(t));
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
