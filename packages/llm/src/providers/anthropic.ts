/**
 * Anthropic Messages API — приоритетный провайдер (см. f4-llm-конвейер.md req.1). Прямой fetch
 * (без `@anthropic-ai/sdk`, чтобы не тянуть SDK-зависимость ради одного некритичного вызова —
 * см. §2 конвенций реализации: минимальные зависимости в новых портах) на `POST /v1/messages`
 * (2023-06-01), без стриминга (генерация отчёта — фоновая worker-задача, не чат — см. §4
 * конвенций реализации, req.6 промта Ф4 про стриминг чата отдельно).
 *
 * Модель по умолчанию — `claude-sonnet-5` (баланс цены/качества для русскоязычных текстов,
 * см. packages/llm/src/providers/pricing.ts). Sampling-параметры (temperature/top_p) намеренно
 * НЕ передаются — на Sonnet 5 они отклоняются при нестандартных значениях (400), а дефолт и так
 * достаточно детерминирован в сочетании с низкой температурой промта (структурированная задача).
 */
import type { LlmGenerateRequest, LlmGenerateResult, LlmProvider } from '@stassist/shared';
import { postJson, type FetchJsonOptions } from './http.js';

export const ANTHROPIC_DEFAULT_MODEL = 'claude-sonnet-5';
const ANTHROPIC_API_VERSION = '2023-06-01';
const ANTHROPIC_MESSAGES_URL = 'https://api.anthropic.com/v1/messages';

interface AnthropicMessagesResponse {
  model: string;
  content: Array<{ type: string; text?: string }>;
  usage: { input_tokens: number; output_tokens: number };
  stop_reason: string;
}

export interface AnthropicLlmProviderOptions {
  apiKey: string;
  model?: string;
  timeoutMs?: number;
  fetchImpl?: FetchJsonOptions['fetchImpl'];
}

export class AnthropicLlmProvider implements LlmProvider {
  readonly name = 'anthropic';
  private readonly apiKey: string;
  private readonly model: string;
  private readonly timeoutMs: number;
  private readonly fetchImpl?: FetchJsonOptions['fetchImpl'];

  constructor(opts: AnthropicLlmProviderOptions) {
    if (!opts.apiKey) throw new Error('AnthropicLlmProvider: apiKey обязателен');
    this.apiKey = opts.apiKey;
    this.model = opts.model ?? ANTHROPIC_DEFAULT_MODEL;
    this.timeoutMs = opts.timeoutMs ?? 60_000;
    this.fetchImpl = opts.fetchImpl;
  }

  async generate(req: LlmGenerateRequest): Promise<LlmGenerateResult> {
    const body = {
      model: this.model,
      max_tokens: req.maxTokens ?? 4096,
      ...(req.system ? { system: req.system } : {}),
      messages: [{ role: 'user', content: req.prompt }],
    };
    const res = await postJson<AnthropicMessagesResponse>({
      url: ANTHROPIC_MESSAGES_URL,
      headers: {
        'x-api-key': this.apiKey,
        'anthropic-version': ANTHROPIC_API_VERSION,
      },
      body,
      timeoutMs: this.timeoutMs,
      fetchImpl: this.fetchImpl,
    });
    const text = res.content
      .filter((b) => b.type === 'text' && b.text)
      .map((b) => b.text)
      .join('\n');
    return {
      text,
      provider: this.name,
      tokensIn: res.usage.input_tokens,
      tokensOut: res.usage.output_tokens,
    };
  }
}
