/**
 * Детерминированный генератор гороскопных текстов — «дефолтный» путь генерации (см. doc-комментарий
 * generate-batch.ts про решение «StubLlmProvider даёт не-доменный плейсхолдер → для массового
 * наполнения портала, как и корпус Ф4 (packages/llm/src/corpus/templates.ts), пишем осмысленный
 * шаблонный генератор, а не буквальный вызов LlmProvider.generate()»). Тон — поддерживающий, без
 * фатализма и медицины (см. prompt/system-rules.ts — те же правила применяются к автомодерации
 * этих текстов, см. generate-batch.ts).
 *
 * Длины (см. требование 1 промта Ф5): день/завтра — 600–900 символов; неделя/месяц/год — 1500–2500.
 */
import { EASTERN_ANIMAL_SLUGS } from '@stassist/shared';
import { hashPick } from '../corpus/hash-pick.js';
import { SIGN_EXPRESSION } from '../corpus/phrase-banks.js';
import { objectNameRu, signRuInfoByEnSlug } from '../facts/ru-names.js';
import { pickOpeningVariant } from './antidup.js';
import type { HoroscopeAstroEvents } from './astro-events.js';
import {
  ANTI_HOROSCOPE_JOKES_RU,
  EASTERN_ANIMAL_TRAIT_RU,
  EASTERN_ELEMENT_THEME_RU,
  GENERAL_TOPIC_CLOSER_RU,
  LUNAR_DAY_META,
  MOON_SIGN_EFFECT_RU,
  PHASE_EFFECT_RU,
  PROFESSION_JOKE_INTRO_RU,
  RETROGRADE_EFFECT_RU,
  TOPIC_FRAME_RU,
  VOID_OF_COURSE_PHRASES,
} from './phrase-banks.js';

const MOON_SIGN_EN_BY_INDEX = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
] as const;

function moonSignEffect(signIndex: number): string {
  const slug = MOON_SIGN_EN_BY_INDEX[signIndex];
  return slug ? MOON_SIGN_EFFECT_RU[slug] : 'создаёт переменчивый эмоциональный фон';
}

function openingVariantsDay(nameRuGenitive: string, periodWord: string, recentZachins: readonly string[], seed: string): string {
  const lower = periodWord.toLowerCase();
  const variants = [
    `${periodWord} для ${nameRuGenitive} — время действовать в своём ритме, не оглядываясь на чужие ожидания.`,
    `Для ${nameRuGenitive} ${lower} несёт особую динамику — стоит прислушаться к внутреннему ощущению момента.`,
    `${periodWord} располагает ${nameRuGenitive} к тому, чтобы довериться собственному темпу, а не торопить события.`,
    `Астрологический фон ${lower} создаёт для ${nameRuGenitive} пространство для честного разговора с собой.`,
    `${periodWord} у ${nameRuGenitive} начинается с простого вопроса: чего на самом деле хочется именно сегодня, без оглядки на «надо».`,
    `Для ${nameRuGenitive} ${lower} — про то, чтобы поймать баланс между желанием успеть всё и желанием никуда не спешить.`,
    `${periodWord} предлагает ${nameRuGenitive} чуть замедлиться и заметить детали, которые обычно проскакивают на автомате.`,
    `Небо ${lower} не диктует ${nameRuGenitive} жёсткого сценария — тем ценнее свобода выбрать тон дня самому.`,
  ];
  return pickOpeningVariant(seed, variants, recentZachins);
}

function openingVariantsRange(nameRuGenitive: string, periodWord: string, recentZachins: readonly string[], seed: string): string {
  const lower = periodWord.toLowerCase();
  const variants = [
    `${periodWord} для ${nameRuGenitive} складывается из нескольких волн — важно не терять общий вектор в частностях.`,
    `Для ${nameRuGenitive} ${lower} — время смотреть на картину шире, чем на отдельный день.`,
    `${periodWord} даёт ${nameRuGenitive} несколько разных по тону отрезков — стоит быть гибче обычного.`,
    `Общий фон ${lower} подталкивает ${nameRuGenitive} подводить итоги постепенно, а не разом.`,
    `${periodWord} у ${nameRuGenitive} лучше читать как маршрут, а не как список задач: важнее направление, чем скорость.`,
    `Для ${nameRuGenitive} ${lower} — удобное окно, чтобы отделить главное от срочного и вложиться именно в главное.`,
    `${periodWord} разворачивается для ${nameRuGenitive} неровно: будут и всплески, и паузы, и в паузах смысла не меньше.`,
    `Астрологически ${lower} оставляет ${nameRuGenitive} много свободы — сценарий этого отрезка во многом пишется собственными решениями.`,
  ];
  return pickOpeningVariant(seed, variants, recentZachins);
}

const PRACTICAL_TIP_RU = [
  'Небольшой практический совет: не откладывайте на потом то, что можно сделать сейчас спокойно, без спешки.',
  'Практический ориентир: сверяйтесь с фактами, а не только с настроением — так решения будут увереннее.',
  'Стоит помнить: любые астрологические тенденции — это фон, а выбор конкретных шагов остаётся за вами.',
  'Практический ориентир: одно доведённое до конца дело сегодня ценнее пяти начатых и брошенных.',
  'Небольшой совет: прежде чем реагировать на резкое, дайте себе паузу в пару вдохов — она экономит много сил.',
  'Полезно держать в голове: тенденция — это приглашение, а не приказ; вы всегда вправе поступить иначе.',
] as const;

const HOROSCOPE_PERIOD_PHRASE_RU: Record<string, string> = {
  day: 'Сегодняшний день',
  tomorrow: 'Завтрашний день',
  week: 'Эта неделя',
  month: 'Этот месяц',
  year: 'Этот год',
};

const DAY_ENERGY_CLOSER_RU = [
  'Такой фон подходит и для активных дел, и для спокойных, размеренных занятий — выбор за вами.',
  'В целом это рабочий, обычный астрологический день — без необходимости что-то резко менять в планах.',
  'День достаточно нейтральный для того, чтобы опираться на собственные приоритеты, а не на внешние знаки.',
  'Фон дня скорее фоновый, чем определяющий — он не мешает планам и не тянет одеяло на себя.',
  'Такой день хорошо принимает и решительность, и осторожность — стоит выбрать то, что ближе именно сейчас.',
  'День не подталкивает к резким разворотам — комфортнее двигаться по уже намеченной линии.',
] as const;

function skyParagraphForDay(events: HoroscopeAstroEvents): string {
  const parts: string[] = [];
  if (typeof events.moonSignIndex === 'number') {
    const moonSign = signRuInfoByEnSlug(MOON_SIGN_EN_BY_INDEX[events.moonSignIndex] ?? 'aries');
    parts.push(`Луна в знаке ${moonSign.nameRuGenitive} ${moonSignEffect(events.moonSignIndex)}.`);
  }
  if (events.isVoidOfCourse) {
    parts.push(`${hashPick(`voc:${events.dateKey}`, VOID_OF_COURSE_PHRASES)}.`);
  }
  const phaseEffect = events.phaseName ? PHASE_EFFECT_RU[events.phaseName] : undefined;
  if (phaseEffect) parts.push(`Кроме того, ${phaseEffect}.`);
  if (events.retrogradeBodies && events.retrogradeBodies.length > 0) {
    const body = events.retrogradeBodies[0]!;
    const effect = RETROGRADE_EFFECT_RU[body];
    if (effect) parts.push(`Также стоит учитывать: ${effect}.`);
  }
  if (parts.length === 0) parts.push('Небо сегодня спокойное, без резких астрологических акцентов.');
  // Гарантированное предложение независимо от набора необязательных фактов (ретро/фаза/void
  // не всегда присутствуют в реальные дни) — без него абзац мог падать ниже целевых 600 симв.,
  // см. отчёт фазы Ф5 (найдено при прогоне backfill на реальных данных без ретроградных тел).
  parts.push(hashPick(`day-energy:${events.dateKey}:${events.moonSignIndex ?? 0}`, DAY_ENERGY_CLOSER_RU));
  return parts.join(' ');
}

function skyParagraphForRange(events: HoroscopeAstroEvents): string {
  const parts: string[] = [];
  if (events.moonSignsVisited && events.moonSignsVisited.length > 0) {
    const names = events.moonSignsVisited
      .map((i) => signRuInfoByEnSlug(MOON_SIGN_EN_BY_INDEX[i] ?? 'aries').nameRuGenitive)
      .join(', ');
    parts.push(`Луна за это время пройдёт через знаки: ${names} — эмоциональный фон будет меняться несколько раз.`);
  }
  if (events.retrogradeStarts && events.retrogradeStarts.length > 0) {
    const names = events.retrogradeStarts.map((b) => objectNameRu(b)).join(', ');
    parts.push(`В этот период начинают ретроградное движение: ${names} — стоит закладывать время на пересмотр планов.`);
  }
  if (events.retrogradeEnds && events.retrogradeEnds.length > 0) {
    const names = events.retrogradeEnds.map((b) => objectNameRu(b)).join(', ');
    parts.push(`А вот ${names} выходит из ретроградности — задержанные темы начинают сдвигаться с места.`);
  }
  if (events.fullMoonDates && events.fullMoonDates.length > 0) {
    parts.push('В этот период случится полнолуние — ожидайте эмоционального пика и подведения итогов.');
  }
  if (events.newMoonDates && events.newMoonDates.length > 0) {
    parts.push('Новолуние в этот период — хороший повод обозначить новые намерения.');
  }
  if (parts.length === 0) parts.push('Небесный фон этого периода ровный, без выраженных пиков — удобное время для системной работы.');
  // ДВА гарантированных предложения независимо от набора необязательных фактов (в реальные
  // недели/месяцы ретро/полнолуние/смена знака Луны совпадают не всегда, а нетематические топики
  // короче общего — см. отчёт фазы Ф5, найдено при прогоне backfill на реальных данных: без
  // второго предложения текст мог падать ниже целевых 1500 симв. именно для love/money/career/
  // health, у которых на одну тематическую грань меньше, чем у general).
  parts.push(hashPick(`range-energy:${events.dateKey}`, RANGE_ENERGY_CLOSER_RU));
  parts.push(hashPick(`range-energy2:${events.dateKey}`, RANGE_ENERGY_CLOSER_SECONDARY_RU));
  return parts.join(' ');
}

const RANGE_ENERGY_CLOSER_SECONDARY_RU = [
  'Это не значит, что период «пустой» — скорее наоборот, есть пространство сосредоточиться на своих задачах без лишнего внешнего шума.',
  'Хороший ориентир на такой период — регулярность: маленькие последовательные шаги дают больше, чем один резкий рывок.',
  'Можно использовать это время, чтобы навести порядок в делах, до которых обычно не доходят руки в более насыщенные периоды.',
] as const;

const RANGE_ENERGY_CLOSER_RU = [
  'В целом небо этого периода не задаёт резких обязательных сюжетов — то, как он пройдёт, определяют скорее ваши собственные решения, чем внешние астрологические факторы.',
  'Даже без ярких астрономических пиков период остаётся полноценным окном для планомерной работы над задуманным.',
  'Отсутствие резких астрологических акцентов — тоже полезная информация: удобное время двигаться в своём темпе, без спешки и без оглядки на «удачные» и «неудачные» дни.',
] as const;

const ARC_PHRASES_RU = [
  'В начале периода темп обычно выше, а к концу полезнее переходить к более спокойному режиму и подведению итогов.',
  'Первая половина периода лучше подходит для решительных шагов, вторая — для закрепления результата и отдыха.',
  'Не старайтесь сделать всё сразу: распределите усилия равномерно на весь период, а не только на первые дни.',
] as const;

const ARC_PHRASES_SECONDARY_RU = [
  'Полезно свериться с этим прогнозом ещё раз в середине периода — акценты могут немного сместиться по мере того, как проявляются детали.',
  'Планы стоит держать гибкими: общее направление важнее точного расписания на каждый день периода.',
  'Опирайтесь на собственный ритм — универсального «правильного» темпа для всех знаков в этот период нет.',
] as const;

const YEAR_ARCHETYPE_RU = [
  'Годовой цикл в целом раскрывает архетипическую тему знака шире, чем любой отдельный день — стоит смотреть на месяцы, а не только на текущий момент.',
  'За год характерные для знака качества успевают проявиться в разных сферах жизни — от личных проектов до отношений с окружающими.',
] as const;

function skyParagraphForYear(events: HoroscopeAstroEvents, seed: string): string {
  // Оба архетипических предложения гарантированно (не hashPick-выбор одного) — год не привязан
  // к конкретному небу день-в-день (см. doc-комментарий astro-events.ts buildYearAstroEvents про
  // упрощение MVP), поэтому длина текста не должна зависеть от того, есть ли ретроградные тела
  // на 1 января (см. отчёт фазы Ф5, найдено на прогоне backfill без ретроградных тел).
  const parts: string[] = [...YEAR_ARCHETYPE_RU];
  if (events.retrogradeBodies && events.retrogradeBodies.length > 0) {
    const names = events.retrogradeBodies.map((b) => objectNameRu(b)).join(', ');
    parts.push(`Год начинается при ретроградном движении: ${names} — в первые недели разумнее пересматривать планы, чем стартовать с чистого листа.`);
  } else {
    parts.push(hashPick(seed, RANGE_ENERGY_CLOSER_RU));
  }
  return parts.join(' ');
}

function topicParagraph(
  topic: 'general' | 'love' | 'money' | 'career' | 'health',
  signExpression: string,
  seed: string,
  includeCareerExtra: boolean,
): string {
  if (topic === 'general') {
    // Общая тема без конкретного акцента: для дня (includeCareerExtra) добавляем практическую
    // грань дела/карьеры, чтобы абзац нёс не меньше содержания, чем тематические (см. длину дня
    // 600-900 симв.); для недели/месяца/года эту же грань раскрывает secondaryTopics ниже — не
    // дублируем.
    const base = hashPick(seed, GENERAL_TOPIC_CLOSER_RU);
    return includeCareerExtra ? `${base} ${TOPIC_FRAME_RU.career.frame(signExpression)}` : base;
  }
  return TOPIC_FRAME_RU[topic].frame(signExpression);
}

/** Основной генератор для scope='zodiac' (обычные и антигороскоп-тексты — гумор строится отдельно, см. buildHumorAntiHoroscopeText). */
export function buildZodiacHoroscopeText(
  signEnSlug: string,
  period: 'day' | 'tomorrow' | 'week' | 'month' | 'year',
  topic: 'general' | 'love' | 'money' | 'career' | 'health',
  events: HoroscopeAstroEvents,
  recentZachins: readonly string[],
): string {
  const sign = signRuInfoByEnSlug(signEnSlug);
  const expression = SIGN_EXPRESSION[signEnSlug] ?? 'через собственный стиль';
  const periodWord = HOROSCOPE_PERIOD_PHRASE_RU[period] ?? 'Этот период';
  const seed = `horoscope:${signEnSlug}:${period}:${topic}:${events.dateKey}`;

  const isRange = period === 'week' || period === 'month' || period === 'year';
  const opening = isRange
    ? openingVariantsRange(sign.nameRuGenitive, periodWord, recentZachins, seed)
    : openingVariantsDay(sign.nameRuGenitive, periodWord, recentZachins, seed);

  const topicPart = topicParagraph(topic, expression, `${seed}:topic`, !isRange);
  const closer = hashPick(`${seed}:closer`, GENERAL_TOPIC_CLOSER_RU);
  const tip = hashPick(`${seed}:tip`, PRACTICAL_TIP_RU);

  if (!isRange) {
    const sky = skyParagraphForDay(events);
    return [opening, sky, topicPart, tip].join(' ');
  }

  // week/month/year: развёрнутый текст (1500-2500 симв.) — «дуга» периода + расширенная сфера
  // (общий гороскоп затрагивает ВСЕ 4 тематические грани; тематический — раскрытую тему плюс
  // остальные 3 вторым планом), чтобы уверенно попасть в целевой диапазон длины без выдумывания
  // новых астрособытий (все факты по-прежнему берутся ТОЛЬКО из astro_events).
  const sky = period === 'year' ? skyParagraphForYear(events, `${seed}:sky`) : skyParagraphForRange(events);
  const arc = `${hashPick(`${seed}:arc`, ARC_PHRASES_RU)} ${hashPick(`${seed}:arc2`, ARC_PHRASES_SECONDARY_RU)}`;
  const ALL_NAMED_TOPICS = ['love', 'money', 'career', 'health'] as const;
  const secondaryTopics = ALL_NAMED_TOPICS.filter((t) => t !== topic).map((t) => TOPIC_FRAME_RU[t].frame(expression));
  return [opening, sky, arc, topicPart, ...secondaryTopics, tip, closer].join(' ');
}

/** Восточный (годовой) гороскоп для конкретного животного в контексте года (см. astro-events.ts
 *  `buildEasternYearAstroEvents`: год ведёт своё животное/стихию, subjectAnimalIndex — тот, о ком
 *  текст). */
export function buildEasternYearText(subjectAnimalSlug: string, subjectNameRu: string, events: HoroscopeAstroEvents): string {
  const yearAnimalIndex = events.easternAnimalIndex ?? 0;
  const yearElementIndex = events.easternElementIndex ?? 0;
  const yearAnimalSlug = EASTERN_ANIMAL_SLUGS[yearAnimalIndex] ?? 'rat';
  const yearAnimalTrait = EASTERN_ANIMAL_TRAIT_RU[yearAnimalSlug] ?? 'перемены и движение вперёд';
  const elementTheme = EASTERN_ELEMENT_THEME_RU[yearElementIndex] ?? 'перемены';
  const subjectTrait = EASTERN_ANIMAL_TRAIT_RU[subjectAnimalSlug] ?? 'индивидуальность и собственный путь';

  const opening = `${subjectNameRu} в этот год окажется под влиянием года, который в целом располагает к теме: ${yearAnimalTrait}.`;
  const elementPart = `Стихия года добавляет в атмосферу ${elementTheme} — это стоит учитывать при планировании крупных дел.`;
  const subjectPart = `Собственные сильные стороны ${subjectNameRu.toLowerCase()} — это ${subjectTrait}; именно на них полезнее всего опираться в течение года.`;
  const advice =
    'Год лучше проживать не в ожидании готовых подарков судьбы, а в спокойном, последовательном движении к своим целям — тогда и внешние обстоятельства складываются благоприятнее.';
  const closer = hashPick(`eastern:${subjectAnimalSlug}:${events.dateKey}`, GENERAL_TOPIC_CLOSER_RU);
  const tip = hashPick(`eastern:${subjectAnimalSlug}:${events.dateKey}:tip`, PRACTICAL_TIP_RU);

  return [opening, elementPart, subjectPart, advice, tip, closer].join(' ');
}

/** Лунный день (evergreen, 1..30) — см. doc-комментарий horoscopes.ts. */
export function buildLunarDayText(n: number): string {
  const meta = LUNAR_DAY_META[n];
  if (!meta) throw new Error(`buildLunarDayText: нет данных для лунного дня ${n}`);
  const opening = `${n}-й лунный день традиционно называют «${meta.title}» — его ключевая тема: ${meta.keyword}.`;
  const advice =
    'Лунный день задаёт общий архетипический фон суток — конкретное проявление темы всегда зависит от индивидуальной карты и текущих обстоятельств, поэтому воспринимайте его как ориентир, а не жёсткое предписание.';
  const closer = hashPick(`lunar_day:${n}`, GENERAL_TOPIC_CLOSER_RU);
  return [opening, advice, closer].join(' ');
}

// ---------------------------------------------------------------------------------------------
// Шуточный контур (M2, humor=true) — см. requirement 5 промта Ф5. Явно иронический тон,
// маркируется на странице бейджем «шуточный» (apps/web), НЕ настоящий прогноз.
// ---------------------------------------------------------------------------------------------

export function buildHumorAntiHoroscopeText(signEnSlug: string, events: HoroscopeAstroEvents, recentZachins: readonly string[]): string {
  const sign = signRuInfoByEnSlug(signEnSlug);
  const seed = `humor:zodiac:${signEnSlug}:${events.dateKey}`;
  const openingVariants = [
    `Внимание, ${sign.nameRuGenitive.toLowerCase()}: это АНТИгороскоп, и звёзды сегодня настроены иронично.`,
    `${sign.nameRu}, сегодня вселенная решила пошутить именно над вами — читайте с улыбкой.`,
    `Официально предупреждаем ${sign.nameRuGenitive.toLowerCase()}: дальше — только шутки, а не реальный прогноз.`,
    `${sign.nameRu}, отложите серьёзное лицо: это шуточный гороскоп, и он не претендует на пророчества.`,
    `Дисклеймер для ${sign.nameRuGenitive.toLowerCase()}: всё нижеследующее — ирония, а звёзды просто рядом хихикают.`,
    `${sign.nameRu}, сегодня по разряду юмора — реальные прогнозы подождут, а вот улыбка пригодится.`,
  ];
  const opening = pickOpeningVariant(seed, openingVariants, recentZachins);
  const joke = hashPick(`${seed}:joke`, ANTI_HOROSCOPE_JOKES_RU);
  const skySnark = typeof events.moonSignIndex === 'number' ? `Луна сегодня где-то в своих делах и, честно говоря, ей не до вас.` : 'Планеты сегодня заняты собой.';
  const closer = 'На самом деле всё в ваших руках — а это уже не шутка.';
  return [opening, `Если коротко: ${joke}.`, skySnark, closer].join(' ');
}

export function buildHumorProfessionText(professionSlug: string, professionNameRu: string, events: HoroscopeAstroEvents): string {
  const intro = PROFESSION_JOKE_INTRO_RU[professionSlug] ?? `Сегодня звёзды особенно внимательны к работе ${professionNameRu}`;
  const middle = `${intro}. Шуточный гороскоп ${professionNameRu} на ${events.dateKey}: день пройдёт ровно так, как обычно — с дедлайнами, кофе и лёгким астрологическим оправданием опозданий.`;
  const closer = 'Разумеется, это ирония, а не реальный прогноз — но хорошего дня она желает совершенно серьёзно.';
  return [middle, closer].join(' ');
}
