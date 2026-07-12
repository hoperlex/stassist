/**
 * Гороскопы и программатика (Ф5, см. docs/architecture/22-модель-данных.md §5, docs/roadmap/
 * prompts/f5-гороскопы-и-программатика.md, docs/roadmap/31-конвенции-реализации.md §6: «Ф5
 * initial-run» владеет стартовым backfill'ом гороскопов). Единый источник правды для
 * `horoscopes.scope/period/topic/status`, восточного календаря (12 животных), шуточных профессий
 * и RU-слагов URL (period/topic) — используется и `apps/api` (роуты/репозитории), и `apps/web`
 * (SSR-страницы, sitemap), и `@stassist/llm` (генерация текста), и `apps/worker` (cron).
 */
import { z } from 'zod';

// ---------------------------------------------------------------------------------------------
// horoscopes: перечисления (см. doc 22 §5)
// ---------------------------------------------------------------------------------------------

export const horoscopeScopeSchema = z.enum(['zodiac', 'eastern', 'lunar_day', 'profession']);
export type HoroscopeScope = z.infer<typeof horoscopeScopeSchema>;

export const horoscopePeriodSchema = z.enum(['day', 'tomorrow', 'week', 'month', 'year']);
export type HoroscopePeriod = z.infer<typeof horoscopePeriodSchema>;

export const horoscopeTopicSchema = z.enum(['general', 'love', 'money', 'career', 'health']);
export type HoroscopeTopic = z.infer<typeof horoscopeTopicSchema>;

export const horoscopeStatusSchema = z.enum(['draft', 'moderation', 'published']);
export type HoroscopeStatus = z.infer<typeof horoscopeStatusSchema>;

// ---------------------------------------------------------------------------------------------
// URL-слаги (RU, транслит) ↔ период/тема — см. docs/architecture/23-seo-стратегия.md §2.
//
// Матрица URL (задокументированное разрешение неоднозначности сокращённой записи doc 23 §2
// «/goroskop/{znak}/{period} (+/lyubov|finansy|karera|zdorove)» — исходник не уточняет, что это
// ПОЛНОЕ произведение 5 периодов × 5 тем = 25 комбинаций на знак (12×25=300, ровно DoD «300
// текстов»), см. находку [неоднозначность] в _work/build/findings/f5.md):
//  - `/goroskop/{znak}`                     → period='day',    topic='general' (канон)
//  - `/goroskop/{znak}/{periodSlug}`        → period∈{зачем,неделя,месяц,год}, topic='general'
//  - `/goroskop/{znak}/{topicSlug}`         → period='day',    topic∈{любовь,деньги,карьера,здоровье}
//  - `/goroskop/{znak}/{periodSlug}/{topicSlug}` → полное произведение (16 оставшихся комбинаций)
// Второй сегмент однозначно резолвится по принадлежности множеству (период/тема слаги
// НЕ пересекаются) — см. `resolvePeriodOrTopicSlug` ниже и apps/web/lib/goroskop-route.ts.
// ---------------------------------------------------------------------------------------------

export const HOROSCOPE_PERIOD_SLUGS_RU: Record<Exclude<HoroscopePeriod, 'day'>, string> = {
  tomorrow: 'zavtra',
  week: 'nedelya',
  month: 'mesyac',
  year: 'god',
};
export const HOROSCOPE_PERIOD_SLUG_TO_PERIOD: Record<string, HoroscopePeriod> = Object.fromEntries(
  Object.entries(HOROSCOPE_PERIOD_SLUGS_RU).map(([period, slug]) => [slug, period as HoroscopePeriod]),
);

export const HOROSCOPE_TOPIC_SLUGS_RU: Record<Exclude<HoroscopeTopic, 'general'>, string> = {
  love: 'lyubov',
  money: 'finansy',
  career: 'karera',
  health: 'zdorove',
};
export const HOROSCOPE_TOPIC_SLUG_TO_TOPIC: Record<string, HoroscopeTopic> = Object.fromEntries(
  Object.entries(HOROSCOPE_TOPIC_SLUGS_RU).map(([topic, slug]) => [slug, topic as HoroscopeTopic]),
);

export const HOROSCOPE_PERIOD_NAME_RU: Record<HoroscopePeriod, string> = {
  day: 'сегодня',
  tomorrow: 'завтра',
  week: 'на неделю',
  month: 'на месяц',
  year: 'на год',
};
export const HOROSCOPE_TOPIC_NAME_RU: Record<HoroscopeTopic, string> = {
  general: 'общий',
  love: 'любовный',
  money: 'финансовый',
  career: 'карьерный',
  health: 'гороскоп здоровья',
};

/** Резолвит ВТОРОЙ URL-сегмент `/goroskop/{znak}/{slug}` в (period,topic) — см. заголовок файла. */
export function resolvePeriodOrTopicSlug(
  slug: string,
): { period: HoroscopePeriod; topic: HoroscopeTopic } | undefined {
  const period = HOROSCOPE_PERIOD_SLUG_TO_PERIOD[slug];
  if (period) return { period, topic: 'general' };
  const topic = HOROSCOPE_TOPIC_SLUG_TO_TOPIC[slug];
  if (topic) return { period: 'day', topic };
  return undefined;
}

// ---------------------------------------------------------------------------------------------
// Восточный (годовой) гороскоп — 12 знаков китайского календаря (см. @stassist/astro-core bazi:
// EARTHLY_BRANCHES 子丑寅卯辰巳午未申酉戌亥 = ровно этот порядок, packages/astro-core/src/bazi/index.ts).
// Общепринятая (public domain) традиционная символика — не фабрикуется, как и арканы Таро/
// нумерология в корпусе Ф4 (см. packages/llm/src/corpus/phrase-banks.ts).
// ---------------------------------------------------------------------------------------------

export const EASTERN_ANIMAL_SLUGS = [
  'rat', 'ox', 'tiger', 'rabbit', 'dragon', 'snake',
  'horse', 'goat', 'monkey', 'rooster', 'dog', 'pig',
] as const;
export type EasternAnimalSlug = (typeof EASTERN_ANIMAL_SLUGS)[number];

/** RU-слаг для URL `/vostochnyj-goroskop/{yyyy}/{zhivotnoe}` (транслит, как знаки зодиака). */
export const EASTERN_ANIMAL_RU_SLUGS: Record<EasternAnimalSlug, string> = {
  rat: 'krysa', ox: 'byk', tiger: 'tigr', rabbit: 'krolik', dragon: 'drakon', snake: 'zmeya',
  horse: 'loshad', goat: 'koza', monkey: 'obezyana', rooster: 'petuh',
  dog: 'sobaka', pig: 'svinya',
};

export const EASTERN_ANIMAL_NAME_RU: Record<EasternAnimalSlug, string> = {
  rat: 'Крыса', ox: 'Бык', tiger: 'Тигр', rabbit: 'Кролик', dragon: 'Дракон', snake: 'Змея',
  horse: 'Лошадь', goat: 'Коза', monkey: 'Обезьяна', rooster: 'Петух', dog: 'Собака', pig: 'Свинья',
};

export function easternAnimalBySlug(slug: string): EasternAnimalSlug | undefined {
  return (EASTERN_ANIMAL_SLUGS as readonly string[]).includes(slug) ? (slug as EasternAnimalSlug) : undefined;
}
export function easternAnimalByRuSlug(ruSlug: string): EasternAnimalSlug | undefined {
  const entry = Object.entries(EASTERN_ANIMAL_RU_SLUGS).find(([, v]) => v === ruSlug);
  return entry ? (entry[0] as EasternAnimalSlug) : undefined;
}

/** 5 стихий у-син (五行) — стволы Ба-цзы идут парами ян/инь на каждую стихию (см. bazi/index.ts
 *  STEM_ELEMENT: 甲乙=дерево, 丙丁=огонь, 戊己=земля, 庚辛=металл, 壬癸=вода). */
export const EASTERN_ELEMENT_NAME_RU: readonly string[] = ['Дерево', 'Огонь', 'Земля', 'Металл', 'Вода'];
export function easternElementIndexFromStemIndex(stemIndex: number): number {
  return Math.floor((((stemIndex % 10) + 10) % 10) / 2);
}

// ---------------------------------------------------------------------------------------------
// Лунные дни (архетипика 1..30, evergreen — не привязаны к конкретной дате, см. §6 конвенций
// реализации: контент традиционный, как арканы/дома Ф4).
// ---------------------------------------------------------------------------------------------

export const LUNAR_DAY_COUNT = 30;
export const LUNAR_DAY_NUMBERS: readonly number[] = Array.from({ length: LUNAR_DAY_COUNT }, (_, i) => i + 1);
export function isValidLunarDayNumber(n: number): boolean {
  return Number.isInteger(n) && n >= 1 && n <= LUNAR_DAY_COUNT;
}

// ---------------------------------------------------------------------------------------------
// Шуточный контур (M2) — см. doc 23 §2 упоминание юмористического сегмента и находку
// [самодостаточность] в f5.md: URL-схема должна быть зафиксирована явно.
//  - антигороскоп:      /shutochnyj-goroskop/{znak}                       (scope='zodiac',     humor=true)
//  - профессиональный:  /shutochnyj-goroskop/professiya/{professionSlug}  (scope='profession', humor=true)
// ---------------------------------------------------------------------------------------------

export const HOROSCOPE_PROFESSION_SLUGS = ['razrabotchik', 'buhgalter', 'menedzher'] as const;
export type HoroscopeProfessionSlug = (typeof HOROSCOPE_PROFESSION_SLUGS)[number];

export const HOROSCOPE_PROFESSION_NAME_RU: Record<HoroscopeProfessionSlug, string> = {
  razrabotchik: 'разработчика',
  buhgalter: 'бухгалтера',
  menedzher: 'менеджера',
};

export function isHoroscopeProfessionSlug(slug: string): slug is HoroscopeProfessionSlug {
  return (HOROSCOPE_PROFESSION_SLUGS as readonly string[]).includes(slug);
}

// ---------------------------------------------------------------------------------------------
// API-контракты
// ---------------------------------------------------------------------------------------------

export const horoscopeResponseSchema = z.object({
  scope: horoscopeScopeSchema,
  sign: z.string(),
  period: horoscopePeriodSchema,
  topic: horoscopeTopicSchema,
  dateKey: z.string(),
  bodyMd: z.string().nullable(),
  humor: z.boolean(),
  status: horoscopeStatusSchema.nullable(),
  publishedAt: z.string().nullable(),
  /** true = строка реально сгенерирована (published/moderation); false = честный empty-state
   *  (генерация недоступна прямо сейчас — БД/LLM деградированы, см. §6 «правило непустоты»). */
  computed: z.boolean(),
});
export type HoroscopeResponse = z.infer<typeof horoscopeResponseSchema>;

export const astroWeatherTodayResponseSchema = z.object({
  date: z.string(),
  moonSignIndex: z.number().int().min(0).max(11).nullable(),
  lunarDay: z.number().int().min(1).max(30).nullable(),
  phaseName: z.string().nullable(),
  isVoidOfCourse: z.boolean(),
  retrogradeBodies: z.array(z.string()),
  computed: z.boolean(),
});
export type AstroWeatherTodayResponse = z.infer<typeof astroWeatherTodayResponseSchema>;

// ---------------------------------------------------------------------------------------------
// Персональный гороскоп (кабинет) — см. doc 22 §3 `ai_reports.kind`, находку
// [полнота]/хранилище+ключ кэша в f5.md: `ai_reports.kind='personal_horoscope'`,
// cache_key = birthProfileId+period+dateKey+coreVersion+promptVersion (суточная инвалидация
// через dateKey), см. packages/llm/src/horoscope/personal.ts `buildPersonalHoroscopeCacheKey`.
// ---------------------------------------------------------------------------------------------

export const personalHoroscopePeriodSchema = z.enum(['day', 'week']);
export type PersonalHoroscopePeriod = z.infer<typeof personalHoroscopePeriodSchema>;

export const personalHoroscopeResponseSchema = z.object({
  period: personalHoroscopePeriodSchema,
  dateKey: z.string(),
  /** Краткая версия — бесплатно, видна всегда. */
  summaryMd: z.string(),
  /** Полная версия — премиум (пейвол-заглушка до Ф8, см. `PREMIUM_REPORTS_ENABLED`). `null`,
   *  если пользователю недоступна (см. `unlocked`). */
  fullMd: z.string().nullable(),
  unlocked: z.boolean(),
  calcBlock: z.record(z.string(), z.unknown()).nullable(),
  computed: z.boolean(),
});
export type PersonalHoroscopeResponse = z.infer<typeof personalHoroscopeResponseSchema>;
