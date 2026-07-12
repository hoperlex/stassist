/**
 * Asc/MC — переход «прямое восхождение (β=0 на эклиптике) ↔ эклиптическая долгота» и
 * горизонтная формула Асцендента (Меёс-стиль). Обе формулы ПРОВЕРЕНЫ численно против
 * независимого построения через матрицы поворота `astronomy-engine`
 * (эклиптика-даты → экватор-даты → горизонт, БЕЗ рефракции) — расхождение <1e-4°, см.
 * `houses.test.ts`. Рефракция намеренно отключена: астрологический Асцендент — геометрическое,
 * а не наблюдаемое (атмосферное) пересечение горизонта.
 */
import { normalizeDegrees } from '../util/angles.js';

const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;

/** RA (градусы) точки эклиптики (λ, β=0) при наклоне эклиптики ε (градусы). */
export function raOfEclipticPoint(lambdaDeg: number, epsDeg: number): number {
  const lam = lambdaDeg * DEG2RAD;
  const eps = epsDeg * DEG2RAD;
  return normalizeDegrees(Math.atan2(Math.sin(lam) * Math.cos(eps), Math.cos(lam)) * RAD2DEG);
}

/** Эклиптическая долгота (β=0) точки экватора с данным RA при наклоне ε. Обратна к raOfEclipticPoint. */
export function eclipticLongitudeOfRa(raDeg: number, epsDeg: number): number {
  const ra = raDeg * DEG2RAD;
  const eps = epsDeg * DEG2RAD;
  return normalizeDegrees(Math.atan2(Math.sin(ra), Math.cos(ra) * Math.cos(eps)) * RAD2DEG);
}

/** Склонение точки эклиптики (λ, β=0) при наклоне ε. */
export function declinationOfEclipticPoint(lambdaDeg: number, epsDeg: number): number {
  const lam = lambdaDeg * DEG2RAD;
  const eps = epsDeg * DEG2RAD;
  return Math.asin(Math.sin(eps) * Math.sin(lam)) * RAD2DEG;
}

export function mcLongitudeDeg(ramcDeg: number, epsDeg: number): number {
  return eclipticLongitudeOfRa(ramcDeg, epsDeg);
}

/** Асцендент (Меёс-эквивалентная формула, см. обоснование в шапке файла). */
export function ascLongitudeDeg(ramcDeg: number, epsDeg: number, latDeg: number): number {
  const ramc = ramcDeg * DEG2RAD;
  const eps = epsDeg * DEG2RAD;
  const phi = latDeg * DEG2RAD;
  const y = Math.cos(ramc);
  const x = -(Math.sin(ramc) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps));
  return normalizeDegrees(Math.atan2(y, x) * RAD2DEG);
}

/**
 * Восходящая разность (ascensional difference) для склонения δ на широте φ, градусы.
 * AD = arcsin(tan φ · tan δ). NaN, если |tan φ · tan δ| > 1 (точка не восходит/не заходит —
 * циркумполярный случай; вызывающий код обязан отловить NaN и упасть на Порфирия).
 */
export function ascensionalDifferenceDeg(latDeg: number, decDeg: number): number {
  const phi = latDeg * DEG2RAD;
  const dec = decDeg * DEG2RAD;
  const s = Math.tan(phi) * Math.tan(dec);
  if (Math.abs(s) > 1) return NaN;
  return Math.asin(s) * RAD2DEG;
}
