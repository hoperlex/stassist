/**
 * Cohere Embed — единственный поддерживаемый «настоящий» `EmbeddingProvider` Ф4. Выбран потому,
 * что модель `embed-multilingual-v3.0` детерминированно выдаёт РОВНО 1024 измерения и поддерживает
 * русский язык — совпадает без усечения с `interpretation_chunks.embedding vector(1024)`
 * (packages/db/src/schema/interpretation-chunks.ts). У Anthropic нет embeddings API (см. находку
 * [контракт-эмбеддингов] в _work/build/findings/f4.md) — поэтому generate-цепочка (Anthropic-
 * приоритет) и embed-провайдер сознательно РАЗНЫЕ сервисы, конфигурируются независимо
 * (`LLM_PROVIDER` vs `EMBED_PROVIDER`, см. packages/shared/src/config.ts).
 *
 * Публичный контракт `POST /v1/embed` (Cohere) — сверить перед боевым использованием живым
 * ключом (интеграционный шаг, вне гейта сборки).
 */
import type { EmbeddingProvider } from '@stassist/shared';
import { postJson, type FetchJsonOptions } from './http.js';

const COHERE_EMBED_URL = 'https://api.cohere.com/v1/embed';
export const COHERE_EMBED_MODEL = 'embed-multilingual-v3.0';
const COHERE_EMBED_DIMENSIONS = 1024;

interface CohereEmbedResponse {
  embeddings: number[][];
}

export interface CohereEmbeddingProviderOptions {
  apiKey: string;
  timeoutMs?: number;
  fetchImpl?: FetchJsonOptions['fetchImpl'];
}

export class CohereEmbeddingProvider implements EmbeddingProvider {
  readonly name = 'cohere';
  readonly dimensions = COHERE_EMBED_DIMENSIONS;
  private readonly apiKey: string;
  private readonly timeoutMs: number;
  private readonly fetchImpl?: FetchJsonOptions['fetchImpl'];

  constructor(opts: CohereEmbeddingProviderOptions) {
    if (!opts.apiKey) throw new Error('CohereEmbeddingProvider: apiKey обязателен');
    this.apiKey = opts.apiKey;
    this.timeoutMs = opts.timeoutMs ?? 30_000;
    this.fetchImpl = opts.fetchImpl;
  }

  async embed(text: string): Promise<number[]> {
    const res = await postJson<CohereEmbedResponse>({
      url: COHERE_EMBED_URL,
      headers: { Authorization: `Bearer ${this.apiKey}` },
      body: { texts: [text], model: COHERE_EMBED_MODEL, input_type: 'search_document' },
      timeoutMs: this.timeoutMs,
      fetchImpl: this.fetchImpl,
    });
    const vector = res.embeddings[0];
    if (!vector || vector.length !== this.dimensions) {
      throw new Error(
        `CohereEmbeddingProvider: ожидалось ${this.dimensions} измерений, получено ${vector?.length ?? 0} — ` +
          'не усекаем и не дополняем молча (см. заголовок файла).',
      );
    }
    return vector;
  }
}
