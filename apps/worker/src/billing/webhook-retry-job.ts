/**
 * Retry-очередь вебхуков (req.1 промта Ф8 «retry-очередь в worker»): подбирает
 * `webhook_events.processed_at IS NULL` (эффект не применился синхронно в API — см. doc-комментарий
 * packages/db/src/schema/webhook-events.ts) и повторно применяет тот же эффект
 * (`applyYookassaWebhookEffect`, идентична apps/api версии — см. заголовок billing/webhook-
 * processor.ts). Ошибка по одной строке не прерывает обработку остальных.
 */
import type { Logger } from 'pino';
import type { Db } from '@stassist/db';
import { yookassaWebhookEventSchema } from '@stassist/shared';
import { applyYookassaWebhookEffect } from './webhook-processor.js';
import { findUnprocessedWebhookEvents, markWebhookEventProcessed } from './webhook-events-repository.js';
import { findByProviderPaymentId, updatePaymentStatus } from './payments-repository.js';
import { updateSubscriptionStatus } from './subscriptions-repository.js';

export interface WebhookRetryJobDeps {
  db: Db;
  logger: Logger;
}

export async function retryUnprocessedWebhooks(deps: WebhookRetryJobDeps): Promise<number> {
  const { db, logger } = deps;
  const unprocessed = await findUnprocessedWebhookEvents(db, 20);
  let processed = 0;

  const stores = {
    payments: {
      async findByProviderPaymentId(providerPaymentId: string) {
        const row = await findByProviderPaymentId(db, providerPaymentId);
        return row ? { id: row.id, status: row.status, subscriptionId: row.subscriptionId } : null;
      },
      async updateStatus(id: string, status: Parameters<typeof updatePaymentStatus>[2]) {
        await updatePaymentStatus(db, id, status);
      },
    },
    subscriptions: {
      async updateStatus(id: string, status: Parameters<typeof updateSubscriptionStatus>[2]) {
        await updateSubscriptionStatus(db, id, status);
      },
    },
  };

  for (const row of unprocessed) {
    const parsed = yookassaWebhookEventSchema.safeParse(row.payload);
    if (!parsed.success) {
      logger.error({ eventId: row.eventId }, 'webhook-retry: невалидный сохранённый payload, пропускаю');
      continue;
    }
    try {
      await applyYookassaWebhookEffect(parsed.data, stores);
      await markWebhookEventProcessed(db, row.id);
      processed += 1;
    } catch (err) {
      logger.error({ err, eventId: row.eventId }, 'webhook-retry: повторная попытка не удалась, оставляю на следующий прогон');
    }
  }

  return processed;
}
