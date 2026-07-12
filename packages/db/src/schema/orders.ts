/**
 * orders — заказы платных продуктов (см. docs/architecture/22-модель-данных.md §3). В Ф6
 * используется ТОЛЬКО `kind='pdf_report'` (PDF «Матрица судьбы»/«Психоматрица»/«Нумерологический
 * профиль», см. docs/roadmap/prompts/f6-нумерология-и-камни.md req.1-3); `custom_forecast`/
 * `subscription_gift` и `expert_id`/эксперт-статусы жизненного цикла — задел маркетплейса
 * экспертов (Ф8+, см. doc 22 §3, пометка "задел маркетплейса"), НЕ используются в Ф6.
 *
 * `subject` — параметры заказа (см. packages/shared/src/schemas/order.ts `orderSubjectSchema`):
 * `productType` ('matrix_full_pdf'|'psychomatrix_pdf'|'numerology_profile_pdf'), `variant`
 * ('standard'|'child'|'compat' — см. doc-комментарий там же про честные пределы вариантов),
 * `birthProfileId`, опционально `partnerBirthProfileId` (вариант compat) и `fullName` (для чисел
 * по имени в профиле). НЕ содержит ПД самого рождения — только ссылки на уже сохранённый
 * зашифрованный `birth_profiles` (см. doc 22 §2).
 *
 * Демо-оплата (см. §2 конвенций реализации, `FakePaymentProvider`, флаг
 * `apps/api/src/routes/orders.ts` `DEMO_PAYMENTS_AUTO_CONFIRM`): `created`→`paid` происходит
 * синхронно в API сразу после создания заказа (стаб «всегда успешно» проводит платёж) —
 * `paid`→`ai_done`→`delivered` асинхронно в apps/worker (см. apps/worker/src/pdf/).
 */
import { integer, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { orderKindEnum, orderStatusEnum } from './enums.js';
import { users } from './users.js';
import { aiReports } from './ai-reports.js';

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  kind: orderKindEnum('kind').notNull(),
  subject: jsonb('subject').notNull(),
  status: orderStatusEnum('status').notNull().default('created'),
  /** Задел маркетплейса экспертов (Ф8+) — не используется в Ф6. */
  expertId: uuid('expert_id').references(() => users.id, { onDelete: 'set null' }),
  priceKop: integer('price_kop').notNull(),
  /** Готовый PDF-отчёт (`ai_reports.kind='order'`, `pdf_key` заполнен) — null, пока не сгенерирован. */
  reportId: uuid('report_id').references(() => aiReports.id, { onDelete: 'set null' }),
  /** Причина status='cancelled' (напр. неудачная генерация) — для диагностики, не для пользователя as-is. */
  errorMessage: text('error_message'),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
