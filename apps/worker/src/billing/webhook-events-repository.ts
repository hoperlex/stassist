import { asc, eq, isNull } from 'drizzle-orm';
import { webhookEvents, type Db } from '@stassist/db';

export type WebhookEventRow = typeof webhookEvents.$inferSelect;

/** См. doc-комментарий packages/db/src/schema/webhook-events.ts — retry-очередь worker'а. */
export async function findUnprocessedWebhookEvents(db: Db, limit = 20): Promise<WebhookEventRow[]> {
  return db.select().from(webhookEvents).where(isNull(webhookEvents.processedAt)).orderBy(asc(webhookEvents.createdAt)).limit(limit);
}

export async function markWebhookEventProcessed(db: Db, id: string): Promise<void> {
  await db.update(webhookEvents).set({ processedAt: new Date() }).where(eq(webhookEvents.id, id));
}
