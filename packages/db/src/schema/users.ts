/**
 * users — расширена в Ф2 (ALTER) до полной спецификации (см. docs/architecture/
 * 22-модель-данных.md §1). Skeleton (id/created_at/updated_at) создан в Ф0, чтобы FK
 * `audit_log.actor_id` был валиден с первой миграции (см. §5 конвенций реализации).
 *
 * `email` — уникальность регистронезависима, но НЕ через citext-расширение Postgres (лишняя
 * зависимость от contrib-модуля): вместо этого приложение ВСЕГДА нормализует e-mail
 * (`.trim().toLowerCase()`) перед записью/чтением (см. apps/api/src/auth/normalize.ts), а в БД —
 * обычный `text` с простым unique-констрейнтом. Это осознанное отступление от буквальной
 * формулировки «citext» в 22-модель-данных.md §1, задокументированное здесь.
 */
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { userRoleEnum, userStatusEnum } from './enums.js';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),

  email: text('email').notNull().unique(),
  emailVerifiedAt: timestamp('email_verified_at', { withTimezone: true }),
  passwordHash: text('password_hash').notNull(),
  displayName: text('display_name'),
  avatarKey: text('avatar_key'),
  role: userRoleEnum('role').notNull().default('user'),
  status: userStatusEnum('status').notNull().default('active'),
  /** IANA tz по умолчанию для интерфейса пользователя (не путать с tz_id профилей рождения). */
  tz: text('tz').notNull().default('Europe/Moscow'),
  locale: text('locale').notNull().default('ru'),
  /** Момент удаления аккаунта (право на забвение) — см. auth/gdpr.ts. status уходит в 'deleted'. */
  deletedAt: timestamp('deleted_at', { withTimezone: true }),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
