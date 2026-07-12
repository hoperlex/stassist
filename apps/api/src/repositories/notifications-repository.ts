import { and, desc, eq, isNull } from 'drizzle-orm';
import { notifications, type Db } from '@stassist/db';

export type NotificationRow = typeof notifications.$inferSelect;

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
