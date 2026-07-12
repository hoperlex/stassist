import { describe, expect, it } from 'vitest';
import { classifyIntent } from './intent-router.js';

describe('classifyIntent', () => {
  it('определяет synastry по упоминанию партнёра', () => {
    expect(classifyIntent('подходим ли мы с партнёром друг другу?').intent).toBe('synastry');
  });

  it('определяет transit по временным маркерам', () => {
    expect(classifyIntent('что меня ждёт сегодня?').intent).toBe('transit');
  });

  it('по умолчанию — natal', () => {
    expect(classifyIntent('расскажи про моё Солнце').intent).toBe('natal');
  });

  it('пробрасывает forbidden-детекцию наружу', () => {
    const result = classifyIntent('когда я умру?');
    expect(result.forbidden.map((f) => f.category)).toContain('death');
  });
});
