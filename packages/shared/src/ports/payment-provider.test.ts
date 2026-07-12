import { describe, expect, it } from 'vitest';
import { FakePaymentProvider, signWebhookPayload, verifyWebhookSignature } from './payment-provider.js';

describe('FakePaymentProvider', () => {
  it('создаёт платёж и сразу помечает succeeded', async () => {
    const provider = new FakePaymentProvider();
    const payment = await provider.createPayment({
      amountKop: 100_00,
      description: 'тест',
      idempotencyKey: 'idem-1',
    });
    expect(payment.status).toBe('succeeded');
    expect(await provider.getPayment(payment.id)).toEqual(payment);
  });

  it('детерминирован по idempotencyKey', async () => {
    const provider = new FakePaymentProvider();
    const a = await provider.createPayment({
      amountKop: 1,
      description: 'a',
      idempotencyKey: 'same',
    });
    const b = await provider.createPayment({
      amountKop: 2,
      description: 'b',
      idempotencyKey: 'same',
    });
    expect(a.id).toBe(b.id);
  });

  it('savePaymentMethod возвращает paymentMethodId (для рекуррентных списаний подписки)', async () => {
    const provider = new FakePaymentProvider();
    const payment = await provider.createPayment({
      amountKop: 34_900,
      description: 'подписка',
      idempotencyKey: 'sub-1',
      savePaymentMethod: true,
    });
    expect(payment.paymentMethodId).toBeDefined();
  });

  it('refundPayment переводит платёж в canceled', async () => {
    const provider = new FakePaymentProvider();
    const payment = await provider.createPayment({ amountKop: 100_00, description: 'x', idempotencyKey: 'r-1' });
    const refund = await provider.refundPayment({ paymentId: payment.id });
    expect(refund.status).toBe('succeeded');
    expect((await provider.getPayment(payment.id)).status).toBe('canceled');
  });
});

describe('webhook: signWebhookPayload/verifyWebhookSignature (наш HMAC-слой поверх вебхука)', () => {
  it('корректная подпись верифицируется успешно', () => {
    const body = JSON.stringify({ event: 'payment.succeeded', object: { id: 'p-1' } });
    const secret = 'test-secret';
    const signature = signWebhookPayload(body, secret);
    expect(verifyWebhookSignature(body, signature, secret)).toBe(true);
  });

  it('подделанная подпись — не проходит (закрывает верификацию промта Ф8: «подделка подписи → 401»)', () => {
    const body = JSON.stringify({ event: 'payment.succeeded', object: { id: 'p-1' } });
    const secret = 'test-secret';
    expect(verifyWebhookSignature(body, 'deadbeef'.repeat(8), secret)).toBe(false);
    expect(verifyWebhookSignature(body, undefined, secret)).toBe(false);
    expect(verifyWebhookSignature(body, 'not-hex-!!', secret)).toBe(false);
  });

  it('изменённое тело запроса при той же подписи — не проходит', () => {
    const secret = 'test-secret';
    const original = JSON.stringify({ event: 'payment.succeeded', object: { id: 'p-1' } });
    const tampered = JSON.stringify({ event: 'payment.succeeded', object: { id: 'p-2' } });
    const signature = signWebhookPayload(original, secret);
    expect(verifyWebhookSignature(tampered, signature, secret)).toBe(false);
  });

  it('иной секрет даёт иную подпись', () => {
    const body = JSON.stringify({ a: 1 });
    expect(signWebhookPayload(body, 'secret-a')).not.toBe(signWebhookPayload(body, 'secret-b'));
  });
});
