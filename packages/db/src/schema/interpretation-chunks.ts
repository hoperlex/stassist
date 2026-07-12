/**
 * interpretation_chunks — корпус интерпретаций RAG (см. docs/architecture/22-модель-данных.md §6,
 * docs/roadmap/31-конвенции-реализации.md §6/§8). `key` — канонический слаг вида
 * `planet_in_sign:mars:leo` / `arcanum:3:health_root` / `numerology:life_path:7`; единственный
 * источник правды по формату ключей — `packages/llm/src/facts/keys.ts` (используется и
 * генератором корпуса `tools/gen-corpus.ts`, и сериализатором фактов/ретривером в рантайме,
 * чтобы построение и чтение ключа никогда не расходились).
 *
 * `embedding vector(1024)` — размерность зафиксирована под `StubEmbeddingProvider`
 * (packages/shared/src/ports/embedding-provider.ts) и единственный поддерживаемый «настоящий»
 * embed-провайдер Ф4 — OpenRouter, модель `cohere/embed-multilingual-v3.0` (1024-dim, годится
 * для русского языка); см. `packages/llm/src/providers/embedding-openrouter.ts`. У Anthropic нет
 * embeddings API — retrieval по `key` НЕ зависит от эмбеддингов вообще (см. §8 промта Ф4), они
 * нужны только для опционального семантического слоя (вопросы в чате). Смешивать вектора разных
 * моделей нельзя — смена embed-модели требует миграции + полного реэмбеддинга корпуса.
 *
 * `embedding` в этой миграции NULLABLE и в committed seed-корпусе (drizzle/seed/…) остаётся NULL:
 * посчитать 1024-мерный вектор для ~1600 чанков через реальный сетевой провайдер — не оффлайн
 * data-step (см. §4 конвенций реализации: сеть — только с закоммиченным кэшем результата, а
 * векторный кэш такого объёма нецелесообразно коммитить как текстовый SQL). Backfill эмбеддингов —
 * отдельный интеграционный шаг (`apps/worker` job, требует DATABASE_URL + EMBED_PROVIDER≠stub).
 */
import { index, integer, pgTable, text, timestamp, uuid, vector } from 'drizzle-orm/pg-core';
import { interpretationQualityEnum, interpretationTraditionEnum } from './enums.js';
import { wikiArticles } from './wiki-articles.js';

export const INTERPRETATION_EMBEDDING_DIMENSIONS = 1024;

export const interpretationChunks = pgTable(
  'interpretation_chunks',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    key: text('key').notNull().unique(),
    tradition: interpretationTraditionEnum('tradition').notNull().default('western'),
    text: text('text').notNull(),
    sourceArticleId: uuid('source_article_id').references(() => wikiArticles.id, { onDelete: 'set null' }),
    embedding: vector('embedding', { dimensions: INTERPRETATION_EMBEDDING_DIMENSIONS }),
    quality: interpretationQualityEnum('quality').notNull().default('draft'),
    version: integer('version').notNull().default(1),

    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    // HNSW + cosine distance (см. doc-комментарий выше) — индекс валиден и на пустой/NULL-колонке
    // (pgvector просто не индексирует NULL-строки), поэтому применяется этой же миграцией, а не
    // отдельно после backfill.
    index('interpretation_chunks_embedding_hnsw_idx').using('hnsw', table.embedding.op('vector_cosine_ops')),
  ],
);
