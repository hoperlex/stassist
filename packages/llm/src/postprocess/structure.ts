/**
 * Пост-валидация структуры markdown-ответа (см. «пост-валидация: zod-структура» в
 * docs/architecture/21-техническая-архитектура.md §4 п.4). Отчёт — это markdown-текст с
 * заголовками разделов (не строгий JSON — LLM пишет связную прозу для читателя), поэтому
 * структурная проверка — «все ожидаемые заголовки присутствуют», а не парсинг объекта.
 */
export interface StructureCheckResult {
  valid: boolean;
  missingHeadings: string[];
}

export function validateReportStructure(text: string, expectedHeadings: string[]): StructureCheckResult {
  const missingHeadings = expectedHeadings.filter((h) => !text.includes(h));
  return { valid: missingHeadings.length === 0, missingHeadings };
}
