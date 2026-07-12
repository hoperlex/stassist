/**
 * refresh_tokens — opaque refresh-токены (см. docs/architecture/22-модель-данных.md §1,
 * 21-техническая-архитектура.md §5). В БД хранится ТОЛЬКО hash токена (sha256), никогда — сам
 * токен. `familyId` — общий для всей цепочки ротации («семья сессий»); reuse detection:
 * предъявление уже погашенного (revoked/rotated) токена ⇒ отзыв всех токенов той же `familyId`
 * (см. apps/api/src/auth/refresh-rotation.ts — чистая логика, покрыта unit-тестами на
 * in-memory репозитории).
 */
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './users.js';

export const refreshTokens = pgTable('refresh_tokens', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  tokenHash: text('token_hash').notNull().unique(),
  familyId: uuid('family_id').notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  /** Предшественник в цепочке ротации (null у первого токена семьи). */
  rotatedFrom: uuid('rotated_from'),
  revokedAt: timestamp('revoked_at', { withTimezone: true }),
  /** Хэш IP (не сам IP — минимизация ПД в токен-логах), см. redaction §5 док. 21. */
  ipHash: text('ip_hash'),
  uaHint: text('ua_hint'),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
