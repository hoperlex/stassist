/**
 * subscriptions — подписка «Премиум» (см. docs/architecture/22-модель-данных.md §4, промт Ф8
 * req.2). `planCode` ссылается на `plans.code` (уникальный бизнес-ключ, не `plans.id`) — тот же
 * паттерн, что doc 22 §4 буквально описывает («plan_code fk»). Жизненный цикл статусов —
 * см. doc-комментарий `subscriptionStatusEnum` в enums.ts.
 */
import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { paymentProviderEnum, planCodeEnum, subscriptionStatusEnum } from './enums.js';
import { users } from './users.js';
import { plans } from './plans.js';

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  planCode: planCodeEnum('plan_code')
    .notNull()
    .references(() => plans.code),
  status: subscriptionStatusEnum('status').notNull().default('trial'),
  startedAt: timestamp('started_at', { withTimezone: true }).notNull().defaultNow(),
  currentPeriodEnd: timestamp('current_period_end', { withTimezone: true }).notNull(),
  /** «Отмена в один клик» (юридическое требование прозрачности, req.2 промта Ф8): выставляет
   *  этот флаг, статус остаётся active/trial до currentPeriodEnd — см. subscriptionStatusEnum. */
  cancelAtPeriodEnd: boolean('cancel_at_period_end').notNull().default(false),
  provider: paymentProviderEnum('provider').notNull().default('stub'),
  /** ID подписки/сохранённого метода на стороне провайдера (для рекуррентных списаний). */
  providerSubId: text('provider_sub_id'),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
