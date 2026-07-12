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
