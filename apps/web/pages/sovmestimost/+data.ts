import { ZODIAC_SIGNS, allCanonicalCompatPairs, loadConfig, signBySlug } from '@stassist/shared';
import { breadcrumbJsonLd, type PageSeo } from '../../lib/seo.js';

export interface SovmestimostIndexData {
  seo: PageSeo;
  signs: typeof ZODIAC_SIGNS;
  pairs: Array<{ slug: string; nameA: string; nameB: string }>;
}

export async function data(): Promise<SovmestimostIndexData> {
  const appUrl = loadConfig().appUrl;
  const pairs = allCanonicalCompatPairs().map((p) => ({
    slug: p.slug,
    nameA: signBySlug(p.signA)?.nameRu ?? p.signA,
    nameB: signBySlug(p.signB)?.nameRu ?? p.signB,
  }));
  return {
    seo: {
      title: 'Совместимость знаков зодиака — все 78 пар | Зодиакум',
      description:
        'Совместимость знаков зодиака: выберите два знака или посмотрите готовую таблицу всех 78 пар — плюс расчёт синастрии по датам рождения.',
      canonicalPath: '/sovmestimost',
      jsonLd: [breadcrumbJsonLd(appUrl, [{ name: 'Главная', path: '/' }, { name: 'Совместимость', path: '/sovmestimost' }])],
    },
    signs: ZODIAC_SIGNS,
    pairs,
  };
}
