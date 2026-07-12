import { describe, expect, it } from 'vitest';
import { buildHoroscopeBatchPrompt, type BuildHoroscopeBatchPromptInput } from './build-prompt.js';

const BASE: BuildHoroscopeBatchPromptInput = {
  period: 'day',
  topic: 'love',
  humor: false,
  subjects: [
    { slug: 'aries', nameRu: 'Овен' },
    { slug: 'taurus', nameRu: 'Телец' },
  ],
  events: { period: 'day', dateKey: '2026-07-13', moonSignIndex: 7, retrogradeBodies: ['mercury'] } as never,
  recentZachinsBySubject: { aries: ['Сегодня для Овна…'] },
};

describe('buildHoroscopeBatchPrompt', () => {
  it('собирает блок АСТРОСОБЫТИЯ, субъектов и задачу с темой/периодом', () => {
    const { system, prompt } = buildHoroscopeBatchPrompt(BASE);
    expect(system).toBe(system); // системный промт присутствует
    expect(prompt).toContain('АСТРОСОБЫТИЯ');
    expect(prompt).toContain('aries');
    expect(prompt).toContain('taurus');
    expect(prompt).toContain('love');
    expect(prompt).toContain('day');
    expect(prompt).toContain('СТРУКТУРА ОТВЕТА');
  });

  it('передаёт недавние зачины субъекта для антидубляжа', () => {
    const { prompt } = buildHoroscopeBatchPrompt(BASE);
    expect(prompt).toContain('Сегодня для Овна');
  });

  it('обычный режим требует уникального зачина и конкретики (анти-штамп)', () => {
    const { prompt } = buildHoroscopeBatchPrompt(BASE);
    expect(prompt).toContain('уникальный зачин');
    expect(prompt).toMatch(/штамп/i);
  });

  it('шуточный режим выбирает юмористический системный промт и свой заход', () => {
    const { system, prompt } = buildHoroscopeBatchPrompt({ ...BASE, humor: true });
    expect(system).toMatch(/ШУТОЧНЫЕ|ирони/i);
    expect(prompt).toMatch(/иронию|шуточный/i);
  });
});
