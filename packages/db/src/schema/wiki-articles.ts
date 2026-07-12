/**
 * wiki_articles — вики-статьи (см. docs/architecture/22-модель-данных.md §6). Таблицу создаёт
 * **Ф4** ПУСТОЙ (0 строк на момент этой фазы) вместе с `interpretation_chunks` — иначе FK
 * `interpretation_chunks.source_article_id → wiki_articles` не был бы валиден в Ф4 (см. §5
 * конвенций реализации, блокер [порядок-миграций/FK] в `_work/build/findings/f4.md`).
 * Наполнение контентом (`bodyMd`, `editorId`) — задача **Ф7**; эта миграция — только skeleton.
 */
import { sql } from 'drizzle-orm';
import { index, integer, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { wikiArticleSectionEnum, wikiArticleStatusEnum } from './enums.js';
import { users } from './users.js';

export const wikiArticles = pgTable(
  'wiki_articles',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: text('slug').notNull().unique(),
    section: wikiArticleSectionEnum('section').notNull(),
    title: text('title').notNull(),
    /** null, пока Ф7 не наполнила статью — Ф4 не пишет сюда строк вообще. */
    bodyMd: text('body_md'),
    status: wikiArticleStatusEnum('status').notNull().default('draft'),
    editorId: uuid('editor_id').references(() => users.id, { onDelete: 'set null' }),
    version: integer('version').notNull().default(1),
    seo: jsonb('seo'),

    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    // Ф7 (req.4 промта, findings f7.md [missing-step] «pg_trgm не оговорён»): триграммный поиск
    // по title+body_md (см. apps/api/src/repositories/wiki-articles-repository.ts `searchArticles`,
    // оператор `%`/similarity). Расширение pg_trgm уже создано в 0000_extensions.sql (Ф0,
    // предусмотрено заранее «используется начиная с поздних фаз»).
    index('wiki_articles_search_trgm_idx')
      .using('gin', sql`(coalesce(${table.title}, '') || ' ' || coalesce(${table.bodyMd}, '')) gin_trgm_ops`),
  ],
);
