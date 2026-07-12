/**
 * Вторичные прогрессии («день за год»): JD рождения + возраст (в годах) × 1 сутки.
 * Единый источник Солнца (VSOP87) и позиций тел (astronomy-engine) — те же модули, что и в
 * натале, поэтому прогрессии автоматически согласованы с натальной картой.
 */
import * as AE from 'astronomy-engine';
import { sunApparentPosition } from '../ephemeris/sun-vsop87.js';
import { bodyGeocentricPosition, PLANET_BODIES, type PlanetBody } from '../ephemeris/planets.js';
import { J2000_JD } from '../time/julian-day.js';

/** Прогрессированный JD TT = натальный JD TT + возраст (годы) × 1 сутки. Чистая арифметика. */
export function secondaryProgressedJdTT(natalJdTT: number, ageYears: number): number {
  return natalJdTT + ageYears;
}

export interface ProgressedLongitudes {
  readonly progressedJdTT: number;
  readonly sunLongitudeDeg: number;
  readonly moonLongitudeDeg: number;
  readonly planetLongitudesDeg: Readonly<Record<PlanetBody, number>>;
}

/** Долготы тел на момент вторичной прогрессии (натальная дата + возраст суток). */
export function computeSecondaryProgressionLongitudes(
  natalJdTT: number,
  ageYears: number,
): ProgressedLongitudes {
  const progressedJdTT = secondaryProgressedJdTT(natalJdTT, ageYears);
  const time = AE.AstroTime.FromTerrestrialTime(progressedJdTT - J2000_JD);

  const planetLongitudesDeg = Object.fromEntries(
    PLANET_BODIES.map((p) => [p, bodyGeocentricPosition(p, time).longitudeDeg]),
  ) as Record<PlanetBody, number>;

  return {
    progressedJdTT,
    sunLongitudeDeg: sunApparentPosition(time).longitudeDeg,
    moonLongitudeDeg: bodyGeocentricPosition('moon', time).longitudeDeg,
    planetLongitudesDeg,
  };
}
