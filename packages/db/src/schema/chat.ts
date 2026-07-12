/**
 * chat_sessions / chat_messages — чат с ИИ-астропомощником в кабинете (см. docs/architecture/
 * 22-модель-данных.md §3, f4-llm-конвейер.md req.6). Интент-роутер и стриминг — packages/llm +
 * apps/api; здесь только хранение истории.
 */
import { boolean, integer, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { chatMessageRoleEnum } from './enums.js';
import { users } from './users.js';
import { birthProfiles } from './birth-profiles.js';

export const chatSessions = pgTable('chat_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  birthProfileId: uuid('birth_profile_id').references(() => birthProfiles.id, { onDelete: 'set null' }),
  title: text('title'),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const chatMessages = pgTable('chat_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: uuid('session_id')
    .notNull()
    .references(() => chatSessions.id, { onDelete: 'cascade' }),
  role: chatMessageRoleEnum('role').notNull(),
  content: text('content').notNull(),
  /** Ссылки на карты, использованные интент-роутером для ответа (natal/transit/synastry). */
  chartRefs: jsonb('chart_refs'),
  tokens: integer('tokens'),
  /** Пост-обработка нашла запрещённый контент (см. packages/llm/src/postprocess). */
  flagged: boolean('flagged').notNull().default(false),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
