/**
 * Биллинг: планы, подписка, платежи, промокоды, чеки 54-ФЗ (см. docs/architecture/
 * 22-модель-данных.md §4, промт Ф8 req.1-2). Единый источник правды цен/фич — `PLAN_CATALOG`;
 * API читает его напрямую (маленький статичный каталог) и синхронизирует с таблицей `plans`
 * (материализация тех же кодов для FK `subscriptions.plan_code`, см.
 * packages/db/src/schema/plans.ts) прямо в миграции 0008.
 */
import { z } from 'zod';

export const planCodeSchema = z.enum(['free', 'premium_m', 'premium_y']);
export type PlanCode = z.infer<typeof planCodeSchema>;

export const paidPlanCodeSchema = z.enum(['premium_m', 'premium_y']);
export type PaidPlanCode = z.infer<typeof paidPlanCodeSchema>;

export const planPeriodSchema = z.enum(['none', 'month', 'year']);
export type PlanPeriod = z.infer<typeof planPeriodSchema>;

export interface PlanCatalogEntry {
  code: PlanCode;
  titleRu: string;
  priceKop: number;
  period: PlanPeriod;
  trialDays: number;
  features: string[];
}

/** Цены и триал — req.2 промта Ф8 буквально: «349 ₽/мес, 2 490 ₽/год, триал 7 дней». */
export const PLAN_CATALOG: Record<PlanCode, PlanCatalogEntry> = {
  free: {
    code: 'free',
    titleRu: 'Бесплатный',
    priceKop: 0,
    period: 'none',
    trialDays: 0,
    features: [
      'Расчёт натальной карты, матрицы судьбы, психоматрицы и совместимости',
      'Краткий персональный гороскоп на день',
      'Один полный ИИ-разбор «Большая тройка» бесплатно',
      'Публичная лента гороскопов, база знаний и калькуляторы без ограничений',
    ],
  },
  premium_m: {
    code: 'premium_m',
    titleRu: 'Премиум (месяц)',
    priceKop: 34_900,
    period: 'month',
    trialDays: 7,
    features: [
      'Полная персональная лента прогнозов — день и неделя, без сокращений',
      'Безлимитный чат с ИИ-астропомощником по вашей карте',
      'Полные разборы: натальная карта, синастрия, соляр, транзиты месяца',
      'Скидка 20% на PDF-отчёты и индивидуальные прогнозы',
      'Отмена подписки в один клик в любой момент, доступ сохраняется до конца периода',
    ],
  },
  premium_y: {
    code: 'premium_y',
    titleRu: 'Премиум (год)',
    priceKop: 249_000,
    period: 'year',
    trialDays: 7,
    features: [
      'Все возможности месячного плана',
      'Экономия — как 2 месяца бесплатно по сравнению с помесячной оплатой',
      'Приоритетная очередь генерации отчётов',
    ],
  },
};

export function isPaidPlanCode(code: string): code is PaidPlanCode {
  return code === 'premium_m' || code === 'premium_y';
}

/** ЧИСТАЯ функция сдвига даты на календарный период — используется и API (создание подписки), и
 *  worker (продление при успешном рекуррентном списании). Для сдвига на N дней (триал) — уже
 *  есть `addDays` в `horoscope-date-keys.ts` (тот же файл барреля `@stassist/shared`), не
 *  дублируем. */
export function addPlanPeriod(date: Date, period: PlanPeriod): Date {
  const d = new Date(date);
  if (period === 'month') d.setUTCMonth(d.getUTCMonth() + 1);
  else if (period === 'year') d.setUTCFullYear(d.getUTCFullYear() + 1);
  return d;
}

/** Грейс-период после неудачного списания (req.2 промта Ф8: «past_due (грейс 3 дня)»). */
export const SUBSCRIPTION_PAST_DUE_GRACE_DAYS = 3;

export const subscriptionStatusSchema = z.enum(['trial', 'active', 'past_due', 'cancelled', 'expired']);
export type SubscriptionStatus = z.infer<typeof subscriptionStatusSchema>;

/** Доступ к премиум-функциям сохраняется весь грейс-период, а не обрывается на первой неудаче
 *  списания (см. doc-комментарий `subscriptionStatusEnum` в packages/db/src/schema/enums.ts). */
export function isPremiumAccessActive(status: SubscriptionStatus): boolean {
  return status === 'trial' || status === 'active' || status === 'past_due';
}

export const paymentProviderNameSchema = z.enum(['yookassa', 'cloudpayments', 'stub']);
export type PaymentProviderName = z.infer<typeof paymentProviderNameSchema>;

export const subscriptionResponseSchema = z.object({
  id: z.string().uuid(),
  planCode: planCodeSchema,
  status: subscriptionStatusSchema,
  startedAt: z.string(),
  currentPeriodEnd: z.string(),
  cancelAtPeriodEnd: z.boolean(),
  provider: paymentProviderNameSchema,
});
export type SubscriptionResponse = z.infer<typeof subscriptionResponseSchema>;

/** `null` — пользователь никогда не подписывался (по умолчанию на free-плане, для которого
 *  строка `subscriptions` не создаётся, см. doc-комментарий webhook-events.ts аналогичного
 *  паттерна «отсутствие строки = дефолт»). */
export const subscriptionMeResponseSchema = z.object({ subscription: subscriptionResponseSchema.nullable() });
export type SubscriptionMeResponse = z.infer<typeof subscriptionMeResponseSchema>;

export const subscriptionCreateRequestSchema = z.object({
  planCode: paidPlanCodeSchema,
  promoCode: z.string().trim().min(1).max(64).optional(),
});
export type SubscriptionCreateRequest = z.infer<typeof subscriptionCreateRequestSchema>;

export const paymentStatusSchema = z.enum(['pending', 'succeeded', 'canceled', 'refunded']);
export type PaymentStatus = z.infer<typeof paymentStatusSchema>;

export const paymentResponseSchema = z.object({
  id: z.string().uuid(),
  provider: paymentProviderNameSchema,
  amountKop: z.number().int(),
  currency: z.string(),
  status: paymentStatusSchema,
  receiptStatus: z.enum(['not_required', 'pending', 'sent', 'failed']),
  createdAt: z.string(),
});
export type PaymentResponse = z.infer<typeof paymentResponseSchema>;

export const paymentListResponseSchema = z.object({ items: z.array(paymentResponseSchema) });

/** Возврат из минимальной админ-поверхности (req.1 промта Ф8 «возвраты из админки», закрывает
 *  MINOR-находку f8.md — endpoint под ролью admin, не полноценная админ-панель). */
export const paymentRefundRequestSchema = z.object({
  amountKop: z.number().int().positive().optional(), // не задано = полный возврат
  reason: z.string().trim().min(1).max(500).optional(),
});
export type PaymentRefundRequest = z.infer<typeof paymentRefundRequestSchema>;

// --- промокоды ---

export const promoCodeKindSchema = z.enum(['percent_discount', 'fixed_discount_kop', 'trial_extension_days']);
export type PromoCodeKind = z.infer<typeof promoCodeKindSchema>;

export const promoCodeValidateRequestSchema = z.object({ code: z.string().trim().min(1).max(64) });
export type PromoCodeValidateRequest = z.infer<typeof promoCodeValidateRequestSchema>;

export const promoCodeValidateResponseSchema = z.object({
  valid: z.boolean(),
  kind: promoCodeKindSchema.optional(),
  value: z.number().int().optional(),
  /** Честная причина невалидности — не выдумываем «просто false» (`not_found`/`expired`/`exhausted`). */
  reason: z.enum(['not_found', 'expired', 'exhausted']).optional(),
});
export type PromoCodeValidateResponse = z.infer<typeof promoCodeValidateResponseSchema>;

/** Применяет промокод к цене плана — ЧИСТАЯ функция (детерминизм по §5 корневого CLAUDE.md: цены
 *  считаются кодом, не «на глаз»). Возвращает cкорректированную цену И доп. дни триала. */
export function applyPromoCodeToPrice(
  priceKop: number,
  trialDays: number,
  promo: { kind: PromoCodeKind; value: number } | null,
): { priceKop: number; trialDays: number } {
  if (!promo) return { priceKop, trialDays };
  if (promo.kind === 'percent_discount') {
    const clampedPercent = Math.min(100, Math.max(0, promo.value));
    return { priceKop: Math.round(priceKop * (1 - clampedPercent / 100)), trialDays };
  }
  if (promo.kind === 'fixed_discount_kop') {
    return { priceKop: Math.max(0, priceKop - promo.value), trialDays };
  }
  // trial_extension_days
  return { priceKop, trialDays: trialDays + Math.max(0, promo.value) };
}

// --- вебхуки провайдера ---

/**
 * ЮKassa не предоставляет HMAC-подпись вебхуков «из коробки» (официальная рекомендация — IP
 * allowlist + сверка статуса платежа через `GET /payments/{id}`, см. `_work/build/findings/
 * f8.md` [billing-без-провайдера]: «подпись проверяется» трактуем как ДОПОЛНИТЕЛЬНЫЙ, наш
 * собственный слой защиты). Реализуем свой HMAC-SHA256 над телом запроса с секретом
 * `YOOKASSA_WEBHOOK_SECRET` (опционален — если не задан, слой выключен и полагаемся на реальный
 * IP allowlist на проде, см. launch-checklist.md); это ЧЕСТНО задокументировано как наше
 * дополнение, а не «фича протокола ЮKassa».
 */
export const WEBHOOK_SIGNATURE_HEADER = 'x-stassist-webhook-signature';

export const yookassaWebhookEventSchema = z
  .object({
    type: z.string(),
    event: z.string(),
    object: z
      .object({
        id: z.string(),
        status: z.string(),
        amount: z.object({ value: z.string(), currency: z.string() }).optional(),
        metadata: z.record(z.string(), z.string()).optional(),
      })
      .passthrough(),
  })
  .passthrough();
export type YookassaWebhookEvent = z.infer<typeof yookassaWebhookEventSchema>;
