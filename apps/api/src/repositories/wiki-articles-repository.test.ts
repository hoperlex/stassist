import { describe, expect, it } from 'vitest';
import { extractSignificantWords } from './wiki-articles-repository.js';

describe('extractSignificantWords (пер. поиска по вики, req.4 промта Ф7)', () => {
  it('извлекает значимые слова (≥3 символов), приводит к нижнему регистру, отбрасывает дубли', () => {
    expect(extractSignificantWords('Венера в Скорпионе')).toEqual(['венера', 'скорпионе']);
  });

  it('отбрасывает короткие служебные слова (предлоги «в», «и» и т.п.)', () => {
    expect(extractSignificantWords('дом и знак')).toEqual(['дом', 'знак']);
  });

  it('пустой запрос → пустой массив', () => {
    expect(extractSignificantWords('   ')).toEqual([]);
  });
});
