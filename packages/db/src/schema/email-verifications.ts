/**
 * email_verifications — хранилище одноразового токена подтверждения e-mail при регистрации.
 *
 * Находка верификации Ф2 (_work/build/findings/f2.md, [schema-gap]): в исходной модели данных
 * (docs/architecture/22-модель-данных.md §1) для этого токена не было таблицы. Решение —
 * отдельная таблица по аналогии с `password_resets` (а не обобщение в `one_time_tokens` с
 * `purpose` — так проще типизировать репозитории раздельно и это ближе к уже описанной форме
 * `password_resets` в исходном документе). В БД — только hash токена, TTL 24 часа.
 */
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './users.js';

export const emailVerifications = pgTable('email_verifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  tokenHash: text('token_hash').notNull().unique(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  usedAt: timestamp('used_at', { withTimezone: true }),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
