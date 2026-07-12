import { describe, expect, it, vi } from 'vitest';
import { parseConfig } from '@stassist/shared';
import type { Logger } from 'pino';
import { Worker } from './worker.js';

const testConfig = () =>
  parseConfig({
    NODE_ENV: 'test',
    COOKIE_SECRET: 'x'.repeat(32),
  } as NodeJS.ProcessEnv);

function fakeLogger(): Logger {
  const noop = vi.fn();
  return {
    warn: noop,
    info: noop,
    error: noop,
    debug: noop,
    trace: noop,
    fatal: noop,
  } as unknown as Logger;
}

describe('Worker — degraded-режим без DATABASE_URL', () => {
  it('не бросает и не пытается подключиться к pg-boss', async () => {
    const logger = fakeLogger();
    const worker = new Worker(testConfig(), logger);
    await worker.start();
    expect(worker.status).toBe('degraded');
    expect(logger.warn).toHaveBeenCalledWith(
      { subsystem: 'db' },
      expect.stringContaining('infra not configured: db'),
    );
  });

  it('stop() безопасен, даже если start() был degraded', async () => {
    const worker = new Worker(testConfig(), fakeLogger());
    await worker.start();
    await expect(worker.stop()).resolves.toBeUndefined();
    expect(worker.status).toBe('stopped');
  });
});
