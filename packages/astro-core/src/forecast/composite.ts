/** Композит: средние точки пар планет по КОРОТКОЙ дуге + композитный MC (по той же формуле). */
import { midpointShortArcDegrees } from '../util/angles.js';

export function compositeLongitudeDeg(longitudeA: number, longitudeB: number): number {
  return midpointShortArcDegrees(longitudeA, longitudeB);
}

/** Композит для набора именованных долгот двух карт (например `bodies`/`points`/`angles`). */
export function compositeLongitudes(
  chartA: Readonly<Record<string, number>>,
  chartB: Readonly<Record<string, number>>,
): Record<string, number> {
  const result: Record<string, number> = {};
  for (const key of Object.keys(chartA)) {
    if (key in chartB) {
      result[key] = compositeLongitudeDeg(chartA[key]!, chartB[key]!);
    }
  }
  return result;
}
