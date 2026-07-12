/**
 * Ретривер RAG (см. docs/architecture/21-техническая-архитектура.md §4 п.3, f4-промт req.4).
 * Точный ретрив по ключам ОБЯЗАН работать без эмбеддингов (§8 промта Ф4). Поведение при
 * отсутствии чанка по ключу факта (см. находку [наполнение-контентом-покрытие-корпуса] в
 * _work/build/findings/f4.md): для ключей `aspect:*` — откат на архетипический
 * `aspect:<angle>:overview` (менее специфичный, но существующий чанк); для остальных типов
 * ключей отката нет — ключ уходит в `missingKeys` (пост-обработка/промт НЕ выдумывает текст на
 * этом месте, а сборщик промта просто не включает несуществующий факт-чанк — молчаливой
 * пустоты в ответе быть не должно ТОЛЬКО потому, что генератор корпуса (build-corpus.ts) даёт
 * 100%-е покрытие всех этих типов ключей комбинаторно — см. build-corpus.test.ts).
 */
import { aspectOverviewKey } from '../facts/keys.js';
import type { ChunkRepository, StoredChunk } from './chunk-repository.js';

export interface UsedChunkAudit {
  requestedKey: string;
  resolvedKey: string;
  version: number;
  quality: string;
  fallback: boolean;
}

export interface RetrievalResult {
  chunks: StoredChunk[];
  /** Для аудита в `ai_reports.chunks_used` (см. находку [внутренняя-полнота-аудит] в f4.md). */
  usedKeys: UsedChunkAudit[];
  /** Ключи фактов, для которых чанк не найден даже после отката — промт их просто не увидит. */
  missingKeys: string[];
}

const ASPECT_KEY_RE = /^aspect:([^:]+):([^:]+):([^:]+)$/;

function aspectFallbackKeyOf(factKey: string): string | undefined {
  const m = ASPECT_KEY_RE.exec(factKey);
  if (!m) return undefined;
  return aspectOverviewKey(m[2]!);
}

export async function retrieveForFacts(factKeys: string[], repo: ChunkRepository): Promise<RetrievalResult> {
  const exact = await repo.getByKeys(factKeys);
  const exactByKey = new Map(exact.map((c) => [c.key, c]));

  const fallbackCandidateByFactKey = new Map<string, string>();
  for (const k of factKeys) {
    if (exactByKey.has(k)) continue;
    const fb = aspectFallbackKeyOf(k);
    if (fb) fallbackCandidateByFactKey.set(k, fb);
  }
  const fallbackKeys = [...new Set(fallbackCandidateByFactKey.values())];
  const fallbackChunks = fallbackKeys.length > 0 ? await repo.getByKeys(fallbackKeys) : [];
  const fallbackByKey = new Map(fallbackChunks.map((c) => [c.key, c]));

  const usedKeys: UsedChunkAudit[] = [];
  const chunksOut: StoredChunk[] = [];
  const seenChunkKeys = new Set<string>();
  const missingKeys: string[] = [];

  for (const k of factKeys) {
    const exactChunk = exactByKey.get(k);
    if (exactChunk) {
      usedKeys.push({ requestedKey: k, resolvedKey: exactChunk.key, version: exactChunk.version, quality: exactChunk.quality, fallback: false });
      if (!seenChunkKeys.has(exactChunk.key)) {
        seenChunkKeys.add(exactChunk.key);
        chunksOut.push(exactChunk);
      }
      continue;
    }
    const fbKey = fallbackCandidateByFactKey.get(k);
    const fbChunk = fbKey ? fallbackByKey.get(fbKey) : undefined;
    if (fbChunk) {
      usedKeys.push({ requestedKey: k, resolvedKey: fbChunk.key, version: fbChunk.version, quality: fbChunk.quality, fallback: true });
      if (!seenChunkKeys.has(fbChunk.key)) {
        seenChunkKeys.add(fbChunk.key);
        chunksOut.push(fbChunk);
      }
      continue;
    }
    missingKeys.push(k);
  }

  return { chunks: chunksOut, usedKeys, missingKeys };
}

/** Семантический ретрив для чата (вопрос пользователя → эмбеддинг → похожие чанки). Опционален —
 *  если репозиторий/эмбеддинги недоступны, возвращает []. НЕ используется для отчётов по карте
 *  (там ретрив всегда точный по факт-ключам). */
export async function retrieveSemantic(embedding: number[], repo: ChunkRepository, limit = 5): Promise<StoredChunk[]> {
  return repo.semanticSearch(embedding, limit);
}
