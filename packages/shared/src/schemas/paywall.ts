/**
 * Пейвол — экран подписки после квиза (промт Ф8 req.3). Находка [контент/спецификация] f8.md:
 * «явно определить два A/B-варианта пейвола (в чём отличие — оффер/цена/копирайт) и код
 * эксперимента» — здесь заданы 2 конкретных варианта + деterministic-маппинг ответов квиза →
 * персонализация заголовка (§7б doc 22: `experiments.code='paywall_v1'`, `experiment_events`).
 */
import { z } from 'zod';
import { PLAN_CATALOG } from './billing.js';
import { quizSphereSchema, type QuizSphere } from './quiz.js';

export const PAYWALL_EXPERIMENT_CODE = 'paywall_v1';

/**
 * 2 варианта, различающиеся ОФФЕРОМ и порядком акцентов (не ценой — цена одна и та же плановая
 * сетка, промт Ф8 req.2 не даёт оснований тестировать разные цены):
 * - `control` — акцент на содержании подписки (список возможностей).
 * - `trial_first` — акцент на безрисковом триале и лёгкой отмене (снятие тревоги «подписка
 *   навсегда»), список возможностей — тот же, но ПОСЛЕ оффера триала.
 */
export const PAYWALL_VARIANTS = ['control', 'trial_first'] as const;
export const paywallVariantSchema = z.enum(PAYWALL_VARIANTS);
export type PaywallVariant = z.infer<typeof paywallVariantSchema>;

/** Детерминированное распределение по варианту — стабильно для одного и того же seed (userId
 *  либо anonId), без отдельной таблицы назначений (см. doc-комментарий packages/db/src/schema/
 *  experiment-events.ts: `experiment_events` — журнал событий, а не таблица назначений). */
export function assignPaywallVariant(seed: string): PaywallVariant {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return PAYWALL_VARIANTS[hash % PAYWALL_VARIANTS.length]!;
}

/** Персонализация заголовка по сфере интереса квиза (req.3 промта: «тексты вариируются по
 *  ответам») — фраза подставляется в шаблон заголовка варианта. */
const SPHERE_FOCUS_PHRASE_RU: Record<QuizSphere, string> = {
  love: 'в отношениях',
  career: 'в карьере и делах',
  money: 'в финансах',
  self: 'в самопознании',
  health: 'в здоровье и энергии',
  family: 'в семье',
};

export interface PaywallContent {
  variant: PaywallVariant;
  headlineRu: string;
  subheadlineRu: string;
  bullets: string[];
  ctaLabelRu: string;
  badgeRu: string | null;
  planCode: 'premium_m';
  priceKop: number;
  trialDays: number;
}

/** ЧИСТАЯ функция сборки контента пейвола — детерминирована по (variant, sphere), тестируется
 *  без сети/БД (см. §1 конвенций реализации). */
export function buildPaywallContent(variant: PaywallVariant, sphere: QuizSphere | null): PaywallContent {
  const plan = PLAN_CATALOG.premium_m;
  const focus = sphere ? SPHERE_FOCUS_PHRASE_RU[sphere] : 'в жизни';

  if (variant === 'trial_first') {
    return {
      variant,
      headlineRu: `7 дней Премиума ${focus} — бесплатно`,
      subheadlineRu:
        'Попробуйте полный доступ без риска: карту не спишем деньги, пока не закончится пробный период, отменить можно в один клик в любой момент.',
      bullets: [
        `Списание только через ${plan.trialDays} дней, если не отмените — напомним заранее`,
        'Отмена подписки в один клик, доступ остаётся до конца оплаченного периода',
        ...plan.features.slice(0, 3),
      ],
      ctaLabelRu: 'Попробовать бесплатно',
      badgeRu: `${plan.trialDays} дней бесплатно`,
      planCode: 'premium_m',
      priceKop: plan.priceKop,
      trialDays: plan.trialDays,
    };
  }

  return {
    variant,
    headlineRu: `Откройте полный потенциал вашей карты ${focus}`,
    subheadlineRu: 'Премиум-подписка Зодиакум: персональная лента прогнозов, безлимитный ИИ-чат и полные разборы карты.',
    bullets: [...plan.features],
    ctaLabelRu: `Начать — ${plan.trialDays} дней бесплатно`,
    badgeRu: null,
    planCode: 'premium_m',
    priceKop: plan.priceKop,
    trialDays: plan.trialDays,
  };
}

export const paywallExposeRequestSchema = z.object({
  anonId: z.string().min(1).max(128).optional(),
  sphere: quizSphereSchema.optional(),
});
export type PaywallExposeRequest = z.infer<typeof paywallExposeRequestSchema>;

export const paywallContentResponseSchema = z.object({
  variant: paywallVariantSchema,
  headlineRu: z.string(),
  subheadlineRu: z.string(),
  bullets: z.array(z.string()),
  ctaLabelRu: z.string(),
  badgeRu: z.string().nullable(),
  planCode: z.literal('premium_m'),
  priceKop: z.number().int(),
  trialDays: z.number().int(),
});
export type PaywallContentResponse = z.infer<typeof paywallContentResponseSchema>;

export const experimentConvertRequestSchema = z.object({
  anonId: z.string().min(1).max(128).optional(),
  variant: paywallVariantSchema,
  meta: z.record(z.string(), z.unknown()).optional(),
});
export type ExperimentConvertRequest = z.infer<typeof experimentConvertRequestSchema>;
