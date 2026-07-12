/**
 * Общие Postgres-enum'ы схемы (см. docs/architecture/22-модель-данных.md). Вынесены в отдельный
 * файл, т.к. используются несколькими таблицами — drizzle-kit генерирует `CREATE TYPE` один раз.
 */
import { pgEnum } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', [
  'user',
  'editor',
  'moderator',
  'admin',
  'expert',
]);

export const userStatusEnum = pgEnum('user_status', ['active', 'blocked', 'deleted']);

export const consentKindEnum = pgEnum('consent_kind', ['pd_processing', 'marketing']);

export const birthProfileKindEnum = pgEnum('birth_profile_kind', ['self', 'other', 'celebrity']);

/** См. `zodiacTypeSchema` в packages/shared/src/schemas/chart.ts — те же значения. */
export const zodiacTypeEnum = pgEnum('zodiac_type', ['tropical', 'sidereal']);

/** См. `ayanamshaSchema` в packages/shared/src/schemas/chart.ts. */
export const ayanamshaEnum = pgEnum('ayanamsha', [
  'lahiri',
  'raman',
  'kp',
  'fagan_bradley',
  'yukteswar',
]);

/** См. `houseSystemSchema` в packages/shared/src/schemas/chart.ts. */
export const houseSystemEnum = pgEnum('house_system', [
  'placidus',
  'koch',
  'regiomontanus',
  'porphyry',
  'equal',
  'whole_sign',
]);

/** См. `aspectSetSchema` в packages/shared/src/schemas/chart.ts. */
export const aspectSetEnum = pgEnum('aspect_set', ['major', 'major_minor']);

/** См. `chartKindSchema` в packages/shared/src/schemas/chart.ts. */
export const chartKindEnum = pgEnum('chart_kind', [
  'natal',
  'transit',
  'progression',
  'symbolic_direction',
  'solar_return',
  'lunar_return',
  'synastry',
  'composite',
  'davison',
  'horary',
]);

/** См. `shareKindSchema` в packages/shared/src/schemas/calc.ts (Ф3, `chart_shares`). */
export const shareKindEnum = pgEnum('share_kind', ['natal', 'synastry']);

// -------------------------------------------------------------------------------------------
// Ф4: ИИ-конвейер, RAG-корпус, вики (см. docs/architecture/22-модель-данных.md §3, §6).
// -------------------------------------------------------------------------------------------

/** См. `interpretationTraditionSchema` в packages/shared/src/schemas/ai-report.ts. */
export const interpretationTraditionEnum = pgEnum('interpretation_tradition', [
  'western',
  'vedic',
  'karmic',
  'numerology',
]);

/** См. `interpretationQualitySchema` — draft публикуется на SSR с бейджем, reviewed приоритетнее
 *  в ранжировании (см. §6 конвенций реализации, «правило непустоты»). */
export const interpretationQualityEnum = pgEnum('interpretation_quality', ['draft', 'reviewed']);

/** wiki_articles.section — создаётся Ф4 (пустая таблица), наполняется Ф7. */
export const wikiArticleSectionEnum = pgEnum('wiki_article_section', [
  'planets',
  'signs',
  'houses',
  'aspects',
  'schools',
  'nakshatras',
  'arcana',
  'lunar_days',
  'stones',
  'glossary',
]);

export const wikiArticleStatusEnum = pgEnum('wiki_article_status', ['draft', 'reviewed', 'published']);

/**
 * См. `reportKindSchema` в packages/shared/src/schemas/ai-report.ts. `personal_horoscope` — Ф5
 * (см. docs/roadmap/31-конвенции-реализации.md §9, находку [полнота] в _work/build/findings/
 * f5.md «хранилище+ключ кэша персонального гороскопа») НАМЕРЕННО НЕ добавлен в
 * `reportKindSchema`/`aiReportCreateRequestSchema` — у него отдельный роут/контракт
 * (`apps/api/src/routes/personal-horoscope.ts`, `packages/shared/src/schemas/horoscope.ts`
 * `personalHoroscopeResponseSchema`), а не общий `/ai-reports` POST (иначе фриемиум-логика и
 * период day/week персонального гороскопа просочились бы в общий контракт разборов). Таблицу
 * `ai_reports` переиспользуем только как хранилище (см. apps/api/src/repositories/
 * personal-horoscope-repository.ts) — отсюда значение есть только в этом DB-enum'е.
 */
export const aiReportKindEnum = pgEnum('ai_report_kind', [
  'natal_full',
  'big3',
  'synastry',
  'solar_year',
  'transit_month',
  'matrix_full',
  'custom_question',
  'order',
  'personal_horoscope',
]);

/** См. `reportStatusSchema`. Жизненный цикл: queued → generating → done|failed; flagged —
 *  пост-обработка нашла запрещённый контент (см. packages/llm/src/postprocess). */
export const aiReportStatusEnum = pgEnum('ai_report_status', [
  'queued',
  'generating',
  'done',
  'failed',
  'flagged',
]);

export const chatMessageRoleEnum = pgEnum('chat_message_role', ['user', 'assistant']);

export const reportFeedbackRatingEnum = pgEnum('report_feedback_rating', ['good', 'bad']);

// -------------------------------------------------------------------------------------------
// Ф5: гороскопы и программатика (см. docs/architecture/22-модель-данных.md §5).
// -------------------------------------------------------------------------------------------

/** См. `horoscopeScopeSchema` в packages/shared/src/schemas/horoscope.ts. */
export const horoscopeScopeEnum = pgEnum('horoscope_scope', ['zodiac', 'eastern', 'lunar_day', 'profession']);

/** См. `horoscopePeriodSchema`. */
export const horoscopePeriodEnum = pgEnum('horoscope_period', ['day', 'tomorrow', 'week', 'month', 'year']);

/** См. `horoscopeTopicSchema`. */
export const horoscopeTopicEnum = pgEnum('horoscope_topic', ['general', 'love', 'money', 'career', 'health']);

/** См. `horoscopeStatusSchema` — жизненный цикл: draft (генерация в процессе/ещё не прошла
 *  автомодерацию) → moderation (флагнуто фильтром, ждёт ручной проверки) | published. */
export const horoscopeStatusEnum = pgEnum('horoscope_status', ['draft', 'moderation', 'published']);
