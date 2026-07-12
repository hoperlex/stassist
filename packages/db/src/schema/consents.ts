/**
 * consents — согласия по 152-ФЗ (см. docs/architecture/22-модель-данных.md §1 и
 * 21-техническая-архитектура.md §7). Отдельное согласие на обработку ПД — НЕ часть оферты;
 * версия текста документа и момент согласия фиксируются здесь. `docVersion` — источник правды
 * см. packages/shared/src/legal/doc-versions.ts (конфиг-константа, единая для всего портала).
 */
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { consentKindEnum } from './enums.js';
import { users } from './users.js';

export const consents = pgTable('consents', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  kind: consentKindEnum('kind').notNull(),
  docVersion: text('doc_version').notNull(),
  grantedAt: timestamp('granted_at', { withTimezone: true }).notNull().defaultNow(),
  revokedAt: timestamp('revoked_at', { withTimezone: true }),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
