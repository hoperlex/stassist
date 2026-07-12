/**
 * webhook_events — идемпотентность доставки вебхуков (см. packages/db/src/schema/
 * webhook-events.ts doc-комментарий: модель retry-обработки).
 */
import { asc, eq, isNull } from 'drizzle-orm';
import { webhookEvents, type Db } from '@stassist/db';
import type { PaymentProviderName } from '@stassist/shared';

export type WebhookEventRow = typeof webhookEvents.$inferSelect;

export interface InsertWebhookEventInput {
  provider: PaymentProviderName;
  eventId: string;
  type: string;
  payload: Record<string, unknown>;
}

export interface InsertWebhookEventResult {
  row: WebhookEventRow;
  /** false = событие с этим eventId уже было (повторная доставка) — эффект применять НЕ надо. */
  isNew: boolean;
}

/** Идемпотентно по `event_id` — двойная доставка одного и того же вебхука не создаёт вторую
 *  строку (закрывает промт Ф8 req.1 «вебхуки — идемпотентны», тест «повторная доставка события не
 *  задваивает платёж»). */
export async function insertWebhookEventIdempotent(db: Db, input: InsertWebhookEventInput): Promise<InsertWebhookEventResult> {
  const [inserted] = await db
    .insert(webhookEvents)
    .values({ provider: input.provider, eventId: input.eventId, type: input.type, payload: input.payload })
    .onConflictDoNothing({ target: webhookEvents.eventId })
    .returning();
  if (inserted) return { row: inserted, isNew: true };
  const rows = await db.select().from(webhookEvents).where(eq(webhookEvents.eventId, input.eventId)).limit(1);
  const existing = rows[0];
  if (!existing) throw new Error('insertWebhookEventIdempotent: строка не найдена ни после INSERT, ни после конфликта');
  return { row: existing, isNew: false };
}

export async function markWebhookEventProcessed(db: Db, id: string): Promise<void> {
  await db.update(webhookEvents).set({ processedAt: new Date() }).where(eq(webhookEvents.id, id));
}

/** Необработанные события (`processedAt IS NULL`) — либо применение не удалось синхронно в API,
 *  либо ещё не пытались (не должно случаться) — worker подбирает по расписанию (retry-очередь,
 *  см. doc-комментарий webhook-events.ts). */
export async function findUnprocessedWebhookEvents(db: Db, limit = 20): Promise<WebhookEventRow[]> {
  return db.select().from(webhookEvents).where(isNull(webhookEvents.processedAt)).orderBy(asc(webhookEvents.createdAt)).limit(limit);
}
