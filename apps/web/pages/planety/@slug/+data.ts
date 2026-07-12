import type { PageContextServer } from 'vike/types';
import { render } from 'vike/abort';
import {
  loadConfig,
  signByIndex,
  zodiacSignEnSlugSchema,
  ZODIAC_SIGN_EN_SLUGS,
  CLASSICAL_PLANETS,
  type InterpretationChunksBatchResponse,
} from '@stassist/shared';
import { articleJsonLd, breadcrumbJsonLd, type PageSeo } from '../../../lib/seo.js';
import { serverApiGet } from '../../../lib/server-api.js';

export interface InterpretationText {
  text: string;
  quality: 'draft' | 'reviewed';
}

export interface PlanetInXData {
  seo: PageSeo;
  planetNameRu: string;
  planetRuSlug: string;
  targetLabel: string; // «в Скорпионе» / «в 7 доме»
  text: InterpretationText | null;
}

/** `/planety/{planeta}-v-{znak|dom}` — 240 SSR-страниц из чанков Ф4 (req.2 промта Ф7). На SSR
 *  идут draft+reviewed (§6 конвенций реализации, «правило непустоты» — иначе 240 страниц пусты до
 *  ручной вычитки ~240 чанков). Честный `noindex`-empty-state, если чанк ещё не засеян (не должно
 *  происходить в норме — корпус Ф4 покрывает ВСЕ 10×12+10×12 комбинаций, см. build-corpus.ts). */
export async function data(pageContext: PageContextServer): Promise<PlanetInXData> {
  const { kind, planetEn, signEn, house } = pageContext.routeParams as Record<string, string>;
  const planet = CLASSICAL_PLANETS.find((p) => p.enSlug === planetEn);
  if (!planet) throw render(404);

  const appUrl = loadConfig().appUrl;
  let key: string;
  let targetLabel: string;
  let breadcrumbTarget: { name: string; path: string };

  if (kind === 'sign') {
    const parsedSign = zodiacSignEnSlugSchema.safeParse(signEn);
    if (!parsedSign.success) throw render(404);
    const signIndex = ZODIAC_SIGN_EN_SLUGS.indexOf(parsedSign.data);
    const signInfo = signByIndex(signIndex);
    if (!signInfo) throw render(404);
    key = `planet_in_sign:${planetEn}:${signEn}`;
    targetLabel = `в знаке ${signInfo.nameRuGenitive}`;
    breadcrumbTarget = { name: signInfo.nameRu, path: `/wiki/signs/${signEn}` };
  } else {
    const houseNum = Number(house);
    if (!Number.isInteger(houseNum) || houseNum < 1 || houseNum > 12) throw render(404);
    key = `planet_in_house:${planetEn}:${houseNum}`;
    targetLabel = `в ${houseNum}-м доме`;
    breadcrumbTarget = { name: `${houseNum}-й дом`, path: `/wiki/houses/house-${houseNum}` };
  }

  // ВАЖНО: серверный вызов `serverApiGet` (абсолютный `config.apiUrl`), а НЕ клиентский
  // `lib/api-client.ts`/`lib/interpretation.ts` — тот бьёт по ОТНОСИТЕЛЬНОМУ URL, который в Node
  // при SSR падает (`Failed to parse URL`), ошибка молча глоталась, и все 240 страниц
  // `/planety/{планета}-v-{знак|дом}` отдавались пустыми с `noindex` (находка
  // [seo-planety-empty-ssr]). Паттерн — тот же, что `lunnyj-kalendar/@month/+data.ts` и
  // `wiki/@razdel/+data.ts`: честный `null`/empty-state при сбое API, а не 500.
  let text: InterpretationText | null = null;
  try {
    const res = await serverApiGet<InterpretationChunksBatchResponse>(`/calc/interpretation?keys=${encodeURIComponent(key)}`);
    const item = res.items[0];
    text = item ? { text: item.text, quality: item.quality } : null;
  } catch {
    text = null;
  }

  const path = pageContext.urlPathname;
  const title = `${planet.nameRu} ${targetLabel} — значение | Stassist`;
  const description = text ? text.text.slice(0, 155) : `${planet.nameRu} ${targetLabel} в натальной карте.`;

  return {
    seo: {
      title,
      description,
      canonicalPath: path,
      noindex: !text,
      jsonLd: [
        breadcrumbJsonLd(appUrl, [
          { name: 'Главная', path: '/' },
          { name: 'Планеты', path: '/planety' },
          { name: planet.nameRu, path: `/wiki/planets/${planetEn}` },
          breadcrumbTarget,
        ]),
        articleJsonLd(appUrl, { headline: title, description, path, datePublished: null }),
      ],
    },
    planetNameRu: planet.nameRu,
    planetRuSlug: planet.ruSlug,
    targetLabel,
    text,
  };
}
