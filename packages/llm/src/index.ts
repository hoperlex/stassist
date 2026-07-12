/**
 * packages/llm — слой абстракции LLM-провайдеров и промт-конвейер (см. docs/architecture/
 * 21-техническая-архитектура.md §4). Порты `LlmProvider`/`EmbeddingProvider` и их стабы
 * определены в `@stassist/shared` (см. docs/roadmap/prompts/f0-инфраструктура.md); этот пакет
 * в Ф0 — пустой каркас, наполняется реальными адаптерами и RAG-конвейером в Ф4
 * (docs/roadmap/prompts/f4-llm-конвейер.md).
 */
export const LLM_PACKAGE_VERSION = '0.0.0-f0-placeholder';
