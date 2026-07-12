/**
 * reputation — очки/бейджи коммьюнити (req.2 промта Ф7, см. docs/architecture/
 * 22-модель-данных.md §7). Начисляется, когда автор поста отмечает комментарий-разбор полезным
 * (см. `comments.markedUsefulAt`, `USEFUL_COMMENT_REPUTATION_POINTS` в
 * `packages/shared/src/schemas/community.ts`).
 */
import { integer, jsonb, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './users.js';

export const reputation = pgTable('reputation', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: 'cascade' }),
  score: integer('score').notNull().default(0),
  /** Массив слагов бейджей (см. `REPUTATION_BADGE_THRESHOLDS`) — пересчитывается при начислении. */
  badges: jsonb('badges').notNull().default([]),

  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
