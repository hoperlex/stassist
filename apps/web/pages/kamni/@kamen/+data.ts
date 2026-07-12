import type { PageContextServer } from 'vike/types';
import { loadConfig, type StoneResponse } from '@stassist/shared';
import { breadcrumbJsonLd, type PageSeo } from '../../../lib/seo.js';
import { serverApiGet } from '../../../lib/server-api.js';

export interface KamenPageData {
  seo: PageSeo;
  stone: StoneResponse | null;
}

/** `/kamni/{kamen}` — карточка камня (req.4 промта Ф6): свойства, соответствия, «требует проверки»
 *  бейдж при `status='draft'`. Не найден/API недоступен → честный empty-state с `noindex` (см.
 *  seo.ts doc-комментарий) — НЕ выдуманная карточка. */
export async function data(pageContext: PageContextServer): Promise<KamenPageData> {
  const slug = pageContext.routeParams.kamen ?? '';
  const appUrl = loadConfig().appUrl;

  let stone: StoneResponse | null = null;
  try {
    stone = await serverApiGet<StoneResponse>(`/stones/${encodeURIComponent(slug)}`);
  } catch {
    stone = null;
  }

  if (!stone) {
    return {
      seo: {
        title: 'Камень не найден | Stassist',
        description: 'Такой карточки камня нет в каталоге.',
        canonicalPath: `/kamni/${slug}`,
        noindex: true,
      },
      stone: null,
    };
  }

  return {
    seo: {
      title: `${stone.name} — свойства, соответствия знакам и планетам | Stassist`,
      description: `${stone.name}: ${stone.propertiesMd.slice(0, 140)}…`,
      canonicalPath: `/kamni/${stone.slug}`,
      jsonLd: [
        breadcrumbJsonLd(appUrl, [
          { name: 'Главная', path: '/' },
          { name: 'Камни', path: '/kamni' },
          { name: stone.name, path: `/kamni/${stone.slug}` },
        ]),
      ],
    },
    stone,
  };
}
