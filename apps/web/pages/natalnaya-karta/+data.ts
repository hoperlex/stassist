import { loadConfig } from '@stassist/shared';
import { breadcrumbJsonLd, type PageSeo } from '../../lib/seo.js';

export interface NatalnayaKartaData {
  seo: PageSeo;
}

/** Статическая SEO-обвязка — сам расчёт анонимный и идёт с клиента (POST /api/v1/calc/natal),
 *  ничего не хранится, поэтому SSR не нужен постоянный результат (см. §4 промта Ф3). */
export async function data(): Promise<NatalnayaKartaData> {
  const appUrl = loadConfig().appUrl;
  return {
    seo: {
      title: 'Натальная карта онлайн бесплатно с расшифровкой — Stassist',
      description:
        'Рассчитайте натальную карту по дате, времени и месту рождения: планеты, дома, аспекты, наглядное SVG-колесо. Бесплатный калькулятор, работает и без точного времени рождения.',
      canonicalPath: '/natalnaya-karta',
      jsonLd: [
        breadcrumbJsonLd(appUrl, [
          { name: 'Главная', path: '/' },
          { name: 'Натальная карта', path: '/natalnaya-karta' },
        ]),
      ],
    },
  };
}
