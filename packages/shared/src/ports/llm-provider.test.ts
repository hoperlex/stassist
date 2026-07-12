import { describe, expect, it } from 'vitest';
import { StubLlmProvider } from './llm-provider.js';

describe('StubLlmProvider', () => {
  it('детерминирован и не пустой', async () => {
    const provider = new StubLlmProvider();
    const a = await provider.generate({ prompt: 'разбор натальной карты' });
    const b = await provider.generate({ prompt: 'разбор натальной карты' });
    expect(a.text).toBe(b.text);
    expect(a.text.length).toBeGreaterThan(20);
    expect(a.text).not.toMatch(/lorem/i);
  });

  it('разные запросы дают разный текст', async () => {
    const provider = new StubLlmProvider();
    const a = await provider.generate({ prompt: 'один' });
    const b = await provider.generate({ prompt: 'другой' });
    expect(a.text).not.toBe(b.text);
  });
});
