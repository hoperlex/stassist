import { describe, expect, it } from 'vitest';
import { matrixOfDestinyCorePoints } from '@stassist/numerology-core';
import { renderMatrixOctagramSvg } from './render-matrix-octagram.js';

const corePoints = matrixOfDestinyCorePoints({ day: 15, month: 6, year: 1990 });

describe('renderMatrixOctagramSvg', () => {
  it('строит валидную SVG-строку заданного размера', () => {
    const svg = renderMatrixOctagramSvg({ corePoints, size: 360, title: 'Тест' });
    expect(svg.startsWith('<svg')).toBe(true);
    expect(svg.trim().endsWith('</svg>')).toBe(true);
    expect(svg).toContain('viewBox="0 0 360 360"');
  });

  it('рисует все 9 узлов (8 периферийных + центр) с их числами арканов', () => {
    const svg = renderMatrixOctagramSvg({ corePoints });
    for (const value of [
      corePoints.day, corePoints.month, corePoints.yearSum, corePoints.tasks,
      corePoints.center, corePoints.f1, corePoints.f2, corePoints.f3, corePoints.f4,
    ]) {
      expect(svg).toContain(`>${value}<`);
    }
  });

  it('НЕ содержит текстовых трактовок арканов — только числа (владелец текста — Ф4)', () => {
    const svg = renderMatrixOctagramSvg({ corePoints });
    // Простая эвристика: единственные протяжённые кириллические строки — служебные подписи узлов
    // (День/Месяц/Год/Задачи/Ф1..Ф4) и заголовок «Матрица судьбы», НЕ «трактовки» содержимого
    // арканов. Проверяем отсутствие типичных слов трактовок/интерпретаций.
    expect(svg).not.toMatch(/предназначение|характер\b|означает|символизир|трактовк/i);
  });

  it('детерминированность: одинаковый вход даёт одинаковый вывод', () => {
    const svg1 = renderMatrixOctagramSvg({ corePoints, size: 420 });
    const svg2 = renderMatrixOctagramSvg({ corePoints, size: 420 });
    expect(svg1).toBe(svg2);
  });

  it('тёмная тема отличается от светлой', () => {
    const light = renderMatrixOctagramSvg({ corePoints, theme: 'light' });
    const dark = renderMatrixOctagramSvg({ corePoints, theme: 'dark' });
    expect(light).not.toEqual(dark);
  });
});
