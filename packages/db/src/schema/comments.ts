/**
 * comments — дерево комментариев поста, ОГРАНИЧЕНО 2 уровнями (req.2 промта Ф7: «Комментарии
 * (дерево 2 уровня)»). Ограничение глубины — на уровне ПРИЛОЖЕНИЯ (apps/api/src/routes/posts.ts:
 * ответ на комментарий с уже непустым `parentId` отклоняется 400), не констрейнтом БД — Postgres
 * CHECK не может смотреть на глубину рекурсии self-FK декларативно без триггера, а триггер здесь
 * избыточен (единственная точка записи — этот роут).
 *
 * `markedUsefulAt` — решение по неоднозначности (см. заголовок packages/shared/src/schemas/
 * community.ts): «автор поста отмечает разбор полезным» → начисление репутации
 * (`USEFUL_COMMENT_REPUTATION_POINTS`). Модель 22 §7 не даёт отдельного механизма для этого —
 * реализовано как поле здесь, а не отдельная таблица (1:1 с комментарием, простое булево-по-факту).
 */
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { ugcModerationStatusEnum, ugcStatusEnum } from './enums.js';
import { posts } from './posts.js';
import { users } from './users.js';

export const comments = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id')
    .notNull()
    .references(() => posts.id, { onDelete: 'cascade' }),
  authorId: uuid('author_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  /** self-FK — null у комментариев 1-го уровня; см. заголовок файла про ограничение глубины=2. */
  parentId: uuid('parent_id'),
  bodyMd: text('body_md').notNull(),
  status: ugcStatusEnum('status').notNull().default('published'),
  moderation: ugcModerationStatusEnum('moderation').notNull().default('pending'),
  markedUsefulAt: timestamp('marked_useful_at', { withTimezone: true }),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
