/**
 * page_cache — кэш готового HTML публичных страниц с TTL и тегами инвалидации (см. docs/
 * architecture/22-модель-данных.md §5, docs/architecture/21-техническая-архитектура.md §6, ADR-7:
 * «детерминированная программатика генерируется заранее, горячий кэш не нужен на MVP» — но
 * таблицу заводим в Ф3 вместе с остальной SSR-программатикой (`compat_pages`, `astro_calendar`),
 * т.к. это первый публичный SSR-контур портала; заполнение — по мере появления
 * тяжёлых/протухающих страниц (Ф5 гороскопы и т.д.), сама таблица в Ф3 не используется активно.
 */
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const pageCache = pgTable('page_cache', {
  id: uuid('id').primaryKey().defaultRandom(),
  path: text('path').notNull().unique(),
  html: text('html').notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  /** Теги для точечной инвалидации (напр. `['sign:oven']`) — `text[]`, как в модели данных §5. */
  tags: text('tags')
    .array()
    .notNull()
    .default([]),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
