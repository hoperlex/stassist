/**
 * Запись предрасчитанного окна `astro_calendar` в БД (idempotent upsert по `date`) — единственная
 * I/O-часть предрасчёта лунного календаря; сама арифметика (`buildAstroCalendarWindow`/
 * `computeAstroCalendarDay`, чистые функции) живёт в `@stassist/astro-core` (см. doc-комментарий
 * там про переиспользование между этим cron'ом и ленивой генерацией apps/api, находка
 * [lunnyj-kalendar-empty]). Integration-уровень (требует Postgres) — не покрывается unit-тестами
 * (см. §1 конвенций реализации), проверяется вручную/через test:integration с DATABASE_URL.
 */
import { astroCalendar, type Db } from '@stassist/db';
import type { AstroCalendarWindowDay } from '@stassist/astro-core';

export async function upsertAstroCalendarWindow(db: Db, days: readonly AstroCalendarWindowDay[]): Promise<void> {
  for (const day of days) {
    const moonSignIntervals = [{ signIndex: day.moonSignIndex }];
    const lunarDays = [{ lunarDay: day.lunarDay }];
    const voids = day.isVoidOfCourse ? [{ fromIso: day.voidFromIso, toIso: day.voidToIso }] : [];
    const phases = { phaseName: day.phaseName, phaseAngleDeg: day.phaseAngleDeg };

    await db
      .insert(astroCalendar)
      .values({
        date: day.date,
        moonSignIntervals,
        lunarDays,
        voids,
        phases,
        retrogrades: day.retrogradeBodies,
        ingresses: day.signIngresses,
        computed: true,
      })
      .onConflictDoUpdate({
        target: astroCalendar.date,
        set: {
          moonSignIntervals,
          lunarDays,
          voids,
          phases,
          retrogrades: day.retrogradeBodies,
          ingresses: day.signIngresses,
          computed: true,
          updatedAt: new Date(),
        },
      });
  }
}
