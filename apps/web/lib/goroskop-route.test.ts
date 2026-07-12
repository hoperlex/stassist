import { describe, expect, it } from 'vitest';
import { matchGoroskopSignSlug, matchGoroskopYearSign } from './goroskop-route.js';

describe('matchGoroskopSignSlug', () => {
  it('матчит /goroskop/{znak}/{slug} для валидного знака', () => {
    expect(matchGoroskopSignSlug('/goroskop/oven/nedelya')).toEqual({ znak: 'oven', slug: 'nedelya' });
  });

  it('НЕ матчит /goroskop/{yyyy}/{znak} (4-значный год)', () => {
    expect(matchGoroskopSignSlug('/goroskop/2027/oven')).toBeNull();
  });

  it('НЕ матчит неизвестный знак', () => {
    expect(matchGoroskopSignSlug('/goroskop/unknown/nedelya')).toBeNull();
  });

  it('НЕ матчит другую глубину', () => {
    expect(matchGoroskopSignSlug('/goroskop/oven')).toBeNull();
    expect(matchGoroskopSignSlug('/goroskop/oven/nedelya/lyubov')).toBeNull();
  });
});

describe('matchGoroskopYearSign', () => {
  it('матчит /goroskop/{yyyy}/{znak}', () => {
    expect(matchGoroskopYearSign('/goroskop/2027/oven')).toEqual({ yyyy: '2027', znak: 'oven' });
  });

  it('НЕ матчит /goroskop/{znak}/{slug} (не год)', () => {
    expect(matchGoroskopYearSign('/goroskop/oven/nedelya')).toBeNull();
  });
});

describe('взаимоисключаемость (никогда не матчат одновременно)', () => {
  const cases = ['/goroskop/oven/nedelya', '/goroskop/2027/oven', '/goroskop/telec/lyubov', '/goroskop/2031/skorpion'];
  for (const path of cases) {
    it(`ровно один матчер срабатывает для ${path}`, () => {
      const a = matchGoroskopSignSlug(path);
      const b = matchGoroskopYearSign(path);
      expect(Boolean(a) !== Boolean(b)).toBe(true);
    });
  }
});
