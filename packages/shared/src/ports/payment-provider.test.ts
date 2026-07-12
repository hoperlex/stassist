import { describe, expect, it } from 'vitest';
import { FakePaymentProvider } from './payment-provider.js';

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
});
