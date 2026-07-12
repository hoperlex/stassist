import { eq } from 'drizzle-orm';
import { charts, type Db } from '@stassist/db';
import type { ChartData, ChartKind, SharePositions } from '@stassist/shared';

export type ChartRow = typeof charts.$inferSelect;

/**
 * Ф7: анонимная копия карты для поста коммьюнити (см. `packages/db/src/schema/charts.ts` —
 * `birthProfileId` намеренно nullable именно для этого случая, `packages/shared/src/schemas/
 * community.ts` заголовок файла). `data` — `SharePositions` (см. calc.ts `anonymizeChartData`),
 * НЕ полная `ChartData` (без `input`/`kind` верхнего уровня — это и есть анонимизация).
 */
export async function insertAnonymizedChart(
  db: Db,
  params: { presetId: string; kind: ChartKind; data: SharePositions; coreVersion: string; checksum: string },
): Promise<ChartRow> {
  const [row] = await db
    .insert(charts)
    .values({
      birthProfileId: null,
      presetId: params.presetId,
      kind: params.kind,
      data: params.data,
      coreVersion: params.coreVersion,
      checksum: params.checksum,
    })
    .returning();
  if (!row) throw new Error('insertAnonymizedChart: INSERT не вернул строку');
  return row;
}

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

export async function getChartById(db: Db, id: string): Promise<ChartRow | null> {
  const rows = await db.select().from(charts).where(eq(charts.id, id)).limit(1);
  return rows[0] ?? null;
}
