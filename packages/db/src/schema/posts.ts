/**
 * posts — лента коммьюнити (Ф7, M8; см. docs/architecture/22-модель-данных.md §7).
 *
 * `chartId` — FK на `charts.id` (НЕ отдельная таблица) — см. doc-комментарий
 * `packages/db/src/schema/charts.ts` («birthProfileId намеренно nullable… зарезервировано для
 * будущей анонимной копии (Ф7)») и `packages/shared/src/schemas/community.ts` (заголовок файла):
 * публикация поста с картой создаёт НОВУЮ строку `charts` с `birthProfileId=null` и
 * `data=anonymizeChartData(...)`. Закрывает находку [data-model-gap] f7.md без новой таблицы.
 */
import { integer, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { celebrities } from './celebrities.js';
import { charts } from './charts.js';
import { postKindEnum, ugcModerationStatusEnum, ugcStatusEnum } from './enums.js';
import { users } from './users.js';

export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  authorId: uuid('author_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  kind: postKindEnum('kind').notNull(),
  title: text('title').notNull(),
  bodyMd: text('body_md').notNull(),
  /** Анонимизированная копия карты (только для kind='chart_review_request') — см. заголовок файла. */
  chartId: uuid('chart_id').references(() => charts.id, { onDelete: 'set null' }),
  /** Только для kind='gallery' — обсуждение карты знаменитости. */
  celebrityId: uuid('celebrity_id').references(() => celebrities.id, { onDelete: 'set null' }),
  status: ugcStatusEnum('status').notNull().default('published'),
  moderation: ugcModerationStatusEnum('moderation').notNull().default('pending'),
  likesCount: integer('likes_count').notNull().default(0),
  commentsCount: integer('comments_count').notNull().default(0),
  /** Причины автоклассификатора (см. packages/llm/src/moderation/ugc-classifier.ts) — пусто, если
   *  в очередь модерации попало только из-за премодерации новичка (не нарушение, а объём). */
  autoFlags: jsonb('auto_flags').notNull().default([]),
  /** Уведомление отправлено при скрытии модератором — чтобы не дублировать (см. routes/moderation.ts). */
  moderationNotifiedAt: timestamp('moderation_notified_at', { withTimezone: true }),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
