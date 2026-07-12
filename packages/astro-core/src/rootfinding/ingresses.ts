/** Ингрессы — момент пересечения телом границы знака (кратно 30°). */
import { normalizeDegrees } from '../util/angles.js';
import { findTimeOfLongitude, type LongitudeProviderTT } from './longitude-search.js';

export interface IngressEvent {
  readonly tt: number;
  readonly fromSignIndex: number;
  readonly toSignIndex: number;
}

/**
 * Следующий ингресс после `afterTT`. `scanStepDays` должен быть заметно меньше времени
 * прохождения телом одного знака (для Луны ~2.5 сут — берите ~0.2; для внешних планет — недели).
 */
export function findNextIngress(
  longitudeFn: LongitudeProviderTT,
  afterTT: number,
  scanStepDays: number,
  maxSearchDays = 800,
): IngressEvent | null {
  const currentLon = normalizeDegrees(longitudeFn(afterTT));
  const currentSign = Math.floor(currentLon / 30);
  const targetLon = normalizeDegrees((currentSign + 1) * 30);
  const tt = findTimeOfLongitude(longitudeFn, targetLon, afterTT, afterTT + maxSearchDays, scanStepDays);
  if (tt === null) return null;
  return { tt, fromSignIndex: currentSign % 12, toSignIndex: (currentSign + 1) % 12 };
}
