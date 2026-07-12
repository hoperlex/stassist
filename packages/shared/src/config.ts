/**
 * Конфигурация процессов Stassist (api/web/worker) из переменных окружения.
 *
 * Правило (см. docs/roadmap/31-конвенции-реализации.md §3):
 *  - «всегда обязательные» переменные валидируются zod-схемой всегда (с разумными dev-дефолтами);
 *  - «обязательные для функции» переменные (DATABASE_URL, S3_*, LLM_*, YOOKASSA_*, SMTP_*) —
 *    обязательны, только если соответствующая подсистема выбрана НЕ как `stub` в NODE_ENV=production.
 *    В production отсутствие такой переменной — падение на старте (fail-fast).
 *  - в development/test процесс поднимается в degraded-режиме: подсистема не инициализируется,
 *    в лог пишется `infra not configured: <подсистема>`, но GET /healthz всё равно отвечает 200.
 */
import { z } from 'zod';

const nodeEnvSchema = z.enum(['development', 'test', 'production']);

const csvToArray = (value: string): string[] =>
  value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

/** Сырая zod-схема переменных окружения. Все поля-«для функции» — опциональны на этом уровне. */
export const envSchema = z.object({
  NODE_ENV: nodeEnvSchema.default('development'),

  API_PORT: z.coerce.number().int().positive().default(3001),
  WEB_PORT: z.coerce.number().int().positive().default(3000),
  APP_URL: z.string().url().default('http://localhost:3000'),
  API_URL: z.string().url().default('http://localhost:3001'),
  COOKIE_SECRET: z.string().min(16).default('dev-insecure-cookie-secret-change-me-please-32'),
  CORS_ALLOWLIST: z.string().default('http://localhost:3000'),

  // --- БД (обязательна для функции) ---
  DATABASE_URL: z.string().min(1).optional(),
  // ADR-8 (док. 21 §10): облачный Supabase — допустимая dev/стейдж альтернатива с синтетикой.
  DATABASE_URL_SUPABASE_STAGE: z.string().min(1).optional(),

  // --- Object storage ---
  STORAGE: z.enum(['stub', 's3']).default('stub'),
  S3_ENDPOINT: z.string().optional(),
  S3_REGION: z.string().optional(),
  S3_BUCKET: z.string().optional(),
  S3_ACCESS_KEY_ID: z.string().optional(),
  S3_SECRET_ACCESS_KEY: z.string().optional(),

  // --- Почта ---
  MAILER: z.enum(['stub', 'smtp']).default('stub'),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().int().positive().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().optional(),

  // --- Геокодер ---
  GEOCODER: z.enum(['stub', 'nominatim']).default('stub'),
  NOMINATIM_URL: z.string().optional(),
  NOMINATIM_USER_AGENT: z.string().optional(),

  // --- Платежи ---
  PAYMENTS: z.enum(['stub', 'yookassa']).default('stub'),
  YOOKASSA_SHOP_ID: z.string().optional(),
  YOOKASSA_SECRET_KEY: z.string().optional(),

  // --- LLM / эмбеддинги ---
  LLM_PROVIDER: z
    .enum(['stub', 'anthropic', 'openrouter', 'yandexgpt', 'gigachat'])
    .default('stub'),
  ANTHROPIC_API_KEY: z.string().optional(),
  OPENROUTER_API_KEY: z.string().optional(),
  YANDEXGPT_API_KEY: z.string().optional(),
  GIGACHAT_API_KEY: z.string().optional(),

  EMBED_PROVIDER: z.enum(['stub', 'anthropic', 'openrouter']).default('stub'),
});

export type Env = z.infer<typeof envSchema>;

export interface SubsystemStatus {
  /** Подсистема реально сконфигурирована (не stub / есть все нужные переменные). */
  configured: boolean;
  /** Выбранный драйвер/провайдер. */
  driver: string;
}

export interface Config {
  env: Env['NODE_ENV'];
  isProduction: boolean;
  cookieSecret: string;
  appUrl: string;
  apiUrl: string;
  corsAllowlist: string[];
  api: { port: number };
  web: { port: number };
  db: SubsystemStatus & { url: string | undefined };
  storage: SubsystemStatus;
  mailer: SubsystemStatus;
  geocoder: SubsystemStatus;
  payments: SubsystemStatus;
  llm: SubsystemStatus;
  embeddings: SubsystemStatus;
  /** Список подсистем, не готовых к боевой работе (degraded) — для лога при старте. */
  degraded: string[];
}

class ConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigError';
  }
}

function requireVars(env: Record<string, unknown>, names: string[]): string[] {
  return names.filter((n) => !env[n]);
}

/**
 * Собирает Config из переменных окружения. Бросает ConfigError, если NODE_ENV=production
 * и подсистема выбрана «реальной», но не хватает переменных для неё (fail-fast).
 * В development/test — никогда не бросает по этой причине, вместо этого подсистема
 * помечается как degraded.
 */
export function parseConfig(rawEnv: NodeJS.ProcessEnv = process.env): Config {
  const env = envSchema.parse(rawEnv);
  const isProduction = env.NODE_ENV === 'production';
  const degraded: string[] = [];

  const fail = (subsystem: string, missing: string[]): void => {
    throw new ConfigError(
      `infra not configured: ${subsystem} — не заданы переменные окружения [${missing.join(', ')}] ` +
        `при NODE_ENV=production. Заполните .env или переключите ${subsystem} обратно на stub.`,
    );
  };

  // --- БД ---
  const dbConfigured = Boolean(env.DATABASE_URL);
  if (!dbConfigured) {
    degraded.push('db');
    if (isProduction) fail('db', ['DATABASE_URL']);
  }

  // --- Storage ---
  const storageConfigured = env.STORAGE === 's3';
  if (env.STORAGE === 's3') {
    const missing = requireVars(env, [
      'S3_ENDPOINT',
      'S3_BUCKET',
      'S3_ACCESS_KEY_ID',
      'S3_SECRET_ACCESS_KEY',
    ]);
    if (missing.length > 0 && isProduction) fail('storage(s3)', missing);
    if (missing.length > 0) degraded.push('storage');
  } else {
    degraded.push('storage');
  }

  // --- Mailer ---
  if (env.MAILER === 'smtp') {
    const missing = requireVars(env, ['SMTP_HOST', 'SMTP_PORT', 'SMTP_FROM']);
    if (missing.length > 0 && isProduction) fail('mailer(smtp)', missing);
    if (missing.length > 0) degraded.push('mailer');
  } else {
    degraded.push('mailer');
  }

  // --- Geocoder ---
  if (env.GEOCODER === 'nominatim') {
    const missing = requireVars(env, ['NOMINATIM_URL', 'NOMINATIM_USER_AGENT']);
    if (missing.length > 0 && isProduction) fail('geocoder(nominatim)', missing);
    if (missing.length > 0) degraded.push('geocoder');
  } else {
    degraded.push('geocoder');
  }

  // --- Payments ---
  if (env.PAYMENTS === 'yookassa') {
    const missing = requireVars(env, ['YOOKASSA_SHOP_ID', 'YOOKASSA_SECRET_KEY']);
    if (missing.length > 0 && isProduction) fail('payments(yookassa)', missing);
    if (missing.length > 0) degraded.push('payments');
  } else {
    degraded.push('payments');
  }

  // --- LLM ---
  const llmKeyByProvider: Record<string, string> = {
    anthropic: 'ANTHROPIC_API_KEY',
    openrouter: 'OPENROUTER_API_KEY',
    yandexgpt: 'YANDEXGPT_API_KEY',
    gigachat: 'GIGACHAT_API_KEY',
  };
  if (env.LLM_PROVIDER !== 'stub') {
    const key = llmKeyByProvider[env.LLM_PROVIDER];
    const missing = key ? requireVars(env, [key]) : [];
    if (missing.length > 0 && isProduction) fail(`llm(${env.LLM_PROVIDER})`, missing);
    if (missing.length > 0) degraded.push('llm');
  } else {
    degraded.push('llm');
  }

  // --- Embeddings ---
  const embedKeyByProvider: Record<string, string> = {
    anthropic: 'ANTHROPIC_API_KEY',
    openrouter: 'OPENROUTER_API_KEY',
  };
  if (env.EMBED_PROVIDER !== 'stub') {
    const key = embedKeyByProvider[env.EMBED_PROVIDER];
    const missing = key ? requireVars(env, [key]) : [];
    if (missing.length > 0 && isProduction) fail(`embeddings(${env.EMBED_PROVIDER})`, missing);
    if (missing.length > 0) degraded.push('embeddings');
  } else {
    degraded.push('embeddings');
  }

  return {
    env: env.NODE_ENV,
    isProduction,
    cookieSecret: env.COOKIE_SECRET,
    appUrl: env.APP_URL,
    apiUrl: env.API_URL,
    corsAllowlist: csvToArray(env.CORS_ALLOWLIST),
    api: { port: env.API_PORT },
    web: { port: env.WEB_PORT },
    db: { configured: dbConfigured, driver: dbConfigured ? 'postgres' : 'none', url: env.DATABASE_URL },
    storage: { configured: storageConfigured, driver: env.STORAGE },
    mailer: { configured: env.MAILER === 'smtp', driver: env.MAILER },
    geocoder: { configured: env.GEOCODER === 'nominatim', driver: env.GEOCODER },
    payments: { configured: env.PAYMENTS === 'yookassa', driver: env.PAYMENTS },
    llm: { configured: env.LLM_PROVIDER !== 'stub', driver: env.LLM_PROVIDER },
    embeddings: { configured: env.EMBED_PROVIDER !== 'stub', driver: env.EMBED_PROVIDER },
    degraded,
  };
}

let cached: Config | undefined;

/** Кэширующая обёртка над parseConfig — читает process.env один раз за процесс. */
export function loadConfig(): Config {
  cached ??= parseConfig();
  return cached;
}

/** Только для тестов: сбросить кэш loadConfig(). */
export function resetConfigCache(): void {
  cached = undefined;
}

export { ConfigError };
