/**
 * Промт для РЕАЛЬНОГО LLM-провайдера (не stub) — батч на 12 знаков/животных за один вызов (см.
 * требование 2 промта Ф5: «экономия LLM… один батч-промт на период×тему (12 знаков за вызов) со
 * структурированным выходом»). Дефолтный локальный путь (`LLM_PROVIDER=stub`) НЕ строит и не
 * отправляет этот промт — см. generate-batch.ts doc-комментарий, почему массовое наполнение
 * портала идёт через templates.ts, а не через этот путь.
 */
import type { HoroscopePeriod, HoroscopeTopic } from '@stassist/shared';
import type { HoroscopeAstroEvents } from './astro-events.js';
import { HOROSCOPE_HUMOR_SYSTEM_RULES_RU, HOROSCOPE_LENGTH_RANGE_CHARS, HOROSCOPE_SYSTEM_RULES_RU } from './tone.js';

export interface HoroscopeBatchSubject {
  /** Слаг знака/животного/профессии — используется как ключ JSON-ответа. */
  slug: string;
  nameRu: string;
}

export interface BuildHoroscopeBatchPromptInput {
  period: HoroscopePeriod;
  topic: HoroscopeTopic;
  humor: boolean;
  subjects: readonly HoroscopeBatchSubject[];
  events: HoroscopeAstroEvents;
  /** Зачины последних 7 выпусков — ключ: slug субъекта. */
  recentZachinsBySubject: Readonly<Record<string, readonly string[]>>;
}

export interface BuiltHoroscopePrompt {
  system: string;
  prompt: string;
}

function formatAstroEventsBlock(events: HoroscopeAstroEvents): string {
  const lines: string[] = [`период: ${events.period}`, `ключ даты: ${events.dateKey}`];
  if (typeof events.moonSignIndex === 'number') lines.push(`знак Луны (индекс 0=Овен..11=Рыбы): ${events.moonSignIndex}`);
  if (events.lunarDay) lines.push(`лунный день: ${events.lunarDay}`);
  if (events.phaseName) lines.push(`фаза Луны: ${events.phaseName}`);
  if (events.isVoidOfCourse) lines.push('Луна вне курса (void-of-course): да');
  if (events.retrogradeBodies && events.retrogradeBodies.length > 0) lines.push(`ретроградные тела: ${events.retrogradeBodies.join(', ')}`);
  if (events.moonSignsVisited && events.moonSignsVisited.length > 0) lines.push(`знаки Луны за период: ${events.moonSignsVisited.join(', ')}`);
  if (events.retrogradeStarts && events.retrogradeStarts.length > 0) lines.push(`начинают ретроградность: ${events.retrogradeStarts.join(', ')}`);
  if (events.retrogradeEnds && events.retrogradeEnds.length > 0) lines.push(`выходят из ретроградности: ${events.retrogradeEnds.join(', ')}`);
  if (events.fullMoonDates && events.fullMoonDates.length > 0) lines.push(`полнолуния в периоде: ${events.fullMoonDates.join(', ')}`);
  if (events.newMoonDates && events.newMoonDates.length > 0) lines.push(`новолуния в периоде: ${events.newMoonDates.join(', ')}`);
  if (typeof events.easternAnimalIndex === 'number') lines.push(`животное года (индекс 0=Крыса..11=Свинья): ${events.easternAnimalIndex}`);
  if (typeof events.easternElementIndex === 'number') lines.push(`стихия года (индекс 0=Дерево..4=Вода): ${events.easternElementIndex}`);
  return lines.join('\n');
}

export function buildHoroscopeBatchPrompt(input: BuildHoroscopeBatchPromptInput): BuiltHoroscopePrompt {
  const [minChars, maxChars] = HOROSCOPE_LENGTH_RANGE_CHARS[input.period];
  const subjectsBlock = input.subjects
    .map((s) => {
      const zachins = input.recentZachinsBySubject[s.slug] ?? [];
      const zachinsText = zachins.length > 0 ? zachins.map((z) => `«${z}»`).join('; ') : 'нет истории';
      return `- ${s.slug} (${s.nameRu}): недавние зачины — ${zachinsText}`;
    })
    .join('\n');

  const prompt = [
    `АСТРОСОБЫТИЯ:\n${formatAstroEventsBlock(input.events)}`,
    '',
    `СУБЪЕКТЫ И НЕДАВНИЕ ЗАЧИНЫ:\n${subjectsBlock}`,
    '',
    `ЗАДАЧА: напиши ${input.humor ? 'шуточный' : ''} гороскоп на тему «${input.topic}» для периода «${input.period}» ` +
      `для КАЖДОГО из перечисленных субъектов. Длина каждого текста: ${minChars}–${maxChars} символов.`,
    input.humor
      ? 'ВАЖНО: держи иронию доброжелательной, каждому субъекту — свой заход, без повторов шутки.'
      : 'ВАЖНО: у каждого субъекта — свой уникальный зачин и своя конкретика; опирайся на реальные ' +
        'АСТРОСОБЫТИЯ выше, избегай общих фраз-штампов, подходящих любому знаку. Дай практичный ориентир по теме.',
    '',
    'СТРУКТУРА ОТВЕТА: верни ТОЛЬКО JSON-объект вида {"slug1": "текст1", "slug2": "текст2", ...} — ' +
      'ключи ровно как в списке субъектов выше, без дополнительных полей и комментариев.',
  ].join('\n');

  return { system: input.humor ? HOROSCOPE_HUMOR_SYSTEM_RULES_RU : HOROSCOPE_SYSTEM_RULES_RU, prompt };
}
