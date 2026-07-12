/**
 * reactions — «один пользователь = одна реакция на объект» (см. doc-комментарий
 * packages/db/src/schema/reactions.ts). `toggleReaction` реализует: нет реакции → создать; та же
 * `kind` → снять (toggle off); другая `kind` → заменить.
 */
import { and, eq, sql } from 'drizzle-orm';
import { reactions, type Db } from '@stassist/db';
import type { ReactionEntity, ReactionKind } from '@stassist/shared';

export type ReactionRow = typeof reactions.$inferSelect;

export type ToggleResult = { action: 'created' | 'removed' | 'changed'; kind: ReactionKind | null };

export async function toggleReaction(
  db: Db,
  params: { userId: string; entity: ReactionEntity; entityId: string; kind: ReactionKind },
): Promise<ToggleResult> {
  const existing = await db
    .select()
    .from(reactions)
    .where(and(eq(reactions.userId, params.userId), eq(reactions.entity, params.entity), eq(reactions.entityId, params.entityId)))
    .limit(1);

  const current = existing[0];
  if (!current) {
    await db.insert(reactions).values({ userId: params.userId, entity: params.entity, entityId: params.entityId, kind: params.kind });
    return { action: 'created', kind: params.kind };
  }
  if (current.kind === params.kind) {
    await db.delete(reactions).where(eq(reactions.id, current.id));
    return { action: 'removed', kind: null };
  }
  await db.update(reactions).set({ kind: params.kind }).where(eq(reactions.id, current.id));
  return { action: 'changed', kind: params.kind };
}

export async function getReactionCounts(db: Db, entity: ReactionEntity, entityId: string): Promise<Record<string, number>> {
  const rows = await db
    .select({ kind: reactions.kind, n: sql<number>`count(*)::int` })
    .from(reactions)
    .where(and(eq(reactions.entity, entity), eq(reactions.entityId, entityId)))
    .groupBy(reactions.kind);
  return Object.fromEntries(rows.map((r) => [r.kind, r.n]));
}

export async function getMyReactions(db: Db, userId: string, entity: ReactionEntity, entityId: string): Promise<ReactionKind[]> {
  const rows = await db
    .select({ kind: reactions.kind })
    .from(reactions)
    .where(and(eq(reactions.userId, userId), eq(reactions.entity, entity), eq(reactions.entityId, entityId)));
  return rows.map((r) => r.kind);
}
