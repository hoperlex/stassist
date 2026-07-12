import type { PageContextServer } from 'vike/types';
import { loadConfig } from '@stassist/shared';
import { breadcrumbJsonLd, type PageSeo } from '../../../lib/seo.js';
import { findAuthorBySlug, type AuthorProfile } from '../../../lib/authors.js';

export interface AuthorPageData {
  seo: PageSeo;
  author: AuthorProfile | null;
}

/** `/redakciya/{slug}` — карточка автора/редактора (E-E-A-T). Не найден → честный empty-state
 *  с noindex (тот же паттерн, что kamni/@kamen). */
export async function data(pageContext: PageContextServer): Promise<AuthorPageData> {
  const slug = pageContext.routeParams.slug ?? '';
  const appUrl = loadConfig().appUrl;
  const author = findAuthorBySlug(slug) ?? null;

  if (!author) {
    return {
      seo: { title: 'Автор не найден | Зодиакум', description: 'Такой страницы редакции нет.', canonicalPath: `/redakciya/${slug}`, noindex: true },
      author: null,
    };
  }

  return {
    seo: {
      title: `${author.roleRu} — редакция Зодиакум`,
      description: author.bioRu[0]!,
      canonicalPath: `/redakciya/${author.slug}`,
      jsonLd: [
        breadcrumbJsonLd(appUrl, [
          { name: 'Главная', path: '/' },
          { name: 'Редакция', path: '/redakciya' },
          { name: author.roleRu, path: `/redakciya/${author.slug}` },
        ]),
      ],
    },
    author,
  };
}
