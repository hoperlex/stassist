/**
 * Репозиторий «Неба дня» (Ф9, см. docs/strategy/11-соцраздел-созвездие.md): sky_days (читает —
 * пишет их worker, см. apps/worker/src/sky), sky_checkins (upsert по (userId, dayKey)),
 * sky_streaks (правило перехода — ЧИСТАЯ `advanceStreak` из @stassist/shared, здесь только I/O).
 */
import { and, count, eq } from 'drizzle-orm';
import { skyCheckins, skyDays, skyStreaks, type Db } from '@stassist/db';
import { advanceStreak, type SkyCheckinVerdict, type SkyDayAggregates } from '@stassist/shared';

export type SkyDayRow = typeof skyDays.$inferSelect;
export type SkyCheckinRow = typeof skyCheckins.$inferSelect;
export type SkyStreakRow = typeof skyStreaks.$inferSelect;

export async function findSkyDay(db: Db, dayKey: string): Promise<SkyDayRow | null> {
  const rows = await db.select().from(skyDays).where(eq(skyDays.dayKey, dayKey)).limit(1);
  return rows[0] ?? null;
}

/** Агрегаты чек-инов дня — «тред никогда не выглядит пустым» (один GROUP BY по вердикту). */
export async function countCheckinsByVerdict(db: Db, dayKey: string): Promise<SkyDayAggregates> {
  const rows = await db
    .select({ verdict: skyCheckins.verdict, n: count() })
    .from(skyCheckins)
    .where(eq(skyCheckins.dayKey, dayKey))
    .groupBy(skyCheckins.verdict);
  const byVerdict: Record<string, number> = {};
  for (const row of rows) byVerdict[row.verdict] = Number(row.n);
  const hit = byVerdict['hit'] ?? 0;
  const partial = byVerdict['partial'] ?? 0;
  const miss = byVerdict['miss'] ?? 0;
  return { total: hit + partial + miss, hit, partial, miss };
}

export async function findCheckin(db: Db, userId: string, dayKey: string): Promise<SkyCheckinRow | null> {
  const rows = await db
    .select()
    .from(skyCheckins)
    .where(and(eq(skyCheckins.userId, userId), eq(skyCheckins.dayKey, dayKey)))
    .limit(1);
  return rows[0] ?? null;
}

export async function getStreak(db: Db, userId: string): Promise<SkyStreakRow | null> {
  const rows = await db.select().from(skyStreaks).where(eq(skyStreaks.userId, userId)).limit(1);
  return rows[0] ?? null;
}

export interface UpsertCheckinParams {
  userId: string;
  dayKey: string;
  verdict: SkyCheckinVerdict;
  /** Заметка фиксируется ПЕРВЫМ чек-ином с note (см. routes/sky.ts) — здесь только запись полей. */
  note: string | null;
  noteCommentId: string | null;
}

/**
 * Чек-ин + стрик одной транзакцией: upsert отклика (повторный чек-ин дня меняет вердикт, note/
 * noteCommentId НЕ затирает, если уже установлены) и переход стрика по `advanceStreak`
 * (идемпотентен для того же дня — см. doc-комментарий packages/shared/src/schemas/sky.ts).
 */
export async function upsertCheckinWithStreak(
  db: Db,
  params: UpsertCheckinParams,
): Promise<{ checkin: SkyCheckinRow; streak: SkyStreakRow }> {
  return db.transaction(async (tx) => {
    const [checkin] = await tx
      .insert(skyCheckins)
      .values({
        userId: params.userId,
        dayKey: params.dayKey,
        verdict: params.verdict,
        note: params.note,
        noteCommentId: params.noteCommentId,
      })
      .onConflictDoUpdate({
        target: [skyCheckins.userId, skyCheckins.dayKey],
        set: {
          verdict: params.verdict,
          // COALESCE-семантика на уровне приложения: заметку не затираем повторным чек-ином без note.
          ...(params.note !== null ? { note: params.note } : {}),
          ...(params.noteCommentId !== null ? { noteCommentId: params.noteCommentId } : {}),
          updatedAt: new Date(),
        },
      })
      .returning();
    if (!checkin) throw new Error('upsertCheckinWithStreak: UPSERT чек-ина не вернул строку');

    const prevRows = await tx.select().from(skyStreaks).where(eq(skyStreaks.userId, params.userId)).limit(1);
    const prev = prevRows[0] ?? null;
    const next = advanceStreak(
      { current: prev?.current ?? 0, best: prev?.best ?? 0, lastCheckinDay: prev?.lastCheckinDay ?? null },
      params.dayKey,
    );
    const [streak] = await tx
      .insert(skyStreaks)
      .values({ userId: params.userId, current: next.current, best: next.best, lastCheckinDay: next.lastCheckinDay })
      .onConflictDoUpdate({
        target: skyStreaks.userId,
        set: { current: next.current, best: next.best, lastCheckinDay: next.lastCheckinDay, updatedAt: new Date() },
      })
      .returning();
    if (!streak) throw new Error('upsertCheckinWithStreak: UPSERT стрика не вернул строку');

    return { checkin, streak };
  });
}
