/**
 * Fastify-сервер, внутри которого работает vike SSR (см. docs/architecture/
 * 21-техническая-архитектура.md §2: «vike SSR как middleware внутри Fastify»).
 *
 * В dev — монтируем Vite dev-сервер в middleware-режиме (транспиляция на лету).
 * В production — раздаём собранные статические файлы из dist/client и рендерим страницы через
 * vike/server, используя собранный SSR-бандл из dist/server (vike подхватывает его сам).
 *
 * Этот файл НЕ бандлится vite — он всегда выполняется напрямую через Node/tsx (см. package.json
 * scripts dev/start), это стандартный паттерн ручной интеграции vike с собственным сервером.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Fastify from 'fastify';
import middie from '@fastify/middie';
import fastifyStatic from '@fastify/static';
import httpProxy from '@fastify/http-proxy';
import { loadConfig } from '@stassist/shared';
import { buildAllSitemapUrls, buildSitemapXml } from '../lib/sitemap.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const isProduction = process.env.NODE_ENV === 'production';

async function buildWebServer() {
  const config = loadConfig();
  const app = Fastify({
    logger: { level: config.isProduction ? 'info' : 'warn' },
    forceCloseConnections: 'idle',
  });

  await app.register(middie);

  if (!isProduction) {
    // Dev: браузер обращается к web (localhost:WEB_PORT) — тот же origin, что и в проде через
    // Caddy (см. caddy/Caddyfile: `/api/*` → api). Локально Caddy нет, поэтому web сам
    // проксирует `/api/*` на реальный api-процесс (localhost:API_PORT): cookies/credentials идут
    // прозрачно (важно для httpOnly refresh_token/csrf_token, см. apps/api/src/auth/cookies.ts),
    // SPA всегда обращается к относительному `/api/v1/...` независимо от dev/prod.
    await app.register(httpProxy, {
      upstream: `http://localhost:${config.api.port}`,
      prefix: '/api',
      rewritePrefix: '/api',
    });
  }

  if (isProduction) {
    // Отдаём только собранные ассеты (dist/client/assets/**) отдельным префиксом — если отдать
    // весь dist/client под '/*', @fastify/static сам регистрирует wildcard-роут на '*' и
    // конфликтует с нашим catch-all SSR-роутом ниже (FST_ERR_DUPLICATED_ROUTE).
    await app.register(fastifyStatic, {
      root: path.join(root, 'dist/client/assets'),
      prefix: '/assets/',
      decorateReply: false,
    });
  } else {
    const vite = await import('vite');
    const viteServer = await vite.createServer({
      root,
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(viteServer.middlewares);
  }

  // SEO (см. docs/architecture/23-seo-стратегия.md §3): sitemap для калькуляторов + 78 пар
  // совместимости + ближайшие месяцы лунного календаря; robots запрещает кабинет/API.
  // Регистрируются ДО catch-all vike-роута ниже.
  app.get('/sitemap.xml', async (_req, reply) => {
    const urls = buildAllSitemapUrls();
    reply.header('content-type', 'application/xml');
    return reply.send(buildSitemapXml(config.appUrl, urls));
  });
  app.get('/robots.txt', async (_req, reply) => {
    reply.header('content-type', 'text/plain');
    return reply.send(
      ['User-agent: *', 'Disallow: /app', 'Disallow: /api/', 'Disallow: /profiles', `Sitemap: ${config.appUrl}/sitemap.xml`].join('\n'),
    );
  });

  app.all('*', async (req, reply) => {
    const { renderPage } = await import('vike/server');
    const pageContext = await renderPage({ urlOriginal: req.raw.url ?? req.url });
    const { httpResponse } = pageContext;
    if (!httpResponse) {
      reply.callNotFound();
      return;
    }
    const { statusCode, headers, body } = httpResponse;
    for (const [name, value] of headers) {
      reply.header(name, value);
    }
    reply.status(statusCode);
    reply.send(body);
  });

  return { app, config };
}

async function main(): Promise<void> {
  const { app, config } = await buildWebServer();
  await app.listen({ port: config.web.port, host: '0.0.0.0' });

  let shuttingDown = false;
  const shutdown = async (signal: string): Promise<void> => {
    if (shuttingDown) return;
    shuttingDown = true;
    app.log.info({ signal }, 'web: получен сигнал остановки, начинаю graceful shutdown');
    try {
      await app.close();
      app.log.info('web: graceful shutdown завершён');
      process.exit(0);
    } catch (err) {
      app.log.error({ err }, 'web: ошибка при graceful shutdown');
      process.exit(1);
    }
  };

  process.on('SIGTERM', () => void shutdown('SIGTERM'));
  process.on('SIGINT', () => void shutdown('SIGINT'));
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
