/**
 * Сборка контента PDF «Нумерологический профиль» (req.2 промта Ф6, 10–15 страниц): число
 * жизненного пути + числа по имени (выражение/душа/личность, если указано полное имя) + текущие
 * персональные год/месяц/день — тексты из чанков `numerology:life_path:*`/`numerology:expression:*`/
 * `numerology:soul:*`/`numerology:personality:*`/`numerology:personal_year|month|day:*` (Ф4).
 *
 * Числа по имени — ОПЦИОНАЛЬНЫ (см. `packages/shared/src/schemas/order.ts` `orderSubjectSchema
 * .fullName`): без полного имени раздел показывает честный empty-state с указанием, где его можно
 * досчитать бесплатно, а НЕ выдумывает число (§6 конвенций реализации, «правило непустоты» — но
 * непустота = честный текст, не фиктивные цифры).
 */
import { numerologyCoreNumberKey, numerologyCycleKey } from '@stassist/llm';
import type { LifePathResult, NameNumbersResult, PersonalCyclesResult } from '@stassist/numerology-core';
import type { PdfReportContent, PdfSection } from './report-content-types.js';

function chunkTextFor(key: string, chunkTexts: ReadonlyMap<string, string>): string {
  return chunkTexts.get(key) ?? 'Текст для этого числа ещё не готов в корпусе трактовок — раздел будет дополнен редакцией.';
}

export interface BuildNumerologyProfileReportContentInput {
  lifePath: LifePathResult;
  /** undefined = полное имя не указано при заказе (см. doc-комментарий файла). */
  nameNumbers?: NameNumbersResult;
  cycles: PersonalCyclesResult;
  chunkTexts: ReadonlyMap<string, string>;
  introText: string;
  coverNoteRu?: string;
  generatedAtIso: string;
}

export function buildNumerologyProfileReportContent(input: BuildNumerologyProfileReportContentInput): PdfReportContent {
  const { lifePath, nameNumbers, cycles, chunkTexts, introText, coverNoteRu, generatedAtIso } = input;

  const methodologySection: PdfSection = {
    heading: 'Как считали',
    paragraphs: [
      'Число жизненного пути — сквозная сумма всех цифр даты рождения (день+месяц+год) с редукцией ' +
        'до 1–9; мастер-числа 11 и 22 не редуцируются дальше. Портал использует метод «сквозного ' +
        'сложения» (есть альтернативный метод «трёх циклов», который на части дат рождения может ' +
        'дать другое мастер-число — это осознанный выбор, а не единственно верный расчёт).',
      'Числа по имени (пифагорейская система, кириллица): число выражения — по всем буквам полного ' +
        'имени, число души — только по гласным, число личности — только по согласным.',
      'Персональные год/месяц/день считаются каскадно от даты рождения и текущей даты и всегда лежат ' +
        'в диапазоне 1–9 (без мастер-чисел).',
    ],
  };

  const lifePathSection: PdfSection = {
    heading: `Число жизненного пути — ${lifePath.lifePathNumber}`,
    caption: `Сумма цифр даты рождения: ${lifePath.digitSum}`,
    paragraphs: [chunkTextFor(numerologyCoreNumberKey('life_path', lifePath.lifePathNumber), chunkTexts)],
  };

  const nameSections: PdfSection[] = nameNumbers
    ? [
        {
          heading: `Число выражения — ${nameNumbers.expressionNumber}`,
          caption: `По имени: ${nameNumbers.normalizedName}`,
          paragraphs: [chunkTextFor(numerologyCoreNumberKey('expression', nameNumbers.expressionNumber), chunkTexts)],
        },
        {
          heading: `Число души — ${nameNumbers.soulUrgeNumber}`,
          paragraphs: [chunkTextFor(numerologyCoreNumberKey('soul', nameNumbers.soulUrgeNumber), chunkTexts)],
        },
        {
          heading: `Число личности — ${nameNumbers.personalityNumber}`,
          paragraphs: [chunkTextFor(numerologyCoreNumberKey('personality', nameNumbers.personalityNumber), chunkTexts)],
        },
      ]
    : [
        {
          heading: 'Числа по имени — не рассчитаны',
          paragraphs: [
            'При заказе не было указано полное имя, поэтому числа выражения/души/личности в этот ' +
              'отчёт не включены (мы не подставляем случайные значения). Их можно бесплатно ' +
              'рассчитать на странице «Число пути» (/chislo-puti), указав имя.',
          ],
        },
      ];

  const cycleSections: PdfSection[] = [
    {
      heading: `Персональный год — ${cycles.personalYear}`,
      paragraphs: [chunkTextFor(numerologyCycleKey('personal_year', cycles.personalYear), chunkTexts)],
    },
    {
      heading: `Персональный месяц — ${cycles.personalMonth}`,
      paragraphs: [chunkTextFor(numerologyCycleKey('personal_month', cycles.personalMonth), chunkTexts)],
    },
    {
      heading: `Персональный день — ${cycles.personalDay}`,
      paragraphs: [chunkTextFor(numerologyCycleKey('personal_day', cycles.personalDay), chunkTexts)],
    },
  ];

  return {
    titleRu: 'Нумерологический профиль',
    subtitleRu: 'Число жизненного пути, числа по имени, персональные циклы',
    coverNoteRu,
    introParagraphs: [introText],
    sections: [methodologySection, lifePathSection, ...nameSections, ...cycleSections],
    disclaimerParagraphs: NUMEROLOGY_PROFILE_DISCLAIMER_PARAGRAPHS,
    generatedAtIso,
  };
}

export const NUMEROLOGY_PROFILE_DISCLAIMER_PARAGRAPHS: string[] = [
  'Материалы этого отчёта носят информационно-развлекательный характер и не являются медицинской, ' +
    'психологической, юридической или финансовой консультацией, а также гарантией каких-либо событий.',
  'Персональные год/месяц/день рассчитаны на дату формирования отчёта и «протухают» — актуальный ' +
    'прогноз на сегодня всегда доступен в личном кабинете (виджет персональных циклов).',
  'Нумерология не является научной дисциплиной в академическом смысле; интерпретации — справочные ' +
    'материалы по традиционной методике.',
];
