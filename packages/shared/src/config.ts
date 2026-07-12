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
import {
  DEV_INSECURE_JWT_PRIVATE_KEY_PEM,
  DEV_INSECURE_JWT_PUBLIC_KEY_PEM,
  DEV_INSECURE_PD_ENCRYPTION_KEY_BASE64,
} from './crypto/dev-keys.js';

const nodeEnvSchema = z.enum(['development', 'test', 'production']);

/** PEM с env часто передаётся с литеральными `\n` (а не настоящими переводами строк). */
const normalizePem = (pem: string): string => pem.replace(/\\n/g, '\n');

const csvToArray = (value: string): string[] =>
  value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

/** Закоммиченный dev-дефолт `COOKIE_SECRET` — им подписывается CSRF-HMAC (см. `apps/api/src/
 *  auth/csrf.ts`), поэтому в production он ЗАПРЕЩЁН тем же fail-fast, что JWT/PD-ключи (находка
 *  [cookie-secret-no-fail-fast]: без этой проверки деплой с незаданным `COOKIE_SECRET` молча
 *  подписывал бы CSRF-токены публичным секретом — атакующий, зная его, подделывает csrf_token). */
const DEV_INSECURE_COOKIE_SECRET = 'dev-insecure-cookie-secret-change-me-please-32';

/** Сырая zod-схема переменных окружения. Все поля-«для функции» — опциональны на этом уровне. */
export const envSchema = z.object({
  NODE_ENV: nodeEnvSchema.default('development'),

  API_PORT: z.coerce.number().int().positive().default(3001),
  WEB_PORT: z.coerce.number().int().positive().default(3000),
  APP_URL: z.string().url().default('http://localhost:3000'),
  API_URL: z.string().url().default('http://localhost:3001'),
  COOKIE_SECRET: z.string().min(16).default(DEV_INSECURE_COOKIE_SECRET),
  CORS_ALLOWLIST: z.string().default('http://localhost:3000'),

  // --- Auth: подпись access JWT (EdDSA/Ed25519) и шифрование ПД (AES-256-GCM) ---
  // «Всегда обязательные» с dev-дефолтом — та же категория, что COOKIE_SECRET (см. §3
  // конвенций), но с ДОПОЛНИТЕЛЬНОЙ проверкой в production (см. parseConfig ниже): если
  // эффективное значение совпадает с закоммиченным dev-дефолтом — это fail-fast, а не degraded
  // (крипто-материал, а не просто секрет подписи cookie).
  JWT_PRIVATE_KEY: z.string().default(DEV_INSECURE_JWT_PRIVATE_KEY_PEM),
  JWT_PUBLIC_KEY: z.string().default(DEV_INSECURE_JWT_PUBLIC_KEY_PEM),
  /** TTL access-токена в секундах (10–15 мин по ТЗ, см. док. 21 §5). */
  JWT_ACCESS_TTL_SECONDS: z.coerce.number().int().positive().default(900),
  /** TTL opaque refresh-токена в секундах (по умолчанию 30 дней). */
  REFRESH_TTL_SECONDS: z.coerce.number().int().positive().default(60 * 60 * 24 * 30),

  /** Активная версия ключа шифрования ПД (см. packages/shared/src/crypto/pd-cipher.ts). */
  PD_ENCRYPTION_KEY_VERSION: z.coerce.number().int().positive().default(1),
  /** base64, 32 байта (AES-256). Можно задать несколько версий через PD_ENCRYPTION_KEY_V<N>
   *  для ротации без потери доступа к старым записям (см. README ниже про keyring). */
  PD_ENCRYPTION_KEY: z.string().default(DEV_INSECURE_PD_ENCRYPTION_KEY_BASE64),
  PD_ENCRYPTION_KEY_V2: z.string().optional(),
  PD_ENCRYPTION_KEY_V3: z.string().optional(),

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
  /** Ф8: наш собственный HMAC-слой поверх вебхука (см. doc-комментарий
   *  packages/shared/src/schemas/billing.ts `WEBHOOK_SIGNATURE_HEADER`) — опционален даже при
   *  PAYMENTS=yookassa (реальная защита прода — IP allowlist ЮKassa, см. launch-checklist.md);
   *  если задан, `apps/api` требует подпись на входящих вебхуках. */
  YOOKASSA_WEBHOOK_SECRET: z.string().optional(),

  // --- LLM / эмбеддинги ---
  LLM_PROVIDER: z
    .enum(['stub', 'anthropic', 'openrouter', 'yandexgpt', 'gigachat'])
    .default('stub'),
  ANTHROPIC_API_KEY: z.string().optional(),
  OPENROUTER_API_KEY: z.string().optional(),
  YANDEXGPT_API_KEY: z.string().optional(),
  GIGACHAT_API_KEY: z.string().optional(),
  /** Ф4: цепочка fallback-провайдеров generate() (см. @stassist/llm createLlmProviderChain),
   *  CSV в порядке приоритета, напр. "anthropic,openrouter,yandexgpt". Пусто = без fallback
   *  (только LLM_PROVIDER). Не влияет на fail-fast/degraded — это доп. отказоустойчивость поверх
   *  уже сконфигурированного основного провайдера. */
  LLM_FALLBACK_CHAIN: z.string().default(''),

  /** Ф4: 'cohere' — единственный embed-провайдер, выдающий ровно 1024-dim (embed-multilingual-v3.0,
   *  поддерживает русский), совпадает с interpretation_chunks.embedding vector(1024) — см. находку
   *  [контракт-эмбеддингов] в _work/build/findings/f4.md (у Anthropic нет embeddings API). */
  EMBED_PROVIDER: z.enum(['stub', 'anthropic', 'openrouter', 'cohere']).default('stub'),
  COHERE_API_KEY: z.string().optional(),

  /** Ф8 SEO-финализация (req.6 промта Ф8 «снятие noindex… — env-флаг»): ДЕФОЛТ `true`
   *  (безопасно — сайт НЕ индексируется, пока заказчик явно не включит прод-запуск) —
   *  fail-safe в правильную сторону (случайно забытый флаг не даёт утечь черновику в индекс, а не
   *  наоборот). Выставляется `false` в проде ПОСЛЕ прохождения юридического гейта (см.
   *  launch-checklist.md). Форсит `noindex` на ВСЕХ страницах поверх честного per-page noindex
   *  (см. apps/web/renderer/+onRenderHtml.tsx, apps/web/lib/seo.ts). */
  // z.coerce.boolean() НЕ подходит: Boolean('false') === true (классическая ловушка) — явный
  // разбор строки 'true'/'false' (регистронезависимо), любое другое значение → true (fail-safe
  // в сторону noindex, см. doc-комментарий поля выше).
  SEO_NOINDEX_ALL: z
    .string()
    .default('true')
    .transform((v) => v.trim().toLowerCase() !== 'false'),
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
  storage: SubsystemStatus & {
    endpoint?: string;
    region?: string;
    bucket?: string;
    accessKeyId?: string;
    secretAccessKey?: string;
  };
  mailer: SubsystemStatus & {
    smtp: { host?: string; port?: number; user?: string; pass?: string; from?: string };
  };
  geocoder: SubsystemStatus & { nominatimUrl?: string; nominatimUserAgent?: string };
  payments: SubsystemStatus & { shopId?: string; secretKey?: string; webhookSecret?: string };
  /** Ф4: `@stassist/llm` строит реальные адаптеры поверх этих полей (см. createLlmProviderChain) —
   *  сам `packages/shared` реальных LLM-адаптеров не содержит (см. ports/factory.ts). */
  llm: SubsystemStatus & {
    anthropicApiKey?: string;
    openrouterApiKey?: string;
    yandexgptApiKey?: string;
    gigachatApiKey?: string;
    /** См. env LLM_FALLBACK_CHAIN — уже разобран в список (csvToArray). */
    fallbackChain: string[];
  };
  embeddings: SubsystemStatus & {
    openrouterApiKey?: string;
    /** Ф4: см. env COHERE_API_KEY выше. */
    cohereApiKey?: string;
  };
  /** Список подсистем, не готовых к боевой работе (degraded) — для лога при старте. */
  degraded: string[];
  /** Ф8 SEO-финализация — см. env SEO_NOINDEX_ALL выше. */
  seo: { noindexAll: boolean };
  /** Auth: подпись access JWT (EdDSA) — см. apps/api/src/auth/jwt.ts. */
  auth: {
    jwtPrivateKeyPem: string;
    jwtPublicKeyPem: string;
    accessTtlSeconds: number;
    refreshTtlSeconds: number;
  };
  /** Шифрование ПД (см. packages/shared/src/crypto/pd-cipher.ts). */
  pdEncryption: {
    activeVersion: number;
    /** base64 по версии — конвертация в Buffer/keyring делает buildPdKeyring(). */
    keysBase64: Record<number, string>;
  };
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

  // --- Auth: JWT-ключи и ключ шифрования ПД — доп. защита сверх «просто degraded» (см. §41-46
  // выше в схеме): в production запрещено оставлять закоммиченный dev-дефолт как есть.
  if (isProduction) {
    if (
      env.JWT_PRIVATE_KEY === DEV_INSECURE_JWT_PRIVATE_KEY_PEM ||
      env.JWT_PUBLIC_KEY === DEV_INSECURE_JWT_PUBLIC_KEY_PEM
    ) {
      fail('auth(jwt-keys)', ['JWT_PRIVATE_KEY', 'JWT_PUBLIC_KEY']);
    }
    if (env.PD_ENCRYPTION_KEY === DEV_INSECURE_PD_ENCRYPTION_KEY_BASE64) {
      fail('auth(pd-encryption-key)', ['PD_ENCRYPTION_KEY']);
    }
    // Находка [cookie-secret-no-fail-fast]: COOKIE_SECRET подписывает CSRF-HMAC (см. apps/api/
    // src/auth/csrf.ts) — та же категория риска, что JWT/PD-ключи выше, дефолт публично
    // закоммичен, поэтому такая же fail-fast-проверка, а не тихий degraded.
    if (env.COOKIE_SECRET === DEV_INSECURE_COOKIE_SECRET) {
      fail('auth(cookie-secret)', ['COOKIE_SECRET']);
    }
  } else if (
    env.JWT_PRIVATE_KEY === DEV_INSECURE_JWT_PRIVATE_KEY_PEM ||
    env.PD_ENCRYPTION_KEY === DEV_INSECURE_PD_ENCRYPTION_KEY_BASE64 ||
    env.COOKIE_SECRET === DEV_INSECURE_COOKIE_SECRET
  ) {
    degraded.push('auth-keys(dev-default)');
  }

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
    cohere: 'COHERE_API_KEY',
  };
  if (env.EMBED_PROVIDER !== 'stub') {
    const key = embedKeyByProvider[env.EMBED_PROVIDER];
    const missing = key ? requireVars(env, [key]) : [];
    if (missing.length > 0 && isProduction) fail(`embeddings(${env.EMBED_PROVIDER})`, missing);
    if (missing.length > 0) degraded.push('embeddings');
  } else {
    degraded.push('embeddings');
  }

  const pdKeysBase64: Record<number, string> = { [env.PD_ENCRYPTION_KEY_VERSION]: env.PD_ENCRYPTION_KEY };
  if (env.PD_ENCRYPTION_KEY_V2) pdKeysBase64[2] = env.PD_ENCRYPTION_KEY_V2;
  if (env.PD_ENCRYPTION_KEY_V3) pdKeysBase64[3] = env.PD_ENCRYPTION_KEY_V3;

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
    storage: {
      configured: storageConfigured,
      driver: env.STORAGE,
      endpoint: env.S3_ENDPOINT,
      region: env.S3_REGION,
      bucket: env.S3_BUCKET,
      accessKeyId: env.S3_ACCESS_KEY_ID,
      secretAccessKey: env.S3_SECRET_ACCESS_KEY,
    },
    mailer: {
      configured: env.MAILER === 'smtp',
      driver: env.MAILER,
      smtp: {
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
        from: env.SMTP_FROM,
      },
    },
    geocoder: {
      configured: env.GEOCODER === 'nominatim',
      driver: env.GEOCODER,
      nominatimUrl: env.NOMINATIM_URL,
      nominatimUserAgent: env.NOMINATIM_USER_AGENT,
    },
    payments: {
      configured: env.PAYMENTS === 'yookassa',
      driver: env.PAYMENTS,
      shopId: env.YOOKASSA_SHOP_ID,
      secretKey: env.YOOKASSA_SECRET_KEY,
      webhookSecret: env.YOOKASSA_WEBHOOK_SECRET,
    },
    llm: {
      configured: env.LLM_PROVIDER !== 'stub',
      driver: env.LLM_PROVIDER,
      anthropicApiKey: env.ANTHROPIC_API_KEY,
      openrouterApiKey: env.OPENROUTER_API_KEY,
      yandexgptApiKey: env.YANDEXGPT_API_KEY,
      gigachatApiKey: env.GIGACHAT_API_KEY,
      fallbackChain: csvToArray(env.LLM_FALLBACK_CHAIN),
    },
    embeddings: {
      configured: env.EMBED_PROVIDER !== 'stub',
      driver: env.EMBED_PROVIDER,
      openrouterApiKey: env.OPENROUTER_API_KEY,
      cohereApiKey: env.COHERE_API_KEY,
    },
    degraded,
    seo: { noindexAll: env.SEO_NOINDEX_ALL },
    auth: {
      jwtPrivateKeyPem: normalizePem(env.JWT_PRIVATE_KEY),
      jwtPublicKeyPem: normalizePem(env.JWT_PUBLIC_KEY),
      accessTtlSeconds: env.JWT_ACCESS_TTL_SECONDS,
      refreshTtlSeconds: env.REFRESH_TTL_SECONDS,
    },
    pdEncryption: {
      activeVersion: env.PD_ENCRYPTION_KEY_VERSION,
      keysBase64: pdKeysBase64,
    },
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
