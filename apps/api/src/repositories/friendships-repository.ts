/**
 * friendships — заявки в друзья + направленное согласие на шеринг карты (req.3 промта Ф7, см.
 * doc-комментарий packages/db/src/schema/friendships.ts — направленная модель, ДВА булевых поля).
 */
import { and, eq, inArray, or } from 'drizzle-orm';
import { friendships, users, type Db } from '@stassist/db';

export type FriendshipRow = typeof friendships.$inferSelect;

export async function findFriendshipBetween(db: Db, userId: string, friendId: string): Promise<FriendshipRow | null> {
  const rows = await db
    .select()
    .from(friendships)
    .where(
      or(
        and(eq(friendships.userId, userId), eq(friendships.friendId, friendId)),
        and(eq(friendships.userId, friendId), eq(friendships.friendId, userId)),
      ),
    )
    .limit(1);
  return rows[0] ?? null;
}

export async function createFriendRequest(db: Db, userId: string, friendId: string): Promise<FriendshipRow> {
  const [row] = await db.insert(friendships).values({ userId, friendId, status: 'pending' }).returning();
  if (!row) throw new Error('createFriendRequest: INSERT не вернул строку');
  return row;
}

/** Принять заявку — ТОЛЬКО адресат (`friendId` строки) может это сделать. */
export async function acceptFriendRequest(db: Db, friendshipId: string, viewerId: string): Promise<FriendshipRow | null> {
  const [row] = await db
    .update(friendships)
    .set({ status: 'accepted', updatedAt: new Date() })
    .where(and(eq(friendships.id, friendshipId), eq(friendships.friendId, viewerId)))
    .returning();
  return row ?? null;
}

/** Установить/снять флаг «я открыл карту этому другу» — определяет, является ли viewer стороной
 *  `userId` или `friendId` ЭТОЙ строки, и обновляет соответствующее поле (см. заголовок файла). */
export async function setChartShared(db: Db, friendshipId: string, viewerId: string, shared: boolean): Promise<FriendshipRow | null> {
  const rows = await db.select().from(friendships).where(eq(friendships.id, friendshipId)).limit(1);
  const row = rows[0];
  if (!row) return null;
  if (row.userId === viewerId) {
    const [updated] = await db.update(friendships).set({ sharedByUser: shared, updatedAt: new Date() }).where(eq(friendships.id, friendshipId)).returning();
    return updated ?? null;
  }
  if (row.friendId === viewerId) {
    const [updated] = await db.update(friendships).set({ sharedByFriend: shared, updatedAt: new Date() }).where(eq(friendships.id, friendshipId)).returning();
    return updated ?? null;
  }
  return null;
}

export async function listFriendships(db: Db, userId: string): Promise<FriendshipRow[]> {
  return db.select().from(friendships).where(or(eq(friendships.userId, userId), eq(friendships.friendId, userId)));
}

export async function getFriendshipById(db: Db, id: string): Promise<FriendshipRow | null> {
  const rows = await db.select().from(friendships).where(eq(friendships.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function getDisplayNames(db: Db, userIds: string[]): Promise<Map<string, string | null>> {
  if (userIds.length === 0) return new Map();
  const unique = [...new Set(userIds)];
  const rows = await db.select({ id: users.id, displayName: users.displayName }).from(users).where(inArray(users.id, unique));
  return new Map(rows.map((r) => [r.id, r.displayName]));
}
