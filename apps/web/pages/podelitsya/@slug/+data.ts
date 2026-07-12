/**
 * SSR-страница анонимного шеринга карты (см. docs/architecture/21-техническая-архитектура.md §6,
 * findings f3.md «OG-шеринг без постоянного URL»): постоянный URL + og:image, указывающий на
 * `GET /api/v1/share/:slug/og.png` (тот же публичный домен, `/api/*` проксируется на api — см.
 * caddy/Caddyfile). Пока PNG не готов (воркер ещё не обработал), og:image просто не проставляется
 * — краулер получит валидные og:title/og:description без картинки до следующего тика воркера.
 */
import { render } from 'vike/abort';
import type { PageContextServer } from 'vike/types';
import { loadConfig, type ChartShareDetailsResponse } from '@stassist/shared';
import type { PageSeo } from '../../../lib/seo.js';
import { ServerApiError, serverApiGet } from '../../../lib/server-api.js';

export interface PodelitsyaData {
  seo: PageSeo;
  share: ChartShareDetailsResponse;
}

export async function data(pageContext: PageContextServer): Promise<PodelitsyaData> {
  const slug = pageContext.routeParams.slug ?? '';
  let share: ChartShareDetailsResponse;
  try {
    share = await serverApiGet<ChartShareDetailsResponse>(`/share/${slug}`);
  } catch (err) {
    if (err instanceof ServerApiError && err.status === 404) {
      throw render(404);
    }
    throw err;
  }

  const appUrl = loadConfig().appUrl;
  const title =
    share.kind === 'synastry'
      ? 'Карта совместимости — Зодиакум'
      : share.kind === 'transit_day'
        ? 'Небо дня — Зодиакум'
        : 'Натальная карта — Зодиакум';
  const description =
    share.kind === 'transit_day' && share.caption
      ? `${share.caption}. А как это небо у тебя? Узнай на Зодиакуме.`
      : 'Расчёт карты на портале Зодиакум — гороскопы, нумерология, матрица судьбы.';

  return {
    seo: {
      title,
      description,
      canonicalPath: `/podelitsya/${slug}`,
      ogImage: share.ogImageReady ? `${appUrl}/api/v1/share/${slug}/og.png` : undefined,
    },
    share,
  };
}
