/**
 * Мост `astro_calendar` → `DaySkyFact` (@stassist/llm) для apps/api (ленивая генерация, см.
 * lazy-generate.ts) — зеркало apps/worker/src/horoscope/astro-day-facts.ts (тот же прецедент
 * дублирования между приложениями, что apps/worker/src/llm/drizzle-chunk-repository.ts vs
 * apps/api/src/repositories/interpretation-chunks-repository.ts: apps/api НЕ зависит от
 * apps/worker).
 */
import {
  bodyGeocentricPosition,
  detectAspects,
  localWallTimeToUtc,
  PLANET_BODIES,
  resolveTime,
  sunApparentPosition,
  type AspectableBody,
} from '@stassist/astro-core';
import { CALENDAR_REFERENCE_LOCATION, CALENDAR_REFERENCE_SNAPSHOT_HOUR } from '@stassist/shared';
import type { NotableAspectFact } from '@stassist/llm';
import type { AstroCalendarRow } from '../repositories/astro-calendar-repository.js';

export interface DaySkyFact {
  date: string;
  moonSignIndex: number;
  lunarDay: number;
  phaseName: string;
  isVoidOfCourse: boolean;
  retrogradeBodies: string[];
  signIngresses: Array<{ body: string; toSignIndex: number }>;
}

export function mapAstroCalendarRowToDaySkyFact(row: AstroCalendarRow): DaySkyFact {
  const moonSignIntervals = row.moonSignIntervals as Array<{ signIndex: number }>;
  const lunarDays = row.lunarDays as Array<{ lunarDay: number }>;
  const voids = row.voids as Array<{ fromIso: string | null; toIso: string | null }>;
  const phases = row.phases as { phaseName: string };
  const retrogrades = row.retrogrades as string[];
  const ingresses = row.ingresses as Array<{ body: string; signIndex: number }>;

  return {
    date: row.date,
    moonSignIndex: moonSignIntervals[0]?.signIndex ?? 0,
    lunarDay: lunarDays[0]?.lunarDay ?? 1,
    phaseName: phases.phaseName,
    isVoidOfCourse: voids.length > 0,
    retrogradeBodies: retrogrades,
    signIngresses: ingresses.map((i) => ({ body: i.body, toSignIndex: i.signIndex })),
  };
}

const NOTABLE_ASPECT_ORB_DEG = 3;

/** См. doc-комментарий apps/worker/src/horoscope/astro-day-facts.ts — тот же снимок на
 *  референсный час опорной локации, майорные аспекты в узком допуске. */
export function computeNotableAspectsToday(dateIso: string): NotableAspectFact[] {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateIso);
  if (!match) throw new Error(`computeNotableAspectsToday: dateIso "${dateIso}" не в формате YYYY-MM-DD`);
  const [, y, m, d] = match;
  const utc = localWallTimeToUtc(
    { year: Number(y), month: Number(m), day: Number(d), hour: CALENDAR_REFERENCE_SNAPSHOT_HOUR, minute: 0, second: 0 },
    CALENDAR_REFERENCE_LOCATION.tzId,
  );
  const { astroTime } = resolveTime(utc);

  const sun = sunApparentPosition(astroTime);
  const moon = bodyGeocentricPosition('moon', astroTime);
  const bodies: AspectableBody[] = [
    { key: 'sun', longitudeDeg: sun.longitudeDeg, speedLongDegPerDay: sun.speedLongDegPerDay },
    { key: 'moon', longitudeDeg: moon.longitudeDeg, speedLongDegPerDay: moon.speedLongDegPerDay },
    ...PLANET_BODIES.map((body) => {
      const p = bodyGeocentricPosition(body, astroTime);
      return { key: body, longitudeDeg: p.longitudeDeg, speedLongDegPerDay: p.speedLongDegPerDay };
    }),
  ];

  const aspects = detectAspects(bodies, { aspectSet: 'major' });
  return aspects
    .filter((a) => a.orbDeg <= NOTABLE_ASPECT_ORB_DEG)
    .map((a) => ({ bodyA: a.bodyA, bodyB: a.bodyB, angle: a.angleName, orbDeg: a.orbDeg }));
}
