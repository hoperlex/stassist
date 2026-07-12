/** Тривиальные системы домов: равнодомная, целознаковая, Порфирий. */
import { normalizeDegrees, signIndexOf } from '../util/angles.js';
import type { HouseComputationContext, HouseCusps } from './types.js';

export function equalHouses(ctx: HouseComputationContext): HouseCusps {
  const cusps = Array.from({ length: 12 }, (_, i) => normalizeDegrees(ctx.ascDeg + 30 * i));
  return { cusps };
}

export function wholeSignHouses(ctx: HouseComputationContext): HouseCusps {
  const start = signIndexOf(ctx.ascDeg) * 30;
  const cusps = Array.from({ length: 12 }, (_, i) => normalizeDegrees(start + 30 * i));
  return { cusps };
}

/**
 * Порфирий: куспиды 1,4,7,10 = Asc/IC/Dsc/MC; каждая из 4 четвертей делится на 3 равные части
 * (по эклиптической долготе, в направлении возрастания долготы/номера дома).
 */
export function porphyryHouses(ctx: HouseComputationContext): HouseCusps {
  const asc = ctx.ascDeg;
  const ic = normalizeDegrees(ctx.mcDeg + 180);
  const dsc = normalizeDegrees(asc + 180);
  const mc = ctx.mcDeg;

  const cusps = new Array<number>(12);
  cusps[0] = asc;
  cusps[3] = ic;
  cusps[6] = dsc;
  cusps[9] = mc;

  const fillQuadrant = (startDeg: number, endDeg: number, i1: number, i2: number): void => {
    const arc = normalizeDegrees(endDeg - startDeg) || 360;
    cusps[i1] = normalizeDegrees(startDeg + arc / 3);
    cusps[i2] = normalizeDegrees(startDeg + (2 * arc) / 3);
  };

  fillQuadrant(asc, ic, 1, 2);
  fillQuadrant(ic, dsc, 4, 5);
  fillQuadrant(dsc, mc, 7, 8);
  fillQuadrant(mc, asc, 10, 11);

  return { cusps };
}
