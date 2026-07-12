import { loadConfig, WIKI_SECTIONS, WIKI_SECTION_NAME_RU, type WikiArticleSection } from '@stassist/shared';
import { breadcrumbJsonLd, type PageSeo } from '../../lib/seo.js';

export interface WikiHubData {
  seo: PageSeo;
  sections: Array<{ section: WikiArticleSection; nameRu: string }>;
}

/** `/wiki` — хаб разделов базы знаний (req.3 промта Ф7). Список разделов — статичен (10, из
 *  @stassist/shared), не требует запроса к API — счётчики статей смотрятся уже на странице раздела. */
export async function data(): Promise<WikiHubData> {
  const appUrl = loadConfig().appUrl;
  return {
    seo: {
      title: 'База знаний по астрологии и нумерологии | Зодиакум',
      description: 'Планеты, знаки зодиака, дома, аспекты, школы астрологии, арканы Матрицы судьбы, лунные дни, камни и глоссарий — статьи с внутренним поиском.',
      canonicalPath: '/wiki',
      jsonLd: [breadcrumbJsonLd(appUrl, [{ name: 'Главная', path: '/' }, { name: 'База знаний', path: '/wiki' }])],
    },
    sections: WIKI_SECTIONS.map((section) => ({ section, nameRu: WIKI_SECTION_NAME_RU[section] })),
  };
}
