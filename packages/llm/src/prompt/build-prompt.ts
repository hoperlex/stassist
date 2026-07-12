/**
 * Сборка промта: системные правила + данные + фрагменты корпуса + задача + структура ответа
 * (см. docs/architecture/21-техническая-архитектура.md §4: «сборка промта»). Чистая функция —
 * не зовёт LlmProvider сама (это делает src/reports/pipeline.ts).
 */
import { SYSTEM_RULES_RU } from './system-rules.js';

export interface BuildPromptInput {
  /** Компактный текст фактов из src/facts/serializer.ts. */
  factsText: string;
  /** Тексты найденных чанков корпуса (уже отсортированы ретривером). */
  chunkTexts: string[];
  /** Что должен сделать ИИ (напр. «Напиши раздел „Личность“ разбора natal_full…»). */
  task: string;
  /** Доп. требование к структуре ответа (заголовки/секции) — опционально. */
  structureHint?: string;
}

export interface BuiltPrompt {
  system: string;
  prompt: string;
}

export function buildPrompt(input: BuildPromptInput): BuiltPrompt {
  const chunksBlock =
    input.chunkTexts.length > 0
      ? `ФРАГМЕНТЫ КОРПУСА (используй как основу интерпретации фактов из блока ДАННЫЕ):\n` +
        input.chunkTexts.map((t, i) => `[${i + 1}] ${t}`).join('\n\n')
      : 'ФРАГМЕНТЫ КОРПУСА: не найдены для этих фактов — опирайся только на блок ДАННЫЕ карты и ' +
        'общепринятую психологическую логику; не изобретай конкретные астрологические трактовки.';

  const parts = [
    input.factsText,
    '',
    chunksBlock,
    '',
    `ЗАДАЧА: ${input.task}`,
    input.structureHint ? `СТРУКТУРА ОТВЕТА: ${input.structureHint}` : '',
  ].filter((p) => p.length > 0);

  return { system: SYSTEM_RULES_RU, prompt: parts.join('\n') };
}
