import { HOROSCOPE_PROFESSION_NAME_RU, HOROSCOPE_PROFESSION_SLUGS, loadConfig, ZODIAC_SIGNS } from '@stassist/shared';
import { breadcrumbJsonLd, type PageSeo } from '../../lib/seo.js';

export interface ShutochnyjHubData {
  seo: PageSeo;
  signs: typeof ZODIAC_SIGNS;
  professions: Array<{ slug: string; nameRu: string }>;
}

/** `/shutochnyj-goroskop` — хаб шуточного контура (requirement 5 промта Ф5: антигороскоп +
 *  профессиональные гороскопы, явная маркировка «шуточный»). */
export async function data(): Promise<ShutochnyjHubData> {
  const appUrl = loadConfig().appUrl;
  return {
    seo: {
      title: 'Шуточные гороскопы — антигороскоп и гороскопы по профессиям | Зодиакум',
      description: 'Шуточные гороскопы для знаков зодиака (антигороскоп) и по профессиям — с юмором, не всерьёз.',
      canonicalPath: '/shutochnyj-goroskop',
      jsonLd: [breadcrumbJsonLd(appUrl, [{ name: 'Главная', path: '/' }, { name: 'Шуточные гороскопы', path: '/shutochnyj-goroskop' }])],
    },
    signs: ZODIAC_SIGNS,
    professions: HOROSCOPE_PROFESSION_SLUGS.map((slug) => ({ slug, nameRu: HOROSCOPE_PROFESSION_NAME_RU[slug] })),
  };
}
