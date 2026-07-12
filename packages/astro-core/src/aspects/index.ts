/** Аспектный движок: геометрия + аппликация/сепарация по знаку относительной скорости. */
import type { Aspect, AspectAngleName, AspectSet, OrbsConfig } from '@stassist/shared';
import { angularSeparationDegrees, shortestDeltaDegrees } from '../util/angles.js';
import { ASPECT_ANGLE_DEG, DEFAULT_ORB_BY_ASPECT, DEFAULT_ORB_BY_BODY, MAJOR_ASPECTS, MINOR_ASPECTS } from './presets.js';

export interface AspectableBody {
  readonly key: string;
  readonly longitudeDeg: number;
  readonly speedLongDegPerDay: number;
}

function resolveOrb(angleName: AspectAngleName, bodyA: string, bodyB: string, orbs: OrbsConfig | undefined): number {
  const base = orbs?.byAspect?.[angleName] ?? DEFAULT_ORB_BY_ASPECT[angleName];
  const byBodyA = orbs?.byBody?.[bodyA] ?? DEFAULT_ORB_BY_BODY[bodyA];
  const byBodyB = orbs?.byBody?.[bodyB] ?? DEFAULT_ORB_BY_BODY[bodyB];
  const candidates = [base, byBodyA, byBodyB].filter((v): v is number => typeof v === 'number');
  return Math.min(...candidates);
}

/** applying=true, если |текущая дуга − точный угол| убывает во времени (аспект «собирается»). */
function isApplying(signedSepDeg: number, aspectAngleDeg: number, speedA: number, speedB: number): boolean {
  const absSep = Math.abs(signedSepDeg);
  const diffFromExact = absSep - aspectAngleDeg;
  if (diffFromExact === 0) return false;
  const sepSign = signedSepDeg === 0 ? 1 : Math.sign(signedSepDeg);
  const derivSep = speedB - speedA;
  const derivDiff = sepSign * derivSep;
  return diffFromExact * derivDiff < 0;
}

export interface DetectAspectsConfig {
  readonly aspectSet: AspectSet;
  readonly orbs?: OrbsConfig;
}

/** Ищет аспекты среди всех пар тел из `bodies` (порядок пар не важен, каждая пара — один раз). */
export function detectAspects(bodies: readonly AspectableBody[], config: DetectAspectsConfig): Aspect[] {
  const angleNames: readonly AspectAngleName[] =
    config.aspectSet === 'major' ? MAJOR_ASPECTS : [...MAJOR_ASPECTS, ...MINOR_ASPECTS];

  const result: Aspect[] = [];

  for (let i = 0; i < bodies.length; i++) {
    for (let j = i + 1; j < bodies.length; j++) {
      const a = bodies[i]!;
      const b = bodies[j]!;
      const signedSep = shortestDeltaDegrees(a.longitudeDeg, b.longitudeDeg);
      const absSep = angularSeparationDegrees(a.longitudeDeg, b.longitudeDeg);

      let best: { angleName: AspectAngleName; orbDeg: number; orbAllowedDeg: number } | null = null;
      for (const angleName of angleNames) {
        const exact = ASPECT_ANGLE_DEG[angleName];
        const orbDeg = Math.abs(absSep - exact);
        const orbAllowedDeg = resolveOrb(angleName, a.key, b.key, config.orbs);
        if (orbDeg <= orbAllowedDeg && (best === null || orbDeg < best.orbDeg)) {
          best = { angleName, orbDeg, orbAllowedDeg };
        }
      }

      if (best) {
        result.push({
          bodyA: a.key,
          bodyB: b.key,
          angleName: best.angleName,
          exactAngleDeg: ASPECT_ANGLE_DEG[best.angleName],
          actualDeltaDeg: absSep,
          orbDeg: best.orbDeg,
          orbAllowedDeg: best.orbAllowedDeg,
          applying: isApplying(signedSep, ASPECT_ANGLE_DEG[best.angleName], a.speedLongDegPerDay, b.speedLongDegPerDay),
        });
      }
    }
  }

  return result;
}
