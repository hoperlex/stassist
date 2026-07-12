/**
 * Видимая геоцентрическая эклиптическая долгота/широта Солнца ЭПОХИ ДАТЫ, по рядам VSOP87D
 * (генерируются `tools/gen-vsop87.ts` → `vsop87-earth-data.generated.ts`).
 *
 * КРИТИЧНО (см. docs/roadmap/31-конвенции-реализации.md §7): это ЕДИНСТВЕННЫЙ источник долготы
 * Солнца во всём ядре — используется и для натальной карты, и как цель поиска момента соляра
 * (`rootfinding/returns.ts`). Единый движок исключает системное «промахивание» соляра, которое
 * возникло бы при разных источниках долготы Солнца для натала и для транзитного поиска.
 *
 * Алгоритм (Meeus, «Astronomical Algorithms», гл. 25 «Solar Coordinates», гл. 26 «эклиптика
 * даты»): геометрическая гелиоцентрическая (L,B,R) Земли по VSOP87D (ряды уже в равноденствии
 * даты — прецессия встроена) → геоцентрическое Солнце (долгота = L+180°, широта = -B) →
 * + нутация по долготе Δψ (тот же источник `astronomy-engine.e_tilt`, что и для планет —
 * согласованность нутации по всему ядру) → + аберрация (по Меёсу, −20.4898″/R).
 */
import * as AE from 'astronomy-engine';
import { normalizeDegrees, shortestDeltaDegrees } from '../util/angles.js';
import {
  VSOP87D_EARTH_L,
  VSOP87D_EARTH_B,
  VSOP87D_EARTH_R,
  type Vsop87Term,
} from './vsop87-earth-data.generated.js';

/** Аберрация по Меёсу (гл. 25): постоянный член, достаточная точность (~0.01″) для наших целей. */
const ABERRATION_CONSTANT_ARCSEC = 20.4898;

function evalVsop87Series(series: readonly (readonly Vsop87Term[])[], tau: number): number {
  let total = 0;
  for (let power = 0; power < series.length; power++) {
    const terms = series[power]!;
    let sum = 0;
    for (const term of terms) {
      sum += term.a * Math.cos(term.b + term.c * tau);
    }
    total += sum * tau ** power;
  }
  return total;
}

interface EarthHeliocentric {
  lRad: number;
  bRad: number;
  rAu: number;
}

/** τ — тысячи юлианских лет TT от J2000 (аргумент VSOP87). `time.tt` уже в днях от J2000 TT. */
function tauOf(time: AE.AstroTime): number {
  return time.tt / 365250;
}

function earthHeliocentricLBR(tau: number): EarthHeliocentric {
  return {
    lRad: evalVsop87Series(VSOP87D_EARTH_L, tau),
    bRad: evalVsop87Series(VSOP87D_EARTH_B, tau),
    rAu: evalVsop87Series(VSOP87D_EARTH_R, tau),
  };
}

/** Видимая геоцентрическая долгота Солнца (градусы, [0,360)) в момент `time`, без широты/скорости. */
export function sunApparentLongitudeDeg(time: AE.AstroTime): number {
  const { lRad, rAu } = earthHeliocentricLBR(tauOf(time));
  const geometricLonDeg = normalizeDegrees(lRad * AE.RAD2DEG + 180);
  const tilt = AE.e_tilt(time);
  const dPsiDeg = tilt.dpsi / 3600;
  const aberrationDeg = -ABERRATION_CONSTANT_ARCSEC / 3600 / rAu;
  return normalizeDegrees(geometricLonDeg + dPsiDeg + aberrationDeg);
}

export interface SunPosition {
  longitudeDeg: number;
  latitudeDeg: number;
  distanceAu: number;
  speedLongDegPerDay: number;
}

/** Полная видимая позиция Солнца (долгота/широта/расстояние/скорость) в момент `time`. */
export function sunApparentPosition(time: AE.AstroTime): SunPosition {
  const { bRad, rAu } = earthHeliocentricLBR(tauOf(time));
  const longitudeDeg = sunApparentLongitudeDeg(time);
  const latitudeDeg = -(bRad * AE.RAD2DEG);

  // Числовая производная (центральная разность) — достаточно гладкая функция, шаг ~29 минут.
  const dt = 0.02;
  const lon1 = sunApparentLongitudeDeg(time.AddDays(-dt));
  const lon2 = sunApparentLongitudeDeg(time.AddDays(dt));
  const speedLongDegPerDay = shortestDeltaDegrees(lon1, lon2) / (2 * dt);

  return { longitudeDeg, latitudeDeg, distanceAu: rAu, speedLongDegPerDay };
}
