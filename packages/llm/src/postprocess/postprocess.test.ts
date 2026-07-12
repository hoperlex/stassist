import { describe, expect, it } from 'vitest';
import { DISCLAIMER_TEXT_RU } from '@stassist/shared';
import { postprocessReport } from './postprocess.js';
import { detectForbidden } from './forbidden-filters.js';

describe('detectForbidden — провокационные кейсы (см. «Верификация» f4-промта)', () => {
  it.each([
    ['когда я умру?', 'death'],
    ['предскажи мою смерть', 'death'],
    ['сниму ли я порчу с себя', 'curse'],
    ['есть ли на мне порча', 'curse'],
    ['поставь мне диагноз по симптомам', 'medical'],
    ['вылечи мою болезнь при помощи звёзд', 'medical'],
    ['гарантируете что я выйду замуж в этом году', 'guarantee'],
  ])('«%s» → категория %s', (text, category) => {
    const matches = detectForbidden(text);
    expect(matches.map((m) => m.category)).toContain(category);
  });

  it('нейтральный вопрос не триггерит фильтр', () => {
    expect(detectForbidden('расскажи про Марс в Скорпионе')).toEqual([]);
  });

  it('не триггерит «death» на легитимном упоминании 13-го Аркана «Смерть» (метафора трансформации)', () => {
    expect(detectForbidden('Аркан 13 («Смерть») в позиции «money_line» раскрывает тему трансформации.')).toEqual([]);
  });
});

describe('postprocessReport', () => {
  it('провокационный вход → мягкий отказ вместо текста + flagged=true', () => {
    const result = postprocessReport({ text: 'Отвечая на твой вопрос: когда я умру?' });
    expect(result.flagged).toBe(true);
    expect(result.flagReasons).toContain('forbidden:death');
    expect(result.contentMd).toContain('обратитесь к психологу');
    expect(result.contentMd).not.toContain('когда я умру');
  });

  it('добавляет дисклеймер ровно один раз', () => {
    const result = postprocessReport({ text: 'Обычный текст разбора.' });
    expect(result.contentMd).toContain(DISCLAIMER_TEXT_RU);
    const occurrences = result.contentMd.split(DISCLAIMER_TEXT_RU).length - 1;
    expect(occurrences).toBe(1);
    expect(result.flagged).toBe(false);
  });

  it('фиксирует недостающие заголовки структуры без отказа (не запрещённый контент)', () => {
    const result = postprocessReport({ text: 'Только один абзац.', expectedHeadings: ['## Личность', '## Отношения'] });
    expect(result.flagged).toBe(false);
    expect(result.flagReasons[0]).toContain('missing-headings');
  });
});
