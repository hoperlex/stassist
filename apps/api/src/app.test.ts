import { Writable } from 'node:stream';
import { describe, expect, it } from 'vitest';
import { parseConfig } from '@stassist/shared';
import { buildApp } from './app.js';

/** Перехватывает то, что pino пишет в поток, разбирая построчный JSON. */
class CaptureStream extends Writable {
  lines: string[] = [];
  override _write(chunk: Buffer, _enc: string, callback: () => void): void {
    this.lines.push(chunk.toString('utf8'));
    callback();
  }
  text(): string {
    return this.lines.join('');
  }
}

const testConfig = () =>
  parseConfig({
    NODE_ENV: 'test',
    COOKIE_SECRET: 'x'.repeat(32),
    CORS_ALLOWLIST: 'https://stassist.ru',
  } as NodeJS.ProcessEnv);

describe('GET /healthz', () => {
  it('отвечает 200 даже без БД (degraded-режим)', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({ method: 'GET', url: '/healthz' });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toMatchObject({ status: 'ok' });
    await app.close();
  });
});

describe('GET /readyz', () => {
  it('отвечает 503 без DATABASE_URL', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({ method: 'GET', url: '/readyz' });
    expect(res.statusCode).toBe(503);
    expect(res.json()).toMatchObject({ status: 'unavailable', checks: { db: false } });
    await app.close();
  });
});

describe('request-id', () => {
  it('прокидывает x-request-id в ответ', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({
      method: 'GET',
      url: '/healthz',
      headers: { 'x-request-id': 'test-req-123' },
    });
    expect(res.headers['x-request-id']).toBe('test-req-123');
    await app.close();
  });
});

describe('CORS allowlist', () => {
  it('разрешает allowlisted origin', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({
      method: 'GET',
      url: '/healthz',
      headers: { origin: 'https://stassist.ru' },
    });
    expect(res.headers['access-control-allow-origin']).toBe('https://stassist.ru');
    await app.close();
  });

  it('не разрешает произвольный origin', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({
      method: 'GET',
      url: '/healthz',
      headers: { origin: 'https://evil.example' },
    });
    expect(res.headers['access-control-allow-origin']).toBeUndefined();
    await app.close();
  });
});

describe('secure headers', () => {
  it('helmet выставляет базовые заголовки безопасности', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({ method: 'GET', url: '/healthz' });
    expect(res.headers['x-content-type-options']).toBe('nosniff');
    await app.close();
  });
});

describe('pino redaction', () => {
  it('не пишет Authorization в лог в открытом виде', async () => {
    const stream = new CaptureStream();
    const app = await buildApp({ config: testConfig(), logStream: stream, logLevel: 'info' });
    const secret = 'Bearer top-secret-token-should-not-leak';
    await app.inject({ method: 'GET', url: '/healthz', headers: { authorization: secret } });
    await app.close();

    const logText = stream.text();
    expect(logText).not.toContain('top-secret-token-should-not-leak');
    expect(logText).toContain('[скрыто]');
  });
});
