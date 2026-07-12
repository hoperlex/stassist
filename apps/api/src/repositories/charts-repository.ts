import { eq } from 'drizzle-orm';
import { charts, type Db } from '@stassist/db';
import { decryptPd, encryptPd, type ChartData, type ChartKind, type PdCipherKeyring, type SharePositions } from '@stassist/shared';

/**
 * `charts.data` в БД — ШИФРТЕКСТ (см. doc-комментарий `packages/db/src/schema/charts.ts`), а не
 * сырой `ChartData`/`SharePositions`. Наружу (из этого модуля) `ChartRow['data']` всегда отдаётся
 * УЖЕ расшифрованным/распарсенным — граница шифрования (как и у `birth-profiles-repository.ts`)
 * находится строго здесь, весь остальной код (routes/сервисы) продолжает работать с обычным
 * объектом и ничего не знает про шифрование.
 */
type ChartSelectRow = typeof charts.$inferSelect;
export type ChartRow = Omit<ChartSelectRow, 'data'> & { data: ChartData | SharePositions };

/** Чистая функция (без I/O) — покрывается unit-тестом round-trip без БД, см. charts-repository.test.ts. */
export function encryptChartData(data: ChartData | SharePositions, keyring: PdCipherKeyring): string {
  return encryptPd(JSON.stringify(data), keyring);
}

/** Чистая функция (без I/O) — покрывается unit-тестом round-trip без БД, см. charts-repository.test.ts. */
export function decryptChartData(blob: string, keyring: PdCipherKeyring): ChartData | SharePositions {
  return JSON.parse(decryptPd(blob, keyring)) as ChartData | SharePositions;
}

function decryptRow(row: ChartSelectRow, keyring: PdCipherKeyring): ChartRow {
  return {
    ...row,
    data: decryptChartData(row.data as unknown as string, keyring),
  };
}

/**
 * Ф7: анонимная копия карты для поста коммьюнити (см. `packages/db/src/schema/charts.ts` —
 * `birthProfileId` намеренно nullable именно для этого случая, `packages/shared/src/schemas/
 * community.ts` заголовок файла). `data` — `SharePositions` (см. calc.ts `anonymizeChartData`),
 * НЕ полная `ChartData` (без `input`/`kind` верхнего уровня — это и есть анонимизация). Сам
 * `SharePositions` персональных данных не содержит, но шифруется тем же blob-механизмом, что и
 * `insertChart` — единообразно, без ветвления по `kind` (см. doc-комментарий charts-repository
 * про шифрование blob целиком, находка [pd-leak-charts-data]).
 */
export async function insertAnonymizedChart(
  db: Db,
  params: { presetId: string; kind: ChartKind; data: SharePositions; coreVersion: string; checksum: string },
  keyring: PdCipherKeyring,
): Promise<ChartRow> {
  const [row] = await db
    .insert(charts)
    .values({
      birthProfileId: null,
      presetId: params.presetId,
      kind: params.kind,
      data: encryptChartData(params.data, keyring),
      coreVersion: params.coreVersion,
      checksum: params.checksum,
    })
    .returning();
  if (!row) throw new Error('insertAnonymizedChart: INSERT не вернул строку');
  return decryptRow(row, keyring);
}

/**
 * `data` шифруется целиком тем же keyring, что 🔒-поля `birth_profiles` (находка
 * [pd-leak-charts-data]): `ChartData.input` содержит точные дату/время/координаты рождения —
 * дублировать их открытым текстом рядом с шифртекстом birth_profiles недопустимо по 152-ФЗ.
 * Доступ к `charts` — всегда по `id`/`birthProfileId` (см. запросы ниже), НЕ по содержимому
 * `data`, поэтому шифрование blob не ломает выборки (GIN/JSON-операторы по `data` не используются).
 */
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
  keyring: PdCipherKeyring,
): Promise<ChartRow> {
  const [row] = await db
    .insert(charts)
    .values({
      birthProfileId: params.birthProfileId,
      presetId: params.presetId,
      kind: params.kind,
      data: encryptChartData(params.data, keyring),
      coreVersion: params.coreVersion,
      checksum: params.checksum,
    })
    .returning();
  if (!row) throw new Error('insertChart: INSERT не вернул строку');
  return decryptRow(row, keyring);
}

export async function findNatalChartByProfile(
  db: Db,
  birthProfileId: string,
  keyring: PdCipherKeyring,
): Promise<ChartRow | null> {
  const rows = await db.select().from(charts).where(eq(charts.birthProfileId, birthProfileId)).limit(1);
  const row = rows[0];
  return row ? decryptRow(row, keyring) : null;
}

export async function getChartById(db: Db, id: string, keyring: PdCipherKeyring): Promise<ChartRow | null> {
  const rows = await db.select().from(charts).where(eq(charts.id, id)).limit(1);
  const row = rows[0];
  return row ? decryptRow(row, keyring) : null;
}
