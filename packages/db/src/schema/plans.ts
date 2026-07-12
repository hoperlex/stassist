/**
 * plans — тарифные планы (см. docs/architecture/22-модель-данных.md §4). Ф8: 3 плана — free/
 * premium_m/premium_y. Единый источник правды по ценам/фичам/триалу — `PLAN_CATALOG` в
 * packages/shared/src/schemas/billing.ts (потребляется API+фронтом без обращения к БД для
 * статичного каталога); эта таблица — материализация тех же кодов, НУЖНА как FK-цель для
 * `subscriptions.plan_code` (жизненный цикл подписки, а не каталог) и сидируется прямо в
 * миграции 0008 (см. doc-комментарий там же, тот же паттерн, что enum-справочники — маленький
 * фиксированный набор), сидируется идемпотентно (`ON CONFLICT ... DO UPDATE`) через
 * `drizzle/seed/0011_plans_experiments.sql` — тот же паттерн, что `SYSTEM_CALC_PRESETS`/
 * `compat_pages` (см. §4 конвенций реализации: миграции — только DDL, данные — отдельные сиды).
 */
import { integer, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { planCodeEnum, planPeriodEnum } from './enums.js';

export const plans = pgTable('plans', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: planCodeEnum('code').notNull().unique(),
  titleRu: text('title_ru').notNull(),
  priceKop: integer('price_kop').notNull(),
  period: planPeriodEnum('period').notNull(),
  /** Дни триала при первой подписке (0 для free — не применимо). */
  trialDays: integer('trial_days').notNull().default(0),
  /** Список фич плана (русские строки для страницы тарифов) — см. `PLAN_CATALOG`. */
  features: jsonb('features').notNull().default([]),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
