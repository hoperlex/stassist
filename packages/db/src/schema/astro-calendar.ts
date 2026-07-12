/**
 * astro_calendar — предрасчёт лунного календаря на скользящее окно 18 месяцев вперёд (см.
 * docs/architecture/22-модель-данных.md §5, docs/roadmap/prompts/f3-калькуляторы-и-карта.md
 * требование 3). Заполняется worker'ом (apps/worker/src/astro-calendar) ежесуточно.
 *
 * Лунные дни/void геозависимы (считаются по восходам Луны для конкретной точки) — таблица
 * ключуется ТОЛЬКО по дате (без локации), поэтому используется единая ОПОРНАЯ локация для
 * публичного календаря (Москва, см. apps/worker/src/astro-calendar/reference-location.ts) —
 * это явно показано пользователю в UI («по московскому времени/долготе», см. findings f3.md
 * [internal-completeness] «не задана опорная локация»). Персональная гео-локация лунных дней —
 * фича кабинета за пределами MVP-предрасчёта.
 */
import { date, boolean, jsonb, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

export const astroCalendar = pgTable('astro_calendar', {
  id: uuid('id').primaryKey().defaultRandom(),
  date: date('date', { mode: 'string' }).notNull().unique(),
  /** Интервалы знака Луны за сутки (Луна иногда меняет знак внутри дня): [{signIndex, fromIso, toIso}]. */
  moonSignIntervals: jsonb('moon_sign_intervals').notNull(),
  /** Лунные дни за сутки (тоже может быть несколько интервалов): [{lunarDay, fromIso, toIso}]. */
  lunarDays: jsonb('lunar_days').notNull(),
  /** Периоды void-of-course Луны за сутки: [{fromIso, toIso}] (пусто, если void не было). */
  voids: jsonb('voids').notNull(),
  /** Фазы Луны: {phaseName, phaseAngleDeg} на полдень опорной локации. */
  phases: jsonb('phases').notNull(),
  /** Ретроградные тела на эту дату: string[] (ключи тел, см. packages/shared chart.ts). */
  retrogrades: jsonb('retrogrades').notNull(),
  /** Смены знака (грубая ежедневная проверка «сменил знак относительно вчера»): [{body, signIndex}]. */
  ingresses: jsonb('ingresses').notNull(),
  /** true = строка реально вычислена worker'ом (skeleton-строки не создаются — только вычисленные). */
  computed: boolean('computed').notNull().default(true),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
