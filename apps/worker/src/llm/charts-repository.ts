/**
 * `charts.data` в БД зашифрован тем же keyring, что 🔒-поля `birth_profiles` (находка
 * [pd-leak-charts-data]) — расшифровка на границе репозитория, см. `apps/api/src/repositories/
 * charts-repository.ts` для симметричной логики на стороне api.
 */
import { eq } from 'drizzle-orm';
import { charts, type Db } from '@stassist/db';
import { decryptPd, type ChartData, type PdCipherKeyring, type SharePositions } from '@stassist/shared';

type ChartSelectRow = typeof charts.$inferSelect;
export type ChartRow = Omit<ChartSelectRow, 'data'> & { data: ChartData | SharePositions };

export async function findChartById(db: Db, id: string, keyring: PdCipherKeyring): Promise<ChartRow | null> {
  const rows = await db.select().from(charts).where(eq(charts.id, id)).limit(1);
  const row = rows[0];
  if (!row) return null;
  return { ...row, data: JSON.parse(decryptPd(row.data as unknown as string, keyring)) as ChartData | SharePositions };
}
