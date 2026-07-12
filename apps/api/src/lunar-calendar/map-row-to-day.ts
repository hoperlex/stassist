/**
 * Строка `astro_calendar` (jsonb-поля, см. packages/db/src/schema/astro-calendar.ts) →
 * `LunarCalendarDay` (packages/shared/src/schemas/calc.ts) — ЧИСТАЯ функция, юнит-тестируется
 * без БД на фикстурах формы, которую пишет worker (apps/worker/src/astro-calendar/upsert-window.ts).
 */
import type { LunarCalendarDay } from '@stassist/shared';
import type { AstroCalendarRow } from '../repositories/astro-calendar-repository.js';

export function mapAstroCalendarRowToDay(row: AstroCalendarRow): LunarCalendarDay {
  const moonSignIntervals = row.moonSignIntervals as Array<{ signIndex: number }>;
  const lunarDays = row.lunarDays as Array<{ lunarDay: number }>;
  const voids = row.voids as Array<{ fromIso: string | null; toIso: string | null }>;
  const phases = row.phases as { phaseName: LunarCalendarDay['phaseName']; phaseAngleDeg: number };
  const retrogrades = row.retrogrades as string[];
  const ingresses = row.ingresses as Array<{ body: string; signIndex: number }>;

  const firstVoid = voids[0];
  return {
    date: row.date,
    moonSignIndex: moonSignIntervals[0]?.signIndex ?? 0,
    lunarDay: lunarDays[0]?.lunarDay ?? 1,
    phaseName: phases.phaseName,
    phaseAngleDeg: phases.phaseAngleDeg,
    isVoidOfCourse: voids.length > 0,
    voidFromIso: firstVoid?.fromIso ?? null,
    voidToIso: firstVoid?.toIso ?? null,
    retrogradeBodies: retrogrades,
    signIngresses: ingresses,
  };
}
