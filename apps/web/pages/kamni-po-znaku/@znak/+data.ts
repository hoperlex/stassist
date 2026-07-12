import type { PageContextServer } from 'vike/types';
import { loadConfig, signBySlug, zodiacEnSlugByIndex, type StoneListResponse } from '@stassist/shared';
import { breadcrumbJsonLd, type PageSeo } from '../../../lib/seo.js';
import { serverApiGet } from '../../../lib/server-api.js';

export interface KamniPoZnakuData {
  seo: PageSeo;
  znakSlug: string;
  znakName: string | null;
  stones: StoneListResponse['items'];
}

/** `/kamni-po-znaku/{znak}` — камни для знака зодиака (req.4 промта Ф6). URL — RU-слаг знака (тот
 *  же алфавит, что `/goroskop/{znak}`); для запроса к `/api/v1/stones?sign=` конвертируется в
 *  EN-слаг (`interpretation_chunks`-алфавит, см. `@stassist/shared` `zodiacEnSlugByIndex`). */
export async function data(pageContext: PageContextServer): Promise<KamniPoZnakuData> {
  const znakSlug = pageContext.routeParams.znak ?? '';
  const sign = signBySlug(znakSlug);
  const appUrl = loadConfig().appUrl;

  if (!sign) {
    return {
      seo: { title: 'Знак зодиака не найден | Stassist', description: '', canonicalPath: `/kamni-po-znaku/${znakSlug}`, noindex: true },
      znakSlug,
      znakName: null,
      stones: [],
    };
  }

  const enSlug = zodiacEnSlugByIndex(sign.signIndex);
  let stones: StoneListResponse['items'] = [];
  try {
    const res = await serverApiGet<StoneListResponse>(`/stones?sign=${enSlug}`);
    stones = res.items;
  } catch {
    stones = [];
  }

  return {
    seo: {
      title: `Камни для знака ${sign.nameRuGenitive} | Stassist`,
      description: `Какие камни подходят ${sign.nameRuGenitive.toLowerCase()} по традиции: свойства и назначение — на деньги, любовь, здоровье, защиту.`,
      canonicalPath: `/kamni-po-znaku/${znakSlug}`,
      jsonLd: [
        breadcrumbJsonLd(appUrl, [
          { name: 'Главная', path: '/' },
          { name: 'Камни', path: '/kamni' },
          { name: sign.nameRu, path: `/kamni-po-znaku/${znakSlug}` },
        ]),
      ],
    },
    znakSlug,
    znakName: sign.nameRu,
    stones,
  };
}
