/**
 * Unit-тест идемпотентности вебхука — БЕЗ БД/сети, через in-memory-репозитории (закрывает
 * находку [billing-без-провайдера] f8.md и явный пункт «Верификация» промта Ф8: «повторная
 * доставка события не задваивает платёж»).
 */
import { randomUUID } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import type { PaymentStatus, SubscriptionStatus, YookassaWebhookEvent } from '@stassist/shared';
import {
  applyYookassaWebhookEffect,
  buildYookassaEventId,
  recordAndApplyYookassaWebhook,
  type PaymentLookup,
  type PaymentsStore,
  type SubscriptionsStore,
  type WebhookEventStore,
} from './webhook-processor.js';

class InMemoryWebhookEventStore implements WebhookEventStore {
  private readonly byEventId = new Map<string, { id: string; processedAt: Date | null }>();
  insertCalls = 0;

  async insertIfNew(input: { eventId: string }): Promise<{ id: string; isNew: boolean }> {
    this.insertCalls += 1;
    const existing = this.byEventId.get(input.eventId);
    if (existing) return { id: existing.id, isNew: false };
    const id = randomUUID();
    this.byEventId.set(input.eventId, { id, processedAt: null });
    return { id, isNew: true };
  }

  async markProcessed(id: string): Promise<void> {
    for (const record of this.byEventId.values()) {
      if (record.id === id) record.processedAt = new Date();
    }
  }

  isProcessed(eventId: string): boolean {
    return this.byEventId.get(eventId)?.processedAt != null;
  }
}

class InMemoryPaymentsStore implements PaymentsStore {
  updateCalls = 0;
  constructor(private readonly payments: Map<string, PaymentLookup & { providerPaymentId: string }>) {}

  async findByProviderPaymentId(providerPaymentId: string): Promise<PaymentLookup | null> {
    for (const p of this.payments.values()) {
      if (p.providerPaymentId === providerPaymentId) return p;
    }
    return null;
  }

  async updateStatus(id: string, status: PaymentStatus): Promise<void> {
    this.updateCalls += 1;
    const payment = this.payments.get(id);
    if (payment) payment.status = status;
  }
}

class InMemorySubscriptionsStore implements SubscriptionsStore {
  updateCalls = 0;
  constructor(private readonly subscriptions: Map<string, { status: SubscriptionStatus }>) {}

  async updateStatus(id: string, status: SubscriptionStatus): Promise<void> {
    this.updateCalls += 1;
    const sub = this.subscriptions.get(id);
    if (sub) sub.status = status;
  }
}

function makeEvent(overrides: Partial<YookassaWebhookEvent['object']> = {}): YookassaWebhookEvent {
  return {
    type: 'notification',
    event: 'payment.succeeded',
    object: { id: 'payment-123', status: 'succeeded', ...overrides },
  };
}

describe('buildYookassaEventId', () => {
  it('детерминирован по (event, object.id, object.status)', () => {
    const event = makeEvent();
    expect(buildYookassaEventId(event)).toBe(buildYookassaEventId(makeEvent()));
    expect(buildYookassaEventId(event)).toBe('payment.succeeded:payment-123:succeeded');
  });

  it('иной статус того же объекта даёт иной eventId (реальный новый переход, не дубль)', () => {
    const succeeded = makeEvent({ status: 'succeeded' });
    const pending = makeEvent({ status: 'pending' });
    expect(buildYookassaEventId(succeeded)).not.toBe(buildYookassaEventId(pending));
  });
});

describe('recordAndApplyYookassaWebhook: идемпотентность (промт Ф8 «повторная доставка не задваивает платёж»)', () => {
  it('повторная доставка ТОГО ЖЕ события применяет эффект РОВНО ОДИН РАЗ', async () => {
    const paymentId = randomUUID();
    const subscriptionId = randomUUID();
    const payments = new InMemoryPaymentsStore(
      new Map([[paymentId, { id: paymentId, status: 'pending', subscriptionId, providerPaymentId: 'payment-123' }]]),
    );
    const subscriptions = new InMemorySubscriptionsStore(new Map([[subscriptionId, { status: 'trial' }]]));
    const webhookEvents = new InMemoryWebhookEventStore();
    const stores = { webhookEvents, payments, subscriptions };
    const event = makeEvent();

    const first = await recordAndApplyYookassaWebhook(event, stores);
    const second = await recordAndApplyYookassaWebhook(event, stores);
    const third = await recordAndApplyYookassaWebhook(event, stores); // тройная доставка — тоже не задваивает

    expect(first.duplicate).toBe(false);
    expect(second.duplicate).toBe(true);
    expect(third.duplicate).toBe(true);

    // Эффект (обновление payments/subscriptions) применён РОВНО ОДИН раз, не 3.
    expect(payments.updateCalls).toBe(1);
    expect(subscriptions.updateCalls).toBe(1);
    expect(webhookEvents.insertCalls).toBe(3); // попытка вставки была 3 раза, применение — 1
    expect(webhookEvents.isProcessed(buildYookassaEventId(event))).toBe(true);
  });

  it('payment.succeeded переводит подписку в active (первый платёж/продление)', async () => {
    const paymentId = randomUUID();
    const subscriptionId = randomUUID();
    const payments = new InMemoryPaymentsStore(
      new Map([[paymentId, { id: paymentId, status: 'pending', subscriptionId, providerPaymentId: 'payment-123' }]]),
    );
    const subscriptions = new InMemorySubscriptionsStore(new Map([[subscriptionId, { status: 'past_due' }]]));
    const stores = { webhookEvents: new InMemoryWebhookEventStore(), payments, subscriptions };

    await recordAndApplyYookassaWebhook(makeEvent({ status: 'succeeded' }), stores);

    expect(subscriptions.updateCalls).toBe(1);
  });

  it('payment.canceled переводит подписку в past_due', async () => {
    const paymentId = randomUUID();
    const subscriptionId = randomUUID();
    const payments = new InMemoryPaymentsStore(
      new Map([[paymentId, { id: paymentId, status: 'pending', subscriptionId, providerPaymentId: 'payment-123' }]]),
    );
    const subscriptions = new InMemorySubscriptionsStore(new Map([[subscriptionId, { status: 'active' }]]));
    const stores = { webhookEvents: new InMemoryWebhookEventStore(), payments, subscriptions };

    await recordAndApplyYookassaWebhook(
      { type: 'notification', event: 'payment.canceled', object: { id: 'payment-123', status: 'canceled' } },
      stores,
    );

    expect(subscriptions.updateCalls).toBe(1);
  });

  it('refund.succeeded находит платёж по object.payment_id (не object.id — это ID возврата)', async () => {
    const paymentId = randomUUID();
    const payments = new InMemoryPaymentsStore(
      new Map([[paymentId, { id: paymentId, status: 'succeeded', subscriptionId: null, providerPaymentId: 'payment-123' }]]),
    );
    const subscriptions = new InMemorySubscriptionsStore(new Map());
    const stores = { webhookEvents: new InMemoryWebhookEventStore(), payments, subscriptions };

    await applyYookassaWebhookEffect(
      {
        type: 'notification',
        event: 'refund.succeeded',
        object: { id: 'refund-999', status: 'succeeded', payment_id: 'payment-123' },
      },
      stores,
    );

    expect(payments.updateCalls).toBe(1);
  });

  it('неизвестный платёж (не наш) — событие не роняет обработку, эффект просто не применяется', async () => {
    const payments = new InMemoryPaymentsStore(new Map());
    const subscriptions = new InMemorySubscriptionsStore(new Map());
    const stores = { webhookEvents: new InMemoryWebhookEventStore(), payments, subscriptions };

    const result = await recordAndApplyYookassaWebhook(makeEvent(), stores);

    expect(result.duplicate).toBe(false);
    expect(payments.updateCalls).toBe(0);
  });
});
