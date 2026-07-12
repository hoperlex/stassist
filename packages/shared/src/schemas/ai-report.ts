/**
 * ИИ-отчёты и чат (Ф4, см. docs/architecture/22-модель-данных.md §3). Схемы здесь описывают
 * ТОЛЬКО контракт API/БД (что хранится/что видит клиент) — сам конвейер генерации (сериализатор,
 * ретривер, промт-билдер, пост-обработка) живёт в `@stassist/llm`, который зависит от этого
 * пакета, а не наоборот (см. §2 конвенций реализации — packages/shared не тянет LLM SDK).
 */
import { z } from 'zod';

// ---------------------------------------------------------------------------------------------
// ai_reports
// ---------------------------------------------------------------------------------------------

/** См. docs/architecture/22-модель-данных.md §3 `ai_reports.kind`. */
export const reportKindSchema = z.enum([
  'natal_full',
  'big3',
  'synastry',
  'solar_year',
  'transit_month',
  'matrix_full',
  'custom_question',
  'order',
]);
export type ReportKind = z.infer<typeof reportKindSchema>;

export const reportStatusSchema = z.enum(['queued', 'generating', 'done', 'failed', 'flagged']);
export type ReportStatus = z.infer<typeof reportStatusSchema>;

/** Сферы `natal_full` (см. f4-llm-конвейер.md req.5: личность/отношения/карьера/ресурсы/задачи роста). */
export const natalFullSphereSchema = z.enum([
  'personality',
  'relationships',
  'career',
  'resources',
  'growth_tasks',
]);
export type NatalFullSphere = z.infer<typeof natalFullSphereSchema>;

/**
 * Тариф разбора: `big3` — бесплатно, остальное — премиум/пейвол-заглушка (см. находку
 * [самодостаточность-тарификация] в f4.md). Чистая функция, не БД-запрос — единый источник
 * правды для API/фронта/воркера.
 */
export function isFreeReportKind(kind: ReportKind): boolean {
  return kind === 'big3';
}

export const aiReportCreateRequestSchema = z.object({
  birthProfileId: z.string().uuid(),
  kind: reportKindSchema,
  /** Обязателен только для kind='natal_full' (одна сфера за раз, см. req.5 промта Ф4). */
  sphere: natalFullSphereSchema.optional(),
  /** Обязателен только для kind='custom_question' (вопрос в свободной форме, чат/разовый разбор). */
  question: z.string().min(1).max(2000).optional(),
  /** Вторая карта для kind='synastry' — id её birth_profile. */
  partnerBirthProfileId: z.string().uuid().optional(),
});
export type AiReportCreateRequest = z.infer<typeof aiReportCreateRequestSchema>;

export const aiReportResponseSchema = z.object({
  id: z.string().uuid(),
  kind: reportKindSchema,
  status: reportStatusSchema,
  contentMd: z.string().nullable(),
  /** «Как считали» — блок расчётных данных, которые видел ИИ (см. незыблемое правило №2 f4-промта). */
  calcBlock: z.record(z.string(), z.unknown()).nullable(),
  promptVersion: z.string(),
  provider: z.string().nullable(),
  tokensIn: z.number().int().nullable(),
  tokensOut: z.number().int().nullable(),
  costMicros: z.number().int().nullable(),
  pdfKey: z.string().nullable(),
  errorMessage: z.string().nullable(),
  createdAt: z.string(),
  completedAt: z.string().nullable(),
});
export type AiReportResponse = z.infer<typeof aiReportResponseSchema>;

// ---------------------------------------------------------------------------------------------
// Чат
// ---------------------------------------------------------------------------------------------

export const chatMessageRoleSchema = z.enum(['user', 'assistant']);
export type ChatMessageRole = z.infer<typeof chatMessageRoleSchema>;

export const chatSendRequestSchema = z.object({
  sessionId: z.string().uuid().optional(),
  birthProfileId: z.string().uuid().optional(),
  message: z.string().min(1).max(2000),
});
export type ChatSendRequest = z.infer<typeof chatSendRequestSchema>;

export const chatMessageResponseSchema = z.object({
  id: z.string().uuid(),
  role: chatMessageRoleSchema,
  content: z.string(),
  flagged: z.boolean(),
  createdAt: z.string(),
});
export type ChatMessageResponse = z.infer<typeof chatMessageResponseSchema>;

export const chatSessionResponseSchema = z.object({
  id: z.string().uuid(),
  title: z.string().nullable(),
  birthProfileId: z.string().uuid().nullable(),
  messages: z.array(chatMessageResponseSchema),
});
export type ChatSessionResponse = z.infer<typeof chatSessionResponseSchema>;

// ---------------------------------------------------------------------------------------------
// report_feedback
// ---------------------------------------------------------------------------------------------

export const reportFeedbackRatingSchema = z.enum(['good', 'bad']);
export type ReportFeedbackRating = z.infer<typeof reportFeedbackRatingSchema>;

export const reportFeedbackRequestSchema = z.object({
  rating: reportFeedbackRatingSchema,
  comment: z.string().max(2000).optional(),
});
export type ReportFeedbackRequest = z.infer<typeof reportFeedbackRequestSchema>;

// ---------------------------------------------------------------------------------------------
// interpretation_chunks — контракт для API-чтения корпуса (напр. вики Ф7); генерация — @stassist/llm
// ---------------------------------------------------------------------------------------------

export const interpretationTraditionSchema = z.enum(['western', 'vedic', 'karmic', 'numerology']);
export type InterpretationTradition = z.infer<typeof interpretationTraditionSchema>;

export const interpretationQualitySchema = z.enum(['draft', 'reviewed']);
export type InterpretationQuality = z.infer<typeof interpretationQualitySchema>;

export const interpretationChunkResponseSchema = z.object({
  key: z.string(),
  tradition: interpretationTraditionSchema,
  text: z.string(),
  quality: interpretationQualitySchema,
  version: z.number().int(),
});
export type InterpretationChunkResponse = z.infer<typeof interpretationChunkResponseSchema>;

/**
 * Пакетное публичное чтение чанков по ключам (см. apps/api/src/routes/interpretation.ts) —
 * используется публичными калькуляторами Ф3 (matrica-sudby/chislo-puti/kvadrat-pifagora/
 * natalnaya-karta) для подстановки реального текста Ф4 вместо `ContentPendingNotice` (см.
 * находку [порядок-зависимостей-контента] в _work/build/findings/f4.md). На SSR/клиенте идут
 * чанки И draft, И reviewed (§6 конвенций реализации, «правило непустоты») — `quality` отдаётся
 * клиенту, чтобы страница могла показать бейдж «черновик».
 */
export const interpretationChunksBatchResponseSchema = z.object({
  items: z.array(interpretationChunkResponseSchema),
});
export type InterpretationChunksBatchResponse = z.infer<typeof interpretationChunksBatchResponseSchema>;
