/**
 * Предрасчёт одного дня `astro_calendar` — ЧИСТАЯ функция (без I/O): дата + опорная локация →
 * набор лунных фактов на этот день (см. docs/roadmap/prompts/f3-калькуляторы-и-карта.md
 * требование 3, packages/db/src/schema/astro-calendar.ts).
 *
 * Живёт в `@stassist/astro-core` (а не в apps/worker, где раньше был единственный вызывающий),
 * т.к. `apps/api` тоже стал вызывающим — ленивая генерация `astro_calendar` «при заходе» (см.
 * apps/api/src/lunar-calendar/lazy-generate.ts, находка [lunnyj-kalendar-empty]) переиспользует
 * ТУ ЖЕ детерминированную арифметику, что и суточный cron worker'а (apps/worker/src/astro-
 * calendar/upsert-window.ts) — иначе два процесса считали бы «один и тот же» день по-разному.
 *
 * УПРОЩЕНИЕ MVP (задокументировано, не скрыто — корневой CLAUDE.md «против галлюцинаций»):
 * вместо честного посуточного сканирования интервалов знака/void считается ОДИН «снимок» на
 * {@link REFERENCE_SNAPSHOT_HOUR} по местному времени опорной локации. Для подавляющего
 * большинства дней Луна не меняет знак/лунный день несколько раз, поэтому снимок полудня
 * репрезентативен; редкие дни с двумя сменами знака за сутки будут отражать только состояние на
 * полдень — это фиксируется в README пакета и в отчёте фазы, а не выдаётся за точный расчёт.
 */
import * as AE from 'astronomy-engine';
import { CALENDAR_REFERENCE_LOCATION, CALENDAR_REFERENCE_SNAPSHOT_HOUR as REFERENCE_SNAPSHOT_HOUR, type MoonPhaseNameDto, type ReferenceLocation } from '@stassist/shared';
import { localWallTimeToUtc } from '../time/timezone.js';
import { resolveTime } from '../time/julian-day.js';
import { sunApparentPosition } from '../ephemeris/sun-vsop87.js';
import { bodyGeocentricPosition, PLANET_BODIES } from '../ephemeris/planets.js';
import { signIndexOf } from '../util/angles.js';
import { findMoonVoidOfCourse } from '../rootfinding/void-of-course.js';
import { ttToAstroTime } from '../rootfinding/longitude-search.js';
import { moonPhaseAngleDeg, moonPhaseName } from './phases.js';
import { findLunarDay } from './lunar-days.js';

export interface AstroCalendarDayFacts {
  date: string;
  moonSignIndex: number;
  lunarDay: number;
  phaseName: MoonPhaseNameDto;
  phaseAngleDeg: number;
  isVoidOfCourse: boolean;
  voidFromIso: string | null;
  voidToIso: string | null;
  retrogradeBodies: string[];
  /** Знак каждого тела (луна + 8 планет) на референсный момент — вход для диффа ингрессов
   *  между соседними днями (см. build-window.ts). */
  bodySignIndexes: Record<string, number>;
}

function parseDateParts(dateIso: string): { year: number; month: number; day: number } {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateIso);
  if (!match) throw new Error(`dateIso "${dateIso}" не в формате YYYY-MM-DD`);
  return { year: Number(match[1]), month: Number(match[2]), day: Number(match[3]) };
}

export function computeAstroCalendarDay(
  dateIso: string,
  referenceLocation: ReferenceLocation = CALENDAR_REFERENCE_LOCATION,
): AstroCalendarDayFacts {
  const { year, month, day } = parseDateParts(dateIso);
  const utc = localWallTimeToUtc(
    { year, month, day, hour: REFERENCE_SNAPSHOT_HOUR, minute: 0, second: 0 },
    referenceLocation.tzId,
  );
  const { astroTime } = resolveTime(utc);

  const moon = bodyGeocentricPosition('moon', astroTime);
  const moonSignIndex = signIndexOf(moon.longitudeDeg);

  const phaseAngleDeg = moonPhaseAngleDeg(astroTime);
  const phaseName = moonPhaseName(phaseAngleDeg) as MoonPhaseNameDto;

  const observer = new AE.Observer(referenceLocation.lat, referenceLocation.lon, 0);
  const lunarDay = findLunarDay(observer, astroTime).dayNumber;

  const retrogradeBodies: string[] = [];
  const bodySignIndexes: Record<string, number> = { moon: moonSignIndex };
  for (const body of PLANET_BODIES) {
    const p = bodyGeocentricPosition(body, astroTime);
    bodySignIndexes[body] = signIndexOf(p.longitudeDeg);
    if (p.speedLongDegPerDay < 0) retrogradeBodies.push(body);
  }

  // Void-of-course: смотрим, попадает ли референсный момент в текущий период void (последний
  // точный аспект Луны в знаке → ингресс в следующий знак, см. astro-core rootfinding/void-of-course.ts).
  const moonLongitudeFn = (ttDays: number): number => bodyGeocentricPosition('moon', ttToAstroTime(ttDays)).longitudeDeg;
  const otherBodies = new Map<string, (ttDays: number) => number>();
  otherBodies.set('sun', (ttDays: number) => sunApparentPosition(ttToAstroTime(ttDays)).longitudeDeg);
  for (const body of PLANET_BODIES) {
    otherBodies.set(body, (ttDays: number) => bodyGeocentricPosition(body, ttToAstroTime(ttDays)).longitudeDeg);
  }
  const referenceTT = astroTime.tt;

  let isVoidOfCourse = false;
  let voidFromIso: string | null = null;
  let voidToIso: string | null = null;
  const voc = findMoonVoidOfCourse(moonLongitudeFn, otherBodies, referenceTT);
  if (voc && referenceTT >= voc.voidStartTT && referenceTT <= voc.ingressTT) {
    isVoidOfCourse = true;
    voidFromIso = ttToAstroTime(voc.voidStartTT).date.toISOString();
    voidToIso = ttToAstroTime(voc.ingressTT).date.toISOString();
  }

  return {
    date: dateIso,
    moonSignIndex,
    lunarDay,
    phaseName,
    phaseAngleDeg,
    isVoidOfCourse,
    voidFromIso,
    voidToIso,
    retrogradeBodies,
    bodySignIndexes,
  };
}
