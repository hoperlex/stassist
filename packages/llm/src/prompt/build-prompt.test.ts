import { describe, expect, it } from 'vitest';
import { buildPrompt } from './build-prompt.js';

describe('buildPrompt', () => {
  it('включает системные правила и все части промта', () => {
    const { system, prompt } = buildPrompt({
      factsText: 'ДАННЫЕ КАРТЫ: ...',
      chunkTexts: ['текст 1', 'текст 2'],
      task: 'Напиши раздел «Личность».',
      structureHint: 'заголовок + 3 абзаца',
    });
    expect(system).toContain('Позиции планет');
    expect(prompt).toContain('ДАННЫЕ КАРТЫ');
    expect(prompt).toContain('[1] текст 1');
    expect(prompt).toContain('[2] текст 2');
    expect(prompt).toContain('ЗАДАЧА: Напиши раздел «Личность».');
    expect(prompt).toContain('заголовок + 3 абзаца');
  });

  it('честно сообщает об отсутствии фрагментов корпуса, а не молчит', () => {
    const { prompt } = buildPrompt({ factsText: 'X', chunkTexts: [], task: 'Y' });
    expect(prompt).toContain('не найдены для этих фактов');
  });
});
