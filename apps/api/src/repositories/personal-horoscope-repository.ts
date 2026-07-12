/**
 * Хранилище персонального гороскопа — `ai_reports.kind='personal_horoscope'` (см. doc-комментарий
 * packages/db/src/schema/enums.ts `aiReportKindEnum` и packages/llm/src/horoscope/personal.ts).
 * НЕ переиспользует apps/api/src/repositories/ai-reports-repository.ts (тот репозиторий явно
 * исключает `personal_horoscope`, см. его doc-комментарий) — отдельный, узкий набор запросов.
 */
import { and, desc, eq } from 'drizzle-orm';
import { aiReports, type Db } from '@stassist/db';

export type PersonalHoroscopeRow = typeof aiReports.$inferSelect;

export async function findPersonalHoroscopeByCacheKey(db: Db, cacheKey: string): Promise<PersonalHoroscopeRow | null> {
  const rows = await db
    .select()
    .from(aiReports)
    .where(and(eq(aiReports.cacheKey, cacheKey), eq(aiReports.kind, 'personal_horoscope')))
    .orderBy(desc(aiReports.createdAt))
    .limit(1);
  return rows[0] ?? null;
}

export interface InsertPersonalHoroscopeParams {
  userId: string;
  birthProfileId: string;
  cacheKey: string;
  summaryMd: string;
  /** `null` = полная версия НЕ сгенерирована (пейвол выключен, см. routes/personal-horoscope.ts
   *  `PERSONAL_HOROSCOPE_FULL_ENABLED`) — принципиально ОТЛИЧАЕТСЯ от «транзитов нет» (та ветка
   *  возвращает непустую строку-заглушку из packages/llm, см. `buildPersonalHoroscopeFull`). */
  fullMd: string | null;
  fullProvider: string | null;
  fullTokensIn: number | null;
  fullTokensOut: number | null;
  flagged: boolean;
  calcBlock: Record<string, unknown>;
  promptVersion: string;
}

export async function insertPersonalHoroscope(db: Db, params: InsertPersonalHoroscopeParams): Promise<PersonalHoroscopeRow> {
  const [row] = await db
    .insert(aiReports)
    .values({
      userId: params.userId,
      birthProfileId: params.birthProfileId,
      kind: 'personal_horoscope',
      status: params.flagged ? 'flagged' : 'done',
      input: { summaryMd: params.summaryMd },
      contentMd: params.fullMd,
      calcBlock: params.calcBlock,
      promptVersion: params.promptVersion,
      provider: params.fullProvider,
      tokensIn: params.fullTokensIn,
      tokensOut: params.fullTokensOut,
      cacheKey: params.cacheKey,
      completedAt: new Date(),
    })
    .returning();
  if (!row) throw new Error('insertPersonalHoroscope: INSERT не вернул строку');
  return row;
}
