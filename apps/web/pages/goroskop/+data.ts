import { loadConfig, ZODIAC_SIGNS } from '@stassist/shared';
import { breadcrumbJsonLd, type PageSeo } from '../../lib/seo.js';

export interface GoroskopHubData {
  seo: PageSeo;
  signs: typeof ZODIAC_SIGNS;
}

export async function data(): Promise<GoroskopHubData> {
  const appUrl = loadConfig().appUrl;
  return {
    seo: {
      title: 'Гороскопы на сегодня, неделю, месяц и год — по знакам зодиака | Stassist',
      description: 'Гороскопы для всех 12 знаков зодиака: на сегодня, завтра, неделю, месяц и год. Любовный, финансовый, карьерный гороскоп и гороскоп здоровья.',
      canonicalPath: '/goroskop',
      jsonLd: [breadcrumbJsonLd(appUrl, [{ name: 'Главная', path: '/' }, { name: 'Гороскопы', path: '/goroskop' }])],
    },
    signs: ZODIAC_SIGNS,
  };
}
