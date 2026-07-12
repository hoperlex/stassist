/**
 * Интеграционный тест: реальный Postgres. Гейт — DATABASE_URL (см. §1 конвенций реализации).
 * Локально без БД — авто-skip, не падение.
 */
import { afterAll, describe, expect, it } from 'vitest';
import { parseConfig } from '@stassist/shared';
import { closeDb, pingDb } from './db.js';

describe.skipIf(!process.env.DATABASE_URL)('pingDb — интеграция с реальным Postgres', () => {
  afterAll(async () => {
    await closeDb();
  });

  it('возвращает true, когда БД доступна', async () => {
    const config = parseConfig({
      ...process.env,
      NODE_ENV: 'test',
      COOKIE_SECRET: 'x'.repeat(32),
    } as NodeJS.ProcessEnv);
    expect(await pingDb(config)).toBe(true);
  });
});
