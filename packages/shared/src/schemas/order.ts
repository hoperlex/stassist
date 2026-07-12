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

export const orderCreateRequestSchema = z.object({
  kind: orderKindSchema,
  subject: orderSubjectSchema,
});
export type OrderCreateRequest = z.infer<typeof orderCreateRequestSchema>;

export const orderResponseSchema = z.object({
  id: z.string().uuid(),
  kind: orderKindSchema,
  subject: orderSubjectSchema,
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
