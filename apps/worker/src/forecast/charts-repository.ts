/**
 * Натальная карта профиля для конвейера индивидуальных прогнозов (Ф8) — `charts.data` в БД
 * ЗАШИФРОВАН тем же keyring, что 🔒-поля `birth_profiles` (находка [pd-leak-charts-data]:
 * `ChartData.input` содержит точные дату/время/координаты рождения — это ПД, дешифровка нужна
 * здесь же, на границе репозитория, см. `apps/api/src/repositories/charts-repository.ts` для
 * симметричной логики на стороне api).
 */
import { and, desc, eq } from 'drizzle-orm';
import { birthProfiles, charts, type Db } from '@stassist/db';
import { decryptPd, type ChartData, type PdCipherKeyring, type SharePositions } from '@stassist/shared';

type ChartSelectRow = typeof charts.$inferSelect;
export type ChartRow = Omit<ChartSelectRow, 'data'> & { data: ChartData | SharePositions };

function decryptRow(row: ChartSelectRow, keyring: PdCipherKeyring): ChartRow {
  return {
    ...row,
    data: JSON.parse(decryptPd(row.data as unknown as string, keyring)) as ChartData | SharePositions,
  };
}

export async function findNatalChartByBirthProfileId(
  db: Db,
  birthProfileId: string,
  keyring: PdCipherKeyring,
): Promise<ChartRow | null> {
  const rows = await db
    .select()
    .from(charts)
    .where(and(eq(charts.birthProfileId, birthProfileId), eq(charts.kind, 'natal')))
    .orderBy(desc(charts.createdAt))
    .limit(1);
  const row = rows[0];
  return row ? decryptRow(row, keyring) : null;
}

/** `label` — НЕ ПД (напр. «Я», «Партнёр» — придумано пользователем), безопасно читать без
 *  дешифровки (см. doc-комментарий `apps/worker/src/pdf/birth-profile-lookup.ts` для сравнения —
 *  тот файл дешифрует день/месяц/год для нумерологии, здесь это не нужно). */
export async function findBirthProfileLabel(db: Db, birthProfileId: string): Promise<string | null> {
  const rows = await db.select({ label: birthProfiles.label }).from(birthProfiles).where(eq(birthProfiles.id, birthProfileId)).limit(1);
  return rows[0]?.label ?? null;
}
