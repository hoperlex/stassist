/**
 * Порт платёжного провайдера. Реальная реализация — ЮKassa (+СБП), поздние фазы (Ф8);
 * стаб — детерминированный FakePaymentProvider, всегда «успешно» проводит платёж.
 */
import { createHash } from 'node:crypto';

export interface CreatePaymentInput {
  amountKop: number;
  currency?: string;
  description: string;
  idempotencyKey: string;
}

export interface PaymentResult {
  id: string;
  status: 'pending' | 'succeeded' | 'canceled';
  confirmationUrl?: string;
}

export interface PaymentProvider {
  createPayment(input: CreatePaymentInput): Promise<PaymentResult>;
  getPayment(id: string): Promise<PaymentResult>;
}

export class FakePaymentProvider implements PaymentProvider {
  private readonly payments = new Map<string, PaymentResult>();

  async createPayment(input: CreatePaymentInput): Promise<PaymentResult> {
    const id = `stub_${createHash('sha256').update(input.idempotencyKey).digest('hex').slice(0, 24)}`;
    const result: PaymentResult = { id, status: 'succeeded' };
    this.payments.set(id, result);
    return result;
  }

  async getPayment(id: string): Promise<PaymentResult> {
    return this.payments.get(id) ?? { id, status: 'canceled' };
  }
}
