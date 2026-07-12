import { describe, expect, it } from 'vitest';
import * as llm from './index.js';
import { LLM_PACKAGE_VERSION } from './index.js';

describe('@stassist/llm — публичный API (Ф4)', () => {
  it('экспортирует версию пакета', () => {
    expect(LLM_PACKAGE_VERSION).toMatch(/^0\.1\./);
  });

  it('экспортирует ключевые точки входа конвейера', () => {
    expect(typeof llm.serializeChartFacts).toBe('function');
    expect(typeof llm.buildCorpus).toBe('function');
    expect(typeof llm.buildPrompt).toBe('function');
    expect(typeof llm.retrieveForFacts).toBe('function');
    expect(typeof llm.postprocessReport).toBe('function');
    expect(typeof llm.buildCacheKey).toBe('function');
    expect(typeof llm.generateReport).toBe('function');
    expect(typeof llm.answerChatQuestion).toBe('function');
    expect(typeof llm.createLlmProviderChain).toBe('function');
    expect(typeof llm.createEmbeddingProvider).toBe('function');
  });
});
