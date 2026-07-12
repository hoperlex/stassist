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
import { loadConfig, type CelebrityListResponse, type StoneListResponse, type WikiArticleListResponse } from '@stassist/shared';
import {
  buildSitemapIndexXml,
  buildSitemapXml,
  calculatorsClusterUrls,
  goroskopyClusterUrls,
  kamniClusterUrls,
  SITEMAP_CLUSTER_PATHS,
  wikiClusterUrls,
} from '../lib/sitemap.js';
import { serverApiGet } from '../lib/server-api.js';

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

  // SEO (см. docs/architecture/23-seo-стратегия.md §3, промт Ф8 req.6 «sitemap-индексы»):
  // `/sitemap.xml` — sitemap-ИНДЕКС (не гигантский плоский список) ссылается на 4 кластерных
  // sitemap-файла; robots запрещает кабинет/API (или весь сайт при SEO_NOINDEX_ALL — см. ниже).
  // Регистрируются ДО catch-all vike-роута ниже.
  app.get('/sitemap.xml', async (_req, reply) => {
    reply.header('content-type', 'application/xml');
    return reply.send(buildSitemapIndexXml(config.appUrl, Object.values(SITEMAP_CLUSTER_PATHS)));
  });

  app.get(SITEMAP_CLUSTER_PATHS.kalkulyatory, async (_req, reply) => {
    reply.header('content-type', 'application/xml');
    return reply.send(buildSitemapXml(config.appUrl, calculatorsClusterUrls()));
  });

  app.get(SITEMAP_CLUSTER_PATHS.goroskopy, async (_req, reply) => {
    reply.header('content-type', 'application/xml');
    return reply.send(buildSitemapXml(config.appUrl, goroskopyClusterUrls()));
  });

  app.get(SITEMAP_CLUSTER_PATHS.kamni, async (_req, reply) => {
    // Слаги камней реальны (БД, не вычисляются формулой) — запрашиваются через REST (web не
    // трогает БД напрямую, см. заголовок apps/web/lib/sitemap.ts). Деградирует до пустого
    // списка без API/БД — честный (неполный, но не падающий) sitemap.
    let slugs: string[] = [];
    try {
      const stones = await serverApiGet<StoneListResponse>('/stones');
      slugs = stones.items.map((s) => s.slug);
    } catch {
      slugs = [];
    }
    reply.header('content-type', 'application/xml');
    return reply.send(buildSitemapXml(config.appUrl, kamniClusterUrls(slugs)));
  });

  app.get(SITEMAP_CLUSTER_PATHS.wiki, async (_req, reply) => {
    let articles: Array<{ section: string; slug: string }> = [];
    try {
      const res = await serverApiGet<WikiArticleListResponse>('/wiki-articles?limit=1000');
      articles = res.items.map((a) => ({ section: a.section, slug: a.slug }));
    } catch {
      articles = [];
    }
    let celebritySlugs: string[] = [];
    try {
      const celebrities = await serverApiGet<CelebrityListResponse>('/celebrities?limit=1000');
      celebritySlugs = celebrities.items.map((c) => c.slug);
    } catch {
      celebritySlugs = [];
    }
    reply.header('content-type', 'application/xml');
    return reply.send(buildSitemapXml(config.appUrl, wikiClusterUrls(articles, celebritySlugs)));
  });
  app.get('/robots.txt', async (_req, reply) => {
    reply.header('content-type', 'text/plain');
    // Ф8 SEO-финализация (req.6 промта Ф8): SEO_NOINDEX_ALL=true (дефолт, см. packages/shared/
    // src/config.ts) → «Disallow: /» целиком — пока заказчик явно не включит прод-запуск,
    // поисковики НЕ должны заходить на черновик вовсе (совпадает с per-page noindex-мета, но
    // экономит краулинговый бюджет и избегает случайной индексации до юр-гейта).
    if (config.seo.noindexAll) {
      return reply.send(['User-agent: *', 'Disallow: /'].join('\n'));
    }
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
