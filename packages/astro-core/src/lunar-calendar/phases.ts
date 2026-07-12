/**
 * Фазы Луны. Текущий фазовый угол считается по СОБСТВЕННЫМ функциям ядра (VSOP87-Солнце +
 * позиция Луны) для согласованности с остальной картой. Поиск МОМЕНТОВ фаз (для календаря)
 * переиспользует `astronomy-engine.SearchMoonPhase/SearchMoonQuarter` — она использует
 * собственный (очень точный, ELP2000+VSOP87-подобный) источник Солнца; расхождение с нашим
 * VSOP87 — единицы угловых секунд (см. ACCURACY.md), что при скорости Луны ~13°/сутки даёт
 * ошибку момента фазы на уровне долей секунды времени — пренебрежимо для допуска ≤2 мин.
 */
import * as AE from 'astronomy-engine';
import { normalizeDegrees } from '../util/angles.js';
import { sunApparentLongitudeDeg } from '../ephemeris/sun-vsop87.js';
import { bodyGeocentricPosition } from '../ephemeris/planets.js';

export type MoonPhaseName = 'new' | 'waxing_crescent' | 'first_quarter' | 'waxing_gibbous' | 'full' | 'waning_gibbous' | 'last_quarter' | 'waning_crescent';

/** Фазовый угол (элонгация Луна−Солнце), градусы [0,360): 0=новолуние, 180=полнолуние. */
export function moonPhaseAngleDeg(time: AE.AstroTime): number {
  const sunLon = sunApparentLongitudeDeg(time);
  const moonLon = bodyGeocentricPosition('moon', time).longitudeDeg;
  return normalizeDegrees(moonLon - sunLon);
}

export function moonPhaseName(phaseAngleDeg: number): MoonPhaseName {
  const a = normalizeDegrees(phaseAngleDeg);
  const octant = Math.round(a / 45) % 8;
  const names: MoonPhaseName[] = [
    'new',
    'waxing_crescent',
    'first_quarter',
    'waxing_gibbous',
    'full',
    'waning_gibbous',
    'last_quarter',
    'waning_crescent',
  ];
  return names[octant]!;
}

export interface MoonPhaseEvent {
  readonly time: AE.AstroTime;
  readonly phase: 'new' | 'first_quarter' | 'full' | 'last_quarter';
}

/** Следующее из 4 главных фаз после `startTime` (обёртка над `astronomy-engine`, см. шапку файла). */
export function nextMoonQuarter(startTime: AE.AstroTime): MoonPhaseEvent {
  const mq = AE.SearchMoonQuarter(startTime);
  const names: MoonPhaseEvent['phase'][] = ['new', 'first_quarter', 'full', 'last_quarter'];
  return { time: mq.time, phase: names[mq.quarter]! };
}
