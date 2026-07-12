/**
 * GigaChat (Сбер) — fallback-провайдер generate(). Публичный контракт `POST /api/v1/chat/
 * completions` (OpenAI-совместимая форма сообщений), см. f4-промт req.1. GigaChat требует
 * отдельный OAuth-обмен (`accessToken` уже полученный снаружи — обмен ключа на токен и его
 * ротацию делает вызывающий код/create.ts, а не этот адаптер, чтобы не плодить состояние внутри
 * класса, отвечающего только за generate()). Сверить перед боевым использованием живым ключом.
 */
import type { LlmGenerateRequest, LlmGenerateResult, LlmProvider } from '@stassist/shared';
import { postJson, type FetchJsonOptions } from './http.js';

const GIGACHAT_CHAT_URL = 'https://gigachat.devices.sberbank.ru/api/v1/chat/completions';
export const GIGACHAT_DEFAULT_MODEL = 'GigaChat';

interface GigaChatResponse {
  choices: Array<{ message: { content: string } }>;
  usage: { prompt_tokens: number; completion_tokens: number };
}

export interface GigaChatLlmProviderOptions {
  /** Уже полученный OAuth access-токен (см. заголовок файла). */
  accessToken: string;
  model?: string;
  timeoutMs?: number;
  fetchImpl?: FetchJsonOptions['fetchImpl'];
}

export class GigaChatLlmProvider implements LlmProvider {
  readonly name = 'gigachat';
  private readonly accessToken: string;
  private readonly model: string;
  private readonly timeoutMs: number;
  private readonly fetchImpl?: FetchJsonOptions['fetchImpl'];

  constructor(opts: GigaChatLlmProviderOptions) {
    if (!opts.accessToken) throw new Error('GigaChatLlmProvider: accessToken обязателен');
    this.accessToken = opts.accessToken;
    this.model = opts.model ?? GIGACHAT_DEFAULT_MODEL;
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
    const res = await postJson<GigaChatResponse>({
      url: GIGACHAT_CHAT_URL,
      headers: { Authorization: `Bearer ${this.accessToken}` },
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
