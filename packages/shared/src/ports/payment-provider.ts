/**
 * Порт платёжного провайдера. Реальная реализация — ЮKassa (+СБП, Ф8, см.
 * yookassa-payment-provider.ts); стаб — детерминированный FakePaymentProvider (дефолт локально,
 * см. §2 конвенций реализации), всегда «успешно» проводит платёж.
 */
import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

export interface CreatePaymentInput {
  amountKop: number;
  currency?: string;
  description: string;
  idempotencyKey: string;
  /** Ф8: сохранить способ оплаты для будущих рекуррентных списаний подписки (первый платёж). */
  savePaymentMethod?: boolean;
  /** Ф8: ID уже сохранённого способа оплаты — рекуррентное списание без участия пользователя
   *  (последующие платежи подписки). */
  paymentMethodId?: string;
  /** Метаданные, которые провайдер обязан вернуть КАК ЕСТЬ в вебхуке (напр. `paymentId` нашей
   *  строки `payments` — чтобы обработчик вебхука мог найти нужную запись без доп. запроса). */
  metadata?: Record<string, string>;
  /** 54-ФЗ: позиции чека для встроенной фискализации провайдера (см. yookassa-payment-provider.ts
   *  `createPayment` — маппится в `receipt` тела запроса ЮKassa). Не задано = платёж без чека
   *  (`payments.receipt_status='not_required'` — см. receiptStatusEnum). FakePaymentProvider
   *  игнорирует это поле (стаб не фискализирует). */
  receipt?: {
    customerEmail: string;
    items: Array<{ descriptionRu: string; amountKop: number; quantity?: number; vatCode?: number }>;
  };
}

export interface PaymentResult {
  id: string;
  status: 'pending' | 'succeeded' | 'canceled';
  confirmationUrl?: string;
  /** Заполнен, если `savePaymentMethod=true` и способ оплаты успешно сохранён провайдером. */
  paymentMethodId?: string;
}

export interface RefundInput {
  paymentId: string;
  /** Не задано = полный возврат суммы платежа. */
  amountKop?: number;
}

export interface RefundResult {
  id: string;
  status: 'pending' | 'succeeded' | 'canceled';
}

export interface PaymentProvider {
  createPayment(input: CreatePaymentInput): Promise<PaymentResult>;
  getPayment(id: string): Promise<PaymentResult>;
  refundPayment(input: RefundInput): Promise<RefundResult>;
}

export class FakePaymentProvider implements PaymentProvider {
  private readonly payments = new Map<string, PaymentResult>();

  async createPayment(input: CreatePaymentInput): Promise<PaymentResult> {
    const id = `stub_${createHash('sha256').update(input.idempotencyKey).digest('hex').slice(0, 24)}`;
    const result: PaymentResult = {
      id,
      status: 'succeeded',
      ...(input.savePaymentMethod ? { paymentMethodId: `stub_pm_${id}` } : {}),
    };
    this.payments.set(id, result);
    return result;
  }

  async getPayment(id: string): Promise<PaymentResult> {
    return this.payments.get(id) ?? { id, status: 'canceled' };
  }

  async refundPayment(input: RefundInput): Promise<RefundResult> {
    const payment = this.payments.get(input.paymentId);
    if (payment) this.payments.set(input.paymentId, { ...payment, status: 'canceled' });
    return { id: `refund_${input.paymentId}`, status: 'succeeded' };
  }
}

/**
 * ЮKassa не выдаёт HMAC-подпись вебхуков «из коробки» (официальная рекомендация — IP allowlist +
 * сверка через `GET /payments/{id}`, см. doc-комментарий `WEBHOOK_SIGNATURE_HEADER` в
 * packages/shared/src/schemas/billing.ts). Это НАШ дополнительный слой: HMAC-SHA256 над сырым
 * телом запроса, включается опционально через `YOOKASSA_WEBHOOK_SECRET` — ЧИСТЫЕ функции, без
 * сети, юнит-тестируемые (закрывает находку [billing-без-провайдера] f8.md: «подпись
 * проверяется» → «подделка подписи → 401»).
 */
export function signWebhookPayload(rawBody: string, secret: string): string {
  return createHmac('sha256', secret).update(rawBody, 'utf8').digest('hex');
}

export function verifyWebhookSignature(rawBody: string, signatureHeader: string | undefined, secret: string): boolean {
  if (!signatureHeader) return false;
  const expectedHex = signWebhookPayload(rawBody, secret);
  const expected = Buffer.from(expectedHex, 'hex');
  let provided: Buffer;
  try {
    provided = Buffer.from(signatureHeader, 'hex');
  } catch {
    return false;
  }
  if (expected.length !== provided.length) return false;
  return timingSafeEqual(expected, provided);
}
