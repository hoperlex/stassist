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
import { horoscopesRoutes } from './routes/horoscopes.js';
import { astroWeatherRoutes } from './routes/astro-weather.js';
import { personalHoroscopeRoutes } from './routes/personal-horoscope.js';
import { ordersRoutes } from './routes/orders.js';
import { stonesRoutes } from './routes/stones.js';
import { notificationsRoutes } from './routes/notifications.js';
import { personalCyclesRoutes } from './routes/personal-cycles.js';
import { wikiRoutes } from './routes/wiki.js';
import { celebritiesRoutes } from './routes/celebrities.js';
import { postsRoutes } from './routes/posts.js';
import { reactionsRoutes } from './routes/reactions.js';
import { friendshipsRoutes } from './routes/friendships.js';
import { reportsUgcRoutes } from './routes/reports-ugc.js';
import { moderationRoutes } from './routes/moderation.js';
import { reputationRoutes } from './routes/reputation.js';
import { plansRoutes } from './routes/plans.js';
import { subscriptionsRoutes } from './routes/subscriptions.js';
import { paymentsRoutes } from './routes/payments.js';
import { webhooksRoutes } from './routes/webhooks.js';
import { promoCodesRoutes } from './routes/promo-codes.js';
import { quizRoutes } from './routes/quiz.js';
import { paywallRoutes } from './routes/paywall.js';
import { emailOptoutsRoutes } from './routes/email-optouts.js';

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
    // Весь внешний трафик идёт через caddy (см. caddy/Caddyfile reverse_proxy) — БЕЗ trustProxy
    // req.ip был бы адресом контейнера caddy для всех клиентов, и @fastify/rate-limit ключевал
    // бы все запросы в одну общую корзину на весь сайт (находка [rate-limit-behind-proxy]).
    // Именно `1`, а НЕ `true` — доверяем ровно одному хопу (caddy). `trustProxy:true` доверял бы
    // X-Forwarded-For целиком, а атакующий мог бы подделать этот заголовок и обходить лимит;
    // caddy/Caddyfile перезаписывает X-Forwarded-For реальным адресом сокета клиента
    // (`header_up X-Forwarded-For {remote_host}`) ПЕРЕД проксированием, так что trustProxy:1
    // видит именно IP клиента caddy, а не то, что клиент сам вписал бы в заголовок.
    trustProxy: 1,
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

  // Ф5: гороскопы и программатика (см. docs/roadmap/prompts/f5-гороскопы-и-программатика.md).
  await app.register(horoscopesRoutes, { config, prefix: `${apiV1}/horoscopes` });
  await app.register(astroWeatherRoutes, { config, prefix: `${apiV1}/calc/astro-weather` });
  await app.register(personalHoroscopeRoutes, { config, prefix: `${apiV1}/personal-horoscope` });

  // Ф6: PDF-заказы, каталог камней, уведомления, персональные циклы (см. docs/roadmap/prompts/
  // f6-нумерология-и-камни.md).
  await app.register(ordersRoutes, { config, prefix: `${apiV1}/orders` });
  await app.register(stonesRoutes, { config, prefix: `${apiV1}/stones` });
  await app.register(notificationsRoutes, { config, prefix: `${apiV1}/notifications` });
  await app.register(personalCyclesRoutes, { config, prefix: `${apiV1}/personal-cycles` });

  // Ф7: вики (наполнение/поиск/правки) + коммьюнити — лента/комментарии/реакции/друзья/жалобы/
  // модерация/репутация (см. docs/roadmap/prompts/f7-вики-и-коммьюнити.md).
  await app.register(wikiRoutes, { config, prefix: `${apiV1}/wiki-articles` });
  await app.register(celebritiesRoutes, { config, prefix: `${apiV1}/celebrities` });
  await app.register(postsRoutes, { config, prefix: `${apiV1}/posts` });
  await app.register(reactionsRoutes, { config, prefix: `${apiV1}/reactions` });
  await app.register(friendshipsRoutes, { config, prefix: `${apiV1}/friendships` });
  await app.register(reportsUgcRoutes, { config, prefix: `${apiV1}/reports-ugc` });
  await app.register(moderationRoutes, { config, prefix: `${apiV1}/moderation` });
  await app.register(reputationRoutes, { config, prefix: `${apiV1}/reputation` });

  // Ф8: биллинг/подписка/пейвол/квиз/промокоды/вебхуки (см. docs/roadmap/prompts/
  // f8-монетизация-и-запуск.md).
  await app.register(plansRoutes, { prefix: `${apiV1}/plans` });
  await app.register(subscriptionsRoutes, { config, prefix: `${apiV1}/subscriptions` });
  await app.register(paymentsRoutes, { config, prefix: `${apiV1}/payments` });
  await app.register(webhooksRoutes, { config, prefix: `${apiV1}/webhooks` });
  await app.register(promoCodesRoutes, { config, prefix: `${apiV1}/promo-codes` });
  await app.register(quizRoutes, { config, prefix: `${apiV1}/quiz` });
  await app.register(paywallRoutes, { config, prefix: `${apiV1}/paywall` });
  await app.register(emailOptoutsRoutes, { config, prefix: `${apiV1}/email-optouts` });

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
