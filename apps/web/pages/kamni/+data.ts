import { loadConfig, type StoneListResponse } from '@stassist/shared';
import { breadcrumbJsonLd, type PageSeo } from '../../lib/seo.js';
import { serverApiGet } from '../../lib/server-api.js';

export interface KamniIndexData {
  seo: PageSeo;
  stones: StoneListResponse['items'];
}

/**
 * `/kamni` — каталог камней (req.4 промта Ф6, ~70–80 карточек на старте, см. docs/architecture/
 * 23-seo-стратегия.md §2). SSR отдаёт ВЕСЬ список (для индексации), фильтры (знак/планета/
 * назначение/цвет) работают клиентски поверх уже загруженного массива — датасет мал (десятки
 * карточек), доп. запрос к API не нужен (см. apps/web/pages/kamni/+Page.tsx).
 */
export async function data(): Promise<KamniIndexData> {
  const appUrl = loadConfig().appUrl;
  let stones: StoneListResponse['items'] = [];
  try {
    const res = await serverApiGet<StoneListResponse>('/stones');
    stones = res.items;
  } catch {
    stones = []; // API/БД недоступны — честный empty-state, не 500 (см. паттерн compat-pages.ts)
  }

  return {
    seo: {
      title: 'Камни и минералы: каталог, соответствия знакам и планетам | Зодиакум',
      description:
        `Каталог камней (${stones.length || '70+'}): свойства, соответствия знакам зодиака, планетам и арканам, фильтр по назначению — на деньги, любовь, здоровье, защиту.`,
      canonicalPath: '/kamni',
      jsonLd: [breadcrumbJsonLd(appUrl, [{ name: 'Главная', path: '/' }, { name: 'Камни', path: '/kamni' }])],
      noindex: stones.length === 0,
    },
    stones,
  };
}
