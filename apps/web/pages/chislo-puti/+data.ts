import { loadConfig } from '@stassist/shared';
import { breadcrumbJsonLd, type PageSeo } from '../../lib/seo.js';

export interface ChisloPutiData {
  seo: PageSeo;
}

export async function data(): Promise<ChisloPutiData> {
  const appUrl = loadConfig().appUrl;
  return {
    seo: {
      title: 'Число жизненного пути — рассчитать по дате рождения онлайн | Зодиакум',
      description:
        'Бесплатный калькулятор числа жизненного пути (ЧЖП) по нумерологии: сквозная сумма цифр даты рождения, мастер-числа 11 и 22.',
      canonicalPath: '/chislo-puti',
      jsonLd: [
        breadcrumbJsonLd(appUrl, [
          { name: 'Главная', path: '/' },
          { name: 'Число пути', path: '/chislo-puti' },
        ]),
      ],
    },
  };
}
