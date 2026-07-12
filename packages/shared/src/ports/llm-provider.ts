/**
 * Порт провайдера LLM. Реальные адаптеры (Anthropic — приоритетный, OpenRouter, YandexGPT,
 * GigaChat) появятся в Ф4 (`packages/llm`). Здесь — интерфейс + тривиальный детерминированный
 * стаб: портал не должен быть пустым даже без ключей (§2 конвенций реализации).
 */
import { createHash } from 'node:crypto';

export interface LlmGenerateRequest {
  system?: string;
  prompt: string;
  maxTokens?: number;
}

export interface LlmGenerateResult {
  text: string;
  provider: string;
  tokensIn: number;
  tokensOut: number;
}

export interface LlmProvider {
  readonly name: string;
  generate(req: LlmGenerateRequest): Promise<LlmGenerateResult>;
}

/** Детерминированный осмысленный ответ по хэшу запроса — без реального обращения к LLM. */
export class StubLlmProvider implements LlmProvider {
  readonly name = 'stub';

  async generate(req: LlmGenerateRequest): Promise<LlmGenerateResult> {
    const hash = createHash('sha256').update(req.prompt).digest('hex').slice(0, 8);
    const text =
      `[черновик, сгенерировано заглушкой LLM_PROVIDER=stub, запрос #${hash}] ` +
      'Реальный анализ появится после подключения LLM-провайдера (Ф4). ' +
      'Этот текст детерминированный: одинаковый запрос всегда даёт одинаковый ответ.';
    return {
      text,
      provider: this.name,
      tokensIn: Math.ceil(req.prompt.length / 4),
      tokensOut: Math.ceil(text.length / 4),
    };
  }
}
