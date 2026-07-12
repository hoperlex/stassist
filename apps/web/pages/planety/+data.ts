import { CLASSICAL_PLANETS, loadConfig, ZODIAC_SIGNS } from '@stassist/shared';
import { breadcrumbJsonLd, type PageSeo } from '../../lib/seo.js';

export interface PlanetyHubData {
  seo: PageSeo;
  planets: Array<{ ruSlug: string; nameRu: string }>;
  signs: Array<{ slugPrepositional: string; nameRu: string }>;
  houses: number[];
}

/** `/planety` — хаб 10 планет с перелинковкой на 240 страниц «планета в знаке/доме» (req.2
 *  промта Ф7, doc 23 §2). */
export async function data(): Promise<PlanetyHubData> {
  const appUrl = loadConfig().appUrl;
  return {
    seo: {
      title: 'Планеты в знаках и домах натальной карты | Зодиакум',
      description: 'Значения планет в каждом знаке зодиака и в каждом доме натальной карты — 240 страниц с разбором.',
      canonicalPath: '/planety',
      jsonLd: [breadcrumbJsonLd(appUrl, [{ name: 'Главная', path: '/' }, { name: 'Планеты', path: '/planety' }])],
    },
    planets: CLASSICAL_PLANETS.map((p) => ({ ruSlug: p.ruSlug, nameRu: p.nameRu })),
    signs: ZODIAC_SIGNS.map((s) => ({ slugPrepositional: s.slugPrepositional, nameRu: s.nameRu })),
    houses: Array.from({ length: 12 }, (_, i) => i + 1),
  };
}
