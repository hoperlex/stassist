/**
 * users — skeleton-таблица Ф0 (см. docs/roadmap/31-конвенции-реализации.md §5): минимальный
 * набор колонок, чтобы FK audit_log.actor_id → users был валиден уже в первой миграции.
 * Полную схему (email, password_hash, role, status, tz, locale и т.д. — см.
 * docs/architecture/22-модель-данных.md §1) добавит Ф2 миграцией ALTER TABLE.
 */
import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
