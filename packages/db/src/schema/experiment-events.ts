/**
 * experiment_events — метрики A/B пейвола (см. docs/architecture/22-модель-данных.md §7б).
 * `userId` nullable + `anonId` — экспозиция пейвола может произойти ДО регистрации (квиз проходит
 * авторизованный пользователь в этом MVP, см. промт Ф8 req.3 «квиз-онбординг после первого
 * расчёта» — расчёт доступен анонимно, значит anonId покрывает воронку с калькулятора; `userId`
 * заполняется, когда событие произошло у авторизованного пользователя).
 */
import { jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { experimentEventKindEnum } from './enums.js';
import { users } from './users.js';
import { experiments } from './experiments.js';

export const experimentEvents = pgTable('experiment_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  anonId: text('anon_id'),
  experimentCode: text('experiment_code')
    .notNull()
    .references(() => experiments.code),
  variant: text('variant').notNull(),
  event: experimentEventKindEnum('event').notNull(),
  /** Доп. контекст (напр. `{ quizSphere: 'love' }`, `{ planCode: 'premium_m' }` для converted). */
  meta: jsonb('meta').notNull().default({}),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});
