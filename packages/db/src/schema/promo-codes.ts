/**
 * promo_codes — промокоды (см. docs/architecture/22-модель-данных.md §4). `kind`/`value` — см.
 * `promoCodeKindSchema` в packages/shared/src/schemas/billing.ts: `percent_discount` (value 1-100),
 * `fixed_discount_kop` (value — копейки), `trial_extension_days` (value — доп. дни триала).
 */
import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { promoCodeKindEnum } from './enums.js';

export const promoCodes = pgTable('promo_codes', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: text('code').notNull().unique(),
  kind: promoCodeKindEnum('kind').notNull(),
  value: integer('value').notNull(),
  validUntil: timestamp('valid_until', { withTimezone: true }),
  maxUses: integer('max_uses'),
  usedCount: integer('used_count').notNull().default(0),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
