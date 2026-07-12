/**
 * Идемпотентная обработка вебхуков ЮKassa — за интерфейсами хранилищ (закрывает находку
 * [billing-без-провайдера] f8.md: «логика идемпотентности через in-memory-репозиторий» для
 * unit-теста; см. `webhook-processor.test.ts` — тест с `InMemory*Store` без БД/сети).
 * Реальная реализация интерфейсов — `drizzle-webhook-stores.ts` (используется
 * `apps/api/src/routes/webhooks.ts` и `apps/worker` retry-джобой, см. doc-комментарий
 * `packages/db/src/schema/webhook-events.ts`).
 */
import type { PaymentStatus, SubscriptionStatus, YookassaWebhookEvent } from '@stassist/shared';

export interface WebhookEventStore {
  /** `isNew=false` — событие с этим `eventId` уже было записано (повторная доставка). */
  insertIfNew(input: {
    provider: 'yookassa';
    eventId: string;
    type: string;
    payload: Record<string, unknown>;
  }): Promise<{ id: string; isNew: boolean }>;
  markProcessed(id: string): Promise<void>;
}

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

/**
 * ЮKassa не присылает отдельное «ID события» в теле уведомления (формат —
 * `{ type, event, object: { id, status, … } }`, см. doc-комментарий `routes/webhooks.ts`).
 * Композитный ключ `event:objectId:status` — ЧЕСТНАЯ, детерминированная интерпретация под
 * реальный формат API: повторная доставка ТОГО ЖЕ перехода статуса не задваивает эффект, а
 * новый переход (pending→succeeded) получает новый ключ.
 */
export function buildYookassaEventId(event: YookassaWebhookEvent): string {
  return `${event.event}:${event.object.id}:${event.object.status}`;
}

/**
 * Применяет ЭФФЕКТ события (обновление `payments`/`subscriptions`) — БЕЗ учёта идемпотентности
 * (вызывающий код отвечает за то, чтобы вызвать это ровно один раз на событие). Используется и
 * API-роутом (синхронно после успешной записи в `webhook_events`), и worker-джобой ретраев (для
 * событий с `processed_at IS NULL`) — единая логика, не дублируется в двух местах.
 */
export async function applyYookassaWebhookEffect(
  event: YookassaWebhookEvent,
  stores: { payments: PaymentsStore; subscriptions: SubscriptionsStore },
): Promise<void> {
  if (event.event === 'payment.succeeded') {
    const payment = await stores.payments.findByProviderPaymentId(event.object.id);
    if (!payment) return; // платёж создан не через наш API (либо ещё не записан) — честно игнорируем
    await stores.payments.updateStatus(payment.id, 'succeeded');
    if (payment.subscriptionId) await stores.subscriptions.updateStatus(payment.subscriptionId, 'active');
    return;
  }
  if (event.event === 'payment.canceled') {
    const payment = await stores.payments.findByProviderPaymentId(event.object.id);
    if (!payment) return;
    await stores.payments.updateStatus(payment.id, 'canceled');
    // Неудачное СПИСАНИЕ по подписке (рекуррентный платёж) → грейс-период (past_due), НЕ instant
    // отмена — см. doc-комментарий subscriptionStatusEnum. Первый платёж при заводе подписки
    // (createPayment) в MVP подтверждается синхронно (FakePaymentProvider) — до вебхука
    // subscriptions.status уже 'trial'/'active'; canceled-вебхук по НЕЙ актуален только для
    // последующих рекуррентных списаний (см. apps/worker renewal sweep).
    if (payment.subscriptionId) await stores.subscriptions.updateStatus(payment.subscriptionId, 'past_due');
    return;
  }
  if (event.event === 'refund.succeeded') {
    // Реальный вебхук возврата: object.id — ID ВОЗВРАТА, а платёж — в object.payment_id (см.
    // yookassaWebhookEventSchema `.passthrough()` — поле есть в реальном ответе API, не в нашей
    // строгой схеме, читаем defensively).
    const paymentId = (event.object as Record<string, unknown>).payment_id;
    if (typeof paymentId !== 'string') return;
    const payment = await stores.payments.findByProviderPaymentId(paymentId);
    if (!payment) return;
    await stores.payments.updateStatus(payment.id, 'refunded');
  }
  // Другие типы событий (payment.waiting_for_capture и т.п.) — намеренно без эффекта в MVP.
}

export interface RecordAndApplyResult {
  duplicate: boolean;
}

/**
 * Оркестрирует «идемпотентная запись → применение эффекта → пометка processed» одним вызовом —
 * используется API-роутом. Если `applyYookassaWebhookEffect` бросает — строка `webhook_events`
 * УЖЕ записана (не задвоится при повторной доставке), но `processedAt` остаётся `null` —
 * `apps/worker` подберёт по расписанию (см. doc-комментарий webhook-events.ts).
 */
export async function recordAndApplyYookassaWebhook(
  event: YookassaWebhookEvent,
  stores: { webhookEvents: WebhookEventStore; payments: PaymentsStore; subscriptions: SubscriptionsStore },
): Promise<RecordAndApplyResult> {
  const eventId = buildYookassaEventId(event);
  const inserted = await stores.webhookEvents.insertIfNew({
    provider: 'yookassa',
    eventId,
    type: event.event,
    payload: event,
  });
  if (!inserted.isNew) return { duplicate: true };

  await applyYookassaWebhookEffect(event, stores);
  await stores.webhookEvents.markProcessed(inserted.id);
  return { duplicate: false };
}
