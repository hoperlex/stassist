/**
 * wiki_article_revisions — история версий статьи (req.2 промта Ф7: «версии статей»). Снимок
 * ПРЕДЫДУЩЕГО состояния (title/bodyMd/version) пишется репозиторием ПЕРЕД применением правки
 * редактора (см. apps/api/src/repositories/wiki-articles-repository.ts `updateArticle`) — так
 * `wiki_articles.version` всегда отражает ТЕКУЩУЮ версию, а эта таблица — журнал прошлых.
 */
import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './users.js';
import { wikiArticles } from './wiki-articles.js';

export const wikiArticleRevisions = pgTable('wiki_article_revisions', {
  id: uuid('id').primaryKey().defaultRandom(),
  articleId: uuid('article_id')
    .notNull()
    .references(() => wikiArticles.id, { onDelete: 'cascade' }),
  version: integer('version').notNull(),
  title: text('title').notNull(),
  bodyMd: text('body_md'),
  editorId: uuid('editor_id').references(() => users.id, { onDelete: 'set null' }),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});
