/**
 * SEO-метаданные страницы (см. docs/architecture/23-seo-стратегия.md §3: title/description-
 * шаблоны, JSON-LD `BreadcrumbList`, canonical). Страница отдаёт `PageSeo` из своего `+data.ts`
 * (поле `seo` в возвращаемом объекте) — `pageContext.data.seo` читает `renderer/+onRenderHtml.tsx`
 * и подставляет в `<head>`. Страницы без `+data.ts` (старые Ф0–Ф2) продолжают получать
 * дефолтные title/description — обратная совместимость не нарушена.
 */
export interface PageSeo {
  title: string;
  description: string;
  /** Путь БЕЗ домена, напр. `/sovmestimost/oven-i-telec` — склеивается с APP_URL. */
  canonicalPath: string;
  /** JSON-LD объекты (BreadcrumbList и т.п.) — сериализуются как отдельные <script type="application/ld+json">. */
  jsonLd?: object[];
  /** og:image — абсолютный URL (для страниц шеринга, см. pages/podelitsya). */
  ogImage?: string;
  /** `<meta name="robots" content="noindex">` — страница с честным empty-state (`computed=false`,
   *  БД/генерация недоступны) НЕ должна попадать в индекс как тонкий/пустой контент (см. findings
   *  f5.md [seed-контента-на-старте]: «явная заглушка с noindex»). Как только генерация проходит
   *  успешно (обычный случай — ленивая генерация при первом заходе), страница индексируется. */
  noindex?: boolean;
}

export function breadcrumbJsonLd(appUrl: string, items: Array<{ name: string; path: string }>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${appUrl}${item.path}`,
    })),
  };
}

/**
 * `Article` JSON-LD (см. docs/architecture/23-seo-стратегия.md §3: «JSON-LD: Article/NewsArticle
 * (гороскопы, статьи)») — используется программатическими страницами Ф5 (гороскопы). `datePublished`/
 * `dateModified` — honest lastmod (см. §3 «lastmod честный»), не текущий момент рендера.
 */
export function articleJsonLd(appUrl: string, opts: { headline: string; description: string; path: string; datePublished: string | null }): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    url: `${appUrl}${opts.path}`,
    ...(opts.datePublished ? { datePublished: opts.datePublished, dateModified: opts.datePublished } : {}),
    publisher: { '@type': 'Organization', name: APP_TITLE_RU },
  };
}

const APP_TITLE_RU = 'Stassist';
