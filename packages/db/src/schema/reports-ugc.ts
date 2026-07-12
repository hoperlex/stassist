/**
 * reports_ugc — жалобы на посты/комментарии (req.5 промта Ф7, см. docs/architecture/
 * 22-модель-данных.md §7). `entityId` — БЕЗ FK, тот же полиморфный паттерн, что `reactions`
 * (см. заголовок packages/db/src/schema/reactions.ts).
 */
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { reactionEntityEnum, reportsUgcStatusEnum, ugcViolationReasonEnum } from './enums.js';
import { users } from './users.js';

export const reportsUgc = pgTable('reports_ugc', {
  id: uuid('id').primaryKey().defaultRandom(),
  reporterId: uuid('reporter_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  entity: reactionEntityEnum('entity').notNull(),
  entityId: uuid('entity_id').notNull(),
  reason: ugcViolationReasonEnum('reason').notNull(),
  comment: text('comment'),
  status: reportsUgcStatusEnum('status').notNull().default('pending'),
  resolvedBy: uuid('resolved_by').references(() => users.id, { onDelete: 'set null' }),
  resolvedAt: timestamp('resolved_at', { withTimezone: true }),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});
