/**
 * Интент-роутер чата (см. f4-llm-конвейер.md req.6: «вопрос → интент-роутер (какие расчёты
 * нужны: натал/транзиты на дату/синастрия) → расчёт → конвейер»). Простая эвристика по
 * ключевым словам — MVP, без ML-классификатора (детерминированно, юнит-тестируемо офлайн).
 */
import { detectForbidden, type ForbiddenMatch } from '../postprocess/forbidden-filters.js';

export type ChatIntent = 'natal' | 'transit' | 'synastry' | 'general';

export interface IntentClassification {
  intent: ChatIntent;
  forbidden: ForbiddenMatch[];
}

const SYNASTRY_RE = /партн[её]р|совместимост|синастри|\bпара\b|мой муж|моя жена|мой парень|моя девушка/iu;
const TRANSIT_RE = /транзит|сегодня|завтра|на этой неделе|в этом месяце|текущ\w*\s+(период|момент)|сейчас/iu;

export function classifyIntent(question: string): IntentClassification {
  const forbidden = detectForbidden(question);
  if (SYNASTRY_RE.test(question)) return { intent: 'synastry', forbidden };
  if (TRANSIT_RE.test(question)) return { intent: 'transit', forbidden };
  return { intent: 'natal', forbidden };
}
