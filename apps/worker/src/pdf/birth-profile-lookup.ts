/**
 * Читает и расшифровывает МИНИМАЛЬНО необходимые поля `birth_profiles` для нумерологических
 * расчётов PDF-заказа: только день/месяц/год рождения (🔒) и `label` (для обложки PDF — «Матрица
 * судьбы для профиля «…»», см. `report-content-types.ts` `coverNoteRu`) — координаты/время/место
 * НЕ нужны нумерологии (см. `@stassist/numerology-core` `numerologyBirthDataSchema`: day/month/
 * year/fullName), поэтому не расшифровываются вовсе (принцип минимизации доступа к ПД).
 */
import { and, eq } from 'drizzle-orm';
import { birthProfiles, type Db } from '@stassist/db';
import { decryptPd, type PdCipherKeyring } from '@stassist/shared';

export interface NumerologyBirthLookup {
  label: string;
  day: number;
  month: number;
  year: number;
}

export async function findNumerologyBirthData(
  db: Db,
  userId: string,
  birthProfileId: string,
  keyring: PdCipherKeyring,
): Promise<NumerologyBirthLookup | null> {
  const rows = await db
    .select()
    .from(birthProfiles)
    .where(and(eq(birthProfiles.id, birthProfileId), eq(birthProfiles.userId, userId)))
    .limit(1);
  const row = rows[0];
  if (!row) return null;
  const isoDate = decryptPd(row.birthDateEnc, keyring); // 'YYYY-MM-DD'
  const [yearStr, monthStr, dayStr] = isoDate.split('-');
  return {
    label: row.label,
    year: Number(yearStr),
    month: Number(monthStr),
    day: Number(dayStr),
  };
}
