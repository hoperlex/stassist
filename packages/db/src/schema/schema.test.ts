/**
 * Unit-тест схемы: без БД (никаких сетевых/файловых обращений) — проверяет форму таблиц и
 * согласованность с seed-данными. Ловит опечатки в именах колонок/таблиц раньше, чем
 * drizzle-kit generate или живая БД.
 */
import { getTableColumns, getTableName } from 'drizzle-orm';
import type { Pool } from 'pg';
import { describe, expect, it } from 'vitest';
import * as schema from './index.js';
import { createDb } from '../client.js';
import { SYSTEM_CALC_PRESETS } from '../seed/system-calc-presets.js';

describe('таблицы Ф2', () => {
  it('users содержит полный набор колонок по 22-модель-данных.md §1', () => {
    const cols = Object.keys(getTableColumns(schema.users));
    expect(cols).toEqual(
      expect.arrayContaining([
        'email',
        'emailVerifiedAt',
        'passwordHash',
        'displayName',
        'avatarKey',
        'role',
        'status',
        'tz',
        'locale',
      ]),
    );
  });

  it('refresh_tokens содержит поля для ротации и reuse detection', () => {
    const cols = Object.keys(getTableColumns(schema.refreshTokens));
    expect(cols).toEqual(
      expect.arrayContaining(['tokenHash', 'familyId', 'expiresAt', 'rotatedFrom', 'revokedAt']),
    );
  });

  it('birth_profiles: 🔒-поля именованы с суффиксом Enc (шифртекст, не читать напрямую)', () => {
    const cols = Object.keys(getTableColumns(schema.birthProfiles));
    expect(cols).toEqual(
      expect.arrayContaining(['birthDateEnc', 'birthTimeEnc', 'placeNameEnc', 'latEnc', 'lonEnc', 'tzId', 'timeUnknown']),
    );
  });

  it('имена таблиц соответствуют докe данных (snake_case)', () => {
    expect(getTableName(schema.emailVerifications)).toBe('email_verifications');
    expect(getTableName(schema.geocodeCache)).toBe('geocode_cache');
    expect(getTableName(schema.calcPresets)).toBe('calc_presets');
  });
});

describe('createDb', () => {
  it('не подключается к сети при создании (ленивая обёртка)', () => {
    // Фиктивный "пул" — createDb не должен трогать его методы синхронно.
    const fakePool = {} as Pool;
    expect(() => createDb(fakePool)).not.toThrow();
  });
});

describe('SYSTEM_CALC_PRESETS (seed)', () => {
  it('содержит минимум «Современная западная» и «Классическая» (см. doc 20 «Границы MVP»)', () => {
    const codes = SYSTEM_CALC_PRESETS.map((p) => p.code);
    expect(codes).toContain('modern_western');
    expect(codes).toContain('classical');
  });

  it('каждый пресет имеет непустые orbs.byAspect', () => {
    for (const preset of SYSTEM_CALC_PRESETS) {
      expect(Object.keys(preset.orbs.byAspect).length).toBeGreaterThan(0);
    }
  });

  it('коды уникальны', () => {
    const codes = SYSTEM_CALC_PRESETS.map((p) => p.code);
    expect(new Set(codes).size).toBe(codes.length);
  });
});
