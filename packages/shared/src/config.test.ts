import { describe, expect, it } from 'vitest';
import { parseConfig, ConfigError } from './config.js';

const BASE_ENV = {
  NODE_ENV: 'test',
  COOKIE_SECRET: 'x'.repeat(32),
} as NodeJS.ProcessEnv;

describe('parseConfig — degraded-режим (development/test)', () => {
  it('поднимается без DATABASE_URL и прочей инфры, помечая подсистемы degraded', () => {
    const config = parseConfig(BASE_ENV);
    expect(config.isProduction).toBe(false);
    expect(config.db.configured).toBe(false);
    expect(config.degraded).toContain('db');
    expect(config.degraded).toContain('storage');
    expect(config.degraded).toContain('llm');
  });

  it('не бросает, даже если выбран реальный провайдер без ключа (не production)', () => {
    expect(() =>
      parseConfig({ ...BASE_ENV, LLM_PROVIDER: 'anthropic' } as NodeJS.ProcessEnv),
    ).not.toThrow();
  });

  it('применяет дефолты для CORS_ALLOWLIST и разбирает список через запятую', () => {
    const config = parseConfig({
      ...BASE_ENV,
      CORS_ALLOWLIST: 'https://stassist.ru, https://www.stassist.ru',
    } as NodeJS.ProcessEnv);
    expect(config.corsAllowlist).toEqual(['https://stassist.ru', 'https://www.stassist.ru']);
  });
});

describe('parseConfig — fail-fast (production)', () => {
  it('падает без DATABASE_URL', () => {
    expect(() =>
      parseConfig({ ...BASE_ENV, NODE_ENV: 'production' } as NodeJS.ProcessEnv),
    ).toThrow(ConfigError);
  });

  it('падает, если LLM_PROVIDER=anthropic без ANTHROPIC_API_KEY', () => {
    expect(() =>
      parseConfig({
        ...BASE_ENV,
        NODE_ENV: 'production',
        DATABASE_URL: 'postgres://u:p@localhost:5432/stassist',
        LLM_PROVIDER: 'anthropic',
      } as NodeJS.ProcessEnv),
    ).toThrow(/llm\(anthropic\)/);
  });

  it('поднимается без degraded-подсистем, если всё сконфигурировано', () => {
    const config = parseConfig({
      ...BASE_ENV,
      NODE_ENV: 'production',
      DATABASE_URL: 'postgres://u:p@localhost:5432/stassist',
      STORAGE: 's3',
      S3_ENDPOINT: 'https://s3.example.com',
      S3_BUCKET: 'stassist',
      S3_ACCESS_KEY_ID: 'key',
      S3_SECRET_ACCESS_KEY: 'secret',
      MAILER: 'smtp',
      SMTP_HOST: 'smtp.example.com',
      SMTP_PORT: '587',
      SMTP_FROM: 'noreply@stassist.ru',
      GEOCODER: 'nominatim',
      NOMINATIM_URL: 'https://nominatim.example.com',
      NOMINATIM_USER_AGENT: 'stassist/1.0',
      PAYMENTS: 'yookassa',
      YOOKASSA_SHOP_ID: 'shop',
      YOOKASSA_SECRET_KEY: 'secret',
      LLM_PROVIDER: 'anthropic',
      ANTHROPIC_API_KEY: 'key',
      EMBED_PROVIDER: 'anthropic',
    } as NodeJS.ProcessEnv);
    expect(config.degraded).toEqual([]);
  });
});
