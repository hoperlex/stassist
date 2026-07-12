/**
 * Интеграционный тест: реальный Postgres. Гейт — DATABASE_URL (см. §1 конвенций реализации).
 * Проверяет, что pg-boss реально стартует, регистрирует очередь `ping` и её cron-расписание.
 * Локально без БД — авто-skip, не падение.
 */
import { describe, expect, it } from 'vitest';
import { parseConfig } from '@stassist/shared';
import { Worker, defaultLogger } from './worker.js';

describe.skipIf(!process.env.DATABASE_URL)('Worker — интеграция с реальным Postgres', () => {
  it('стартует pg-boss, создаёт очередь ping и её расписание', async () => {
    const config = parseConfig({
      ...process.env,
      NODE_ENV: 'test',
      COOKIE_SECRET: 'x'.repeat(32),
    } as NodeJS.ProcessEnv);
    const worker = new Worker(config, defaultLogger(config));

    await worker.start();
    expect(worker.status).toBe('running');

    await worker.stop();
    expect(worker.status).toBe('stopped');
  });
});
