import { and, desc, eq, ne } from 'drizzle-orm';
import { aiReports, type Db } from '@stassist/db';
import type { GenerateReportResult } from '@stassist/llm';
import type { AiReportResponse, ReportKind } from '@stassist/shared';

/**
 * `kind: ReportKind` (не полный DB-enum) — этот репозиторий обслуживает ТОЛЬКО общий контракт
 * `/ai-reports` (см. `reportKindSchema` в packages/shared/src/schemas/ai-report.ts). `kind:
 * 'personal_horoscope'` (Ф5) — отдельный домен со своим репозиторием
 * (apps/api/src/repositories/personal-horoscope-repository.ts) и своим роутом
 * (apps/api/src/routes/personal-horoscope.ts), см. doc-комментарий packages/db/src/schema/
 * enums.ts `aiReportKindEnum`. Запросы ниже ЯВНО исключают `personal_horoscope`
 * (`ne(aiReports.kind, 'personal_horoscope')`), поэтому это не просто typescript-натяжка поверх
 * инференса Drizzle, а гарантия и на уровне SQL — строка с этим kind никогда не попадёт сюда.
 */
export type AiReportRow = Omit<typeof aiReports.$inferSelect, 'kind'> & { kind: ReportKind };

export function rowToResponse(row: AiReportRow): AiReportResponse {
  return {
    id: row.id,
    kind: row.kind,
    status: row.status,
    contentMd: row.contentMd,
    calcBlock: (row.calcBlock as Record<string, unknown> | null) ?? null,
    promptVersion: row.promptVersion,
    provider: row.provider,
    tokensIn: row.tokensIn,
    tokensOut: row.tokensOut,
    costMicros: row.costMicros,
    pdfKey: row.pdfKey,
    errorMessage: row.errorMessage,
    createdAt: row.createdAt.toISOString(),
    completedAt: row.completedAt ? row.completedAt.toISOString() : null,
  };
}

export async function findDoneReportByCacheKey(db: Db, cacheKey: string): Promise<AiReportRow | null> {
  const rows = await db
    .select()
    .from(aiReports)
    .where(and(eq(aiReports.cacheKey, cacheKey), eq(aiReports.status, 'done'), ne(aiReports.kind, 'personal_horoscope')))
    .orderBy(desc(aiReports.createdAt))
    .limit(1);
  return (rows[0] as AiReportRow | undefined) ?? null;
}

export async function findAiReportForUser(db: Db, userId: string, id: string): Promise<AiReportRow | null> {
  const rows = await db
    .select()
    .from(aiReports)
    .where(and(eq(aiReports.id, id), eq(aiReports.userId, userId), ne(aiReports.kind, 'personal_horoscope')))
    .limit(1);
  return (rows[0] as AiReportRow | undefined) ?? null;
}

export interface InsertQueuedParams {
  userId: string;
  birthProfileId: string;
  chartId: string;
  kind: ReportKind;
  input: Record<string, unknown>;
  promptVersion: string;
  cacheKey: string;
}

export async function insertQueuedAiReport(db: Db, params: InsertQueuedParams): Promise<AiReportRow> {
  const [row] = await db
    .insert(aiReports)
    .values({
      userId: params.userId,
      birthProfileId: params.birthProfileId,
      chartId: params.chartId,
      kind: params.kind,
      status: 'queued',
      input: params.input,
      promptVersion: params.promptVersion,
      cacheKey: params.cacheKey,
    })
    .returning();
  if (!row) throw new Error('insertQueuedAiReport: INSERT не вернул строку');
  // params.kind уже типизирован как ReportKind (см. InsertQueuedParams) — .returning() просто
  // отражает более широкий DB-enum (см. doc-комментарий AiReportRow выше).
  return row as AiReportRow;
}

export interface InsertDoneParams extends InsertQueuedParams {
  result: GenerateReportResult;
}

/** Для kind, допускающих синхронное исполнение (см. reportKindConfig().allowSynchronous — big3). */
export async function insertDoneAiReport(db: Db, params: InsertDoneParams): Promise<AiReportRow> {
  const [row] = await db
    .insert(aiReports)
    .values({
      userId: params.userId,
      birthProfileId: params.birthProfileId,
      chartId: params.chartId,
      kind: params.kind,
      status: params.result.flagged ? 'flagged' : 'done',
      input: params.input,
      contentMd: params.result.contentMd,
      calcBlock: params.result.calcBlock,
      chunksUsed: params.result.usedChunks,
      promptVersion: params.result.promptVersion,
      corpusVersion: params.result.corpusVersion,
      provider: params.result.provider,
      tokensIn: params.result.tokensIn,
      tokensOut: params.result.tokensOut,
      costMicros: params.result.costMicros,
      cacheKey: params.cacheKey,
      completedAt: new Date(),
    })
    .returning();
  if (!row) throw new Error('insertDoneAiReport: INSERT не вернул строку');
  return row as AiReportRow;
}
