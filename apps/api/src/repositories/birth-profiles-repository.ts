/**
 * birth_profiles — CRUD + шифрование/дешифрование 🔒-полей на границе репозитория (AES-256-GCM,
 * см. packages/shared/src/crypto/pd-cipher.ts). Выше по стеку (routes) все данные — уже
 * расшифрованный `BirthProfileResponse`; в БД лежит только шифртекст (см. schema/birth-profiles.ts).
 */
import { and, eq } from 'drizzle-orm';
import { birthProfiles, type Db } from '@stassist/db';
import { decryptPd, encryptPd, type BirthProfileInput, type BirthProfileResponse, type PdCipherKeyring } from '@stassist/shared';

type BirthProfileRow = typeof birthProfiles.$inferSelect;

function decryptRow(row: BirthProfileRow, keyring: PdCipherKeyring): BirthProfileResponse {
  return {
    id: row.id,
    userId: row.userId,
    label: row.label,
    kind: row.kind,
    birthDate: decryptPd(row.birthDateEnc, keyring),
    birthTime: row.birthTimeEnc ? decryptPd(row.birthTimeEnc, keyring) : null,
    timeUnknown: row.timeUnknown,
    placeName: decryptPd(row.placeNameEnc, keyring),
    lat: Number(decryptPd(row.latEnc, keyring)),
    lon: Number(decryptPd(row.lonEnc, keyring)),
    tzId: row.tzId,
    gender: row.gender,
    notes: row.notes,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function insertBirthProfile(
  db: Db,
  userId: string,
  input: BirthProfileInput,
  keyring: PdCipherKeyring,
): Promise<BirthProfileResponse> {
  const [row] = await db
    .insert(birthProfiles)
    .values({
      userId,
      label: input.label,
      kind: input.kind,
      birthDateEnc: encryptPd(input.birthDate, keyring),
      birthTimeEnc: input.birthTime ? encryptPd(input.birthTime, keyring) : null,
      timeUnknown: input.timeUnknown,
      placeNameEnc: encryptPd(input.place.placeName, keyring),
      latEnc: encryptPd(String(input.place.lat), keyring),
      lonEnc: encryptPd(String(input.place.lon), keyring),
      tzId: input.place.tzId,
      gender: input.gender ?? null,
      notes: input.notes ?? null,
    })
    .returning();
  if (!row) throw new Error('insertBirthProfile: INSERT не вернул строку');
  return decryptRow(row, keyring);
}

export async function listBirthProfiles(
  db: Db,
  userId: string,
  keyring: PdCipherKeyring,
): Promise<BirthProfileResponse[]> {
  const rows = await db.select().from(birthProfiles).where(eq(birthProfiles.userId, userId));
  return rows.map((row) => decryptRow(row, keyring));
}

export async function getBirthProfile(
  db: Db,
  userId: string,
  id: string,
  keyring: PdCipherKeyring,
): Promise<BirthProfileResponse | null> {
  const rows = await db
    .select()
    .from(birthProfiles)
    .where(and(eq(birthProfiles.id, id), eq(birthProfiles.userId, userId)))
    .limit(1);
  const row = rows[0];
  return row ? decryptRow(row, keyring) : null;
}

/** Владелец подтверждён ВЫЗЫВАЮЩИМ кодом (WHERE userId=... тоже здесь, для defense-in-depth). */
export async function updateBirthProfile(
  db: Db,
  userId: string,
  id: string,
  input: BirthProfileInput,
  keyring: PdCipherKeyring,
): Promise<BirthProfileResponse | null> {
  const [row] = await db
    .update(birthProfiles)
    .set({
      label: input.label,
      kind: input.kind,
      birthDateEnc: encryptPd(input.birthDate, keyring),
      birthTimeEnc: input.birthTime ? encryptPd(input.birthTime, keyring) : null,
      timeUnknown: input.timeUnknown,
      placeNameEnc: encryptPd(input.place.placeName, keyring),
      latEnc: encryptPd(String(input.place.lat), keyring),
      lonEnc: encryptPd(String(input.place.lon), keyring),
      tzId: input.place.tzId,
      gender: input.gender ?? null,
      notes: input.notes ?? null,
      updatedAt: new Date(),
    })
    .where(and(eq(birthProfiles.id, id), eq(birthProfiles.userId, userId)))
    .returning();
  return row ? decryptRow(row, keyring) : null;
}

export async function deleteBirthProfile(db: Db, userId: string, id: string): Promise<boolean> {
  const rows = await db
    .delete(birthProfiles)
    .where(and(eq(birthProfiles.id, id), eq(birthProfiles.userId, userId)))
    .returning({ id: birthProfiles.id });
  return rows.length > 0;
}

/** Право на забвение — все профили пользователя (charts удалятся каскадно по FK). */
export async function deleteAllBirthProfilesForUser(db: Db, userId: string): Promise<number> {
  const rows = await db.delete(birthProfiles).where(eq(birthProfiles.userId, userId)).returning({ id: birthProfiles.id });
  return rows.length;
}
