import { describe, expect, it } from 'vitest';
import { buildCorpus } from '@stassist/llm';
import { psychoMatrix } from '@stassist/numerology-core';
import { buildPsychomatrixReportContent } from './psychomatrix-report-content.js';

const CORPUS_CHUNK_MAP = new Map(buildCorpus().chunks.map((c) => [c.key, c.text]));

describe('buildPsychomatrixReportContent', () => {
  it('содержит 1 (числа) + 9 (ячейки) + 8 (линии) = 18 разделов, все с непустым текстом', () => {
    const result = psychoMatrix({ day: 15, month: 6, year: 1990 });
    const content = buildPsychomatrixReportContent({
      psychoMatrix: result,
      chunkTexts: CORPUS_CHUNK_MAP,
      introText: 'intro',
      generatedAtIso: '2026-07-12T00:00:00.000Z',
    });
    expect(content.sections).toHaveLength(18);
    for (const section of content.sections.slice(1)) {
      expect(section.paragraphs[0]!.length).toBeGreaterThan(10);
      expect(section.paragraphs[0]).not.toContain('ещё не готов');
    }
  });

  it('раздел «Дополнительные числа» содержит реальные посчитанные значения (не текст-заглушку)', () => {
    const result = psychoMatrix({ day: 15, month: 6, year: 1990 });
    const content = buildPsychomatrixReportContent({
      psychoMatrix: result,
      chunkTexts: CORPUS_CHUNK_MAP,
      introText: 'intro',
      generatedAtIso: '2026-07-12T00:00:00.000Z',
    });
    const numbersText = content.sections[0]!.paragraphs.join(' ');
    expect(numbersText).toContain(String(result.number1));
    expect(numbersText).toContain(String(result.number4));
  });
});
