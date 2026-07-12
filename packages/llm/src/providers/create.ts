/**
 * Композиция реальных адаптеров поверх `Config` (packages/shared). Вызывается apps/api и
 * apps/worker ПОСЛЕ `createPorts(config)` (который всегда даёт стабы) — см. doc-комментарий в
 * packages/shared/src/ports/factory.ts и route-context.ts (тот же паттерн, что CachedGeocoder).
 *
 * `createLlmProviderChain` бросает понятную ошибку, если для выбранного `LLM_PROVIDER` не хватает
 * ключа (тот же контракт, что и остальные реальные адаптеры в этом монорепо) — вызывающий код
 * решает, ловить эту ошибку в degraded-режиме или дать упасть (в production `parseConfig` уже
 * гарантирует наличие ключа, см. §3 конвенций реализации).
 */
import type { Config, EmbeddingProvider, LlmProvider } from '@stassist/shared';
import { AnthropicLlmProvider } from './anthropic.js';
import { OpenRouterLlmProvider } from './openrouter.js';
import { YandexGptLlmProvider } from './yandexgpt.js';
import { GigaChatLlmProvider } from './gigachat.js';
import { CohereEmbeddingProvider } from './embedding-cohere.js';
import { FallbackLlmProvider } from './fallback.js';

export type LlmProviderName = 'anthropic' | 'openrouter' | 'yandexgpt' | 'gigachat';

function buildSingleLlmProvider(name: LlmProviderName, config: Config): LlmProvider {
  switch (name) {
    case 'anthropic': {
      const apiKey = config.llm.anthropicApiKey;
      if (!apiKey) throw new Error('LLM_PROVIDER=anthropic: не задан ANTHROPIC_API_KEY');
      return new AnthropicLlmProvider({ apiKey });
    }
    case 'openrouter': {
      const apiKey = config.llm.openrouterApiKey;
      if (!apiKey) throw new Error('LLM_PROVIDER=openrouter: не задан OPENROUTER_API_KEY');
      return new OpenRouterLlmProvider({ apiKey });
    }
    case 'yandexgpt': {
      const apiKey = config.llm.yandexgptApiKey;
      const folderId = process.env.YANDEXGPT_FOLDER_ID;
      if (!apiKey) throw new Error('LLM_PROVIDER=yandexgpt: не задан YANDEXGPT_API_KEY');
      if (!folderId) throw new Error('LLM_PROVIDER=yandexgpt: не задан YANDEXGPT_FOLDER_ID (id каталога Yandex Cloud)');
      return new YandexGptLlmProvider({
        authorizationHeader: `Api-Key ${apiKey}`,
        modelUri: `gpt://${folderId}/yandexgpt/latest`,
      });
    }
    case 'gigachat': {
      // ВАЖНО (интеграционный шаг, не гейт сборки): GIGACHAT_API_KEY здесь трактуется как уже
      // полученный OAuth access-токен — автоматический обмен client_id/client_secret на токен и
      // его ротация НЕ реализованы в Ф4 (см. отчёт фазы, раздел «требует ручного шага»).
      const accessToken = config.llm.gigachatApiKey;
      if (!accessToken) throw new Error('LLM_PROVIDER=gigachat: не задан GIGACHAT_API_KEY (OAuth access-токен)');
      return new GigaChatLlmProvider({ accessToken });
    }
  }
}

/** CSV из env LLM_FALLBACK_CHAIN → список имён провайдеров (уже разобран в config.llm.fallbackChain). */
export function createLlmProviderChain(config: Config): LlmProvider {
  if (config.llm.driver === 'stub') {
    throw new Error('createLlmProviderChain: LLM_PROVIDER=stub — используйте StubLlmProvider из @stassist/shared напрямую');
  }
  const primaryName = config.llm.driver as LlmProviderName;
  const primary = buildSingleLlmProvider(primaryName, config);
  const fallbackNames = config.llm.fallbackChain.filter(
    (n): n is LlmProviderName => n !== primaryName && ['anthropic', 'openrouter', 'yandexgpt', 'gigachat'].includes(n),
  );
  const fallbacks = fallbackNames.map((n) => buildSingleLlmProvider(n, config));
  if (fallbacks.length === 0) return primary;
  return new FallbackLlmProvider([primary, ...fallbacks]);
}

export function createEmbeddingProvider(config: Config): EmbeddingProvider {
  if (config.embeddings.driver === 'stub') {
    throw new Error('createEmbeddingProvider: EMBED_PROVIDER=stub — используйте StubEmbeddingProvider напрямую');
  }
  if (config.embeddings.driver !== 'cohere') {
    throw new Error(
      `EMBED_PROVIDER=${config.embeddings.driver}: неподдерживаемый embed-провайдер — Ф4 поддерживает только ` +
        `'cohere' (embed-multilingual-v3.0, 1024-dim, см. embedding-cohere.ts) — у Anthropic нет embeddings API.`,
    );
  }
  const apiKey = config.embeddings.cohereApiKey;
  if (!apiKey) throw new Error('EMBED_PROVIDER=cohere: не задан COHERE_API_KEY');
  return new CohereEmbeddingProvider({ apiKey });
}
