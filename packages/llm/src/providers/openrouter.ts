/**
 * OpenRouter — fallback-провайдер generate() (OpenAI-совместимый Chat Completions API). См.
 * docs/roadmap/prompts/f4-llm-конвейер.md req.1. Форма запроса/ответа — публичный контракт
 * OpenRouter (`/api/v1/chat/completions`), сверить перед боевым использованием живым ключом
 * (интеграционный шаг, вне гейта сборки — см. §1 конвенций реализации).
 */
import type { LlmGenerateRequest, LlmGenerateResult, LlmProvider } from '@stassist/shared';
import { postJson, type FetchJsonOptions } from './http.js';

const OPENROUTER_CHAT_URL = 'https://openrouter.ai/api/v1/chat/completions';
export const OPENROUTER_DEFAULT_MODEL = 'anthropic/claude-sonnet-4.5';

interface OpenRouterChatResponse {
  choices: Array<{ message: { content: string } }>;
  usage?: { prompt_tokens: number; completion_tokens: number };
}

export interface OpenRouterLlmProviderOptions {
  apiKey: string;
  model?: string;
  timeoutMs?: number;
  fetchImpl?: FetchJsonOptions['fetchImpl'];
}

export class OpenRouterLlmProvider implements LlmProvider {
  readonly name = 'openrouter';
  private readonly apiKey: string;
  private readonly model: string;
  private readonly timeoutMs: number;
  private readonly fetchImpl?: FetchJsonOptions['fetchImpl'];

  constructor(opts: OpenRouterLlmProviderOptions) {
    if (!opts.apiKey) throw new Error('OpenRouterLlmProvider: apiKey обязателен');
    this.apiKey = opts.apiKey;
    this.model = opts.model ?? OPENROUTER_DEFAULT_MODEL;
    this.timeoutMs = opts.timeoutMs ?? 60_000;
    this.fetchImpl = opts.fetchImpl;
  }

  async generate(req: LlmGenerateRequest): Promise<LlmGenerateResult> {
    const messages = req.system
      ? [
          { role: 'system', content: req.system },
          { role: 'user', content: req.prompt },
        ]
      : [{ role: 'user', content: req.prompt }];
    const res = await postJson<OpenRouterChatResponse>({
      url: OPENROUTER_CHAT_URL,
      headers: { Authorization: `Bearer ${this.apiKey}` },
      body: { model: this.model, messages, max_tokens: req.maxTokens ?? 4096 },
      timeoutMs: this.timeoutMs,
      fetchImpl: this.fetchImpl,
    });
    const text = res.choices[0]?.message.content ?? '';
    return {
      text,
      provider: this.name,
      tokensIn: res.usage?.prompt_tokens ?? Math.ceil(req.prompt.length / 4),
      tokensOut: res.usage?.completion_tokens ?? Math.ceil(text.length / 4),
    };
  }
}
