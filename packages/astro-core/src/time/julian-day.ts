/**
 * Юлианский день (JD UT / JD TT) и ΔT.
 *
 * Единый источник времени для всего ядра — `astronomy-engine`'s `AstroTime`: она уже
 * реализует перевод календарной даты в JD и ΔT по полиномам Espenak–Meeus (см.
 * `DeltaT_EspenakMeeus` — используется в AE по умолчанию, см. ACCURACY.md). Мы **обязаны**
 * переиспользовать именно её, а не считать JD/ΔT второй независимой формулой — иначе
 * возникнет рассинхронизация времени между позициями планет (astronomy-engine) и Солнцем
 * (наш модуль VSOP87), что и есть системный риск, зафиксированный в находках верификации Ф1.
 */
import * as AE from 'astronomy-engine';

export const J2000_JD = 2451545.0;

export interface ResolvedTime {
  /** Юлианский день во всемирном времени (UT ≈ UTC в приближении astronomy-engine). */
  readonly jdUT: number;
  /** Юлианский день в земном времени (TT = UT + ΔT). */
  readonly jdTT: number;
  readonly deltaTSeconds: number;
  /** Исходный объект astronomy-engine — переиспользуется всеми модулями позиций/домов. */
  readonly astroTime: AE.AstroTime;
}

/** Строит единое время расчёта из момента UTC — переиспользуй результат во всём расчёте карты. */
export function resolveTime(utcDate: Date): ResolvedTime {
  const astroTime = AE.MakeTime(utcDate);
  const jdUT = astroTime.ut + J2000_JD;
  const jdTT = astroTime.tt + J2000_JD;
  return {
    jdUT,
    jdTT,
    deltaTSeconds: (astroTime.tt - astroTime.ut) * 86400,
    astroTime,
  };
}

/** Юлианские тысячелетия TT от J2000 — аргумент VSOP87 (τ = T/10, T = столетия). */
export function tjyFromJdTT(jdTT: number): number {
  return (jdTT - J2000_JD) / 365250;
}

/** Юлианские столетия TT от J2000 — аргумент формул Меёса (прецессия, GMST и т.п.). */
export function centuriesTTFromJdTT(jdTT: number): number {
  return (jdTT - J2000_JD) / 36525;
}
