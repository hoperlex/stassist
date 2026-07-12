import { loadConfig } from '@stassist/shared';
import { breadcrumbJsonLd, type PageSeo } from '../../lib/seo.js';

export interface KvadratPifagoraData {
  seo: PageSeo;
}

export async function data(): Promise<KvadratPifagoraData> {
  const appUrl = loadConfig().appUrl;
  return {
    seo: {
      title: 'Квадрат Пифагора (психоматрица) — рассчитать по дате рождения | Stassist',
      description:
        'Бесплатный калькулятор психоматрицы (квадрата Пифагора) по дате рождения: сетка 3×3, четыре дополнительных числа.',
      canonicalPath: '/kvadrat-pifagora',
      jsonLd: [
        breadcrumbJsonLd(appUrl, [
          { name: 'Главная', path: '/' },
          { name: 'Квадрат Пифагора', path: '/kvadrat-pifagora' },
        ]),
      ],
    },
  };
}
