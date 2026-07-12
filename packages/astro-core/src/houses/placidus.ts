/**
 * Плацидус — итеративное деление полудуг (эталон Меёс), см. также
 * docs/research/02-алгоритмы-и-библиотеки.md и «Placidus House Calculation for Developers»
 * (roxyapi.com, источник в исследовании).
 *
 * Вывод (сделан заново от первых принципов, а не по памяти — во избежание ошибки в знаках):
 * для точки эклиптики λ с собственным склонением δ(λ) и восходящей разностью
 * AD(λ)=arcsin(tan φ·tan δ(λ)) её текущий часовой угол H=RAMC−RA(λ). В момент верхней
 * кульминации (МС) H=0, восхода — H=−(90+AD), нижней кульминации (IC) H=180 (=−180).
 * Куспид 11 определён как точка, чей ТЕКУЩИЙ часовой угол составляет 1/3 пути от 0 (MC) до
 * её же точки восхода, куспид 12 — 2/3 пути; симметрично для куспидов 3 и 2 от IC к точке
 * восхода. Отсюда:
 *   RA(λ11) = RAMC + 30 + AD(λ11)/3
 *   RA(λ12) = RAMC + 60 + 2·AD(λ12)/3
 *   RA(λ2)  = RAMC + 120 + 2·AD(λ2)/3
 *   RA(λ3)  = RAMC + 150 + AD(λ3)/3
 * Уравнения неявные (AD зависит от λ через её склонение) → решаются итерацией простой
 * подстановки (старт — приближение Порфирия), с проверкой: куспиды 1,4,7,10 = Asc/IC/Dsc/MC
 * (уже точны), куспиды 5,6,8,9 = куспиды 11,12,2,3 + 180° (для ЛЮБОЙ квадрантной системы домов
 * противоположные дома лежат на противоположных долготах — инвариант, проверяется property-тестом).
 */
import {
  ascensionalDifferenceDeg,
  declinationOfEclipticPoint,
  eclipticLongitudeOfRa,
} from './ascendant-mc.js';
import { normalizeDegrees } from '../util/angles.js';
import { porphyryHouses } from './simple-systems.js';
import type { HouseComputationContext, HouseCusps } from './types.js';

const MAX_ITER = 30;
const TOLERANCE_DEG = 1e-7;

/** Решает λ по неявному уравнению RA(λ) = ramcOffset + fraction·AD(λ, latDeg). NaN при циркумполярности. */
function solvePlacidusCusp(
  startLambda: number,
  ramcOffsetDeg: number,
  fraction: number,
  epsDeg: number,
  latDeg: number,
): number {
  let lambda = startLambda;
  for (let i = 0; i < MAX_ITER; i++) {
    const dec = declinationOfEclipticPoint(lambda, epsDeg);
    const ad = ascensionalDifferenceDeg(latDeg, dec);
    if (Number.isNaN(ad)) return NaN;
    const raTarget = normalizeDegrees(ramcOffsetDeg + fraction * ad);
    const nextLambda = eclipticLongitudeOfRa(raTarget, epsDeg);
    const delta = Math.abs(normalizeDegrees(nextLambda - lambda + 180) - 180);
    lambda = nextLambda;
    if (delta < TOLERANCE_DEG) break;
  }
  return lambda;
}

/** Возвращает `null`, если на этой широте Плацидус вырождается (циркумполярная зона) — вызывающий код обязан упасть на Порфирия. */
export function placidusHouses(ctx: HouseComputationContext): HouseCusps | null {
  const { ramcDeg: ramc, obliquityDeg: eps, latDeg: lat, ascDeg: asc, mcDeg: mc } = ctx;
  const porphyry = porphyryHouses(ctx).cusps;

  const l11 = solvePlacidusCusp(porphyry[1]!, ramc + 30, 1 / 3, eps, lat);
  const l12 = solvePlacidusCusp(porphyry[2]!, ramc + 60, 2 / 3, eps, lat);
  const l2 = solvePlacidusCusp(porphyry[4]!, ramc + 120, 2 / 3, eps, lat);
  const l3 = solvePlacidusCusp(porphyry[5]!, ramc + 150, 1 / 3, eps, lat);

  if ([l11, l12, l2, l3].some((v) => Number.isNaN(v))) return null;

  // Пары противоположных домов (инвариант для ЛЮБОЙ квадрантной системы): (1,7)(2,8)(3,9)(4,10)(5,11)(6,12).
  const cusps = new Array<number>(12);
  cusps[0] = asc; // дом 1
  cusps[1] = normalizeDegrees(l2); // дом 2
  cusps[2] = normalizeDegrees(l3); // дом 3
  cusps[3] = normalizeDegrees(mc + 180); // дом 4 = IC
  cusps[4] = normalizeDegrees(l11 + 180); // дом 5 = дом 11 + 180
  cusps[5] = normalizeDegrees(l12 + 180); // дом 6 = дом 12 + 180
  cusps[6] = normalizeDegrees(asc + 180); // дом 7 = Dsc
  cusps[7] = normalizeDegrees(l2 + 180); // дом 8 = дом 2 + 180
  cusps[8] = normalizeDegrees(l3 + 180); // дом 9 = дом 3 + 180
  cusps[9] = normalizeDegrees(mc); // дом 10 = MC
  cusps[10] = normalizeDegrees(l11); // дом 11
  cusps[11] = normalizeDegrees(l12); // дом 12

  return { cusps };
}
