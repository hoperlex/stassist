import { describe, expect, it } from 'vitest';
import { parseConfig } from '@stassist/shared';
import { createEmbeddingProvider, createLlmProviderChain } from './create.js';

const BASE_ENV = { NODE_ENV: 'test', COOKIE_SECRET: 'x'.repeat(32) } as NodeJS.ProcessEnv;

describe('createLlmProviderChain', () => {
  it('бросает для LLM_PROVIDER=stub (используйте StubLlmProvider напрямую)', () => {
    const config = parseConfig(BASE_ENV);
    expect(() => createLlmProviderChain(config)).toThrow(/stub/);
  });

  it('строит одиночного anthropic-провайдера без fallback-цепочки', () => {
    const config = parseConfig({ ...BASE_ENV, LLM_PROVIDER: 'anthropic', ANTHROPIC_API_KEY: 'sk-x' } as NodeJS.ProcessEnv);
    const provider = createLlmProviderChain(config);
    expect(provider.name).toBe('anthropic');
  });

  it('бросает понятную ошибку при отсутствии ключа основного провайдера', () => {
    const config = parseConfig({ ...BASE_ENV, LLM_PROVIDER: 'anthropic' } as NodeJS.ProcessEnv);
    expect(() => createLlmProviderChain(config)).toThrow(/ANTHROPIC_API_KEY/);
  });

  it('строит цепочку fallback из LLM_FALLBACK_CHAIN', () => {
    const config = parseConfig({
      ...BASE_ENV,
      LLM_PROVIDER: 'anthropic',
      ANTHROPIC_API_KEY: 'sk-x',
      OPENROUTER_API_KEY: 'or-x',
      LLM_FALLBACK_CHAIN: 'openrouter',
    } as NodeJS.ProcessEnv);
    const provider = createLlmProviderChain(config);
    expect(provider.name).toBe('anthropic->openrouter');
  });
});

describe('createEmbeddingProvider', () => {
  it('бросает для EMBED_PROVIDER=stub', () => {
    const config = parseConfig(BASE_ENV);
    expect(() => createEmbeddingProvider(config)).toThrow(/stub/);
  });

  it('бросает для неподдерживаемого embed-провайдера (anthropic)', () => {
    const config = parseConfig({
      ...BASE_ENV,
      EMBED_PROVIDER: 'anthropic',
      ANTHROPIC_API_KEY: 'sk-x',
    } as NodeJS.ProcessEnv);
    expect(() => createEmbeddingProvider(config)).toThrow(/неподдерживаемый/);
  });

  it('строит CohereEmbeddingProvider с dimensions=1024', () => {
    const config = parseConfig({ ...BASE_ENV, EMBED_PROVIDER: 'cohere', COHERE_API_KEY: 'co-x' } as NodeJS.ProcessEnv);
    const provider = createEmbeddingProvider(config);
    expect(provider.name).toBe('cohere');
    expect(provider.dimensions).toBe(1024);
  });
});
