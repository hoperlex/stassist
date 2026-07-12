/**
 * Ручное разрешение неоднозначности `/goroskop/{X}/{Y}` (см. docs/architecture/23-seo-
 * стратегия.md §2 и находку [неоднозначность] в _work/build/findings/f5.md): на глубине 3 под
 * `/goroskop/` встречаются ДВЕ разные семантики —
 *  - `/goroskop/{znak}/{periodOrTema}` (знак → период/тема, см. packages/shared/src/schemas/
 *    horoscope.ts `resolvePeriodOrTopicSlug`);
 *  - `/goroskop/{yyyy}/{znak}` (годовой западный, doc 23 §2 «/goroskop/2027/{znak}»).
 * Множества значений (RU-слаги знаков vs 4-значные годы) НЕ пересекаются, поэтому различение
 * однозначно по regex первого сегмента — ЧИСТЫЕ функции здесь, `+route.ts` в обеих директориях
 * — тонкие обёртки над ними (см. pages/goroskop/@znak/@slug/+route.ts,
 * pages/goroskop/@yyyy/@znak/+route.ts).
 *
 * НАМЕРЕННО без импорта `@stassist/shared` (см. `signBySlug`, единый источник правды для RU-
 * слагов знаков) — `+route.ts` компилируется vike отдельным упрощённым загрузчиком, который на
 * этом монорепо не резолвит транзитивные зависимости воркспейс-пакетов (`zod` внутри
 * `@stassist/shared`, см. отчёт `_report/build/f5-отчёт.md` «требует ручного шага»/находка
 * сборки). Список слагов ниже — ДУБЛИКАТ `ZODIAC_SIGNS` из packages/shared/src/schemas/
 * zodiac.ts (только для мэтчинга «это вообще похоже на знак», не источник правды по данным
 * знака — реальные данные страница получает через `+data.ts`, который этому ограничению не
 * подвержен).
 */
const ZODIAC_RU_SLUGS = new Set([
  'oven', 'telec', 'bliznecy', 'rak', 'lev', 'deva',
  'vesy', 'skorpion', 'strelec', 'kozerog', 'vodoley', 'ryby',
]);

const YEAR_RE = /^\d{4}$/;

export interface SignSlugMatch {
  znak: string;
  slug: string;
}

/** `/goroskop/{znak}/{slug}` — только если первый сегмент реальный знак (НЕ 4-значный год). */
export function matchGoroskopSignSlug(urlPathname: string): SignSlugMatch | null {
  const parts = urlPathname.split('/').filter(Boolean);
  if (parts.length !== 3 || parts[0] !== 'goroskop') return null;
  const znak = parts[1]!;
  const slug = parts[2]!;
  if (YEAR_RE.test(znak)) return null;
  if (!ZODIAC_RU_SLUGS.has(znak)) return null;
  return { znak, slug };
}

export interface YearSignMatch {
  yyyy: string;
  znak: string;
}

/** `/goroskop/{yyyy}/{znak}` — только если первый сегмент 4-значный год. */
export function matchGoroskopYearSign(urlPathname: string): YearSignMatch | null {
  const parts = urlPathname.split('/').filter(Boolean);
  if (parts.length !== 3 || parts[0] !== 'goroskop') return null;
  const yyyy = parts[1]!;
  const znak = parts[2]!;
  if (!YEAR_RE.test(yyyy)) return null;
  return { yyyy, znak };
}
