/**
 * Мост `astro_calendar` (строка БД, см. packages/db/src/schema/astro-calendar.ts) → `DaySkyFact`
 * (@stassist/llm, вход для генератора гороскопов) — см. находку [полнота] «дублирование
 * astro_calendar и Ф5» в _work/build/findings/f5.md: небо дня берём ИЗ уже предрасчитанного
 * `astro_calendar` (тот же паттерн разбора jsonb, что apps/api/src/lunar-calendar/
 * map-row-to-day.ts — не может быть переиспользован буквально, apps/worker не зависит от
 * apps/api, см. прецедент apps/worker/src/llm/drizzle-chunk-repository.ts).
 *
 * `notableAspects` — ЕДИНСТВЕННОЕ, что Ф5 считает заново (не хранится в `astro_calendar`,
 * см. requirement 1 промта Ф5 «точные аспекты транзитных планет»). УПРОЩЕНИЕ MVP (см.
 * doc-комментарий apps/worker/src/astro-calendar/compute-day.ts про снимок вместо честного
 * посуточного сканирования — тот же принцип): берём аспекты снимком на референсный час опорной
 * локации, а НЕ момент точного схождения (root-finding по всем планетам был бы избыточен для
 * ежедневной генерации текста; сам факт «аспект в допуске сегодня» достаточен для гороскопа).
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
import type { astroCalendar } from '@stassist/db';
import type { NotableAspectFact } from '@stassist/llm';
import { CALENDAR_REFERENCE_LOCATION, REFERENCE_SNAPSHOT_HOUR } from '../astro-calendar/reference-location.js';

export type AstroCalendarRow = typeof astroCalendar.$inferSelect;

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

/** «Точные аспекты транзитных планет» дня (requirement 1 промта Ф5) — снимок на референсный час
 *  опорной локации (см. doc-комментарий файла), только МАЖОРНЫЕ аспекты в узком допуске
 *  (±3°) — иначе список был бы слишком длинным и малоинформативным для текста гороскопа. */
export function computeNotableAspectsToday(dateIso: string): NotableAspectFact[] {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateIso);
  if (!match) throw new Error(`computeNotableAspectsToday: dateIso "${dateIso}" не в формате YYYY-MM-DD`);
  const [, y, m, d] = match;
  const utc = localWallTimeToUtc(
    { year: Number(y), month: Number(m), day: Number(d), hour: REFERENCE_SNAPSHOT_HOUR, minute: 0, second: 0 },
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
