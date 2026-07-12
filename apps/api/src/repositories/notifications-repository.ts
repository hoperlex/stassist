import { and, desc, eq, isNull } from 'drizzle-orm';
import { notifications, type Db } from '@stassist/db';

export type NotificationRow = typeof notifications.$inferSelect;

/** Ф7: уведомления коммьюнити (comment_reply/friend_request/moderation) — та же форма, что
 *  `apps/worker/src/pdf/notifications-repository.ts` (`order_ready`, Ф6), продублирована здесь
 *  намеренно (apps/api и apps/worker — отдельные деплой-юниты, без общего internal-пакета для
 *  этой одной функции; см. аналогичное решение по всей кодовой базе — репозитории не шарятся
 *  между приложениями). */
export interface InsertNotificationInput {
  userId: string;
  kind: 'comment_reply' | 'friend_request' | 'order_ready' | 'moderation' | 'system';
  text: string;
  payload: Record<string, unknown>;
}

export async function insertNotification(db: Db, input: InsertNotificationInput): Promise<void> {
  await db.insert(notifications).values({ userId: input.userId, kind: input.kind, text: input.text, payload: input.payload });
}

export async function listNotificationsForUser(db: Db, userId: string, limit = 50): Promise<NotificationRow[]> {
  return db.select().from(notifications).where(eq(notifications.userId, userId)).orderBy(desc(notifications.createdAt)).limit(limit);
}

export async function countUnreadNotifications(db: Db, userId: string): Promise<number> {
  const rows = await db
    .select({ id: notifications.id })
    .from(notifications)
    .where(and(eq(notifications.userId, userId), isNull(notifications.readAt)));
  return rows.length;
}

export async function markNotificationRead(db: Db, userId: string, id: string): Promise<boolean> {
  const rows = await db
    .update(notifications)
    .set({ readAt: new Date(), updatedAt: new Date() })
    .where(and(eq(notifications.id, id), eq(notifications.userId, userId)))
    .returning({ id: notifications.id });
  return rows.length > 0;
}
