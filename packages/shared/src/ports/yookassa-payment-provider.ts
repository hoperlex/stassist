/**
 * Реальный адаптер: ЮKassa REST API v3 (`https://api.yookassa.ru/v3`), Basic Auth
 * (`shopId:secretKey`), идемпотентность через заголовок `Idempotence-Key`. Разовые платежи и
 * первый платёж подписки (`savePaymentMethod: true` → `save_payment_method`), последующие
 * рекуррентные списания — `paymentMethodId` → `payment_method_id` (без участия пользователя,
 * подтверждения `confirmation` не требуется). СБП — отдельный `payment_method_data.type='sbp'`,
 * НЕ реализован отдельным полем в MVP: ЮKassa сама предлагает способ оплаты (включая СБП) на
 * экране `confirmation_url`, если он подключён в личном кабинете мерчанта (см. launch-checklist.md
 * «требует ручного шага: активация СБП у ЮKassa»).
 *
 * НЕ используется в этой фазе с реальными ключами — инстанцируется только при `PAYMENTS=yookassa`
 * (см. ports/factory.ts) и НЕ поднимается в unit/build-гейте (§1 конвенций реализации:
 * инфра-зависимая проверка — integration/e2e, требует живой песочницы ЮKassa, см.
 * `_report/build/launch-checklist.md`). Чеки 54-ФЗ — каркас: `receipt` в теле создания платежа
 * передаётся, только если вызывающий код заполнил `CreatePaymentInput.receipt` (см.
 * payment-provider.ts) — иначе платёж проходит без встроенной фискализации ЮKassa. Ставка НДС по
 * умолчанию (`vatCode=1`, «без НДС» — типично для физлица/самозанятого на НПД) и реальная
 * номенклатура/ставка подтверждаются бухгалтерией заказчика при онбординге (см. doc-комментарий
 * `receiptStatusEnum` в packages/db/src/schema/enums.ts и launch-checklist.md) — это НЕ полная
 * аудированная 54-ФЗ интеграция, а рабочий каркас.
 */
import type {
  CreatePaymentInput,
  PaymentProvider,
  PaymentResult,
  RefundInput,
  RefundResult,
} from './payment-provider.js';

const YOOKASSA_API_BASE = 'https://api.yookassa.ru/v3';

interface YookassaAmountDto {
  value: string;
  currency: string;
}

interface YookassaPaymentDto {
  id: string;
  status: 'pending' | 'waiting_for_capture' | 'succeeded' | 'canceled';
  amount: YookassaAmountDto;
  confirmation?: { confirmation_url?: string };
  payment_method?: { id?: string; saved?: boolean };
}

function mapStatus(status: YookassaPaymentDto['status']): PaymentResult['status'] {
  if (status === 'succeeded') return 'succeeded';
  if (status === 'canceled') return 'canceled';
  return 'pending'; // pending | waiting_for_capture
}

function toRubString(amountKop: number): string {
  return (amountKop / 100).toFixed(2);
}

export interface YookassaPaymentProviderOptions {
  shopId: string;
  secretKey: string;
  /** URL, на который ЮKassa вернёт пользователя после оплаты (`confirmation.return_url`). */
  returnUrl: string;
  fetchImpl?: typeof fetch;
}

export class YookassaPaymentProvider implements PaymentProvider {
  private readonly shopId: string;
  private readonly secretKey: string;
  private readonly returnUrl: string;
  private readonly fetchImpl: typeof fetch;

  constructor(options: YookassaPaymentProviderOptions) {
    this.shopId = options.shopId;
    this.secretKey = options.secretKey;
    this.returnUrl = options.returnUrl;
    this.fetchImpl = options.fetchImpl ?? fetch;
  }

  private authHeader(): string {
    return `Basic ${Buffer.from(`${this.shopId}:${this.secretKey}`).toString('base64')}`;
  }

  private async request<T>(path: string, init: RequestInit & { idempotenceKey?: string } = {}): Promise<T> {
    const { idempotenceKey, ...rest } = init;
    const res = await this.fetchImpl(`${YOOKASSA_API_BASE}${path}`, {
      ...rest,
      headers: {
        Authorization: this.authHeader(),
        'Content-Type': 'application/json',
        ...(idempotenceKey ? { 'Idempotence-Key': idempotenceKey } : {}),
        ...(rest.headers ?? {}),
      },
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new Error(`ЮKassa ${path}: HTTP ${res.status} ${body}`);
    }
    return (await res.json()) as T;
  }

  async createPayment(input: CreatePaymentInput): Promise<PaymentResult> {
    const data = await this.request<YookassaPaymentDto>('/payments', {
      method: 'POST',
      idempotenceKey: input.idempotencyKey,
      body: JSON.stringify({
        amount: { value: toRubString(input.amountKop), currency: input.currency ?? 'RUB' },
        capture: true,
        description: input.description.slice(0, 128), // лимит ЮKassa на описание
        ...(input.paymentMethodId
          ? { payment_method_id: input.paymentMethodId }
          : { confirmation: { type: 'redirect', return_url: this.returnUrl } }),
        ...(input.savePaymentMethod ? { save_payment_method: true } : {}),
        ...(input.metadata ? { metadata: input.metadata } : {}),
        ...(input.receipt
          ? {
              receipt: {
                customer: { email: input.receipt.customerEmail },
                items: input.receipt.items.map((item) => ({
                  description: item.descriptionRu.slice(0, 128),
                  quantity: String(item.quantity ?? 1),
                  amount: { value: toRubString(item.amountKop), currency: input.currency ?? 'RUB' },
                  vat_code: item.vatCode ?? 1,
                  payment_mode: 'full_payment',
                  payment_subject: 'service',
                })),
              },
            }
          : {}),
      }),
    });
    return {
      id: data.id,
      status: mapStatus(data.status),
      confirmationUrl: data.confirmation?.confirmation_url,
      paymentMethodId: data.payment_method?.saved ? data.payment_method.id : undefined,
    };
  }

  async getPayment(id: string): Promise<PaymentResult> {
    const data = await this.request<YookassaPaymentDto>(`/payments/${id}`, { method: 'GET' });
    return { id: data.id, status: mapStatus(data.status), confirmationUrl: data.confirmation?.confirmation_url };
  }

  async refundPayment(input: RefundInput): Promise<RefundResult> {
    // Полный возврат: ЮKassa требует сумму явно в теле запроса — запрашиваем исходный платёж,
    // если сумма не передана вызывающим кодом.
    const value =
      input.amountKop != null ? toRubString(input.amountKop) : toRubString((await this.rawAmountKop(input.paymentId)) ?? 0);
    const data = await this.request<{ id: string; status: YookassaPaymentDto['status'] }>('/refunds', {
      method: 'POST',
      idempotenceKey: `refund_${input.paymentId}_${input.amountKop ?? 'full'}`,
      body: JSON.stringify({ payment_id: input.paymentId, amount: { value, currency: 'RUB' } }),
    });
    return { id: data.id, status: mapStatus(data.status) };
  }

  private async rawAmountKop(paymentId: string): Promise<number | undefined> {
    const data = await this.request<YookassaPaymentDto>(`/payments/${paymentId}`, { method: 'GET' });
    return Math.round(Number(data.amount.value) * 100);
  }
}
