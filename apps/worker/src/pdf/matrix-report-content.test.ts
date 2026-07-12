/**
 * Проверяет детерминированную сборку контента PDF матрицы судьбы: ВСЕ 30 позиций заполнены
 * текстом из реального (не фикстурного) корпуса `buildCorpus()` — если бы корпус Ф4 был неполон,
 * этот тест поймал бы «пустые арканы» раньше рендера PDF (см. верификацию промта Ф6).
 */
import { describe, expect, it } from 'vitest';
import { buildCorpus, matrixFactEntries } from '@stassist/llm';
import { matrixOfDestiny, compareMatrixOfDestiny } from '@stassist/numerology-core';
import { buildMatrixReportContent } from './matrix-report-content.js';

const CORPUS_CHUNK_MAP = new Map(buildCorpus().chunks.map((c) => [c.key, c.text]));
const SAMPLE_DATES = [
  { day: 15, month: 6, year: 1990 },
  { day: 29, month: 2, year: 2000 },
  { day: 1, month: 1, year: 1975 },
  { day: 31, month: 12, year: 2005 },
];

describe('buildMatrixReportContent — стандартный вариант', () => {
  for (const date of SAMPLE_DATES) {
    it(`содержит все 30 позиций с непустым текстом для даты ${date.day}.${date.month}.${date.year}`, () => {
      const matrixResult = matrixOfDestiny(date);
      const content = buildMatrixReportContent({
        matrixResult,
        chunkTexts: CORPUS_CHUNK_MAP,
        introText: 'Тестовое вступление отчёта.',
        variant: 'standard',
        generatedAtIso: '2026-07-12T00:00:00.000Z',
      });

      expect(content.sections).toHaveLength(matrixFactEntries(matrixResult).length);
      expect(content.sections).toHaveLength(30);
      for (const section of content.sections) {
        expect(section.heading.length).toBeGreaterThan(0);
        expect(section.paragraphs[0]!.length).toBeGreaterThan(10);
        // Честный empty-state НЕ должен встречаться при полном корпусе Ф4.
        expect(section.paragraphs[0]).not.toContain('ещё не готов');
      }
    });
  }

  it('9 базовых точек — без бейджа методики, 21 производная позиция — с бейджем', () => {
    const matrixResult = matrixOfDestiny(SAMPLE_DATES[0]!);
    const content = buildMatrixReportContent({
      matrixResult,
      chunkTexts: CORPUS_CHUNK_MAP,
      introText: 'intro',
      variant: 'standard',
      generatedAtIso: '2026-07-12T00:00:00.000Z',
    });
    const withBadge = content.sections.filter((s) => s.badge);
    const withoutBadge = content.sections.filter((s) => !s.badge);
    expect(withoutBadge).toHaveLength(9);
    expect(withBadge).toHaveLength(21);
  });
});

describe('buildMatrixReportContent — вариант child (детская матрица)', () => {
  it('другой заголовок + дополнительный абзац для родителей, те же 30 разделов', () => {
    const matrixResult = matrixOfDestiny(SAMPLE_DATES[0]!);
    const content = buildMatrixReportContent({
      matrixResult,
      chunkTexts: CORPUS_CHUNK_MAP,
      introText: 'intro',
      variant: 'child',
      generatedAtIso: '2026-07-12T00:00:00.000Z',
    });
    expect(content.titleRu).toContain('ребёнка');
    expect(content.sections).toHaveLength(30);
    expect(content.introParagraphs.length).toBeGreaterThan(1);
  });
});

describe('buildMatrixReportContent — вариант compat (совместимость двух дат)', () => {
  it('добавляет раздел совместимости первым, остальные 30 позиций сохранены', () => {
    const dateA = SAMPLE_DATES[0]!;
    const dateB = SAMPLE_DATES[1]!;
    const matrixResult = matrixOfDestiny(dateA);
    const compare = compareMatrixOfDestiny(dateA, dateB);
    const content = buildMatrixReportContent({
      matrixResult,
      chunkTexts: CORPUS_CHUNK_MAP,
      introText: 'intro',
      variant: 'compat',
      compare,
      generatedAtIso: '2026-07-12T00:00:00.000Z',
    });
    expect(content.sections).toHaveLength(31);
    expect(content.sections[0]!.heading).toContain('Совместимость');
    expect(content.sections[0]!.paragraphs[0]).toContain(String(compare.totalSharedCount));
  });
});
