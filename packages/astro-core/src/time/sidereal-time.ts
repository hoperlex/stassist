/**
 * Звёздное время (GMST/GAST) и RAMC — используется для Asc/MC и куспидов домов.
 *
 * GMST — по стандартной формуле Меёса («Astronomical Algorithms», гл. 12, ур. 12.4).
 * GAST = GMST + уравнение равноденствий (Δψ·cos ε), где Δψ (нутация по долготе) и ε
 * (истинный наклон эклиптики) берутся из `astronomy-engine.e_tilt()` — той же функции,
 * что задаёт нутацию для всех остальных модулей ядра (планеты, Солнце VSOP87). Это
 * гарантирует согласованность одного и того же учёта нутации во всей карте.
 */
import * as AE from 'astronomy-engine';
import { J2000_JD } from './julian-day.js';
import { normalizeDegrees } from '../util/angles.js';

/** GMST (среднее звёздное время в Гринвиче), градусы, [0,360). */
export function gmstDegrees(jdUT: number, jdTT: number): number {
  const dUT = jdUT - J2000_JD;
  const T = (jdTT - J2000_JD) / 36525;
  const theta0 =
    280.46061837 +
    360.98564736629 * dUT +
    0.000387933 * T * T -
    (T * T * T) / 38710000;
  return normalizeDegrees(theta0);
}

/** GAST (истинное звёздное время в Гринвиче), градусы, [0,360). */
export function gastDegrees(astroTime: AE.AstroTime, jdUT: number, jdTT: number): number {
  const tilt = AE.e_tilt(astroTime);
  const dPsiDeg = tilt.dpsi / 3600; // угловые секунды → градусы
  const trueOblRad = (tilt.tobl * Math.PI) / 180;
  const equationOfEquinoxesDeg = dPsiDeg * Math.cos(trueOblRad);
  return normalizeDegrees(gmstDegrees(jdUT, jdTT) + equationOfEquinoxesDeg);
}

/** RAMC (прямое восхождение середины неба = локальное звёздное время в градусах). */
export function ramcDegrees(gastDeg: number, geoLonDeg: number): number {
  return normalizeDegrees(gastDeg + geoLonDeg);
}
