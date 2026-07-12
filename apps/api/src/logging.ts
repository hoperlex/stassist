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
  'req.body.newPassword',
  'req.body.token',
  'req.body.refreshToken',
  'req.body.email',
  'req.body.birthDate',
  'req.body.birthTime',
  'req.body.placeName',
  'req.body.lat',
  'req.body.lon',
  // Ф2: birth_profiles вложены place.* в теле запроса (см. birthProfileInputSchema) — доп. к
  // плоским полям выше (найдено при верификации Ф2: place.placeName/lat/lon не были покрыты,
  // см. findings f2.md [pd-leak]).
  'req.body.place.placeName',
  'req.body.place.lat',
  'req.body.place.lon',
  // Находка [pd-leak-synastry-redaction]: calc-синастрия (`synastryCalcRequestSchema`, см.
  // packages/shared/src/schemas/calc.ts) принимает ДВЕ карты `a`/`b` = `chartInputSchema`, каждая
  // со СВОИМ вложенным `dateTime` (год/месяц/день/час/минута/секунда рождения) и `place`
  // (lat/lon) — те же по чувствительности данные, что birthDate/birthTime/place.* выше, но по
  // другим путям в теле запроса, поэтому не покрывались существующими правилами. Сейчас
  // `serializers.req` (см. ниже) тело запроса не логирует вообще — так что практической утечки
  // нет, но это защита-в-глубину: если логирование тела когда-нибудь включат, эти пути уже
  // закрыты, а не открыты по умолчанию.
  'req.body.a.dateTime',
  'req.body.a.place',
  'req.body.b.dateTime',
  'req.body.b.place',
  // birth_profiles.notes — свободный текст пользователя о человеке, легко наполняется ПД
  // (см. находку [notes-not-encrypted], которую сознательно не трогаем в этой задаче, но
  // редактирование в логах — дешёвый и независимый шаг защиты-в-глубину).
  'req.body.notes',
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
