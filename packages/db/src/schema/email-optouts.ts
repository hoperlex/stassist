/**
 * email_optouts — отписки от e-mail-рассылок (см. docs/architecture/22-модель-данных.md §7б,
 * промт Ф8 req.8 «отписка в один клик»). `email` — обычный `text` с уникальностью, приложение
 * нормализует (`.trim().toLowerCase()`) перед записью/чтением — тот же осознанный паттерн, что
 * `users.email` (см. doc-комментарий packages/db/src/schema/users.ts), НЕ citext-расширение.
 */
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { emailOptoutScopeEnum } from './enums.js';

export const emailOptouts = pgTable('email_optouts', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  scope: emailOptoutScopeEnum('scope').notNull(),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});
