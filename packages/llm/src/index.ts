/**
 * packages/llm — слой абстракции LLM-провайдеров и промт-конвейер Ф4 (см. docs/architecture/
 * 21-техническая-архитектура.md §4, docs/roadmap/prompts/f4-llm-конвейер.md). Порты
 * `LlmProvider`/`EmbeddingProvider` и их стабы определены в `@stassist/shared` (Ф0); этот пакет
 * добавляет: реальные адаптеры (Anthropic/OpenRouter/YandexGPT/GigaChat + Cohere-эмбеддинги),
 * сериализатор фактов, генератор seed-корпуса, RAG-ретривер, сборку промта, пост-обработку,
 * cache_key и конвейеры отчётов/чата.
 */
export const LLM_PACKAGE_VERSION = '0.1.0-f4';

export * from './version.js';

// --- Факты: сериализатор ChartData → текст, ключи корпуса ------------------------------------
export * from './facts/keys.js';
export * from './facts/dignities.js';
export * from './facts/stelliums.js';
export * from './facts/format.js';
export * from './facts/ru-names.js';
export * from './facts/serializer.js';
export * from './facts/matrix-positions.js';
export * from './facts/numerology-positions.js';

// --- Провайдеры: реальные адаптеры + отказоустойчивость ---------------------------------------
export * from './providers/http.js';
export * from './providers/anthropic.js';
export * from './providers/openrouter.js';
export * from './providers/yandexgpt.js';
export * from './providers/gigachat.js';
export * from './providers/embedding-cohere.js';
export * from './providers/circuit-breaker.js';
export * from './providers/retry.js';
export * from './providers/fallback.js';
export * from './providers/create.js';
export * from './providers/pricing.js';

// --- RAG: порт репозитория чанков + ретривер ---------------------------------------------------
export * from './rag/chunk-repository.js';
export * from './rag/retriever.js';

// --- Промт: системные правила + сборка -------------------------------------------------------
export * from './prompt/system-rules.js';
export * from './prompt/build-prompt.js';

// --- Пост-обработка: фильтры/структура/дисклеймер ----------------------------------------------
export * from './postprocess/forbidden-filters.js';
export * from './postprocess/structure.js';
export * from './postprocess/disclaimer.js';
export * from './postprocess/postprocess.js';

// --- Кэш ------------------------------------------------------------------------------------
export * from './cache/cache-key.js';

// --- Корпус: генератор seed-данных (data-step, см. tools/gen-corpus.ts) -----------------------
export * from './corpus/types.js';
export * from './corpus/build-corpus.js';

// --- Отчёты: конвейер генерации --------------------------------------------------------------
export * from './reports/report-kinds.js';
export * from './reports/time-unknown.js';
export * from './reports/task-description.js';
export * from './reports/pipeline.js';

// --- Чат: интент-роутер + конвейер ответа -----------------------------------------------------
export * from './chat/intent-router.js';
export * from './chat/chat-pipeline.js';
