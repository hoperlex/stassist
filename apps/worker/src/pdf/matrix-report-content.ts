/**
 * Сборка контента PDF «Матрица судьбы — полная расшифровка» (req.1 промта Ф6, 25–35 страниц):
 * ВСЕ 30 позиций матрицы (9 базовых точек + 7 чакр здоровья + 4 предназначения + линия отношений
 * + денежная линия + 8 возрастных периодов) — тексты берутся из чанков `arcanum:<N>:<slug>`
 * (детерминированная сборка, ключи и порядок = `@stassist/llm` `matrixFactEntries`/
 * `ALL_MATRIX_POSITIONS`, тот же список, что засеян Ф4, см. docs/roadmap/31-конвенции-
 * реализации.md §6 — «нет пустых арканов» гарантируется покрытием корпуса, проверено в
 * `packages/llm/src/corpus/build-corpus.test.ts`). ЧИСТАЯ функция — I/O (чтение чанков из БД,
 * вызов LLM за вступительным абзацем) делает `generate-pdf-order-job.ts`.
 *
 * Решение по вариантам (см. `packages/shared/src/schemas/order.ts` doc-комментарий): 'child' и
 * 'compat' — presentational-варианты поверх ТЕХ ЖЕ расчётов/чанков, без новых «фактов».
 */
import {
  ALL_MATRIX_POSITIONS,
  matrixFactEntries,
  type MatrixPositionCategory,
} from '@stassist/llm';
import type { MatrixOfDestinyCompatibilityResult, MatrixOfDestinyResult } from '@stassist/numerology-core';
import type { PdfOrderVariant } from '@stassist/shared';
import type { PdfReportContent, PdfSection } from './report-content-types.js';

const POSITION_LABEL_BY_SLUG = new Map(ALL_MATRIX_POSITIONS.map((p) => [p.slug, p.labelRu]));
const POSITION_CATEGORY_BY_SLUG = new Map(ALL_MATRIX_POSITIONS.map((p) => [p.slug, p.category]));

const DERIVED_CATEGORIES: readonly MatrixPositionCategory[] = ['health_chakra', 'purpose', 'line', 'age_period'];

const METHODOLOGY_BADGE =
  'рабочая гипотеза по общепринятой схеме метода — не сверена с конкретным эталонным сервисом (напр. matricaladini.ru), требует сверки заказчиком';

function slugFromChunkKey(key: string): string {
  return key.split(':')[2] ?? key;
}

function chunkTextFor(key: string, chunkTexts: ReadonlyMap<string, string>): string {
  const text = chunkTexts.get(key);
  if (text) return text;
  // Честный empty-state (§6 конвенций реализации «правило непустоты») — не должен наступать при
  // полном корпусе Ф4 (см. заголовок файла), но защищает от молчаливой пустой страницы, если
  // конкретный чанк почему-то не найден (напр. рассинхронизация версии корпуса).
  return 'Текст для этой позиции ещё не готов в корпусе трактовок — раздел будет дополнен после публикации редакцией.';
}

export interface BuildMatrixReportContentInput {
  matrixResult: MatrixOfDestinyResult;
  /** key (`arcanum:<N>:<slug>`) → текст чанка, уже полученный вызывающим кодом. */
  chunkTexts: ReadonlyMap<string, string>;
  /** Связующий вступительный абзац из конвейера `@stassist/llm` (см. doc-комментарий job'а). */
  introText: string;
  variant: PdfOrderVariant;
  /** Обязателен для variant='compat'. */
  compare?: MatrixOfDestinyCompatibilityResult;
  coverNoteRu?: string;
  generatedAtIso: string;
}

const VARIANT_TITLE: Record<PdfOrderVariant, string> = {
  standard: 'Матрица судьбы — полная расшифровка',
  child: 'Матрица судьбы ребёнка — полная расшифровка',
  compat: 'Матрица судьбы — расшифровка и совместимость двух дат',
};

const VARIANT_SUBTITLE: Record<PdfOrderVariant, string> = {
  standard: 'Октаграмма, 22 аркана Таро, карта здоровья, предназначения, возрастные периоды',
  child: 'Та же методика расчёта, адаптированное пояснение для родителей',
  compat: 'Индивидуальная расшифровка + сравнение общих чисел с датой партнёра',
};

function compatSection(compare: MatrixOfDestinyCompatibilityResult): PdfSection {
  const lines =
    compare.sharedArcanums.length > 0
      ? compare.sharedArcanums
          .map((s) => `Аркан ${s.arcanum} — встречается в обеих матрицах (у первого ${s.countInA} раз, у второго ${s.countInB} раз).`)
          .join(' ')
      : 'Общих арканов среди 9 базовых точек октаграммы не найдено — это не «плохо» и не «хорошо» само по себе, а просто иной набор чисел.';
  return {
    heading: 'Совместимость: общие числа октаграммы',
    paragraphs: [
      `Сравнение 9 базовых точек октаграммы двух дат рождения: всего совпадений — ${compare.totalSharedCount}.`,
      lines,
    ],
  };
}

export function buildMatrixReportContent(input: BuildMatrixReportContentInput): PdfReportContent {
  const { matrixResult, chunkTexts, introText, variant, compare, coverNoteRu, generatedAtIso } = input;
  const entries = matrixFactEntries(matrixResult);

  const sections: PdfSection[] = entries.map((entry) => {
    const slug = slugFromChunkKey(entry.key);
    const category = POSITION_CATEGORY_BY_SLUG.get(slug);
    const heading = POSITION_LABEL_BY_SLUG.get(slug) ?? slug;
    const badge = category && DERIVED_CATEGORIES.includes(category) ? METHODOLOGY_BADGE : undefined;
    return {
      heading: heading.charAt(0).toUpperCase() + heading.slice(1),
      caption: `Аркан ${entry.arcanum}`,
      paragraphs: [chunkTextFor(entry.key, chunkTexts)],
      badge,
    };
  });

  if (variant === 'compat' && compare) {
    sections.unshift(compatSection(compare));
  }

  const introParagraphs = [introText];
  if (variant === 'child') {
    introParagraphs.push(
      'Матрица ребёнка рассчитывается тем же детерминированным методом, что и взрослая — числа и арканы не меняются с возрастом. ' +
        'Формулировки ниже стоит воспринимать как ориентир для наблюдения за склонностями и сильными сторонами ребёнка, а не готовый диагноз или предсказание.',
    );
  }
  if (variant === 'compat') {
    introParagraphs.push(
      'Помимо полной расшифровки первой даты, отчёт включает отдельный раздел сравнения общих чисел (арканов) с датой партнёра/второго человека.',
    );
  }

  return {
    titleRu: VARIANT_TITLE[variant],
    subtitleRu: VARIANT_SUBTITLE[variant],
    coverNoteRu,
    introParagraphs,
    sections,
    disclaimerParagraphs: MATRIX_DISCLAIMER_PARAGRAPHS,
    generatedAtIso,
  };
}

/** См. `@stassist/shared` `DISCLAIMER_TEXT_RU` — здесь короткая версия для колонтитула PDF плюс
 *  специфичное для матрицы судьбы уточнение про товарный знак/методику (см. промт Ф6, преамбула
 *  «название заявлено как товарный знак школы Ладини»). */
export const MATRIX_DISCLAIMER_PARAGRAPHS: string[] = [
  'Материалы этого отчёта носят информационно-развлекательный характер и не являются медицинской, ' +
    'психологической, юридической или финансовой консультацией, а также гарантией каких-либо событий.',
  '9 базовых точек октаграммы — общепринятая часть метода «матрица судьбы» и рассчитаны детерминированно. ' +
    'Производные разделы (карта здоровья по чакрам, 4 предназначения, линии отношений/денег, возрастные ' +
    'периоды) — рабочая гипотеза по одной из распространённых схем метода: разные сервисы считают их ' +
    'по-разному, единого стандарта нет (см. пометки «требует сверки заказчиком» у соответствующих разделов).',
  'Метод не является научной дисциплиной в академическом смысле; интерпретации формируются шаблонно из ' +
    'справочного корпуса трактовок и могут содержать неточности.',
];
