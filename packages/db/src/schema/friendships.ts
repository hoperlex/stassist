/**
 * friendships — заявки в друзья + опция «поделиться картой» для синастрии (req.3 промта Ф7, см.
 * docs/architecture/22-модель-данных.md §7). Направленная модель (findings f7.md [data-model-gap]
 * «взаимность согласия не определена» — решение зафиксировано здесь):
 *  - заявка создаётся ОДНОЙ строкой `(userId=запросивший, friendId=адресат, status='pending')`;
 *  - принятие — `status='accepted'` на ЭТОЙ ЖЕ строке (не создаётся вторая зеркальная строка —
 *    дружба неориентирована по факту связи, см. `apps/api/src/repositories/friendships-repository.ts`
 *    `listFriendships` ищет строки, где userId=me ИЛИ friendId=me);
 *  - `chartShared` — «владелец `userId` открыл СВОЮ карту для `friendId`» — односторонний флаг НА
 *    ЭТОЙ строке относится только к тому, кто выступает `userId`. Чтобы обе стороны могли
 *    независимо открывать/закрывать свою карту друг другу при неориентированной строке дружбы,
 *    репозиторий хранит ДВА булевых поля — `sharedByUser`/`sharedByFriend` — соответствующих
 *    ролям `userId`/`friendId` этой строки; виджет синастрии доступен, когда ОБА true (см.
 *    `friendshipSynastryResponseSchema`), отзыв любой стороны немедленно закрывает виджет.
 */
import { boolean, pgTable, timestamp, unique, uuid } from 'drizzle-orm/pg-core';
import { friendshipStatusEnum } from './enums.js';
import { users } from './users.js';

export const friendships = pgTable(
  'friendships',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    friendId: uuid('friend_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    status: friendshipStatusEnum('status').notNull().default('pending'),
    /** `userId` (инициатор заявки) открыл карту `friendId`. */
    sharedByUser: boolean('shared_by_user').notNull().default(false),
    /** `friendId` (адресат заявки) открыл карту `userId`. */
    sharedByFriend: boolean('shared_by_friend').notNull().default(false),

    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [unique('friendships_user_friend_unique').on(table.userId, table.friendId)],
);
