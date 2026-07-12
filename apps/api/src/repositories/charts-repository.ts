import { eq } from 'drizzle-orm';
import { charts, type Db } from '@stassist/db';
import type { ChartData } from '@stassist/shared';

export type ChartRow = typeof charts.$inferSelect;

export async function insertChart(
  db: Db,
  params: {
    birthProfileId: string;
    presetId: string;
    kind: ChartData['kind'];
    data: ChartData;
    coreVersion: string;
    checksum: string;
  },
): Promise<ChartRow> {
  const [row] = await db
    .insert(charts)
    .values({
      birthProfileId: params.birthProfileId,
      presetId: params.presetId,
      kind: params.kind,
      data: params.data,
      coreVersion: params.coreVersion,
      checksum: params.checksum,
    })
    .returning();
  if (!row) throw new Error('insertChart: INSERT не вернул строку');
  return row;
}

export async function findNatalChartByProfile(db: Db, birthProfileId: string): Promise<ChartRow | null> {
  const rows = await db.select().from(charts).where(eq(charts.birthProfileId, birthProfileId)).limit(1);
  return rows[0] ?? null;
}
