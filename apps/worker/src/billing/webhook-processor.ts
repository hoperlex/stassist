/**
 * Применение эффекта вебхука ЮKassa — ДУБЛИКАТ бизнес-логики `apps/api/src/billing/
 * webhook-processor.ts` (`applyYookassaWebhookEffect`), намеренно (apps/api и apps/worker —
 * отдельные деплой-юниты без общего internal-пакета для одной функции, см. тот же паттерн
 * дублирования, что `apps/worker/src/llm/charts-repository.ts` vs `apps/api/src/repositories/
 * charts-repository.ts` по всей кодовой базе). Используется ТОЛЬКО retry-джобой (`webhook-retry-
 * job.ts`) — API применяет эту же логику синхронно на новых событиях, worker — повторно на
 * `processed_at IS NULL` (см. doc-комментарий packages/db/src/schema/webhook-events.ts).
 */
import type { PaymentStatus, SubscriptionStatus, YookassaWebhookEvent } from '@stassist/shared';

export interface PaymentLookup {
  id: string;
  status: PaymentStatus;
  subscriptionId: string | null;
}

export interface PaymentsStore {
  findByProviderPaymentId(providerPaymentId: string): Promise<PaymentLookup | null>;
  updateStatus(id: string, status: PaymentStatus): Promise<void>;
}

export interface SubscriptionsStore {
  updateStatus(id: string, status: SubscriptionStatus): Promise<void>;
}

export async function applyYookassaWebhookEffect(
  event: YookassaWebhookEvent,
  stores: { payments: PaymentsStore; subscriptions: SubscriptionsStore },
): Promise<void> {
  if (event.event === 'payment.succeeded') {
    const payment = await stores.payments.findByProviderPaymentId(event.object.id);
    if (!payment) return;
    await stores.payments.updateStatus(payment.id, 'succeeded');
    if (payment.subscriptionId) await stores.subscriptions.updateStatus(payment.subscriptionId, 'active');
    return;
  }
  if (event.event === 'payment.canceled') {
    const payment = await stores.payments.findByProviderPaymentId(event.object.id);
    if (!payment) return;
    await stores.payments.updateStatus(payment.id, 'canceled');
    if (payment.subscriptionId) await stores.subscriptions.updateStatus(payment.subscriptionId, 'past_due');
    return;
  }
  if (event.event === 'refund.succeeded') {
    const paymentId = (event.object as Record<string, unknown>).payment_id;
    if (typeof paymentId !== 'string') return;
    const payment = await stores.payments.findByProviderPaymentId(paymentId);
    if (!payment) return;
    await stores.payments.updateStatus(payment.id, 'refunded');
  }
}
