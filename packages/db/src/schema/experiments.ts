/**
 * experiments — реестр A/B-экспериментов (см. docs/architecture/22-модель-данных.md §7б, промт
 * Ф8 req.3). Ф8 сеет ровно один код — `paywall_v1` (2 варианта пейвола, см.
 * packages/shared/src/schemas/paywall.ts `PAYWALL_VARIANTS`) — сидируется идемпотентно через
 * `drizzle/seed/0011_plans_experiments.sql`, тот же паттерн, что `plans` (см. doc-комментарий там же).
 */
import { boolean, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const experiments = pgTable('experiments', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: text('code').notNull().unique(),
  /** `string[]` — коды вариантов (напр. `['control','discount_offer']`). */
  variants: jsonb('variants').notNull(),
  active: boolean('active').notNull().default(true),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
