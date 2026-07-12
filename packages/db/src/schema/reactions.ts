/**
 * reactions — реакции на посты/комментарии (полиморфная связь `entity`+`entityId`, см. docs/
 * architecture/22-модель-данных.md §7: «uniq(user_id,entity,entity_id)»). `entityId` — БЕЗ FK
 * (полиморфная колонка не может ссылаться на две разные таблицы одновременно — стандартное
 * ограничение реляционной модели); целостность проверяется на уровне приложения
 * (routes/reactions.ts валидирует существование поста/комментария перед записью).
 */
import { pgTable, timestamp, unique, uuid } from 'drizzle-orm/pg-core';
import { reactionEntityEnum, reactionKindEnum } from './enums.js';
import { users } from './users.js';

export const reactions = pgTable(
  'reactions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    entity: reactionEntityEnum('entity').notNull(),
    entityId: uuid('entity_id').notNull(),
    kind: reactionKindEnum('kind').notNull(),

    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    // Один пользователь — одна реакция на объект (смена kind = UPDATE, не вторая строка), см.
    // apps/api/src/repositories/reactions-repository.ts (upsert-toggle).
    unique('reactions_user_entity_unique').on(table.userId, table.entity, table.entityId),
  ],
);
