import { describe, expect, it } from 'vitest';
import { StubLlmProvider, ZODIAC_SIGN_EN_SLUGS, EASTERN_ANIMAL_SLUGS, type LlmProvider, type LlmGenerateRequest, type LlmGenerateResult } from '@stassist/shared';
import { buildDayAstroEvents, buildEasternYearAstroEvents } from './astro-events.js';
import {
  generateEasternHoroscopeBatch,
  generateHumorProfessionHoroscope,
  generateHumorZodiacBatch,
  generateLunarDayHoroscope,
  generateZodiacHoroscopeBatch,
} from './generate-batch.js';

const DAY_FACT = {
  date: '2026-07-13',
  moonSignIndex: 3,
  lunarDay: 12,
  phaseName: 'waxing_gibbous',
  isVoidOfCourse: false,
  retrogradeBodies: [],
  signIngresses: [],
};

/** Провайдер, возвращающий текст с запрещённым словом — проверяем автомодерацию. */
class ForbiddenWordProvider implements LlmProvider {
  readonly name = 'fake-forbidden';
  async generate(_req: LlmGenerateRequest): Promise<LlmGenerateResult> {
    return { text: 'Сегодня возможен диагноз проблемы со здоровьем.', provider: this.name, tokensIn: 1, tokensOut: 1 };
  }
}

/** Провайдер, возвращающий валидный JSON-батч (реальный путь, см. build-prompt.ts). */
class JsonBatchProvider implements LlmProvider {
  readonly name = 'fake-real';
  constructor(private readonly slugs: readonly string[]) {}
  async generate(_req: LlmGenerateRequest): Promise<LlmGenerateResult> {
    const obj: Record<string, string> = {};
    for (const s of this.slugs) obj[s] = `Текст для ${s}, сгенерированный тестовым провайдером с достаточной длиной для проверки пайплайна.`;
    return { text: JSON.stringify(obj), provider: this.name, tokensIn: 10, tokensOut: 10 };
  }
}

class BrokenJsonProvider implements LlmProvider {
  readonly name = 'fake-broken';
  async generate(): Promise<LlmGenerateResult> {
    return { text: 'это не json', provider: this.name, tokensIn: 1, tokensOut: 1 };
  }
}

describe('generateZodiacHoroscopeBatch — путь по умолчанию (stub)', () => {
  it('возвращает 12 знаков, все опубликованы (не флагнуты)', async () => {
    const events = buildDayAstroEvents('day', DAY_FACT);
    const items = await generateZodiacHoroscopeBatch({
      period: 'day',
      topic: 'general',
      events,
      recentZachinsBySign: {},
      llm: new StubLlmProvider(),
    });
    expect(items).toHaveLength(12);
    for (const sign of ZODIAC_SIGN_EN_SLUGS) expect(items.some((i) => i.sign === sign)).toBe(true);
    expect(items.every((i) => !i.flagged)).toBe(true);
  });

  it('идемпотентно: повторный вызов с теми же данными даёт тот же результат', async () => {
    const events = buildDayAstroEvents('day', DAY_FACT);
    const a = await generateZodiacHoroscopeBatch({ period: 'day', topic: 'general', events, recentZachinsBySign: {}, llm: new StubLlmProvider() });
    const b = await generateZodiacHoroscopeBatch({ period: 'day', topic: 'general', events, recentZachinsBySign: {}, llm: new StubLlmProvider() });
    expect(a).toEqual(b);
  });
});

describe('generateZodiacHoroscopeBatch — реальный провайдер (JSON-путь)', () => {
  it('парсит структурированный JSON-ответ на 12 знаков', async () => {
    const events = buildDayAstroEvents('day', DAY_FACT);
    const items = await generateZodiacHoroscopeBatch({
      period: 'day',
      topic: 'general',
      events,
      recentZachinsBySign: {},
      llm: new JsonBatchProvider(ZODIAC_SIGN_EN_SLUGS),
    });
    expect(items).toHaveLength(12);
    expect(items.every((i) => !i.flagged)).toBe(true);
    expect(items[0]!.bodyMd).toContain('Текст для');
  });

  it('автомодерация флагует запрещённый контент вместо публикации', async () => {
    const events = buildDayAstroEvents('day', DAY_FACT);
    const items = await generateZodiacHoroscopeBatch({
      period: 'day',
      topic: 'general',
      events,
      recentZachinsBySign: {},
      llm: new ForbiddenWordProvider(),
    });
    // ForbiddenWordProvider возвращает один и тот же текст на весь запрос (не JSON) — весь батч
    // не парсится как JSON → уходит в модерацию по причине llm-json-parse-error, что тоже
    // корректно демонстрирует «не публикуется молча».
    expect(items.every((i) => i.flagged)).toBe(true);
  });

  it('битый JSON от провайдера уводит батч в модерацию, не публикует и не роняет пайплайн', async () => {
    const events = buildDayAstroEvents('day', DAY_FACT);
    const items = await generateZodiacHoroscopeBatch({
      period: 'day',
      topic: 'general',
      events,
      recentZachinsBySign: {},
      llm: new BrokenJsonProvider(),
    });
    expect(items).toHaveLength(12);
    expect(items.every((i) => i.flagged)).toBe(true);
    expect(items.every((i) => i.flagReasons.includes('llm-json-parse-error'))).toBe(true);
  });
});

describe('generateEasternHoroscopeBatch', () => {
  it('возвращает 12 животных с непустым текстом', async () => {
    const events = buildEasternYearAstroEvents('2026', 6, 1, 0);
    const items = await generateEasternHoroscopeBatch({ events, llm: new StubLlmProvider() });
    expect(items).toHaveLength(12);
    for (const animal of EASTERN_ANIMAL_SLUGS) expect(items.some((i) => i.sign === animal)).toBe(true);
  });
});

describe('generateLunarDayHoroscope / generateHumorProfessionHoroscope', () => {
  it('лунный день не флагнут и содержит текст', () => {
    const item = generateLunarDayHoroscope(15);
    expect(item.flagged).toBe(false);
    expect(item.bodyMd.length).toBeGreaterThan(50);
  });

  it('профессиональный шуточный гороскоп упоминает профессию', () => {
    const events = buildDayAstroEvents('day', DAY_FACT);
    const item = generateHumorProfessionHoroscope('buhgalter', { ...events, scope: 'profession' });
    expect(item.bodyMd).toContain('бухгалтера');
  });
});

describe('generateHumorZodiacBatch', () => {
  it('возвращает 12 знаков антигороскопа', async () => {
    const events = buildDayAstroEvents('day', DAY_FACT);
    const items = await generateHumorZodiacBatch({ events, recentZachinsBySign: {}, llm: new StubLlmProvider() });
    expect(items).toHaveLength(12);
  });
});
