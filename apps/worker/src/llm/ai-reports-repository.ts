import { and, desc, eq } from 'drizzle-orm';
import { aiReports, type Db } from '@stassist/db';
import type { GenerateReportResult } from '@stassist/llm';

export type AiReportRow = typeof aiReports.$inferSelect;

/** Строки status='queued', готовые к обработке (см. worker.ts AI_REPORT_QUEUE — тот же паттерн
 *  poll-по-статусу, что и apps/worker/src/share/process-pending-shares.ts). */
export async function findQueuedAiReports(db: Db, limit = 5): Promise<AiReportRow[]> {
  return db.select().from(aiReports).where(eq(aiReports.status, 'queued')).limit(limit);
}

export async function markGenerating(db: Db, id: string): Promise<void> {
  await db.update(aiReports).set({ status: 'generating', updatedAt: new Date() }).where(eq(aiReports.id, id));
}

export async function markDone(db: Db, id: string, result: GenerateReportResult): Promise<void> {
  await db
    .update(aiReports)
    .set({
      status: result.flagged ? 'flagged' : 'done',
      contentMd: result.contentMd,
      calcBlock: result.calcBlock,
      chunksUsed: result.usedChunks,
      promptVersion: result.promptVersion,
      corpusVersion: result.corpusVersion,
      provider: result.provider,
      tokensIn: result.tokensIn,
      tokensOut: result.tokensOut,
      costMicros: result.costMicros,
      completedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(aiReports.id, id));
}

export async function markFailed(db: Db, id: string, errorMessage: string): Promise<void> {
  await db
    .update(aiReports)
    .set({ status: 'failed', errorMessage: errorMessage.slice(0, 2000), updatedAt: new Date() })
    .where(eq(aiReports.id, id));
}

/** Последний готовый отчёт по cache_key (кэш-хит — см. src/cache/cache-key.ts в @stassist/llm). */
export async function findDoneReportByCacheKey(db: Db, cacheKey: string): Promise<AiReportRow | null> {
  const rows = await db
    .select()
    .from(aiReports)
    .where(and(eq(aiReports.cacheKey, cacheKey), eq(aiReports.status, 'done')))
    .orderBy(desc(aiReports.createdAt))
    .limit(1);
  return rows[0] ?? null;
}
