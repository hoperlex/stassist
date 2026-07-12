/**
 * Строит окно последовательных дней `astro_calendar` из {@link computeAstroCalendarDay} и
 * добавляет `ingresses` — тела, сменившие знак Луны/планет относительно ПРЕДЫДУЩЕГО
 * предрасчитанного дня (упрощение MVP: сравнение полуденных «снимков», см. compute-day.ts).
 * ЧИСТАЯ функция — принимает список дат, ничего не знает о БД/сети.
 *
 * Живёт в `@stassist/astro-core` — см. doc-комментарий compute-day.ts про переиспользование
 * между worker (суточный cron) и api (ленивая генерация «при заходе», находка
 * [lunnyj-kalendar-empty]).
 */
import type { ReferenceLocation } from '@stassist/shared';
import { computeAstroCalendarDay, type AstroCalendarDayFacts } from './compute-day.js';

export interface AstroCalendarWindowDay extends AstroCalendarDayFacts {
  signIngresses: Array<{ body: string; signIndex: number }>;
}

/** Даты `YYYY-MM-DD` для окна `[startDate, startDate + days)`, UTC-календарные сутки. */
export function dateRangeIso(startDateIso: string, days: number): string[] {
  const [y, m, d] = startDateIso.split('-').map(Number) as [number, number, number];
  const start = Date.UTC(y, m - 1, d);
  return Array.from({ length: days }, (_unused, i) => {
    const dt = new Date(start + i * 86_400_000);
    return dt.toISOString().slice(0, 10);
  });
}

export function buildAstroCalendarWindow(
  startDateIso: string,
  days: number,
  referenceLocation?: ReferenceLocation,
): AstroCalendarWindowDay[] {
  const dates = dateRangeIso(startDateIso, days);
  const facts = dates.map((d) => computeAstroCalendarDay(d, referenceLocation));

  const result: AstroCalendarWindowDay[] = [];
  for (let i = 0; i < facts.length; i++) {
    const today = facts[i]!;
    const prev = i > 0 ? facts[i - 1] : undefined;
    const signIngresses: Array<{ body: string; signIndex: number }> = [];
    if (prev) {
      for (const [body, signIndex] of Object.entries(today.bodySignIndexes)) {
        if (prev.bodySignIndexes[body] !== signIndex) signIngresses.push({ body, signIndex });
      }
    }
    result.push({ ...today, signIngresses });
  }
  return result;
}
