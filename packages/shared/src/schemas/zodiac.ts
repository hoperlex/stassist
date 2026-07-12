/**
 * Знаки зодиака: канонические данные (индекс/слаг/имя/глиф/стихия/крест) — единый источник
 * правды для калькуляторов Ф3 (`/sovmestimost/{znak-a}-i-{znak-b}`, лунный календарь, ChartWheel)
 * и для будущей seed-заливки текстов Ф4 (см. docs/roadmap/31-конвенции-реализации.md §5,§6:
 * `compat_pages` — таблицу создаёт Ф3, тексты 78 пар заливает Ф4).
 *
 * `signIndex` 0..11 совпадает с `Position.signIndex` из packages/shared/src/schemas/chart.ts
 * (0 = Овен, тропический зодиак эпохи даты — см. заголовок chart.ts).
 */
import { z } from 'zod';

export interface ZodiacSignInfo {
  signIndex: number;
  /** Русский транслитерированный слаг для URL (`/sovmestimost/{slug}-i-{slug}`, `/goroskop/{slug}`). */
  slug: string;
  nameRu: string;
  /** Родительный падеж («дева» → «Девы») — для шаблонов заголовков «совместимость Овна и Девы». */
  nameRuGenitive: string;
  /** Предложный падеж («в ком? в чём?»), слаг для URL Ф7 `/planety/{planeta}-v-{znak}`
   *  (напр. `lve` → «Марс в Льве»). Явные грамматические формы (не алгоритмическое склонение —
   *  см. заголовок packages/shared/src/schemas/planet.ts). */
  slugPrepositional: string;
  /** Юникод-глиф знака (блок Miscellaneous Symbols U+2648–2653) — шрифто-независимый источник
   *  символов для ChartWheel (см. README пакета `packages/ui`, раздел «Источник глифов»). */
  glyph: string;
  element: 'fire' | 'earth' | 'air' | 'water';
  elementRu: string;
  quality: 'cardinal' | 'fixed' | 'mutable';
}

export const ZODIAC_SIGNS: readonly ZodiacSignInfo[] = [
  { signIndex: 0, slug: 'oven', nameRu: 'Овен', nameRuGenitive: 'Овна', slugPrepositional: 'ovne', glyph: '♈', element: 'fire', elementRu: 'огонь', quality: 'cardinal' },
  { signIndex: 1, slug: 'telec', nameRu: 'Телец', nameRuGenitive: 'Тельца', slugPrepositional: 'teltse', glyph: '♉', element: 'earth', elementRu: 'земля', quality: 'fixed' },
  { signIndex: 2, slug: 'bliznecy', nameRu: 'Близнецы', nameRuGenitive: 'Близнецов', slugPrepositional: 'bliznetsah', glyph: '♊', element: 'air', elementRu: 'воздух', quality: 'mutable' },
  { signIndex: 3, slug: 'rak', nameRu: 'Рак', nameRuGenitive: 'Рака', slugPrepositional: 'rake', glyph: '♋', element: 'water', elementRu: 'вода', quality: 'cardinal' },
  { signIndex: 4, slug: 'lev', nameRu: 'Лев', nameRuGenitive: 'Льва', slugPrepositional: 'lve', glyph: '♌', element: 'fire', elementRu: 'огонь', quality: 'fixed' },
  { signIndex: 5, slug: 'deva', nameRu: 'Дева', nameRuGenitive: 'Девы', slugPrepositional: 'deve', glyph: '♍', element: 'earth', elementRu: 'земля', quality: 'mutable' },
  { signIndex: 6, slug: 'vesy', nameRu: 'Весы', nameRuGenitive: 'Весов', slugPrepositional: 'vesah', glyph: '♎', element: 'air', elementRu: 'воздух', quality: 'cardinal' },
  { signIndex: 7, slug: 'skorpion', nameRu: 'Скорпион', nameRuGenitive: 'Скорпиона', slugPrepositional: 'skorpione', glyph: '♏', element: 'water', elementRu: 'вода', quality: 'fixed' },
  { signIndex: 8, slug: 'strelec', nameRu: 'Стрелец', nameRuGenitive: 'Стрельца', slugPrepositional: 'streltse', glyph: '♐', element: 'fire', elementRu: 'огонь', quality: 'mutable' },
  { signIndex: 9, slug: 'kozerog', nameRu: 'Козерог', nameRuGenitive: 'Козерога', slugPrepositional: 'kozeroge', glyph: '♑', element: 'earth', elementRu: 'земля', quality: 'cardinal' },
  { signIndex: 10, slug: 'vodoley', nameRu: 'Водолей', nameRuGenitive: 'Водолея', slugPrepositional: 'vodolee', glyph: '♒', element: 'air', elementRu: 'воздух', quality: 'fixed' },
  { signIndex: 11, slug: 'ryby', nameRu: 'Рыбы', nameRuGenitive: 'Рыб', slugPrepositional: 'rybah', glyph: '♓', element: 'water', elementRu: 'вода', quality: 'mutable' },
];

export const zodiacSignSlugSchema = z.enum([
  'oven', 'telec', 'bliznecy', 'rak', 'lev', 'deva',
  'vesy', 'skorpion', 'strelec', 'kozerog', 'vodoley', 'ryby',
]);
export type ZodiacSignSlug = z.infer<typeof zodiacSignSlugSchema>;

const SIGN_BY_SLUG = new Map(ZODIAC_SIGNS.map((s) => [s.slug, s]));
const SIGN_BY_INDEX = new Map(ZODIAC_SIGNS.map((s) => [s.signIndex, s]));

export function signBySlug(slug: string): ZodiacSignInfo | undefined {
  return SIGN_BY_SLUG.get(slug);
}
export function signByIndex(index: number): ZodiacSignInfo | undefined {
  return SIGN_BY_INDEX.get(index);
}

const SIGN_BY_SLUG_PREPOSITIONAL = new Map(ZODIAC_SIGNS.map((s) => [s.slugPrepositional, s]));
/** Ф7: разбор URL `/planety/{planeta}-v-{znak}` (см. apps/web/lib/planety-route.ts). */
export function signBySlugPrepositional(slug: string): ZodiacSignInfo | undefined {
  return SIGN_BY_SLUG_PREPOSITIONAL.get(slug);
}

// -------------------------------------------------------------------------------------------
// Английские слаги знаков — единый источник правды для ключей корпуса интерпретаций Ф4
// (`interpretation_chunks.key`, напр. `sign:aries:overview`, `planet_in_sign:mars:leo`), см.
// docs/roadmap/31-конвенции-реализации.md §6. Русские слаги выше (`slug`) — только для URL/
// `compat_pages`; в коде до Ф4 не было ни одного места, использующего английские названия
// знаков, поэтому массив ниже — новый единственный источник правды (индекс = `signIndex`,
// см. packages/llm/src/facts/keys.ts).
// -------------------------------------------------------------------------------------------

export const ZODIAC_SIGN_EN_SLUGS = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
] as const;
export type ZodiacSignEnSlug = (typeof ZODIAC_SIGN_EN_SLUGS)[number];

/** zod-схема EN-слага знака — используется контрактами Ф6 (`stones.zodiac_signs`, decades). */
export const zodiacSignEnSlugSchema = z.enum(ZODIAC_SIGN_EN_SLUGS);

export function zodiacEnSlugByIndex(signIndex: number): ZodiacSignEnSlug {
  const slug = ZODIAC_SIGN_EN_SLUGS[signIndex];
  if (!slug) throw new Error(`zodiacEnSlugByIndex: некорректный signIndex ${signIndex}`);
  return slug;
}

// -------------------------------------------------------------------------------------------
// Пары совместимости (78 = 12 одинаковых + 66 различных, C(12,2)+12) — `compat_pages` (Ф3
// создаёт таблицу, Ф4 заливает `body_md`, см. §5/§6 конвенций реализации).
// -------------------------------------------------------------------------------------------

export interface CompatPairSlug {
  signA: ZodiacSignSlug;
  signB: ZodiacSignSlug;
  /** Канонический URL-слаг пары: `{a}-i-{b}`, где a≤b по индексу знака. */
  slug: string;
}

/**
 * Правило канона (найдено верификацией, зафиксировано здесь как единственный источник правды):
 * канонический порядок пары — по возрастанию `signIndex` (`signA.signIndex <= signB.signIndex`).
 * Запрос в обратном порядке (`{b}-i-{a}`) — 301 на канонический URL (см. apps/web
 * pages/sovmestimost/@pair/+data.ts).
 */
export function canonicalCompatPairSlug(a: string, b: string): CompatPairSlug | undefined {
  const signA = signBySlug(a);
  const signB = signBySlug(b);
  if (!signA || !signB) return undefined;
  const [lo, hi] = signA.signIndex <= signB.signIndex ? [signA, signB] : [signB, signA];
  return { signA: lo.slug as ZodiacSignSlug, signB: hi.slug as ZodiacSignSlug, slug: `${lo.slug}-i-${hi.slug}` };
}

/** Все 78 канонических пар (для sitemap, seed-скрипта `tools/seed-compat-pages.ts`, листинга). */
export function allCanonicalCompatPairs(): CompatPairSlug[] {
  const pairs: CompatPairSlug[] = [];
  for (let i = 0; i < ZODIAC_SIGNS.length; i++) {
    for (let j = i; j < ZODIAC_SIGNS.length; j++) {
      const a = ZODIAC_SIGNS[i]!;
      const b = ZODIAC_SIGNS[j]!;
      pairs.push({ signA: a.slug as ZodiacSignSlug, signB: b.slug as ZodiacSignSlug, slug: `${a.slug}-i-${b.slug}` });
    }
  }
  return pairs;
}
