import { describe, expect, it } from 'vitest';
import type { LlmProvider } from '@stassist/shared';
import { FallbackLlmProvider } from './fallback.js';

function fakeProvider(name: string, behavior: 'ok' | 'fail'): LlmProvider {
  return {
    name,
    async generate(req) {
      if (behavior === 'fail') throw new Error(`${name} недоступен`);
      return { text: `ответ от ${name}: ${req.prompt}`, provider: name, tokensIn: 1, tokensOut: 1 };
    },
  };
}

describe('FallbackLlmProvider', () => {
  it('использует первого провайдера при успехе', async () => {
    const chain = new FallbackLlmProvider([fakeProvider('a', 'ok'), fakeProvider('b', 'ok')], {
      retry: { retries: 0, sleep: async () => {} },
    });
    const result = await chain.generate({ prompt: 'тест' });
    expect(result.provider).toBe('a');
  });

  it('переключается на следующего провайдера при отказе первого (failover-тест)', async () => {
    const chain = new FallbackLlmProvider([fakeProvider('a', 'fail'), fakeProvider('b', 'ok')], {
      retry: { retries: 0, sleep: async () => {} },
    });
    const result = await chain.generate({ prompt: 'тест' });
    expect(result.provider).toBe('b');
  });

  it('бросает, если все провайдеры недоступны', async () => {
    const chain = new FallbackLlmProvider([fakeProvider('a', 'fail'), fakeProvider('b', 'fail')], {
      retry: { retries: 0, sleep: async () => {} },
    });
    await expect(chain.generate({ prompt: 'тест' })).rejects.toThrow(/недоступны/);
  });

  it('circuit breaker пропускает провайдера, открытого после серии неудач', async () => {
    const failing = fakeProvider('a', 'fail');
    const backup = fakeProvider('b', 'ok');
    const chain = new FallbackLlmProvider([failing, backup], {
      retry: { retries: 0, sleep: async () => {} },
      breaker: { failureThreshold: 1, cooldownMs: 60_000 },
    });
    await chain.generate({ prompt: '1' });
    // после первого отказа breaker для 'a' открыт — второй вызов не должен даже пытаться 'a'
    const result = await chain.generate({ prompt: '2' });
    expect(result.provider).toBe('b');
  });

  it('не даёт создать цепочку из нуля провайдеров', () => {
    expect(() => new FallbackLlmProvider([])).toThrow();
  });
});
