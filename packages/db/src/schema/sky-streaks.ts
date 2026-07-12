/**
 * sky_streaks — стрик «Живу по небу» (Ф9, см. docs/strategy/11-соцраздел-созвездие.md §7):
 * серия дней подряд с чек-ином. 1:1 с users (паттерн `reputation`). Обновляется транзакционно
 * вместе с чек-ином; правило перехода — ЧИСТАЯ функция `advanceStreak` в packages/shared/src/
 * schemas/sky.ts (единый источник правды для API и тестов, паттерн decideInitialPostModeration).
 * «Юпитер-защита» (streak freeze) — фаза 2, полей под неё сознательно нет (YAGNI).
 */
import { date, integer, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './users.js';

export const skyStreaks = pgTable('sky_streaks', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: 'cascade' }),
  current: integer('current').notNull().default(0),
  best: integer('best').notNull().default(0),
  /** 'YYYY-MM-DD' последнего чек-ина (по МСК, как sky_days.dayKey). */
  lastCheckinDay: date('last_checkin_day', { mode: 'string' }),

  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
