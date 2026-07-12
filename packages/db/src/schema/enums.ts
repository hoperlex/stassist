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

/** См. `shareKindSchema` в packages/shared/src/schemas/calc.ts (Ф3, `chart_shares`).
 *  `transit_day` — Ф9 «Созвездие»: share-карточка отклика «Небо дня» (натал в `positions`,
 *  транзитный снапшот дня в `positions_b` — та же механика двойного колеса, что synastry). */
export const shareKindEnum = pgEnum('share_kind', ['natal', 'synastry', 'transit_day']);

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

// -------------------------------------------------------------------------------------------
// Ф6: заказы PDF-отчётов, камни, уведомления (см. docs/architecture/22-модель-данных.md §3, §6, §7б).
// -------------------------------------------------------------------------------------------

/** См. `orderKindSchema` в packages/shared/src/schemas/order.ts. Задел маркетплейса
 *  (expert-поля) — не используется в Ф6, зарезервировано моделью данных (док. 22 §3). */
export const orderKindEnum = pgEnum('order_kind', ['pdf_report', 'custom_forecast', 'subscription_gift']);

/** См. `orderStatusSchema`. Демо-режим Ф6 (см. §2 конвенций реализации, `FakePaymentProvider`)
 *  проходит create→paid→ai_done→delivered синхронно/почти синхронно; остальные значения —
 *  задел маркетплейса экспертов (Ф8+). */
export const orderStatusEnum = pgEnum('order_status', [
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

/** См. `notificationKindSchema`. `order_ready` — Ф6 (см. docs/roadmap/prompts/
 *  f6-нумерология-и-камни.md, находку [verification-gap] в _work/build/findings/f6.md); остальные
 *  значения — задел коммьюнити (Ф7+)/модерации, таблица создаётся здесь, т.к. Ф6 первой её
 *  использует (см. §5 конвенций реализации: `notifications` — skeleton создаётся первой фазой-
 *  потребителем, здесь совпадает с полноценным использованием). */
export const notificationKindEnum = pgEnum('notification_kind', [
  'comment_reply',
  'friend_request',
  'order_ready',
  'moderation',
  'system',
]);

/** См. `stoneStatusSchema` — тот же паттерн, что `interpretationQualityEnum`/`wikiArticleStatusEnum`:
 *  draft публикуется на SSR с бейджем «требует редактуры» (§6 конвенций реализации, «правило
 *  непустоты»), reviewed — прошёл редакционную проверку минералогических фактов. */
export const stoneStatusEnum = pgEnum('stone_status', ['draft', 'reviewed']);

// -------------------------------------------------------------------------------------------
// Ф7: коммьюнити (см. docs/architecture/22-модель-данных.md §7, docs/roadmap/prompts/
// f7-вики-и-коммьюнити.md, packages/shared/src/schemas/community.ts — единый источник правды
// по значениям, эти pgEnum — просто материализация тех же строк в БД).
// -------------------------------------------------------------------------------------------

/** См. `postKindSchema`. `sky_day` — Ф9: системный пост-тред дня «Небо дня» (создаётся ТОЛЬКО
 *  worker'ом от имени Астры, через API не создаётся — см. `userPostKindSchema` в community.ts). */
export const postKindEnum = pgEnum('post_kind', [
  'chart_review_request',
  'discussion',
  'gallery',
  'sky_day',
]);

/** См. `postStatusSchema` — общий для posts/comments (оба используют один жизненный цикл
 *  видимости: published → hidden (модератор/жалоба) → deleted (автор/модератор)). */
export const ugcStatusEnum = pgEnum('ugc_status', ['published', 'hidden', 'deleted']);

/** См. `ugcModerationStatusSchema` — общий для posts/comments (премодерация новичка/классификатор). */
export const ugcModerationStatusEnum = pgEnum('ugc_moderation_status', ['pending', 'approved', 'rejected']);

/** См. `reactionEntitySchema`/`reactionKindSchema`. */
export const reactionEntityEnum = pgEnum('reaction_entity', ['post', 'comment']);
export const reactionKindEnum = pgEnum('reaction_kind', ['like', 'heart', 'insightful', 'support']);

/** См. `friendshipStatusSchema`. */
export const friendshipStatusEnum = pgEnum('friendship_status', ['pending', 'accepted']);

/** См. `ugcViolationReasonSchema` — общий словарь для `reports_ugc.reason` И для причин,
 *  которые проставляет автоклассификатор (packages/llm/src/moderation/ugc-classifier.ts). */
export const ugcViolationReasonEnum = pgEnum('ugc_violation_reason', [
  'death_or_illness_prediction',
  'curse_or_love_spell',
  'medical_directive',
  'financial_directive',
  'insult',
  'other',
]);

/** См. `reportsUgcStatusSchema`. */
export const reportsUgcStatusEnum = pgEnum('reports_ugc_status', ['pending', 'resolved', 'dismissed']);

// -------------------------------------------------------------------------------------------
// Ф8: биллинг, эксперименты/пейвол, квиз-онбординг, email-отписки (см. docs/architecture/
// 22-модель-данных.md §4, §7б, docs/roadmap/prompts/f8-монетизация-и-запуск.md).
// -------------------------------------------------------------------------------------------

/** См. `planCodeSchema` в packages/shared/src/schemas/billing.ts — единый источник правды по
 *  ценам/фичам (`PLAN_CATALOG`); эта таблица (`plans`) — материализация тех же кодов для FK
 *  `subscriptions.plan_code`, сидируется прямо в миграции 0008 (см. doc-комментарий там же). */
export const planCodeEnum = pgEnum('plan_code', ['free', 'premium_m', 'premium_y']);

/** 'none' — для `free` (бессрочно, без цикла списаний); 'month'/'year' — платные планы. */
export const planPeriodEnum = pgEnum('plan_period', ['none', 'month', 'year']);

/**
 * См. `subscriptionStatusSchema`. Жизненный цикл (закрывает находку [консистентность-модель-
 * данных] f8.md — набор синхронизирован с doc 22 §4, `expired` добавлен явно): `trial`/`active` →
 * отмена пользователем ставит `cancel_at_period_end=true`, статус ОСТАЁТСЯ `active` до конца
 * периода (юридическое требование прозрачности — доступ не обрывается сразу) → по достижении
 * `current_period_end` worker переводит в `expired`. `past_due` — неудачное списание, грейс 3 дня
 * (см. промт Ф8 req.2), после грейса → `expired`. `cancelled` — используется для мгновенной
 * отмены (напр. возврат/отмена триала до первого списания), в общем потоке «отмена в 1 клик» —
 * это `cancel_at_period_end`, а не мгновенный `cancelled`.
 */
export const subscriptionStatusEnum = pgEnum('subscription_status', [
  'trial',
  'active',
  'past_due',
  'cancelled',
  'expired',
]);

/** 'stub' — FakePaymentProvider (дефолт локально, см. §2 конвенций реализации). */
export const paymentProviderEnum = pgEnum('payment_provider', ['yookassa', 'cloudpayments', 'stub']);

export const paymentStatusEnum = pgEnum('payment_status', ['pending', 'succeeded', 'canceled', 'refunded']);

/** 54-ФЗ, каркас (см. промт Ф8 req.1 «чеки 54-ФЗ через встроенную фискализацию провайдера»):
 *  `not_required` — стаб-платежи/бесплатные операции; `pending`/`sent`/`failed` — реальный статус
 *  чека от ЮKassa. Полная интеграция номенклатуры/НДС — ручной шаг онбординга (см.
 *  launch-checklist.md), здесь только каркас статуса. */
export const receiptStatusEnum = pgEnum('receipt_status', ['not_required', 'pending', 'sent', 'failed']);

/** См. `promoCodeKindSchema`. */
export const promoCodeKindEnum = pgEnum('promo_code_kind', [
  'percent_discount',
  'fixed_discount_kop',
  'trial_extension_days',
]);

/** См. `experimentEventKindSchema` — A/B-каркас пейвола (doc 22 §7б). */
export const experimentEventKindEnum = pgEnum('experiment_event_kind', ['exposed', 'converted']);

/** См. `emailOptoutScopeSchema`. */
export const emailOptoutScopeEnum = pgEnum('email_optout_scope', ['all', 'digest', 'marketing']);

// -------------------------------------------------------------------------------------------
// Ф9: соцраздел «Созвездие» / «Небо дня» (см. docs/strategy/11-соцраздел-созвездие.md,
// packages/shared/src/schemas/sky.ts — единый источник правды по значениям).
// -------------------------------------------------------------------------------------------

/** См. `skyCheckinVerdictSchema` — отметка чек-ина «как прожилось событие дня». */
export const skyCheckinVerdictEnum = pgEnum('sky_checkin_verdict', ['hit', 'partial', 'miss']);

/**
 * Маркировка автора UGC: `ai` — контент ИИ-участницы «Астры» (решение заказчика 13.07.2026:
 * ИИ в сообществе допущен ТОЛЬКО с явной маркировкой, см. §1/§9 док. 11). Колонка данных,
 * а не UI-договорённость: юридическая прослеживаемость и невозможность «размаркировать»
 * ИИ-контент правкой фронта.
 */
export const ugcAuthorKindEnum = pgEnum('ugc_author_kind', ['human', 'ai']);
