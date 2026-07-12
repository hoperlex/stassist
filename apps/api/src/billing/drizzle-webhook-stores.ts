/**
 * Реализация `WebhookEventStore`/`PaymentsStore`/`SubscriptionsStore` (webhook-processor.ts) поверх
 * реальных Drizzle-репозиториев — используется `routes/webhooks.ts` (API) и `apps/worker` retry-джобой
 * (см. doc-комментарий webhook-processor.ts: одна и та же бизнес-логика, разные точки вызова).
 */
import type { Db } from '@stassist/db';
import type { PaymentsStore, SubscriptionsStore, WebhookEventStore } from './webhook-processor.js';
import { insertWebhookEventIdempotent, markWebhookEventProcessed } from '../repositories/webhook-events-repository.js';
import { findPaymentByProviderPaymentId, updatePaymentStatus } from '../repositories/payments-repository.js';
import { updateSubscriptionStatus } from '../repositories/subscriptions-repository.js';

export function buildDrizzleWebhookEventStore(db: Db): WebhookEventStore {
  return {
    async insertIfNew(input) {
      const { row, isNew } = await insertWebhookEventIdempotent(db, input);
      return { id: row.id, isNew };
    },
    async markProcessed(id) {
      await markWebhookEventProcessed(db, id);
    },
  };
}

export function buildDrizzlePaymentsStore(db: Db): PaymentsStore {
  return {
    async findByProviderPaymentId(providerPaymentId) {
      const row = await findPaymentByProviderPaymentId(db, providerPaymentId);
      return row ? { id: row.id, status: row.status, subscriptionId: row.subscriptionId } : null;
    },
    async updateStatus(id, status) {
      await updatePaymentStatus(db, id, status);
    },
  };
}

export function buildDrizzleSubscriptionsStore(db: Db): SubscriptionsStore {
  return {
    async updateStatus(id, status) {
      await updateSubscriptionStatus(db, id, status);
    },
  };
}

export function buildDrizzleWebhookStores(db: Db): {
  webhookEvents: WebhookEventStore;
  payments: PaymentsStore;
  subscriptions: SubscriptionsStore;
} {
  return {
    webhookEvents: buildDrizzleWebhookEventStore(db),
    payments: buildDrizzlePaymentsStore(db),
    subscriptions: buildDrizzleSubscriptionsStore(db),
  };
}
