/**
 * payments — разовые платежи и списания по подписке (см. docs/architecture/22-модель-данных.md
 * §4, промт Ф8 req.1). `idempotencyKey` — наш собственный ключ идемпотентности запроса на
 * создание платежа (передаётся провайдеру, см. `PaymentProvider.createPayment`, тот же интерфейс,
 * что `FakePaymentProvider`, см. packages/shared/src/ports/payment-provider.ts); `providerPaymentId`
 * — ID платежа НА СТОРОНЕ провайдера (из ответа ЮKassa/стаба), уникален независимо.
 */
import { integer, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { paymentProviderEnum, paymentStatusEnum, receiptStatusEnum } from './enums.js';
import { users } from './users.js';
import { orders } from './orders.js';
import { subscriptions } from './subscriptions.js';

export const payments = pgTable('payments', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  orderId: uuid('order_id').references(() => orders.id, { onDelete: 'set null' }),
  subscriptionId: uuid('subscription_id').references(() => subscriptions.id, { onDelete: 'set null' }),
  provider: paymentProviderEnum('provider').notNull(),
  providerPaymentId: text('provider_payment_id').notNull().unique(),
  amountKop: integer('amount_kop').notNull(),
  currency: text('currency').notNull().default('RUB'),
  status: paymentStatusEnum('status').notNull().default('pending'),
  receiptStatus: receiptStatusEnum('receipt_status').notNull().default('not_required'),
  idempotencyKey: text('idempotency_key').notNull().unique(),
  /** Сырой ответ провайдера (аудит/диагностика) — см. `webhook_events.payload` для сырых вебхуков. */
  raw: jsonb('raw').notNull().default({}),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
