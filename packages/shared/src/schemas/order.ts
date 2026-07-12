/**
 * orders — заказы PDF-продуктов (Ф6, см. docs/architecture/22-модель-данных.md §3, docs/roadmap/
 * prompts/f6-нумерология-и-камни.md req.1-3). Единый источник правды для контракта API
 * (`apps/api/src/routes/orders.ts`), воркер-job'а (`apps/worker/src/pdf/`) и кабинета
 * (`apps/web/pages/app`).
 *
 * Решение по неоднозначности [ambiguity] «ai_report kind='matrix_full' vs PDF-продукт Ф6»
 * (_work/build/findings/f6.md): PDF-генератор Ф6 НЕ переиспользует готовую строку `ai_reports`
 * kind='matrix_full' как есть — он строит контент заново из детерминированной сборки чанков
 * `arcanum×position` (ПОЛНЫЙ набор из 30 позиций, а не то подмножество, что попало в промт
 * текстового разбора) + опциональных связующих абзацев через тот же конвейер `@stassist/llm`
 * (см. apps/worker/src/pdf/matrix-report-content.ts). Результат сохраняется как ОТДЕЛЬНАЯ строка
 * `ai_reports` (kind='order', см. `aiReportKindEnum`) — `orders.report_id` ссылается на неё.
 */
import { z } from 'zod';

export const orderKindSchema = z.enum(['pdf_report', 'custom_forecast', 'subscription_gift']);
export type OrderKind = z.infer<typeof orderKindSchema>;

export const orderStatusSchema = z.enum([
  'created',
  'paid',
  'ai_done',
  'assigned_expert',
  'expert_accepted',
  'expert_done',
  'delivered',
  'cancelled',
  'refunded',
]);
export type OrderStatus = z.infer<typeof orderStatusSchema>;

/** 3 PDF-продукта req.1-2 промта Ф6 (см. заголовок файла). */
export const pdfProductTypeSchema = z.enum(['matrix_full_pdf', 'psychomatrix_pdf', 'numerology_profile_pdf']);
export type PdfProductType = z.infer<typeof pdfProductTypeSchema>;

/**
 * Варианты req.1 промта Ф6 («детская матрица», «совместимость двух дат»). Решение по находке
 * [completeness] «нет источника контента для вариантов» (_work/build/findings/f6.md): оба варианта
 * — ЧИСТО презентационные (заголовок/вступление), а НЕ новые «факты» — расчёт и корпус чанков те
 * же детерминированные данные, что и standard (метод не зависит от возраста; совместимость —
 * готовая функция `compareMatrixOfDestiny` из `@stassist/numerology-core`, см. req.1 «детская
 * матрица, совместимость двух дат»). Это осознанно НЕ фабрикует новые «факты» под предлогом
 * персонализации — только переиспользует уже верифицированные расчёты с другой подачей текста.
 */
export const pdfOrderVariantSchema = z.enum(['standard', 'child', 'compat']);
export type PdfOrderVariant = z.infer<typeof pdfOrderVariantSchema>;

export interface PdfProductCatalogEntry {
  titleRu: string;
  priceKop: number;
  pageEstimate: string;
}

/** Цены — ориентировочные демо-значения (см. doc-комментарий `apps/api/src/routes/orders.ts`
 *  `DEMO_PAYMENTS_AUTO_CONFIRM`); реальный прайсинг — задача Ф8 (биллинг). */
export const PDF_PRODUCT_CATALOG: Record<PdfProductType, PdfProductCatalogEntry> = {
  matrix_full_pdf: {
    titleRu: 'Матрица судьбы — полная расшифровка',
    priceKop: 99000,
    pageEstimate: '25–35 страниц',
  },
  psychomatrix_pdf: {
    titleRu: 'Психоматрица (квадрат Пифагора)',
    priceKop: 49000,
    pageEstimate: '10–15 страниц',
  },
  numerology_profile_pdf: {
    titleRu: 'Нумерологический профиль',
    priceKop: 49000,
    pageEstimate: '10–15 страниц',
  },
};

export const orderSubjectSchema = z
  .object({
    productType: pdfProductTypeSchema,
    variant: pdfOrderVariantSchema.default('standard'),
    birthProfileId: z.string().uuid(),
    /** Обязателен для variant='compat' (вторая дата для сравнения матриц). */
    partnerBirthProfileId: z.string().uuid().optional(),
    /** Полное имя — для чисел выражения/души/личности в numerology_profile_pdf (см.
     *  `@stassist/numerology-core` `nameNumbers`); опционально — без него PDF просто не включает
     *  раздел «числа по имени» (честный empty-state в контенте, не выдумка). */
    fullName: z.string().min(1).max(200).optional(),
  })
  .refine((s) => s.variant !== 'compat' || Boolean(s.partnerBirthProfileId), {
    message: 'Для варианта "совместимость двух дат" обязателен partnerBirthProfileId',
    path: ['partnerBirthProfileId'],
  });
export type OrderSubject = z.infer<typeof orderSubjectSchema>;

// -------------------------------------------------------------------------------------------
// Ф8: индивидуальные прогнозы (`kind='custom_forecast'`, req.4 промта Ф8, doc 20 M3). Мастер
// заказа: событие/период/вопрос → параметры → глубина → оплата → конвейер Ф4 с расчётами по типу.
// -------------------------------------------------------------------------------------------

/**
 * 3 типа заказа (буквально из промта Ф8 req.4 «событие/период/вопрос»):
 * - `event_date` — «транзиты на дату» (конкретное событие: собеседование, встреча, операция…).
 * - `period_map` — «карта периода» (обзор транзитов на интервал, напр. следующие 1-3 месяца).
 * - `electives_question` — «элективные окна в интервале» (поиск благоприятной даты для вопроса,
 *   см. `findElectiveWindows` в `@stassist/astro-core`, doc-комментарий там же — правила скоринга
 *   ЗАДОКУМЕНТИРОВАНЫ явно, не выдуманы «на глаз», закрывает находку [полнота/зависимости] f8.md).
 */
export const customForecastTypeSchema = z.enum(['event_date', 'period_map', 'electives_question']);
export type CustomForecastType = z.infer<typeof customForecastTypeSchema>;

/** «Глубина» из промта Ф8 req.4 — влияет на объём LLM-текста И (для electives_question) на шаг
 *  сэмплирования astro-core (`deep` = 6ч/точка вместо 12ч, см. `DEFAULT_SAMPLE_STEP_HOURS`). */
export const customForecastDepthSchema = z.enum(['standard', 'deep']);
export type CustomForecastDepth = z.infer<typeof customForecastDepthSchema>;

const isoDateOnlySchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Ожидается формат ГГГГ-ММ-ДД');

/** Верхняя граница интервала «карта периода» — держим заказ в разумных рамках (страницы PDF). */
export const MAX_PERIOD_MAP_DAYS = 90;
/** Совпадает с `MAX_SCAN_DAYS` в `@stassist/astro-core` (защита от неограниченного расчёта). */
export const MAX_ELECTIVES_INTERVAL_DAYS = 120;

function daysBetweenIsoDates(fromIso: string, toIso: string): number {
  return (new Date(`${toIso}T00:00:00Z`).getTime() - new Date(`${fromIso}T00:00:00Z`).getTime()) / (1000 * 60 * 60 * 24);
}

/** Свободный текст вопроса — контекст мастера заказа для ВСЕХ 3 типов (не меняет расчёт, расчёт
 *  детерминирован — только участвует в тексте сопровождения LLM-конвейера Ф4). */
const forecastQuestionSchema = z.string().trim().min(3).max(500).optional();
/** Штрафовать ли ретроградный Меркурий при скоринге (см. `findElectiveWindows`
 *  `weighRetrogradeMercury` в astro-core, doc-комментарий там же правило 7) — актуально для
 *  вопросов о договорах/переговорах/поездках, по умолчанию выключено (не выдумываем
 *  универсальную значимость ретро-Меркурия для любого вопроса). */
const weighRetrogradeMercurySchema = z.boolean().default(false);

const eventDateSubjectSchema = z.object({
  type: z.literal('event_date'),
  birthProfileId: z.string().uuid(),
  depth: customForecastDepthSchema.default('standard'),
  question: forecastQuestionSchema,
  eventDate: isoDateOnlySchema,
  weighRetrogradeMercury: weighRetrogradeMercurySchema,
});

const periodMapSubjectSchema = z.object({
  type: z.literal('period_map'),
  birthProfileId: z.string().uuid(),
  depth: customForecastDepthSchema.default('standard'),
  question: forecastQuestionSchema,
  periodStart: isoDateOnlySchema,
  periodEnd: isoDateOnlySchema,
  weighRetrogradeMercury: weighRetrogradeMercurySchema,
});

const electivesQuestionSubjectSchema = z.object({
  type: z.literal('electives_question'),
  birthProfileId: z.string().uuid(),
  depth: customForecastDepthSchema.default('standard'),
  question: forecastQuestionSchema,
  intervalStart: isoDateOnlySchema,
  intervalEnd: isoDateOnlySchema,
  weighRetrogradeMercury: weighRetrogradeMercurySchema,
});

/**
 * Дискриминированное объединение по `type` (а НЕ один `z.object` с опциональными полями всех 3
 * веток + `.refine()` на обязательность) — так `z.infer` даёт НАСТОЯЩИЙ TS discriminated union
 * (узкие типы `EventDateSubject`/`PeriodMapSubject`/`ElectivesQuestionSubject` через
 * `Extract<CustomForecastSubject, { type: '…' }>` в apps/worker/src/forecast/), а не единственный
 * плоский тип с необязательными полями. Проверки длины интервала — `.refine()` ПОВЕРХ уже
 * собранного union (не в отдельных ветках — `discriminatedUnion` требует чистых `ZodObject` без
 * `.refine()` внутри каждой ветки).
 */
export const customForecastSubjectSchema = z
  .discriminatedUnion('type', [eventDateSubjectSchema, periodMapSubjectSchema, electivesQuestionSubjectSchema])
  .refine((s) => s.type !== 'period_map' || daysBetweenIsoDates(s.periodStart, s.periodEnd) > 0, {
    message: 'periodEnd должен быть позже periodStart',
    path: ['periodEnd'],
  })
  .refine((s) => s.type !== 'period_map' || daysBetweenIsoDates(s.periodStart, s.periodEnd) <= MAX_PERIOD_MAP_DAYS, {
    message: `Интервал "карты периода" не должен превышать ${MAX_PERIOD_MAP_DAYS} дней`,
    path: ['periodEnd'],
  })
  .refine((s) => s.type !== 'electives_question' || daysBetweenIsoDates(s.intervalStart, s.intervalEnd) > 0, {
    message: 'intervalEnd должен быть позже intervalStart',
    path: ['intervalEnd'],
  })
  .refine(
    (s) => s.type !== 'electives_question' || daysBetweenIsoDates(s.intervalStart, s.intervalEnd) <= MAX_ELECTIVES_INTERVAL_DAYS,
    { message: `Интервал поиска не должен превышать ${MAX_ELECTIVES_INTERVAL_DAYS} дней`, path: ['intervalEnd'] },
  );
export type CustomForecastSubject = z.infer<typeof customForecastSubjectSchema>;

export interface CustomForecastCatalogEntry {
  titleRu: string;
  priceKop: number;
}

/** Цены — ориентировочные демо-значения (тот же статус, что `PDF_PRODUCT_CATALOG`, см.
 *  doc-комментарий там же: реальный прайсинг — задача бизнеса при онбординге платёжки). */
export const CUSTOM_FORECAST_CATALOG: Record<CustomForecastType, Record<CustomForecastDepth, CustomForecastCatalogEntry>> = {
  event_date: {
    standard: { titleRu: 'Прогноз на дату события — стандарт', priceKop: 39_000 },
    deep: { titleRu: 'Прогноз на дату события — расширенный', priceKop: 69_000 },
  },
  period_map: {
    standard: { titleRu: 'Карта периода — стандарт', priceKop: 59_000 },
    deep: { titleRu: 'Карта периода — расширенная', priceKop: 99_000 },
  },
  electives_question: {
    standard: { titleRu: 'Благоприятное окно — стандартный поиск', priceKop: 79_000 },
    deep: { titleRu: 'Благоприятное окно — расширенный поиск', priceKop: 129_000 },
  },
};

export function customForecastPriceKop(type: CustomForecastType, depth: CustomForecastDepth): number {
  return CUSTOM_FORECAST_CATALOG[type][depth].priceKop;
}

export const orderCreateRequestSchema = z.union([
  z.object({ kind: z.literal('pdf_report'), subject: orderSubjectSchema }),
  z.object({ kind: z.literal('custom_forecast'), subject: customForecastSubjectSchema }),
]);
export type OrderCreateRequest = z.infer<typeof orderCreateRequestSchema>;

const orderResponseSubjectSchema = z.union([orderSubjectSchema, customForecastSubjectSchema]);

export const orderResponseSchema = z.object({
  id: z.string().uuid(),
  kind: orderKindSchema,
  subject: orderResponseSubjectSchema,
  status: orderStatusSchema,
  priceKop: z.number().int(),
  reportId: z.string().uuid().nullable(),
  /** Подписанная ссылка на PDF (ObjectStorage.getSignedUrl) — заполняется ТОЛЬКО когда
   *  status='delivered'; иначе null (честный empty-state, не пустая строка). */
  pdfUrl: z.string().nullable(),
  errorMessage: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type OrderResponse = z.infer<typeof orderResponseSchema>;

export const orderListResponseSchema = z.object({ items: z.array(orderResponseSchema) });
export type OrderListResponse = z.infer<typeof orderListResponseSchema>;
