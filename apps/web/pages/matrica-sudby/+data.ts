import { loadConfig } from '@stassist/shared';
import { breadcrumbJsonLd, type PageSeo } from '../../lib/seo.js';

export interface MatricaSudbyData {
  seo: PageSeo;
}

export async function data(): Promise<MatricaSudbyData> {
  const appUrl = loadConfig().appUrl;
  return {
    seo: {
      title: 'Матрица судьбы — рассчитать октаграмму по дате рождения | Stassist',
      description:
        'Бесплатный калькулятор матрицы судьбы (октаграмма Ладини): 9 базовых точек по дате рождения, арканы Таро 1–22.',
      canonicalPath: '/matrica-sudby',
      jsonLd: [
        breadcrumbJsonLd(appUrl, [
          { name: 'Главная', path: '/' },
          { name: 'Матрица судьбы', path: '/matrica-sudby' },
        ]),
      ],
    },
  };
}
