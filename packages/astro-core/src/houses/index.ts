/**
 * Единая точка входа систем домов: считает RAMC/наклон/Asc/MC и диспетчеризует на конкретную
 * систему. Широта >66.5° для Плацидуса/Коха (или NaN восходящая разность при меньшей широте,
 * но экстремальном склонении точки) → автофоллбэк на Порфирия + флаг `fallbackApplied`.
 */
import * as AE from 'astronomy-engine';
import type { HouseSystem } from '@stassist/shared';
import { gastDegrees, ramcDegrees } from '../time/sidereal-time.js';
import { ascLongitudeDeg, mcLongitudeDeg } from './ascendant-mc.js';
import { equalHouses, porphyryHouses, wholeSignHouses } from './simple-systems.js';
import { placidusHouses } from './placidus.js';
import { kochHouses } from './koch.js';
import { regiomontanusHouses } from './regiomontanus.js';
import { normalizeDegrees } from '../util/angles.js';
import type { HouseComputationContext, HouseCusps } from './types.js';

export const POLAR_LATITUDE_LIMIT_DEG = 66.5;

export interface ComputeHousesInput {
  readonly time: AE.AstroTime;
  readonly jdUT: number;
  readonly jdTT: number;
  readonly latDeg: number;
  readonly lonDeg: number;
  readonly system: HouseSystem;
}

export interface ComputeHousesResult {
  readonly cusps: readonly number[];
  readonly ascDeg: number;
  readonly mcDeg: number;
  readonly dscDeg: number;
  readonly icDeg: number;
  readonly armcDeg: number;
  readonly obliquityDeg: number;
  readonly usedSystem: HouseSystem;
  readonly fallbackApplied: boolean;
}

export function computeHouses(input: ComputeHousesInput): ComputeHousesResult {
  const { time, jdUT, jdTT, latDeg, lonDeg, system } = input;

  const gast = gastDegrees(time, jdUT, jdTT);
  const ramc = ramcDegrees(gast, lonDeg);
  const eps = AE.e_tilt(time).tobl;

  const asc = ascLongitudeDeg(ramc, eps, latDeg);
  const mc = mcLongitudeDeg(ramc, eps);
  const dsc = normalizeDegrees(asc + 180);
  const ic = normalizeDegrees(mc + 180);

  const ctx: HouseComputationContext = { ramcDeg: ramc, obliquityDeg: eps, latDeg, ascDeg: asc, mcDeg: mc };

  let usedSystem: HouseSystem = system;
  let fallbackApplied = false;
  let cusps: HouseCusps | null = null;

  const polar = Math.abs(latDeg) > POLAR_LATITUDE_LIMIT_DEG;

  if (system === 'placidus' && !polar) cusps = placidusHouses(ctx);
  else if (system === 'koch' && !polar) cusps = kochHouses(ctx);
  else if (system === 'regiomontanus') cusps = regiomontanusHouses(time, new AE.Observer(latDeg, lonDeg, 0), ramc);
  else if (system === 'porphyry') cusps = porphyryHouses(ctx);
  else if (system === 'equal') cusps = equalHouses(ctx);
  else if (system === 'whole_sign') cusps = wholeSignHouses(ctx);

  if (cusps === null) {
    // Плацидус/Кох за полярным кругом либо численно вырожденные (NaN AD) — фоллбэк на Порфирия.
    usedSystem = 'porphyry';
    fallbackApplied = true;
    cusps = porphyryHouses(ctx);
  }

  return {
    cusps: cusps.cusps,
    ascDeg: asc,
    mcDeg: mc,
    dscDeg: dsc,
    icDeg: ic,
    armcDeg: ramc,
    obliquityDeg: eps,
    usedSystem,
    fallbackApplied,
  };
}
