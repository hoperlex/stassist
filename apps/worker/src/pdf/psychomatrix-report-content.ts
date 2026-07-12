/**
 * Сборка контента PDF «Психоматрица (квадрат Пифагора)» (req.2 промта Ф6, 10–15 страниц): 4
 * дополнительных числа (факт, без корпуса — см. ниже) + 9 ячеек сетки + 8 сумм (3 строки, 3
 * столбца, 2 диагонали) — тексты ячеек/линий из чанков `numerology:matrix_cell:*`/
 * `numerology:matrix_line:*` (засеяны Ф4, см. docs/roadmap/31-конвенции-реализации.md §6).
 *
 * Числа (1)-(4) НЕ имеют собственной трактовки в корпусе (они промежуточные — используются только
 * для построения сетки, у самой методики нет «значения числа (1)=7» отдельно от сетки, см.
 * `@stassist/numerology-core` `psychoMatrix` JSDoc) — раздел о них излагает ТОЛЬКО то, как они
 * посчитаны (детерминированный факт), без выдуманной трактовки.
 */
import { numerologyMatrixCellKey, numerologyMatrixLineKey, PSYCHOMATRIX_CELL_SLUGS_BY_DIGIT } from '@stassist/llm';
import type { PsychoMatrixResult } from '@stassist/numerology-core';
import type { PdfReportContent, PdfSection } from './report-content-types.js';

const CELL_LABEL_RU: Record<string, string> = {
  character: 'Характер',
  energy: 'Энергетичность',
  interest: 'Интерес к жизни',
  health: 'Здоровье',
  logic: 'Логика и ум',
  labor: 'Труд и трудолюбие',
  luck: 'Удачливость',
  duty: 'Чувство долга',
  memory: 'Память',
};

const LINE_LABEL_RU: Record<string, string> = {
  row_1: 'Первая строка (характер · энергетичность · интерес к жизни)',
  row_2: 'Вторая строка (труд · здоровье · память)',
  row_3: 'Третья строка (удачливость · долг · целеустремлённость)',
  col_1: 'Первый столбец (самооценка)',
  col_2: 'Второй столбец (семейственность)',
  col_3: 'Третий столбец (стабильность/быт)',
  diag_main: 'Главная диагональ (духовность)',
  diag_anti: 'Побочная диагональ (заземлённость)',
};

function chunkTextFor(key: string, chunkTexts: ReadonlyMap<string, string>): string {
  return chunkTexts.get(key) ?? 'Текст для этой позиции ещё не готов в корпусе трактовок — раздел будет дополнен редакцией.';
}

export interface BuildPsychomatrixReportContentInput {
  psychoMatrix: PsychoMatrixResult;
  /** Ключи `numerology:matrix_cell:*`/`numerology:matrix_line:*` → тексты (17 ключей всего). */
  chunkTexts: ReadonlyMap<string, string>;
  introText: string;
  coverNoteRu?: string;
  generatedAtIso: string;
}

export function buildPsychomatrixReportContent(input: BuildPsychomatrixReportContentInput): PdfReportContent {
  const { psychoMatrix, chunkTexts, introText, coverNoteRu, generatedAtIso } = input;

  const numbersSection: PdfSection = {
    heading: 'Дополнительные числа',
    paragraphs: [
      'Психоматрица строится из даты рождения и четырёх дополнительных чисел, которые используются ' +
        'только для построения сетки 3×3 ниже (у самих чисел нет отдельной трактовки в методике):',
      `Число (1) = сумма всех цифр даты рождения = ${psychoMatrix.number1}.`,
      `Число (2) = сумма цифр числа (1) = ${psychoMatrix.number2}.`,
      `Число (3) = число (1) минус удвоенная первая цифра дня рождения = ${psychoMatrix.number3}.`,
      `Число (4) = сумма цифр числа (3) = ${psychoMatrix.number4}.`,
    ],
  };

  const cellSections: PdfSection[] = Object.entries(PSYCHOMATRIX_CELL_SLUGS_BY_DIGIT).map(([digitStr, slug]) => {
    const digit = Number(digitStr);
    const count = psychoMatrix.counts[digitStr] ?? 0;
    return {
      heading: `${CELL_LABEL_RU[slug] ?? slug} (цифра ${digit})`,
      caption: `В вашей дате цифра ${digit} встречается ${count} раз(а)`,
      paragraphs: [chunkTextFor(numerologyMatrixCellKey(slug), chunkTexts)],
    };
  });

  const lineValues: Record<string, number> = {
    row_1: psychoMatrix.rowSums[0],
    row_2: psychoMatrix.rowSums[1],
    row_3: psychoMatrix.rowSums[2],
    col_1: psychoMatrix.colSums[0],
    col_2: psychoMatrix.colSums[1],
    col_3: psychoMatrix.colSums[2],
    diag_main: psychoMatrix.diagonalMain,
    diag_anti: psychoMatrix.diagonalAnti,
  };
  const lineSections: PdfSection[] = Object.entries(LINE_LABEL_RU).map(([slug, label]) => ({
    heading: label,
    caption: `Сумма: ${lineValues[slug]}`,
    paragraphs: [chunkTextFor(numerologyMatrixLineKey(slug), chunkTexts)],
  }));

  return {
    titleRu: 'Психоматрица (квадрат Пифагора)',
    subtitleRu: 'Полный расчёт по дате рождения: сетка 3×3, строки, столбцы, диагонали',
    coverNoteRu,
    introParagraphs: [introText],
    sections: [numbersSection, ...cellSections, ...lineSections],
    disclaimerParagraphs: PSYCHOMATRIX_DISCLAIMER_PARAGRAPHS,
    generatedAtIso,
  };
}

export const PSYCHOMATRIX_DISCLAIMER_PARAGRAPHS: string[] = [
  'Материалы этого отчёта носят информационно-развлекательный характер и не являются медицинской, ' +
    'психологической, юридической или финансовой консультацией, а также гарантией каких-либо событий.',
  'Все числа рассчитаны детерминированно по датe рождения (см. блок «Дополнительные числа» — ' +
    'формулы приведены явно). Текстовые трактовки ячеек и линий сетки — справочные материалы по ' +
    'традиционной методике «квадрат Пифагора», не научная дисциплина в академическом смысле.',
];
