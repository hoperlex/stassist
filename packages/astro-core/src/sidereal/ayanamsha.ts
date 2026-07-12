/**
 * Айанамши — расчётные функции «про запас» (см. промт Ф1, п.7): в MVP наружу (в продукт) НЕ
 * выводятся, джйотиш-раздел портала выйдет в 1.x. Модель: значение на эпоху J2000 + линейное
 * накопление общей прецессии (≈50.29″/год) от J2000. Это СТАНДАРТНЫЙ приближённый метод (точные
 * официальные таблицы айанамши — нелинейные и версионируются самими школами), но конкретные
 * J2000-константы ниже взяты из широко цитируемых (не первично проверенных нами) значений —
 * см. `packages/astro-core/ACCURACY.md`: раздел «Айанамши — требует сверки». Не блокирует ворота
 * Ф1 (модуль не выведен в продукт), но ПОМЕЧЕН как требующий сверки перед публикацией джйотиш-UI.
 */
import type { Ayanamsha } from '@stassist/shared';
import { normalizeDegrees } from '../util/angles.js';
import { centuriesTTFromJdTT } from '../time/julian-day.js';

/** Общая прецессия по долготе, угл. сек/год (стандартная константа IAU, высокая уверенность). */
const GENERAL_PRECESSION_ARCSEC_PER_YEAR = 50.290966;

/** Значения на эпоху J2000 (градусы) — см. предупреждение в шапке файла. */
const AYANAMSHA_AT_J2000_DEG: Record<Ayanamsha, number> = {
  lahiri: 23.85675,
  raman: 22.3625,
  kp: 23.8531,
  fagan_bradley: 24.7375,
  yukteswar: 22.6425,
};

export function ayanamshaDeg(system: Ayanamsha, jdTT: number): number {
  const yearsFromJ2000 = centuriesTTFromJdTT(jdTT) * 100;
  const accumulatedDeg = (GENERAL_PRECESSION_ARCSEC_PER_YEAR * yearsFromJ2000) / 3600;
  return normalizeDegrees(AYANAMSHA_AT_J2000_DEG[system] + accumulatedDeg);
}

/** Тропическая долгота → сидерическая (вычитание айанамши). */
export function toSiderealDeg(tropicalLongitudeDeg: number, ayanamshaValueDeg: number): number {
  return normalizeDegrees(tropicalLongitudeDeg - ayanamshaValueDeg);
}
