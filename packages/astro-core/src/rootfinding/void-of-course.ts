/**
 * Луна без курса (void-of-course): интервал от последнего точного птолемеевского аспекта Луны
 * в текущем знаке до ингресса в следующий знак (см. docs/research/02-алгоритмы-и-библиотеки.md §2).
 */
import { normalizeDegrees } from '../util/angles.js';
import { MAJOR_ASPECTS, ASPECT_ANGLE_DEG } from '../aspects/presets.js';
import { findNextIngress } from './ingresses.js';
import { findTimeOfLongitude } from './longitude-search.js';
import { findAllTimesOfRelativeAspect } from './relative-aspect-search.js';
import type { LongitudeProviderTT } from './longitude-search.js';

export interface VoidOfCourseResult {
  readonly voidStartTT: number;
  readonly ingressTT: number;
  readonly lastAspectBody: string | null;
}

export function findMoonVoidOfCourse(
  moonLongitudeFn: LongitudeProviderTT,
  otherBodies: ReadonlyMap<string, LongitudeProviderTT>,
  referenceTT: number,
): VoidOfCourseResult | null {
  const ingress = findNextIngress(moonLongitudeFn, referenceTT, 0.1, 5);
  if (!ingress) return null;

  // Момент входа Луны в текущий знак — ищем назад от referenceTT (не глубже ~2.6 сут — макс.
  // время прохождения Луной одного знака, с запасом до 5 суток).
  const currentSign = Math.floor(normalizeDegrees(moonLongitudeFn(referenceTT)) / 30);
  const entryTargetLon = normalizeDegrees(currentSign * 30);
  const entryTT = findTimeOfLongitude(moonLongitudeFn, entryTargetLon, referenceTT - 5, referenceTT, 0.1) ?? referenceTT - 2.6;

  let lastTT = -Infinity;
  let lastBody: string | null = null;

  for (const [bodyKey, bodyLongitudeFn] of otherBodies) {
    for (const angleName of MAJOR_ASPECTS) {
      const angle = ASPECT_ANGLE_DEG[angleName];
      const times = findAllTimesOfRelativeAspect(moonLongitudeFn, bodyLongitudeFn, angle, entryTT, ingress.tt, 0.15);
      for (const t of times) {
        if (t > lastTT) {
          lastTT = t;
          lastBody = bodyKey;
        }
      }
    }
  }

  return {
    voidStartTT: lastTT === -Infinity ? entryTT : lastTT,
    ingressTT: ingress.tt,
    lastAspectBody: lastBody,
  };
}
