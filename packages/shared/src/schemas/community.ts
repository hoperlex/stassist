/**
 * Контракты коммьюнити (Ф7, M8) — см. docs/architecture/22-модель-данных.md §7,
 * docs/roadmap/prompts/f7-вики-и-коммьюнити.md. Ядро с модерацией (промт допускает «если
 * объёмно — сделай ядро с модерацией», см. §7 промта).
 *
 * Решения по неоднозначностям модели данных (документируются здесь, единственный источник):
 *  - `posts.chart_id` реализован как FK на `charts.id` (НЕ на отдельную таблицу) — см. doc-
 *    комментарий `packages/db/src/schema/charts.ts` («birthProfileId намеренно nullable…
 *    зарезервировано для будущей анонимной копии (Ф7)»): публикация создаёт НОВУЮ строку
 *    `charts` с `birthProfileId=null` и `data=anonymizeChartData(...)` (см. calc.ts) —
 *    отдельной таблицы не потребовалось, находка [data-model-gap] f7.md закрыта переиспользованием.
 *  - «отметка комментария полезным» (реputация) — модель 22 §7 не даёт отдельного механизма;
 *    реализовано как `comments.markedUsefulAt` (только автор ПОСТА может проставить, один раз) —
 *    см. `packages/db/src/schema/comments.ts`.
 *  - `reports_ugc.reason`/автоклассификатор используют ОДИН словарь `ugcViolationReasonSchema`
 *    (переиспользует категории `packages/llm/src/postprocess/forbidden-filters.ts` + добавляет
 *    financial/insult — см. `packages/llm/src/moderation/ugc-classifier.ts`).
 */
import { z } from 'zod';

// ---------------------------------------------------------------------------------------------
// Посты
// ---------------------------------------------------------------------------------------------

/** Все виды постов, включая системные. `sky_day` (Ф9) — пост-тред «Небо дня», создаётся ТОЛЬКО
 *  worker'ом от имени Астры (см. apps/worker/src/sky); через API не создаётся — для
 *  пользовательского ввода используется `userPostKindSchema` ниже. */
export const postKindSchema = z.enum(['chart_review_request', 'discussion', 'gallery', 'sky_day']);
export type PostKind = z.infer<typeof postKindSchema>;

/** Виды постов, доступные пользователю в POST /posts (без системного `sky_day`). */
export const userPostKindSchema = z.enum(['chart_review_request', 'discussion', 'gallery']);
export type UserPostKind = z.infer<typeof userPostKindSchema>;

/** Маркировка автора UGC (Ф9): 'ai' — контент Астры, в UI ВСЕГДА с бейджем «ИИ»
 *  (см. packages/db/src/schema/enums.ts ugcAuthorKindEnum — юридическое требование маркировки). */
export const ugcAuthorKindSchema = z.enum(['human', 'ai']);
export type UgcAuthorKind = z.infer<typeof ugcAuthorKindSchema>;

export const postStatusSchema = z.enum(['published', 'hidden', 'deleted']);
export type PostStatus = z.infer<typeof postStatusSchema>;

export const ugcModerationStatusSchema = z.enum(['pending', 'approved', 'rejected']);
export type UgcModerationStatus = z.infer<typeof ugcModerationStatusSchema>;

export const postSortSchema = z.enum(['new', 'unanswered', 'popular']);
export type PostSort = z.infer<typeof postSortSchema>;

/** Обезличенная карта, прикреплённая к посту (см. `SharePositions` в calc.ts) — идентичная форма
 *  переиспользуется, чтобы фронт (ChartWheel) не знал разницы между шерингом и постом. */
export const postCreateRequestSchema = z.object({
  kind: userPostKindSchema,
  title: z.string().trim().min(3).max(160),
  bodyMd: z.string().trim().min(1).max(20000),
  /** Только для kind='chart_review_request' — свой профиль рождения, бэкенд анонимизирует. */
  birthProfileId: z.string().uuid().optional(),
  /** Только для kind='gallery' — обсуждение карты знаменитости (см. celebrity.ts). */
  celebrityId: z.string().uuid().optional(),
});
export type PostCreateRequest = z.infer<typeof postCreateRequestSchema>;

export const postResponseSchema = z.object({
  id: z.string().uuid(),
  authorId: z.string().uuid(),
  authorDisplayName: z.string().nullable(),
  /** default('human') — обратная совместимость уже сохранённых ответов/тестов до Ф9. */
  authorKind: ugcAuthorKindSchema.default('human'),
  kind: postKindSchema,
  title: z.string(),
  bodyMd: z.string(),
  /** `SharePositions` (см. calc.ts) — типизирован широко (jsonb на границе БД). */
  chart: z.any().nullable(),
  celebritySlug: z.string().nullable(),
  status: postStatusSchema,
  moderation: ugcModerationStatusSchema,
  likesCount: z.number().int(),
  commentsCount: z.number().int(),
  createdAt: z.string(),
  /** true, если текущий (авторизованный) пользователь — автор; для UI-кнопок «отметить полезным»/«удалить». */
  isMine: z.boolean().default(false),
});
export type PostResponse = z.infer<typeof postResponseSchema>;

export const postListQuerySchema = z.object({
  kind: postKindSchema.optional(),
  sort: postSortSchema.default('new'),
  celebritySlug: z.string().optional(),
  authorId: z.string().uuid().optional(),
  limit: z.coerce.number().int().min(1).max(50).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});
export type PostListQuery = z.infer<typeof postListQuerySchema>;

export const postListResponseSchema = z.object({ items: z.array(postResponseSchema), total: z.number().int() });
export type PostListResponse = z.infer<typeof postListResponseSchema>;

// ---------------------------------------------------------------------------------------------
// Комментарии (дерево 2 уровня — req.2 промта)
// ---------------------------------------------------------------------------------------------

export const commentCreateRequestSchema = z.object({
  bodyMd: z.string().trim().min(1).max(5000),
  /** Родительский комментарий (только 1 уровень вложенности — ответ на ответ отклоняется API). */
  parentId: z.string().uuid().optional(),
});
export type CommentCreateRequest = z.infer<typeof commentCreateRequestSchema>;

export const commentResponseSchema = z.object({
  id: z.string().uuid(),
  postId: z.string().uuid(),
  authorId: z.string().uuid(),
  authorDisplayName: z.string().nullable(),
  /** См. postResponseSchema.authorKind. */
  authorKind: ugcAuthorKindSchema.default('human'),
  parentId: z.string().uuid().nullable(),
  bodyMd: z.string(),
  status: postStatusSchema,
  moderation: ugcModerationStatusSchema,
  markedUsefulAt: z.string().nullable(),
  createdAt: z.string(),
  isMine: z.boolean().default(false),
});
export type CommentResponse = z.infer<typeof commentResponseSchema>;

export const commentListResponseSchema = z.object({ items: z.array(commentResponseSchema) });
export type CommentListResponse = z.infer<typeof commentListResponseSchema>;

// ---------------------------------------------------------------------------------------------
// Реакции
// ---------------------------------------------------------------------------------------------

export const reactionEntitySchema = z.enum(['post', 'comment']);
export type ReactionEntity = z.infer<typeof reactionEntitySchema>;

export const REACTION_KINDS = ['like', 'heart', 'insightful', 'support'] as const;
export const reactionKindSchema = z.enum(REACTION_KINDS);
export type ReactionKind = z.infer<typeof reactionKindSchema>;

export const REACTION_KIND_NAME_RU: Record<ReactionKind, string> = {
  like: 'нравится',
  heart: 'сердечко',
  insightful: 'точно подмечено',
  support: 'поддержка',
};

export const reactionToggleRequestSchema = z.object({
  entity: reactionEntitySchema,
  entityId: z.string().uuid(),
  kind: reactionKindSchema,
});
export type ReactionToggleRequest = z.infer<typeof reactionToggleRequestSchema>;

export const reactionSummaryResponseSchema = z.object({
  counts: z.record(z.string(), z.number().int()),
  mine: z.array(reactionKindSchema),
});
export type ReactionSummaryResponse = z.infer<typeof reactionSummaryResponseSchema>;

// ---------------------------------------------------------------------------------------------
// Друзья и синастрия (req.3 промта)
// ---------------------------------------------------------------------------------------------

export const friendshipStatusSchema = z.enum(['pending', 'accepted']);
export type FriendshipStatus = z.infer<typeof friendshipStatusSchema>;

export const friendshipCreateRequestSchema = z.object({ friendId: z.string().uuid() });
export type FriendshipCreateRequest = z.infer<typeof friendshipCreateRequestSchema>;

export const friendshipResponseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  friendId: z.string().uuid(),
  friendDisplayName: z.string().nullable(),
  status: friendshipStatusSchema,
  /** Перспектива ТЕКУЩЕГО (авторизованного) пользователя — см. doc-комментарий
   *  `packages/db/src/schema/friendships.ts` («направленная модель… sharedByUser/sharedByFriend»):
   *  `iShared` — я открыл свою карту этому другу; `friendShared` — друг открыл карту мне. Виджет
   *  синастрии доступен, только когда ОБА true. */
  iShared: z.boolean(),
  friendShared: z.boolean(),
  createdAt: z.string(),
});
export type FriendshipResponse = z.infer<typeof friendshipResponseSchema>;

export const friendshipListResponseSchema = z.object({ items: z.array(friendshipResponseSchema) });
export type FriendshipListResponse = z.infer<typeof friendshipListResponseSchema>;

export const friendshipShareChartRequestSchema = z.object({ shared: z.boolean() });
export type FriendshipShareChartRequest = z.infer<typeof friendshipShareChartRequestSchema>;

/** Виджет синастрии — доступен, только если ОБЕ стороны chart_shared=true (см. findings f7.md
 *  [data-model-gap] «взаимность согласия»); `computed=false` — честный empty-state иначе. */
export const friendshipSynastryResponseSchema = z.object({
  computed: z.boolean(),
  reason: z.enum(['ok', 'not_friends', 'not_mutually_shared', 'no_chart']).optional(),
  /** `SharePositions` карты каждой стороны (см. calc.ts). */
  a: z.any().nullable(),
  b: z.any().nullable(),
  /** `Aspect[]` (см. chart.ts) — межкартовые аспекты. */
  crossAspects: z.array(z.any()),
});
export type FriendshipSynastryResponse = z.infer<typeof friendshipSynastryResponseSchema>;

// ---------------------------------------------------------------------------------------------
// Жалобы (req.5 промта) + автоклассификатор
// ---------------------------------------------------------------------------------------------

/** Единый словарь причин — используется и ручными жалобами (`reports_ugc.reason`), и
 *  автоклассификатором (`packages/llm/src/moderation/ugc-classifier.ts`), см. заголовок файла. */
export const UGC_VIOLATION_REASONS = [
  'death_or_illness_prediction',
  'curse_or_love_spell',
  'medical_directive',
  'financial_directive',
  'insult',
  'other',
] as const;
export const ugcViolationReasonSchema = z.enum(UGC_VIOLATION_REASONS);
export type UgcViolationReason = z.infer<typeof ugcViolationReasonSchema>;

export const UGC_VIOLATION_REASON_NAME_RU: Record<UgcViolationReason, string> = {
  death_or_illness_prediction: 'предсказание смерти/болезни',
  curse_or_love_spell: 'порча/приворот',
  medical_directive: 'медицинская директива',
  financial_directive: 'финансовая директива',
  insult: 'оскорбление',
  other: 'другое',
};

export const reportsUgcStatusSchema = z.enum(['pending', 'resolved', 'dismissed']);
export type ReportsUgcStatus = z.infer<typeof reportsUgcStatusSchema>;

export const reportUgcCreateRequestSchema = z.object({
  entity: reactionEntitySchema,
  entityId: z.string().uuid(),
  reason: ugcViolationReasonSchema,
  comment: z.string().max(2000).optional(),
});
export type ReportUgcCreateRequest = z.infer<typeof reportUgcCreateRequestSchema>;

export const reportUgcResponseSchema = z.object({
  id: z.string().uuid(),
  reporterId: z.string().uuid(),
  entity: reactionEntitySchema,
  entityId: z.string().uuid(),
  reason: ugcViolationReasonSchema,
  status: reportsUgcStatusSchema,
  createdAt: z.string(),
});
export type ReportUgcResponse = z.infer<typeof reportUgcResponseSchema>;

// ---------------------------------------------------------------------------------------------
// Модерация (очередь премодерации + жалоб)
// ---------------------------------------------------------------------------------------------

export const moderationQueueItemSchema = z.object({
  entity: reactionEntitySchema,
  entityId: z.string().uuid(),
  postId: z.string().uuid().nullable(),
  authorId: z.string().uuid(),
  authorDisplayName: z.string().nullable(),
  title: z.string().nullable(),
  bodyMd: z.string(),
  moderation: ugcModerationStatusSchema,
  /** Причины автоклассификатора (пусто, если попало в очередь из-за премодерации новичка/жалобы). */
  autoFlags: z.array(ugcViolationReasonSchema),
  reportsCount: z.number().int(),
  createdAt: z.string(),
});
export type ModerationQueueItem = z.infer<typeof moderationQueueItemSchema>;

export const moderationQueueResponseSchema = z.object({ items: z.array(moderationQueueItemSchema) });
export type ModerationQueueResponse = z.infer<typeof moderationQueueResponseSchema>;

export const moderationActionRequestSchema = z.object({
  action: z.enum(['approve', 'reject']),
  reason: z.string().max(500).optional(),
});
export type ModerationActionRequest = z.infer<typeof moderationActionRequestSchema>;

// ---------------------------------------------------------------------------------------------
// Репутация
// ---------------------------------------------------------------------------------------------

export const reputationResponseSchema = z.object({
  userId: z.string().uuid(),
  score: z.number().int(),
  badges: z.array(z.string()),
});
export type ReputationResponse = z.infer<typeof reputationResponseSchema>;

/** Пороговые бейджи по очкам репутации (детерминированные, без БД — используется и на бэке при
 *  начислении, и на фронте для отображения следующей планки). */
export const REPUTATION_BADGE_THRESHOLDS: ReadonlyArray<{ badge: string; minScore: number; labelRu: string }> = [
  { badge: 'novice', minScore: 0, labelRu: 'Новичок' },
  { badge: 'helper', minScore: 10, labelRu: 'Помощник' },
  { badge: 'analyst', minScore: 30, labelRu: 'Аналитик' },
  { badge: 'expert_voice', minScore: 100, labelRu: 'Опытный голос' },
];

export function badgesForScore(score: number): string[] {
  return REPUTATION_BADGE_THRESHOLDS.filter((t) => score >= t.minScore).map((t) => t.badge);
}

/** Очки за отметку «полезный разбор» (req.2 промта) — единственный источник правды. */
export const USEFUL_COMMENT_REPUTATION_POINTS = 5;

// ---------------------------------------------------------------------------------------------
// Премодерация новичков (req.5 промта: «премодерация первых 3 постов новичка») — ЧИСТАЯ функция,
// решение принимается ДО записи в БД (см. apps/api/src/routes/posts.ts).
// ---------------------------------------------------------------------------------------------

export function decideInitialPostModeration(priorApprovedPostCount: number, classifierFlagged: boolean): UgcModerationStatus {
  if (classifierFlagged) return 'pending';
  if (priorApprovedPostCount < 3) return 'pending';
  return 'approved';
}
