/**
 * Общие zod-схемы/типы, единые для API и фронта (см. док. 21 §1 — packages/shared).
 * В Ф0 бизнес-логики ещё нет, поэтому здесь только по-настоящему сквозные примитивы,
 * которыми будут пользоваться все следующие фазы.
 */
import { z } from 'zod';

export const uuidSchema = z.string().uuid();

export const localeSchema = z.enum(['ru']).default('ru');

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  perPage: z.coerce.number().int().min(1).max(100).default(20),
});
export type PaginationQuery = z.infer<typeof paginationQuerySchema>;

/** Единый конверт ошибки API. */
export const apiErrorSchema = z.object({
  error: z.object({
    message: z.string(),
    code: z.string().optional(),
    requestId: z.string().optional(),
  }),
});
export type ApiError = z.infer<typeof apiErrorSchema>;

/** Ответ health-эндпоинтов. */
export const healthResponseSchema = z.object({
  status: z.enum(['ok', 'degraded']),
  version: z.string().optional(),
});
export const readyResponseSchema = z.object({
  status: z.enum(['ok', 'unavailable']),
  checks: z.record(z.string(), z.boolean()),
});
