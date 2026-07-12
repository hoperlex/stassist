/**
 * Клиент для GET /api/v1/calc/interpretation — читает корпус интерпретаций Ф4 по ключам (см.
 * packages/llm/src/facts/keys.ts — единственный источник правды по формату ключей; здесь ключи
 * строятся вручную по той же схеме, т.к. `apps/web` не тянет `@stassist/llm` ради строк).
 * Используется калькуляторами Ф3 вместо `<ContentPendingNotice>` (находка
 * [порядок-зависимостей-контента] в _work/build/findings/f4.md).
 */
import { api } from './api-client.js';

export interface InterpretationText {
  text: string;
  quality: 'draft' | 'reviewed';
}

interface InterpretationChunkResponseDto {
  key: string;
  text: string;
  quality: 'draft' | 'reviewed';
}

/** Возвращает карту key→текст ТОЛЬКО для найденных ключей (отсутствующие — просто не в карте,
 *  честный empty-state на стороне вызывающего компонента, а не ошибка). */
export async function fetchInterpretationText(keys: string[]): Promise<Record<string, InterpretationText>> {
  if (keys.length === 0) return {};
  try {
    const res = await api.get<{ items: InterpretationChunkResponseDto[] }>(
      `/calc/interpretation?keys=${encodeURIComponent(keys.join(','))}`,
    );
    const out: Record<string, InterpretationText> = {};
    for (const item of res.items) out[item.key] = { text: item.text, quality: item.quality };
    return out;
  } catch {
    // API/БД недоступны — честный empty-state у вызывающего компонента, не падаем.
    return {};
  }
}
