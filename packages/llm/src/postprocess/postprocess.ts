/**
 * Пост-обработка сгенерированного текста (см. docs/architecture/21-техническая-архитектура.md
 * §4 п.4): фильтр запрещённого → автодисклеймер → (опционально) проверка структуры. Возвращает
 * `flagged`, если найден запрещённый контент — вызывающий код (reports/pipeline.ts) сохраняет
 * `ai_reports.status='flagged'` вместо `'done'` (аудит, см. doc 22 §3 `status` enum).
 */
import { appendDisclaimer } from './disclaimer.js';
import { buildSoftRefusalText, detectForbidden } from './forbidden-filters.js';
import { validateReportStructure } from './structure.js';

export interface PostprocessInput {
  text: string;
  expectedHeadings?: string[];
}

export interface PostprocessResult {
  contentMd: string;
  flagged: boolean;
  flagReasons: string[];
}

export function postprocessReport(input: PostprocessInput): PostprocessResult {
  const forbidden = detectForbidden(input.text);
  const flagReasons: string[] = [];
  let body = input.text;

  if (forbidden.length > 0) {
    flagReasons.push(...forbidden.map((f) => `forbidden:${f.category}`));
    body = buildSoftRefusalText(forbidden);
  } else if (input.expectedHeadings && input.expectedHeadings.length > 0) {
    const structure = validateReportStructure(body, input.expectedHeadings);
    if (!structure.valid) flagReasons.push(`missing-headings:${structure.missingHeadings.join(',')}`);
  }

  return {
    contentMd: appendDisclaimer(body),
    flagged: forbidden.length > 0,
    flagReasons,
  };
}
