/**
 * posts — лента коммьюнити (Ф7, M8). `chartId`/`celebrityId` — см. doc-комментарий
 * packages/db/src/schema/posts.ts.
 */
import { and, count, desc, eq, isNull, ne, sql } from 'drizzle-orm';
import { celebrities, posts, users, type Db } from '@stassist/db';
import type { PostKind, PostSort, UgcModerationStatus, UgcViolationReason } from '@stassist/shared';

export type PostRow = typeof posts.$inferSelect;

export interface InsertPostParams {
  authorId: string;
  kind: PostKind;
  title: string;
  bodyMd: string;
  chartId?: string | null;
  celebrityId?: string | null;
  moderation: UgcModerationStatus;
  autoFlags: UgcViolationReason[];
}

export async function insertPost(db: Db, params: InsertPostParams): Promise<PostRow> {
  const [row] = await db
    .insert(posts)
    .values({
      authorId: params.authorId,
      kind: params.kind,
      title: params.title,
      bodyMd: params.bodyMd,
      chartId: params.chartId ?? null,
      celebrityId: params.celebrityId ?? null,
      moderation: params.moderation,
      autoFlags: params.autoFlags,
    })
    .returning();
  if (!row) throw new Error('insertPost: INSERT не вернул строку');
  return row;
}

/** Кол-во уже одобренных постов автора — вход для `decideInitialPostModeration` (премодерация
 *  первых 3 постов новичка, req.5 промта). */
export async function countApprovedPosts(db: Db, authorId: string): Promise<number> {
  const rows = await db
    .select({ n: count() })
    .from(posts)
    .where(and(eq(posts.authorId, authorId), eq(posts.moderation, 'approved')));
  return rows[0]?.n ?? 0;
}

export interface ListPostsParams {
  kind?: PostKind;
  sort: PostSort;
  celebritySlug?: string;
  authorId?: string;
  /** true — публичная лента (только published+approved); false — «мои посты» (все статусы автора,
   *  кроме deleted), см. routes/posts.ts. */
  onlyApproved: boolean;
  limit: number;
  offset: number;
}

export async function listPosts(db: Db, params: ListPostsParams): Promise<{ items: PostRow[]; total: number }> {
  const conditions = [
    params.kind ? eq(posts.kind, params.kind) : undefined,
    // Ф9: системные треды «Небо дня» живут на своей странице (/nebo-dnya) — в общей ленте их нет,
    // если только их не запросили явно через kind=sky_day.
    !params.kind ? ne(posts.kind, 'sky_day') : undefined,
    params.authorId ? eq(posts.authorId, params.authorId) : undefined,
    params.onlyApproved ? eq(posts.status, 'published') : undefined,
    params.onlyApproved ? eq(posts.moderation, 'approved') : undefined,
    !params.onlyApproved ? isNull(posts.deletedAt) : undefined,
  ].filter((c): c is NonNullable<typeof c> => c !== undefined);

  let celebrityId: string | undefined;
  if (params.celebritySlug) {
    const rows = await db.select({ id: celebrities.id }).from(celebrities).where(eq(celebrities.slug, params.celebritySlug)).limit(1);
    celebrityId = rows[0]?.id;
    if (!celebrityId) return { items: [], total: 0 };
    conditions.push(eq(posts.celebrityId, celebrityId));
  }

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const orderBy =
    params.sort === 'popular'
      ? [desc(posts.likesCount), desc(posts.createdAt)]
      : params.sort === 'unanswered'
        ? [posts.commentsCount, desc(posts.createdAt)]
        : [desc(posts.createdAt)];

  const [items, totalRows] = await Promise.all([
    db.select().from(posts).where(where).orderBy(...orderBy).limit(params.limit).offset(params.offset),
    db.select({ n: count() }).from(posts).where(where),
  ]);

  const filteredItems = params.sort === 'unanswered' ? items.filter((p) => p.commentsCount === 0) : items;
  return { items: filteredItems, total: totalRows[0]?.n ?? 0 };
}

/** Очередь модерации (req.5 промта) — посты, ожидающие решения (премодерация новичка ИЛИ
 *  автоклассификатор их флагнул). */
export async function listPendingPosts(db: Db, limit: number): Promise<PostRow[]> {
  return db.select().from(posts).where(eq(posts.moderation, 'pending')).orderBy(posts.createdAt).limit(limit);
}

export async function getPostById(db: Db, id: string): Promise<PostRow | null> {
  const rows = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function getAuthorDisplayName(db: Db, authorId: string): Promise<string | null> {
  const rows = await db.select({ displayName: users.displayName }).from(users).where(eq(users.id, authorId)).limit(1);
  return rows[0]?.displayName ?? null;
}

export async function incrementCommentsCount(db: Db, postId: string, delta: number): Promise<void> {
  await db
    .update(posts)
    .set({ commentsCount: sql`GREATEST(${posts.commentsCount} + ${delta}, 0)` })
    .where(eq(posts.id, postId));
}

/** `posts.likesCount` — денормализованный счётчик реакций kind='like' (используется сортировкой
 *  sort='popular' и лентой без доп. JOIN на каждый рендер), см. routes/reactions.ts. */
export async function incrementLikesCount(db: Db, postId: string, delta: number): Promise<void> {
  await db
    .update(posts)
    .set({ likesCount: sql`GREATEST(${posts.likesCount} + ${delta}, 0)` })
    .where(eq(posts.id, postId));
}

export async function setPostModeration(db: Db, id: string, moderation: UgcModerationStatus, notified?: boolean): Promise<PostRow | null> {
  const [row] = await db
    .update(posts)
    .set({
      moderation,
      status: moderation === 'rejected' ? 'hidden' : 'published',
      moderationNotifiedAt: notified ? new Date() : undefined,
      updatedAt: new Date(),
    })
    .where(eq(posts.id, id))
    .returning();
  return row ?? null;
}

export async function softDeletePost(db: Db, id: string, authorId: string): Promise<boolean> {
  const rows = await db
    .update(posts)
    .set({ status: 'deleted', deletedAt: new Date(), updatedAt: new Date() })
    .where(and(eq(posts.id, id), eq(posts.authorId, authorId)))
    .returning({ id: posts.id });
  return rows.length > 0;
}
