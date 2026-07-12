/**
 * YandexGPT (Yandex Cloud Foundation Models) — fallback-провайдер generate(). Публичный контракт
 * `POST /foundationModels/v1/completion` (Yandex Cloud, регион ru-central1), см. f4-промт req.1
 * («OpenRouter, YandexGPT, GigaChat» — цепочка fallback). `apiKeyOrIamToken` — либо статический
 * API-ключ сервисного аккаунта (`Api-Key <...>`), либо IAM-токен (`Bearer <...>`) — выбирается по
 * префиксу заголовка снаружи (см. create.ts). Сверить перед боевым использованием живым ключом.
 */
import type { LlmGenerateRequest, LlmGenerateResult, LlmProvider } from '@stassist/shared';
import { postJson, type FetchJsonOptions } from './http.js';

const YANDEXGPT_COMPLETION_URL = 'https://llm.api.cloud.yandex.net/foundationModels/v1/completion';

interface YandexGptResponse {
  result: {
    alternatives: Array<{ message: { text: string } }>;
    usage: { inputTextTokens: string; completionTokens: string };
  };
}

export interface YandexGptLlmProviderOptions {
  /** `Api-Key <...>` или `Bearer <IAM-токен>` — весь заголовок Authorization целиком. */
  authorizationHeader: string;
  /** `gpt://<folder-id>/yandexgpt/latest` — модель зависит от каталога заказчика, не хардкодим. */
  modelUri: string;
  timeoutMs?: number;
  fetchImpl?: FetchJsonOptions['fetchImpl'];
}

export class YandexGptLlmProvider implements LlmProvider {
  readonly name = 'yandexgpt';
  private readonly authorizationHeader: string;
  private readonly modelUri: string;
  private readonly timeoutMs: number;
  private readonly fetchImpl?: FetchJsonOptions['fetchImpl'];

  constructor(opts: YandexGptLlmProviderOptions) {
    if (!opts.authorizationHeader) throw new Error('YandexGptLlmProvider: authorizationHeader обязателен');
    if (!opts.modelUri) throw new Error('YandexGptLlmProvider: modelUri обязателен');
    this.authorizationHeader = opts.authorizationHeader;
    this.modelUri = opts.modelUri;
    this.timeoutMs = opts.timeoutMs ?? 60_000;
    this.fetchImpl = opts.fetchImpl;
  }

  async generate(req: LlmGenerateRequest): Promise<LlmGenerateResult> {
    const messages = req.system
      ? [
          { role: 'system', text: req.system },
          { role: 'user', text: req.prompt },
        ]
      : [{ role: 'user', text: req.prompt }];
    const res = await postJson<YandexGptResponse>({
      url: YANDEXGPT_COMPLETION_URL,
      headers: { Authorization: this.authorizationHeader },
      body: {
        modelUri: this.modelUri,
        completionOptions: { stream: false, temperature: 0.3, maxTokens: String(req.maxTokens ?? 4096) },
        messages,
      },
      timeoutMs: this.timeoutMs,
      fetchImpl: this.fetchImpl,
    });
    const text = res.result.alternatives[0]?.message.text ?? '';
    return {
      text,
      provider: this.name,
      tokensIn: Number(res.result.usage.inputTextTokens ?? 0) || Math.ceil(req.prompt.length / 4),
      tokensOut: Number(res.result.usage.completionTokens ?? 0) || Math.ceil(text.length / 4),
    };
  }
}
