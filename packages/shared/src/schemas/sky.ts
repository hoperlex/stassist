/**
 * Контракты «Неба дня» (Ф9 «Созвездие», см. docs/strategy/11-соцраздел-созвездие.md §3, §7).
 * Единый источник правды фронт/бэк/worker: значения enum'ов материализованы в БД
 * (packages/db/src/schema/enums.ts skyCheckinVerdictEnum) и обязаны совпадать.
 *
 * Здесь же — ЧИСТЫЕ функции домена (паттерн `decideInitialPostModeration` из community.ts):
 * `advanceStreak` — единственный источник правды по правилу стрика, используется API
 * транзакционно при чек-ине и юнит-тестами без БД.
 */
import { z } from 'zod';
import { sharePositionsSchema } from './calc.js';

// ---------------------------------------------------------------------------------------------
// Астра — системная ИИ-участница (см. drizzle/seed/0016_astra_user.sql — тот же UUID).
// ---------------------------------------------------------------------------------------------

/** Фиксированный UUID пользователя «Астра» (сидируется в 0016_astra_user.sql). Весь её контент
 *  создаётся worker'ом с `author_kind='ai'` — явная маркировка обязательна (решение заказчика). */
export const ASTRA_USER_ID = 'a57a0000-0000-4000-8000-000000000001';
export const ASTRA_DISPLAY_NAME = 'Астра';

// ---------------------------------------------------------------------------------------------
// День и чек-ин
// ---------------------------------------------------------------------------------------------

/** 'YYYY-MM-DD' по МСК — тот же принцип, что dateKey гороскопов (см. horoscope-date-keys.ts). */
export const skyDayKeySchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export const SKY_CHECKIN_VERDICTS = ['hit', 'partial', 'miss'] as const;
export const skyCheckinVerdictSchema = z.enum(SKY_CHECKIN_VERDICTS);
export type SkyCheckinVerdict = z.infer<typeof skyCheckinVerdictSchema>;

export const SKY_VERDICT_NAME_RU: Record<SkyCheckinVerdict, string> = {
  hit: 'в точку',
  partial: 'частично',
  miss: 'мимо',
};

/** Событие дня — что именно выбрано «главным» (см. apps/worker/src/sky/select-day-event.ts,
 *  приоритет: ингресс → фаза Луны → станция ретро → точный мажорный аспект → Луна в знаке). */
export const skyDayEventSchema = z.object({
  kind: z.enum(['ingress', 'moon_phase', 'retro_station', 'aspect', 'moon_sign']),
  /** Ключ тела (sun..pluto / moon) — для ingress/retro_station. */
  body: z.string().optional(),
  /** Индекс знака 0=Овен..11=Рыбы — для ingress/moon_sign. */
  signIndex: z.number().int().min(0).max(11).optional(),
  /** Название фазы — для moon_phase. */
  phaseName: z.string().optional(),
  /** Аспект дня — для kind='aspect'. */
  aspect: z
    .object({ bodyA: z.string(), bodyB: z.string(), angle: z.string(), orbDeg: z.number() })
    .optional(),
});
export type SkyDayEvent = z.infer<typeof skyDayEventSchema>;

/** `sky_days.payload` — событие + факты дня (основание текста, антигаллюцинационный аудит —
 *  тот же принцип, что `horoscopes.astro_events`). */
export const skyDayPayloadSchema = z.object({
  event: skyDayEventSchema,
  notableAspects: z.array(z.object({ bodyA: z.string(), bodyB: z.string(), angle: z.string(), orbDeg: z.number() })),
  moonSignIndex: z.number().int().min(0).max(11),
  lunarDay: z.number().int().min(1).max(30),
  phaseName: z.string(),
  retrogradeBodies: z.array(z.string()),
});
export type SkyDayPayload = z.infer<typeof skyDayPayloadSchema>;

/** Агрегаты чек-инов дня — «тред никогда не выглядит пустым» (§5 док. 11). */
export const skyDayAggregatesSchema = z.object({
  total: z.number().int().min(0),
  hit: z.number().int().min(0),
  partial: z.number().int().min(0),
  miss: z.number().int().min(0),
});
export type SkyDayAggregates = z.infer<typeof skyDayAggregatesSchema>;

/** Публичный ответ `GET /sky/today` / `GET /sky/days/:dayKey` (без ПД по построению). */
export const skyDayResponseSchema = z.object({
  dayKey: skyDayKeySchema,
  title: z.string(),
  summaryMd: z.string(),
  payload: skyDayPayloadSchema,
  /** Обезличенный снапшот транзитных позиций дня (SharePositions: noHouses=true, дома-заглушки) —
   *  рендерится ChartWheel и уходит второй картой в share kind='transit_day'. */
  transitPositions: sharePositionsSchema,
  /** Пост-тред дня (kind='sky_day') — null, если worker ещё не создал (деградация без треда). */
  threadPostId: z.string().uuid().nullable(),
  aggregates: skyDayAggregatesSchema,
});
export type SkyDayResponse = z.infer<typeof skyDayResponseSchema>;

export const skyCheckinResponseSchema = z.object({
  dayKey: skyDayKeySchema,
  verdict: skyCheckinVerdictSchema,
  note: z.string().nullable(),
  /** Комментарий-заметка в треде дня (null — чек-ин без заметки). */
  noteCommentId: z.string().uuid().nullable(),
  createdAt: z.string(),
});
export type SkyCheckinResponse = z.infer<typeof skyCheckinResponseSchema>;

export const skyStreakSchema = z.object({
  current: z.number().int().min(0),
  best: z.number().int().min(0),
});
export type SkyStreak = z.infer<typeof skyStreakSchema>;

/** Персональная проекция события дня — один транзитный аспект к наталу (форма — PrioritizedTransit
 *  из @stassist/llm, продублирована структурно: shared не зависит от llm). */
export const skyProjectionAspectSchema = z.object({
  natalBody: z.string(),
  transitBody: z.string(),
  angleName: z.string(),
  orbDeg: z.number(),
  applying: z.boolean(),
});
export type SkyProjectionAspect = z.infer<typeof skyProjectionAspectSchema>;

/** `GET /sky/days/:dayKey/me` — честный empty-state через `computed:false` + `reason`
 *  (паттерн `friendshipSynastryResponseSchema`). ПД в ответе НЕТ: только аспекты/агрегаты. */
export const skyDayMeResponseSchema = z.object({
  computed: z.boolean(),
  reason: z.enum(['ok', 'no_profile', 'no_day']).optional(),
  /** Приоритизированные транзитные аспекты дня к наталу (топ-3), первый — «аспект дня». */
  aspects: z.array(skyProjectionAspectSchema),
  /** Детерминированная строка тона (без LLM — бесплатная часть, паттерн personal-horoscope). */
  summary: z.string().nullable(),
  myCheckin: skyCheckinResponseSchema.nullable(),
  streak: skyStreakSchema,
});
export type SkyDayMeResponse = z.infer<typeof skyDayMeResponseSchema>;

export const skyCheckinCreateRequestSchema = z.object({
  dayKey: skyDayKeySchema,
  verdict: skyCheckinVerdictSchema,
  /** Заметка публикуется комментарием в треде дня и проходит модерацию UGC (см. routes/sky.ts). */
  note: z.string().trim().min(1).max(140).optional(),
});
export type SkyCheckinCreateRequest = z.infer<typeof skyCheckinCreateRequestSchema>;

export const skyCheckinCreateResponseSchema = z.object({
  checkin: skyCheckinResponseSchema,
  streak: skyStreakSchema,
  /** true — заметка ушла в очередь премодерации (появится в треде после проверки). */
  noteModerationPending: z.boolean(),
});
export type SkyCheckinCreateResponse = z.infer<typeof skyCheckinCreateResponseSchema>;

// ---------------------------------------------------------------------------------------------
// Стрик «Живу по небу» — чистое правило перехода (единый источник правды API/тестов).
// ---------------------------------------------------------------------------------------------

export interface StreakState {
  current: number;
  best: number;
  /** 'YYYY-MM-DD' последнего чек-ина; null — чек-инов ещё не было. */
  lastCheckinDay: string | null;
}

/** Следующий календарный день от 'YYYY-MM-DD' (UTC-арифметика — ключи уже нормализованы по МСК). */
export function nextDayKey(dayKey: string): string {
  const [y, m, d] = dayKey.split('-').map(Number);
  const next = new Date(Date.UTC(y!, m! - 1, d! + 1));
  return next.toISOString().slice(0, 10);
}

/**
 * Правило стрика: чек-ин в тот же день — идемпотентен (смена вердикта не даёт +1); чек-ин на
 * следующий календарный день — продление; любой разрыв — серия начинается заново с 1.
 * `best` — максимум за всю историю. Чек-ины «в прошлое» невозможны (API принимает только
 * «сегодня» по МСК), поэтому ветка `dayKey < lastCheckinDay` не наступает и трактуется как разрыв.
 */
export function advanceStreak(prev: StreakState, dayKey: string): StreakState {
  if (prev.lastCheckinDay === dayKey) return prev;
  const current = prev.lastCheckinDay !== null && nextDayKey(prev.lastCheckinDay) === dayKey ? prev.current + 1 : 1;
  return { current, best: Math.max(prev.best, current), lastCheckinDay: dayKey };
}
