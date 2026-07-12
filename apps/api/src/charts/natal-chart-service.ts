/**
 * Оркестрация: birth_profile (расшифрован) + calc_preset → computeChart (@stassist/astro-core)
 * → сохранение в `charts` (kind='natal'). Вызывается при создании профиля рождения (см.
 * routes/birth-profiles.ts). Каждый шаг по отдельности unit-тестируется (build-chart-input.ts,
 * astro-core сам — Ф1); эта оркестрация — integration (нужна БД для insertChart).
 */
import { createHash } from 'node:crypto';
import { computeChart, ASTRO_CORE_VERSION } from '@stassist/astro-core';
import type { Db } from '@stassist/db';
import type { BirthProfileResponse, CalcPreset } from '@stassist/shared';
import { buildChartInput } from './build-chart-input.js';
import { insertChart, type ChartRow } from '../repositories/charts-repository.js';

export function checksumOf(data: unknown): string {
  return createHash('sha256').update(JSON.stringify(data)).digest('hex');
}

export async function computeAndStoreNatalChart(
  db: Db,
  profile: BirthProfileResponse,
  preset: CalcPreset,
  presetId: string,
): Promise<ChartRow> {
  const chartInput = buildChartInput(profile, preset);
  const data = computeChart(chartInput);
  return insertChart(db, {
    birthProfileId: profile.id,
    presetId,
    kind: 'natal',
    data,
    coreVersion: ASTRO_CORE_VERSION,
    checksum: checksumOf(data),
  });
}
