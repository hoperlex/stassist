import { randomUUID } from 'node:crypto';
import Fastify, {
  type FastifyError,
  type FastifyInstance,
  type FastifyServerOptions,
} from 'fastify';
import type { Writable } from 'node:stream';
import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { loadConfig, REQUEST_ID_HEADER, type Config } from '@stassist/shared';
import { buildLoggerOptions } from './logging.js';
import { healthRoutes } from './routes/health.js';
import { authRoutes } from './routes/auth.js';
import { birthProfilesRoutes } from './routes/birth-profiles.js';
import { consentsRoutes } from './routes/consents.js';
import { geocodeRoutes } from './routes/geocode.js';
import { calcPresetsRoutes } from './routes/calc-presets.js';
import { accountRoutes } from './routes/account.js';
import { calcRoutes } from './routes/calc.js';
import { lunarCalendarRoutes } from './routes/lunar-calendar.js';
import { compatPagesRoutes } from './routes/compat-pages.js';
import { shareRoutes } from './routes/share.js';
import { publicGeocodeRoutes } from './routes/public-geocode.js';
import { aiReportsRoutes } from './routes/ai-reports.js';
import { interpretationRoutes } from './routes/interpretation.js';

export interface BuildAppOptions {
  config?: Config;
  /** Только для тестов: подмена потока вывода логов (перехват для проверки redaction). */
  logStream?: Writable;
  logLevel?: string;
}

export async function buildApp(opts: BuildAppOptions = {}): Promise<FastifyInstance> {
  const config = opts.config ?? loadConfig();

  const loggerOptions = buildLoggerOptions(opts.logLevel ?? (config.isProduction ? 'info' : 'warn'));
  const logger: FastifyServerOptions['logger'] = opts.logStream
    ? { ...loggerOptions, stream: opts.logStream }
    : loggerOptions;

  const app = Fastify({
    logger,
    genReqId: (req) => (req.headers[REQUEST_ID_HEADER] as string | undefined) ?? randomUUID(),
    // graceful shutdown: закрываем неактивные keep-alive-соединения сразу, активные —
    // дожидаются ответа (см. верификацию Ф0: SIGTERM под нагрузкой не должен рвать ответы).
    forceCloseConnections: 'idle',
  }).withTypeProvider<ZodTypeProvider>();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  // request-id: прокидываем во все ответы, чтобы клиент/логи можно было сопоставить.
  app.addHook('onRequest', async (req, reply) => {
    reply.header(REQUEST_ID_HEADER, req.id);
  });

  await app.register(helmet, { global: true });

  await app.register(cors, {
    origin(origin, callback) {
      // Запросы без Origin (curl, серверные вызовы) — пропускаем.
      if (!origin || config.corsAllowlist.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`CORS: origin ${origin} не в allowlist`), false);
    },
    credentials: true,
  });

  await app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });

  // httpOnly refresh_token + non-httpOnly csrf_token (см. auth/cookies.ts, auth/csrf.ts).
  await app.register(cookie, { secret: config.cookieSecret });

  await app.register(healthRoutes, { config });

  const apiV1 = '/api/v1';
  await app.register(authRoutes, { config, prefix: `${apiV1}/auth` });
  await app.register(birthProfilesRoutes, { config, prefix: `${apiV1}/birth-profiles` });
  await app.register(consentsRoutes, { config, prefix: `${apiV1}/consents` });
  await app.register(geocodeRoutes, { config, prefix: `${apiV1}/geocode` });
  await app.register(calcPresetsRoutes, { config, prefix: `${apiV1}/calc-presets` });
  await app.register(accountRoutes, { config, prefix: `${apiV1}/account` });

  // Ф3: анонимные калькуляторы + SSR-программатика (натал/синастрия/нумерология без сохранения
  // ПД; лунный календарь/пары совместимости — публичное чтение предрасчитанных данных; шеринг
  // карты — см. docs/roadmap/prompts/f3-калькуляторы-и-карта.md).
  await app.register(calcRoutes, { prefix: `${apiV1}/calc` });
  await app.register(lunarCalendarRoutes, { config, prefix: `${apiV1}/calc/lunar-calendar` });
  await app.register(compatPagesRoutes, { config, prefix: `${apiV1}/calc/compat-pages` });
  await app.register(publicGeocodeRoutes, { config, prefix: `${apiV1}/calc/geocode` });
  // Ф4: публичное чтение корпуса интерпретаций для калькуляторов Ф3 (см. routes/interpretation.ts).
  await app.register(interpretationRoutes, { config, prefix: `${apiV1}/calc/interpretation` });
  await app.register(shareRoutes, { config, prefix: `${apiV1}/share` });

  // Ф4: ИИ-разборы кабинета (см. docs/roadmap/prompts/f4-llm-конвейер.md).
  await app.register(aiReportsRoutes, { config, prefix: `${apiV1}/ai-reports` });

  app.setErrorHandler((error: FastifyError, request, reply) => {
    request.log.error({ err: error }, 'request error');
    const statusCode = error.statusCode ?? 500;
    reply.status(statusCode).send({
      error: {
        message: statusCode >= 500 ? 'Внутренняя ошибка сервера' : error.message,
        code: error.code,
        requestId: request.id,
      },
    });
  });

  return app;
}
