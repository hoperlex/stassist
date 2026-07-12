import { eq, isNull, or } from 'drizzle-orm';
import { calcPresets, type Db } from '@stassist/db';
import type { CalcPreset } from '@stassist/shared';

export type CalcPresetRow = typeof calcPresets.$inferSelect;

/** Системные (userId=null) + собственные пресеты пользователя — видимые ему в кабинете. */
export async function listVisibleCalcPresets(db: Db, userId: string): Promise<CalcPresetRow[]> {
  return db.select().from(calcPresets).where(or(isNull(calcPresets.userId), eq(calcPresets.userId, userId)));
}

export async function getCalcPresetById(db: Db, id: string): Promise<CalcPresetRow | null> {
  const rows = await db.select().from(calcPresets).where(eq(calcPresets.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function getDefaultSystemPreset(db: Db): Promise<CalcPresetRow | null> {
  const rows = await db.select().from(calcPresets).where(eq(calcPresets.code, 'modern_western')).limit(1);
  return rows[0] ?? null;
}

/** Строка calc_presets → `CalcPreset` (packages/shared/src/schemas/chart.ts) для computeChart. */
export function rowToCalcPreset(row: CalcPresetRow): CalcPreset {
  return {
    zodiac: row.zodiac,
    ayanamsha: row.ayanamsha ?? undefined,
    houseSystem: row.houseSystem,
    bodies: row.bodies as CalcPreset['bodies'],
    orbs: row.orbs as CalcPreset['orbs'],
    aspectSet: row.aspectSet,
  };
}
