import type { PageContextServer } from 'vike/types';
import { render } from 'vike/abort';
import { loadConfig, signBySlug, zodiacEnSlugByIndex, type InterpretationChunksBatchResponse, type ZodiacSignInfo } from '@stassist/shared';
import { breadcrumbJsonLd, articleJsonLd, type PageSeo } from '../../../lib/seo.js';
import { serverApiGet } from '../../../lib/server-api.js';

export interface InterpretationText {
  text: string;
  quality: 'draft' | 'reviewed';
}

export interface ZnakiZodiakaData {
  seo: PageSeo;
  sign: ZodiacSignInfo;
  /** EN-слаг знака (алфавит `interpretation_chunks`/вики, см. `@stassist/shared`
   *  `zodiacEnSlugByIndex`) — посчитан здесь (сервер), чтобы `+Page.tsx` не импортировал
   *  `@stassist/shared` целиком (баррель тянет `node:crypto` в клиентский бандл, см.
   *  doc-комментарий `apps/web/lib/goroskop-nav-links.ts`). */
  enSlug: string;
  text: InterpretationText | null;
}

/**
 * `/znaki-zodiaka/{znak}` — хаб-страница знака (requirement промта Ф5: «хабы /goroskop,
 * /znaki-zodiaka/{znak} — описание знака из корпуса + ссылки», находка [znaki-zodiaka-404] —
 * маршрут был не реализован при том, что 12 URL уже подразумевались SEO-планом). Контент — чанк
 * `sign:{enSlug}:overview` (архетипика знака, засеян в Ф4, тот же корпус, что раздел вики
 * `/wiki/signs/{enSlug}`), URL — RU-слаг знака (тот же алфавит, что `/goroskop/{znak}` и
 * `/kamni-po-znaku/{znak}`).
 *
 * ВАЖНО: серверный вызов `serverApiGet` (абсолютный `config.apiUrl`), а НЕ клиентский
 * `lib/api-client.ts`/`lib/interpretation.ts` — см. находку [seo-planety-empty-ssr]
 * (`apps/web/pages/planety/@slug/+data.ts`): относительный URL ломается на SSR в Node.
 */
export async function data(pageContext: PageContextServer): Promise<ZnakiZodiakaData> {
  const znakSlug = pageContext.routeParams.znak ?? '';
  const sign = signBySlug(znakSlug);
  if (!sign) throw render(404);

  const appUrl = loadConfig().appUrl;
  const enSlug = zodiacEnSlugByIndex(sign.signIndex);
  const key = `sign:${enSlug}:overview`;

  let text: InterpretationText | null = null;
  try {
    const res = await serverApiGet<InterpretationChunksBatchResponse>(`/calc/interpretation?keys=${encodeURIComponent(key)}`);
    const item = res.items[0];
    text = item ? { text: item.text, quality: item.quality } : null;
  } catch {
    text = null;
  }

  const path = `/znaki-zodiaka/${znakSlug}`;
  const title = `Знак зодиака ${sign.nameRu} — характеристика | Stassist`;
  const description = text
    ? text.text.slice(0, 155)
    : `${sign.nameRu} — стихия ${sign.elementRu}, характеристика знака зодиака.`;

  return {
    seo: {
      title,
      description,
      canonicalPath: path,
      noindex: !text,
      jsonLd: [
        breadcrumbJsonLd(appUrl, [
          { name: 'Главная', path: '/' },
          { name: 'Гороскопы', path: '/goroskop' },
          { name: sign.nameRu, path },
        ]),
        articleJsonLd(appUrl, { headline: title, description, path, datePublished: null }),
      ],
    },
    sign,
    enSlug,
    text,
  };
}
