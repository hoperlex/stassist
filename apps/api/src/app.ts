import { randomUUID } from 'node:crypto';
import Fastify, {
  type FastifyError,
  type FastifyInstance,
  type FastifyServerOptions,
} from 'fastify';
import type { Writable } from 'node:stream';
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

  await app.register(healthRoutes, { config });

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
