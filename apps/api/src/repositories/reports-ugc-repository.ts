/**
 * reports_ugc — жалобы (req.5 промта Ф7).
 */
import { and, count, desc, eq } from 'drizzle-orm';
import { reportsUgc, type Db } from '@stassist/db';
import type { ReactionEntity, ReportsUgcStatus, UgcViolationReason } from '@stassist/shared';

export type ReportUgcRow = typeof reportsUgc.$inferSelect;

export async function insertReport(
  db: Db,
  params: { reporterId: string; entity: ReactionEntity; entityId: string; reason: UgcViolationReason; comment?: string },
): Promise<ReportUgcRow> {
  const [row] = await db
    .insert(reportsUgc)
    .values({ reporterId: params.reporterId, entity: params.entity, entityId: params.entityId, reason: params.reason, comment: params.comment ?? null })
    .returning();
  if (!row) throw new Error('insertReport: INSERT не вернул строку');
  return row;
}

export async function listPendingReports(db: Db): Promise<ReportUgcRow[]> {
  return db.select().from(reportsUgc).where(eq(reportsUgc.status, 'pending')).orderBy(desc(reportsUgc.createdAt));
}

export async function countPendingReportsFor(db: Db, entity: ReactionEntity, entityId: string): Promise<number> {
  const rows = await db
    .select({ n: count() })
    .from(reportsUgc)
    .where(and(eq(reportsUgc.entity, entity), eq(reportsUgc.entityId, entityId), eq(reportsUgc.status, 'pending')));
  return rows[0]?.n ?? 0;
}

export async function resolveReport(db: Db, id: string, moderatorId: string, status: ReportsUgcStatus): Promise<ReportUgcRow | null> {
  const [row] = await db
    .update(reportsUgc)
    .set({ status, resolvedBy: moderatorId, resolvedAt: new Date() })
    .where(eq(reportsUgc.id, id))
    .returning();
  return row ?? null;
}
