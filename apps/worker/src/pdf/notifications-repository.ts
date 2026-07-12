import { notifications, type Db } from '@stassist/db';

export interface InsertNotificationInput {
  userId: string;
  kind: 'comment_reply' | 'friend_request' | 'order_ready' | 'moderation' | 'system';
  text: string;
  payload: Record<string, unknown>;
}

export async function insertNotification(db: Db, input: InsertNotificationInput): Promise<void> {
  await db.insert(notifications).values({
    userId: input.userId,
    kind: input.kind,
    text: input.text,
    payload: input.payload,
  });
}
