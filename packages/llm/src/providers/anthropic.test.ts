import { describe, expect, it } from 'vitest';
import { AnthropicLlmProvider, ANTHROPIC_DEFAULT_MODEL } from './anthropic.js';

function mockFetch(responseBody: unknown, captured: { url?: string; init?: RequestInit }) {
  return (async (url: string, init?: RequestInit) => {
    captured.url = url;
    captured.init = init;
    return new Response(JSON.stringify(responseBody), { status: 200 }) as unknown as Response;
  }) as unknown as typeof fetch;
}

describe('AnthropicLlmProvider', () => {
  it('бросает без apiKey', () => {
    expect(() => new AnthropicLlmProvider({ apiKey: '' })).toThrow();
  });

  it('строит корректный запрос (модель по умолчанию, заголовки, system+user)', async () => {
    const captured: { url?: string; init?: RequestInit } = {};
    const provider = new AnthropicLlmProvider({
      apiKey: 'sk-test',
      fetchImpl: mockFetch(
        {
          content: [{ type: 'text', text: 'разбор карты' }],
          usage: { input_tokens: 42, output_tokens: 13 },
        },
        captured,
      ),
    });

    const result = await provider.generate({ system: 'системные правила', prompt: 'разбери карту', maxTokens: 500 });

    expect(captured.url).toBe('https://api.anthropic.com/v1/messages');
    const headers = captured.init?.headers as Record<string, string>;
    expect(headers['x-api-key']).toBe('sk-test');
    expect(headers['anthropic-version']).toBe('2023-06-01');
    const body = JSON.parse(captured.init?.body as string);
    expect(body.model).toBe(ANTHROPIC_DEFAULT_MODEL);
    expect(body.system).toBe('системные правила');
    expect(body.messages).toEqual([{ role: 'user', content: 'разбери карту' }]);
    expect(body.max_tokens).toBe(500);

    expect(result).toEqual({ text: 'разбор карты', provider: 'anthropic', tokensIn: 42, tokensOut: 13 });
  });

  it('склеивает несколько text-блоков ответа', async () => {
    const captured: { url?: string; init?: RequestInit } = {};
    const provider = new AnthropicLlmProvider({
      apiKey: 'sk-test',
      fetchImpl: mockFetch(
        {
          content: [
            { type: 'text', text: 'часть 1' },
            { type: 'text', text: 'часть 2' },
          ],
          usage: { input_tokens: 1, output_tokens: 2 },
        },
        captured,
      ),
    });
    const result = await provider.generate({ prompt: 'x' });
    expect(result.text).toBe('часть 1\nчасть 2');
  });
});
