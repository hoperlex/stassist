/**
 * celebrities — база публичных фигур для галерей/синастрий (см. docs/architecture/
 * 22-модель-данных.md §2). Таблица создаётся в Ф2 (skeleton), наполнение — Ф7 (см. §5 конвенций
 * реализации, аналогия с `wiki_articles`). `birthData` — публичные данные рождения (НЕ шифруются:
 * это не ПД частного лица, а опубликованные общедоступные сведения об общественной фигуре) +
 * Родден-рейтинг достоверности.
 */
import { jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const celebrities = pgTable('celebrities', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  birthData: jsonb('birth_data'),
  category: text('category'),
  wikiUrl: text('wiki_url'),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
