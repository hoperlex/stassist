import { describe, expect, it } from 'vitest';
import { buildCorpus } from '@stassist/llm';
import { lifePathNumber, nameNumbers, personalCycles } from '@stassist/numerology-core';
import { buildNumerologyProfileReportContent } from './numerology-profile-report-content.js';

const CORPUS_CHUNK_MAP = new Map(buildCorpus().chunks.map((c) => [c.key, c.text]));
const BIRTH = { day: 15, month: 6, year: 1990 };
const TODAY = { day: 12, month: 7, year: 2026 };

describe('buildNumerologyProfileReportContent', () => {
  it('без полного имени: честный empty-state вместо выдуманных чисел выражения/души/личности', () => {
    const content = buildNumerologyProfileReportContent({
      lifePath: lifePathNumber(BIRTH),
      cycles: personalCycles(BIRTH, TODAY),
      chunkTexts: CORPUS_CHUNK_MAP,
      introText: 'intro',
      generatedAtIso: '2026-07-12T00:00:00.000Z',
    });
    // как считали(1) + число пути(1) + числа по имени - empty-state(1) + циклы(3) = 6
    expect(content.sections).toHaveLength(6);
    const nameSection = content.sections.find((s) => s.heading.includes('не рассчитаны'));
    expect(nameSection).toBeDefined();
    expect(nameSection!.paragraphs[0]).toContain('не было указано полное имя');
  });

  it('с полным именем: все 7 разделов заполнены реальным текстом из корпуса', () => {
    const content = buildNumerologyProfileReportContent({
      lifePath: lifePathNumber(BIRTH),
      nameNumbers: nameNumbers('Иванова Мария Сергеевна'),
      cycles: personalCycles(BIRTH, TODAY),
      chunkTexts: CORPUS_CHUNK_MAP,
      introText: 'intro',
      generatedAtIso: '2026-07-12T00:00:00.000Z',
    });
    // как считали(1) + число пути(1) + выражение/душа/личность(3) + циклы(3) = 8
    expect(content.sections).toHaveLength(8);
    for (const section of content.sections) {
      expect(section.paragraphs[0]!.length).toBeGreaterThan(5);
    }
  });
});
