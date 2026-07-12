/**
 * comments — дерево 2 уровня (req.2 промта Ф7, см. doc-комментарий packages/db/src/schema/
 * comments.ts про ограничение глубины на уровне приложения).
 */
import { and, eq, inArray, isNull } from 'drizzle-orm';
import { comments, users, type Db } from '@stassist/db';
import type { UgcModerationStatus, UgcViolationReason } from '@stassist/shared';

export type CommentRow = typeof comments.$inferSelect;

export interface InsertCommentParams {
  postId: string;
  authorId: string;
  parentId?: string | null;
  bodyMd: string;
  moderation: UgcModerationStatus;
}

export async function insertComment(db: Db, params: InsertCommentParams): Promise<CommentRow> {
  const [row] = await db
    .insert(comments)
    .values({
      postId: params.postId,
      authorId: params.authorId,
      parentId: params.parentId ?? null,
      bodyMd: params.bodyMd,
      moderation: params.moderation,
    })
    .returning();
  if (!row) throw new Error('insertComment: INSERT не вернул строку');
  return row;
}

export async function getCommentById(db: Db, id: string): Promise<CommentRow | null> {
  const rows = await db.select().from(comments).where(eq(comments.id, id)).limit(1);
  return rows[0] ?? null;
}

/** Все комментарии поста (для дерева 2 уровня — top-level `parentId=null` + их прямые ответы);
 *  видимость (status/moderation) фильтрует вызывающий код (routes/posts.ts), т.к. правило зависит
 *  от того, автор ли поста/комментария смотрит. */
export async function listCommentsForPost(db: Db, postId: string): Promise<CommentRow[]> {
  return db.select().from(comments).where(eq(comments.postId, postId)).orderBy(comments.createdAt);
}

export async function getAuthorDisplayNames(db: Db, authorIds: string[]): Promise<Map<string, string | null>> {
  if (authorIds.length === 0) return new Map();
  const unique = [...new Set(authorIds)];
  const rows = await db.select({ id: users.id, displayName: users.displayName }).from(users).where(inArray(users.id, unique));
  return new Map(rows.map((r) => [r.id, r.displayName]));
}

/** «Отметить полезным» (req.2 промта) — только один раз (идемпотентно, WHERE marked_useful_at IS NULL). */
export async function markCommentUseful(db: Db, id: string): Promise<CommentRow | null> {
  const [row] = await db
    .update(comments)
    .set({ markedUsefulAt: new Date(), updatedAt: new Date() })
    .where(and(eq(comments.id, id), isNull(comments.markedUsefulAt)))
    .returning();
  return row ?? null;
}

export async function listPendingComments(db: Db, limit: number): Promise<CommentRow[]> {
  return db.select().from(comments).where(eq(comments.moderation, 'pending')).orderBy(comments.createdAt).limit(limit);
}

export async function setCommentModeration(db: Db, id: string, moderation: UgcModerationStatus): Promise<CommentRow | null> {
  const [row] = await db
    .update(comments)
    .set({ moderation, status: moderation === 'rejected' ? 'hidden' : 'published', updatedAt: new Date() })
    .where(eq(comments.id, id))
    .returning();
  return row ?? null;
}

export interface ModerationAutoFlags {
  reasons: UgcViolationReason[];
}
