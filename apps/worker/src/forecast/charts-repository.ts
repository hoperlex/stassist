/**
 * Натальная карта профиля для конвейера индивидуальных прогнозов (Ф8) — `charts.data` уже
 * посчитанный `ChartData` (см. `apps/api/src/charts/natal-chart-service.ts`: считается и
 * сохраняется при создании профиля рождения), НЕ ПД сама по себе — доп. дешифровка не нужна
 * (тот же принцип минимизации доступа к ПД, что `apps/worker/src/llm/charts-repository.ts`).
 */
import { and, desc, eq } from 'drizzle-orm';
import { birthProfiles, charts, type Db } from '@stassist/db';

export type ChartRow = typeof charts.$inferSelect;

export async function findNatalChartByBirthProfileId(db: Db, birthProfileId: string): Promise<ChartRow | null> {
  const rows = await db
    .select()
    .from(charts)
    .where(and(eq(charts.birthProfileId, birthProfileId), eq(charts.kind, 'natal')))
    .orderBy(desc(charts.createdAt))
    .limit(1);
  return rows[0] ?? null;
}

/** `label` — НЕ ПД (напр. «Я», «Партнёр» — придумано пользователем), безопасно читать без
 *  дешифровки (см. doc-комментарий `apps/worker/src/pdf/birth-profile-lookup.ts` для сравнения —
 *  тот файл дешифрует день/месяц/год для нумерологии, здесь это не нужно). */
export async function findBirthProfileLabel(db: Db, birthProfileId: string): Promise<string | null> {
  const rows = await db.select({ label: birthProfiles.label }).from(birthProfiles).where(eq(birthProfiles.id, birthProfileId)).limit(1);
  return rows[0]?.label ?? null;
}
