/**
 * `HoroscopeAstroEvents` — компактная структура «астрособытий», сохраняемая в
 * `horoscopes.astro_events` (jsonb) и передаваемая в генератор текста (см. templates.ts).
 * Единый источник правды для антигаллюцинационной проверки промта Ф5 («упомянутые события есть
 * в astro_events»): и шаблоны текста (templates.ts), и билдер реального LLM-промта
 * (build-prompt.ts) читают ТОЛЬКО эти поля — не изобретают собственных фактов о небе.
 *
 * ЧИСТЫЕ функции без I/O — конструируются из УЖЕ вычисленных фактов (день — из `astro_calendar`,
 * см. находку [полнота] в _work/build/findings/f5.md «дублирование astro_calendar и Ф5»: небо дня
 * берём из уже предрасчитанного `astro_calendar`, Ф5 НЕ пересчитывает его заново). Кто вызывает
 * эти билдеры и откуда берёт исходные факты — apps/worker (cron, читает `astro_calendar` из БД)
 * и apps/api (ленивая генерация, тот же путь через репозиторий `astro_calendar`).
 */
import { normalizeDegrees } from '@stassist/astro-core';

export interface NotableAspectFact {
  bodyA: string;
  bodyB: string;
  angle: string;
  orbDeg: number;
}

export interface SignIngressFact {
  body: string;
  toSignIndex: number;
}

/** Один «снимок» дня — вход для day/tomorrow и строительный блок для week/month/year. */
export interface DaySkyFact {
  date: string;
  moonSignIndex: number;
  lunarDay: number;
  phaseName: string;
  isVoidOfCourse: boolean;
  retrogradeBodies: string[];
  signIngresses: SignIngressFact[];
}

/**
 * Единая (дискриминированная по `period`/`scope`) структура астрособытий. Плоская, а не строгий
 * union — упрощает jsonb-хранение/чтение (все поля опциональны, читатель ориентируется на
 * `period`/`scope`, см. заголовок файла).
 */
export interface HoroscopeAstroEvents {
  scope: 'zodiac' | 'eastern' | 'lunar_day' | 'profession';
  period: 'day' | 'tomorrow' | 'week' | 'month' | 'year';
  dateKey: string;
  fromDate?: string;
  toDate?: string;

  // --- Западное небо (zodiac/profession) ---
  moonSignIndex?: number;
  moonSignIndexEnd?: number;
  lunarDay?: number;
  phaseName?: string;
  isVoidOfCourse?: boolean;
  retrogradeBodies?: string[];
  signIngresses?: SignIngressFact[];
  notableAspects?: NotableAspectFact[];
  /** Знаки Луны, которые она посетила за период (для week/month) — без повторов, по порядку. */
  moonSignsVisited?: number[];
  /** Ретрограды, начавшиеся/закончившиеся ВНУТРИ периода (для week/month/year). */
  retrogradeStarts?: string[];
  retrogradeEnds?: string[];
  /** Даты новолуний/полнолуний внутри периода (ISO 'YYYY-MM-DD'). */
  newMoonDates?: string[];
  fullMoonDates?: string[];

  // --- Восточный (bazi) ---
  easternAnimalIndex?: number;
  easternElementIndex?: number;
  /** Животное, для которого пишется текст (может отличаться от animalIndex года — «Крыса в год
   *  Лошади», см. templates.ts buildEasternYearText). */
  easternSubjectAnimalIndex?: number;
}

export function buildDayAstroEvents(
  period: 'day' | 'tomorrow',
  fact: DaySkyFact,
  notableAspects: NotableAspectFact[] = [],
): HoroscopeAstroEvents {
  return {
    scope: 'zodiac',
    period,
    dateKey: fact.date,
    moonSignIndex: fact.moonSignIndex,
    lunarDay: fact.lunarDay,
    phaseName: fact.phaseName,
    isVoidOfCourse: fact.isVoidOfCourse,
    retrogradeBodies: fact.retrogradeBodies,
    signIngresses: fact.signIngresses,
    notableAspects,
  };
}

/** Агрегирует последовательность дневных «снимков» (уже отсортированных по дате) в события
 *  периода week/month — см. заголовок файла: НЕ пересчитывает небо заново, только сводит факты. */
export function buildRangeAstroEvents(
  period: 'week' | 'month',
  dateKey: string,
  facts: readonly DaySkyFact[],
): HoroscopeAstroEvents {
  if (facts.length === 0) {
    return { scope: 'zodiac', period, dateKey, moonSignsVisited: [], retrogradeStarts: [], retrogradeEnds: [], newMoonDates: [], fullMoonDates: [] };
  }
  const moonSignsVisited: number[] = [];
  for (const f of facts) {
    if (moonSignsVisited.at(-1) !== f.moonSignIndex) moonSignsVisited.push(f.moonSignIndex);
  }

  const retrogradeStarts: string[] = [];
  const retrogradeEnds: string[] = [];
  for (let i = 1; i < facts.length; i++) {
    const prevSet = new Set(facts[i - 1]!.retrogradeBodies);
    const currSet = new Set(facts[i]!.retrogradeBodies);
    for (const body of currSet) if (!prevSet.has(body)) retrogradeStarts.push(body);
    for (const body of prevSet) if (!currSet.has(body)) retrogradeEnds.push(body);
  }

  const newMoonDates = facts.filter((f) => f.phaseName === 'new').map((f) => f.date);
  const fullMoonDates = facts.filter((f) => f.phaseName === 'full').map((f) => f.date);

  const signIngresses: SignIngressFact[] = facts.flatMap((f) => f.signIngresses);

  return {
    scope: 'zodiac',
    period,
    dateKey,
    fromDate: facts[0]!.date,
    toDate: facts.at(-1)!.date,
    moonSignsVisited,
    retrogradeStarts: [...new Set(retrogradeStarts)],
    retrogradeEnds: [...new Set(retrogradeEnds)],
    newMoonDates,
    fullMoonDates,
    signIngresses,
  };
}

/**
 * Годовой (западный) гороскоп — см. doc-комментарий templates.ts `buildZodiacHoroscopeText`
 * про упрощение MVP: НЕ сканирует ингрессы медленных планет за год (трудоёмкий root-finding по
 * 12 знакам × 6 телам), опирается на архетипику знака + стихию/крест (уже есть в
 * `@stassist/shared` ZODIAC_SIGNS) и, при наличии, ретроградные тела на 1 января года —
 * задокументированное ограничение (см. ACCURACY.md пакета astro-core и отчёт фазы).
 */
export function buildYearAstroEvents(dateKey: string, retrogradeBodiesAtYearStart: string[] = []): HoroscopeAstroEvents {
  return { scope: 'zodiac', period: 'year', dateKey, retrogradeBodies: retrogradeBodiesAtYearStart };
}

export function buildEasternYearAstroEvents(
  dateKey: string,
  yearAnimalIndex: number,
  yearElementIndex: number,
  subjectAnimalIndex: number,
): HoroscopeAstroEvents {
  return {
    scope: 'eastern',
    period: 'year',
    dateKey,
    easternAnimalIndex: yearAnimalIndex,
    easternElementIndex: yearElementIndex,
    easternSubjectAnimalIndex: subjectAnimalIndex,
  };
}

/** Лунный день — evergreen, без привязки к конкретному небу (см. doc-комментарий horoscopes.ts). */
export function buildLunarDayAstroEvents(dateKey: string, lunarDay: number): HoroscopeAstroEvents {
  return { scope: 'lunar_day', period: 'day', dateKey, lunarDay };
}

/** Нормализует произвольный градус аспекта в [0,360) — реэкспорт для читателей astro_events без
 *  собственной зависимости от @stassist/astro-core (используется в тестах шаблонов). */
export { normalizeDegrees };
