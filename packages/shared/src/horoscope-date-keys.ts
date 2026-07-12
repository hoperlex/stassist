/**
 * Форматы `horoscopes.date_key` по периодам (см. packages/db/src/schema/horoscopes.ts) — ЕДИНЫЙ
 * источник правды, используемый И worker'ом (cron-генерация, apps/worker/src/horoscope/jobs.ts),
 * И apps/api (ленивая генерация/чтение, apps/api/src/horoscope/lazy-generate.ts). Если бы каждое
 * приложение считало «текущую неделю/месяц» по-своему, URL программатики и сгенерированные строки
 * могли бы разойтись (cron написал `2026-W29`, а API лениво сгенерировал `2026-W30` для того же
 * календарного дня из-за расхождения в реализации) — вынесено сюда именно поэтому, в отличие от
 * остального кода Ф5, который сознательно дублируется между apps/api и apps/worker (см. §2
 * конвенций реализации о переиспользуемых портах/утилитах против дублирования, где ошибка
 * дублирования критична для корректности, а не только для DRY).
 *
 * Работает по календарным UTC-суткам (без часового пояса) — тот же принцип, что и остальной
 * astro_calendar-контур (см. packages/astro-core/src/lunar-calendar/build-window.ts
 * `dateRangeIso` — по той же причине вынесен в общий пакет, находка [lunnyj-kalendar-empty]:
 * worker (cron) и api (ленивая генерация) обязаны считать один и тот же день ОДИНАКОВО).
 */

export function toDateKeyDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * 86_400_000);
}

/** Понедельник недели, содержащей `date` (ISO: неделя начинается с понедельника). */
export function isoWeekStart(date: Date): Date {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const dayOfWeek = d.getUTCDay() === 0 ? 7 : d.getUTCDay(); // 1=Пн..7=Вс
  return addDays(d, 1 - dayOfWeek);
}

/** ISO-номер недели + год недели (может отличаться от календарного года на стыке декабря/января) —
 *  формат `YYYY-Www` (zero-padded), сортируется лексикографически по хронологии. */
export function toDateKeyWeek(date: Date): string {
  const monday = isoWeekStart(date);
  const thursday = addDays(monday, 3);
  const isoYear = thursday.getUTCFullYear();
  const jan4 = new Date(Date.UTC(isoYear, 0, 4));
  const jan4Monday = isoWeekStart(jan4);
  const weekNumber = Math.round((monday.getTime() - jan4Monday.getTime()) / (7 * 86_400_000)) + 1;
  return `${isoYear}-W${String(weekNumber).padStart(2, '0')}`;
}

export function toDateKeyMonth(date: Date): string {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
}

export function toDateKeyYear(date: Date): string {
  return String(date.getUTCFullYear());
}

/** Все календарные даты (UTC) от `from` (включительно) до `to` (включительно), формат YYYY-MM-DD. */
export function dateKeysInRange(from: Date, to: Date): string[] {
  const out: string[] = [];
  let cursor = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate()));
  const end = new Date(Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), to.getUTCDate()));
  while (cursor.getTime() <= end.getTime()) {
    out.push(toDateKeyDay(cursor));
    cursor = addDays(cursor, 1);
  }
  return out;
}

export function endOfMonth(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0));
}

export function startOfMonth(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
}

/** «Сейчас» по московскому времени (UTC+3, Россия не переводит часы) — используется ТОЛЬКО для
 *  решения «какой сегодня день/неделя/месяц/год», не для точных астрорасчётов (см. doc-комментарий
 *  apps/worker/src/horoscope/jobs.ts). */
export function mskNow(now: Date): Date {
  return new Date(now.getTime() + 3 * 3_600_000);
}
