import { describe, expect, it } from 'vitest';
import { parseConfig, ConfigError } from './config.js';

const BASE_ENV = {
  NODE_ENV: 'test',
  COOKIE_SECRET: 'x'.repeat(32),
} as NodeJS.ProcessEnv;

// Ключи-фикстуры для production-тестов: НЕ dev-insecure дефолты (parseConfig обязан принять
// их как «настоящие» и не падать по auth(jwt-keys)/auth(pd-encryption-key)).
const PROD_JWT_PRIVATE_KEY =
  '-----BEGIN PRIVATE KEY-----\nMC4CAQAwBQYDK2VwBCIEIG+ygyrHzZ+qvEM/hM1B3aGgEKB4cNbj7Jfu2KZvOHo1\n-----END PRIVATE KEY-----\n';
const PROD_JWT_PUBLIC_KEY =
  '-----BEGIN PUBLIC KEY-----\nMCowBQYDK2VwAyEAhKjcQ7KxxKo8Zyy0Y8qYO9Q1pXKoI6G38CkT1sGE5+0=\n-----END PUBLIC KEY-----\n';
const PROD_PD_ENCRYPTION_KEY = 'WCUeOeq26PCRHZrRgXCjJygtiyegGlJp/6BR/XCllmc=';
const PROD_AUTH_ENV = {
  JWT_PRIVATE_KEY: PROD_JWT_PRIVATE_KEY,
  JWT_PUBLIC_KEY: PROD_JWT_PUBLIC_KEY,
  PD_ENCRYPTION_KEY: PROD_PD_ENCRYPTION_KEY,
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

  it('помечает auth-keys(dev-default) в degraded, когда JWT/PD-ключи не переопределены', () => {
    const config = parseConfig(BASE_ENV);
    expect(config.degraded).toContain('auth-keys(dev-default)');
  });

  it('SEO_NOINDEX_ALL по умолчанию true (fail-safe — сайт не индексируется, пока не включат явно)', () => {
    const config = parseConfig(BASE_ENV);
    expect(config.seo.noindexAll).toBe(true);
  });

  it('SEO_NOINDEX_ALL=false снимает глобальный noindex (прод-запуск, req.6 промта Ф8)', () => {
    const config = parseConfig({ ...BASE_ENV, SEO_NOINDEX_ALL: 'false' } as NodeJS.ProcessEnv);
    expect(config.seo.noindexAll).toBe(false);
  });

  it('строит keyring шифрования ПД из PD_ENCRYPTION_KEY_VERSION/PD_ENCRYPTION_KEY', () => {
    const config = parseConfig(BASE_ENV);
    expect(config.pdEncryption.activeVersion).toBe(1);
    expect(config.pdEncryption.keysBase64[1]).toBeDefined();
  });
});

describe('parseConfig — fail-fast (production)', () => {
  it('падает без DATABASE_URL', () => {
    expect(() =>
      parseConfig({
        ...BASE_ENV,
        ...PROD_AUTH_ENV,
        NODE_ENV: 'production',
      } as NodeJS.ProcessEnv),
    ).toThrow(ConfigError);
  });

  it('падает, если JWT/PD-ключи оставлены дефолтными (dev-insecure)', () => {
    expect(() =>
      parseConfig({
        ...BASE_ENV,
        NODE_ENV: 'production',
        DATABASE_URL: 'postgres://u:p@localhost:5432/stassist',
      } as NodeJS.ProcessEnv),
    ).toThrow(/auth\(jwt-keys\)/);
  });

  it('падает, если LLM_PROVIDER=anthropic без ANTHROPIC_API_KEY', () => {
    expect(() =>
      parseConfig({
        ...BASE_ENV,
        ...PROD_AUTH_ENV,
        NODE_ENV: 'production',
        DATABASE_URL: 'postgres://u:p@localhost:5432/stassist',
        LLM_PROVIDER: 'anthropic',
      } as NodeJS.ProcessEnv),
    ).toThrow(/llm\(anthropic\)/);
  });

  it('поднимается без degraded-подсистем, если всё сконфигурировано', () => {
    const config = parseConfig({
      ...BASE_ENV,
      ...PROD_AUTH_ENV,
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
