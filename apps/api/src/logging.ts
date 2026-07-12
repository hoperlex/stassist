import type { FastifyRequest } from 'fastify';

/**
 * Настройки pino-логирования Fastify: JSON, redaction секретов и ПД.
 *
 * Пути redaction — конкретные, а не имена полей (fast-redact работает по путям в объекте лога).
 * По умолчанию сериализатор Fastify для `req` не включает заголовки — переопределяем его ниже
 * (см. `serializers.req`), иначе Authorization в логи вообще не попал бы и redaction был бы
 * недостижимым кодом (см. verification findings f0: authorization отсутствовал в списке,
 * 'birth*' был невалидным путём fast-redact — здесь оба исправлены).
 */
export const REDACT_PATHS = [
  'req.headers.authorization',
  'req.headers.cookie',
  'res.headers["set-cookie"]',
  'req.body.password',
  'req.body.token',
  'req.body.refreshToken',
  'req.body.email',
  'req.body.birthDate',
  'req.body.birthTime',
  'req.body.placeName',
  'req.body.lat',
  'req.body.lon',
];

export interface LoggerOptions {
  level: string;
  redact: { paths: string[]; censor: string };
  serializers: {
    req: (request: FastifyRequest) => Record<string, unknown>;
  };
}

export function buildLoggerOptions(level: string): LoggerOptions {
  return {
    level,
    redact: { paths: REDACT_PATHS, censor: '[скрыто]' },
    serializers: {
      req(request: FastifyRequest) {
        return {
          method: request.method,
          url: request.url,
          headers: request.headers,
        };
      },
    },
  };
}
