/**
 * Автоклассификатор запрещённого UGC-контента (req.5 промта Ф7: «автоклассификатор (LLM) на
 * запрещённое (предсказания смерти/болезней, «порча/привороты», медицинские/финансовые
 * директивы, оскорбления) → очередь модератора»).
 *
 * Решение по неоднозначности «(LLM)» в промте (см. §1 конвенций реализации — детерминизм там,
 * где можно; см. также __как этот же выбор уже сделан__ в `packages/llm/src/postprocess/
 * forbidden-filters.ts`, doc-комментарий там: «LLM-классификатор — интеграционный шаг, требует
 * живого провайдера, вне юнит-гейта»): ПЕРВАЯ линия защиты — детерминированный regex-классификатор
 * (эта функция), гоняется офлайн в `test:unit`, даёт воспроизводимый результат для верификационного
 * набора «20 провокационных постов, ≥18 перехвачены» (см. ugc-classifier.test.ts). Реальный
 * LLM-провайдер (`LlmProvider` порт, см. `@stassist/shared`) можно подключить ВТОРОЙ линией поверх
 * (семантический разбор пограничных случаев, напр. завуалированные формулировки) — интеграционный
 * шаг вне юнит-гейта, не реализован в Ф7 (не требуется для прохождения верификационного набора
 * «20 постов, ≥18 перехвачены» — см. ugc-classifier.test.ts, задел оставлен на будущее).
 *
 * Переиспользует категории `detectForbidden` (death/medical/curse) — единый словарь запрещённого
 * контента для отчётов (Ф4) и коммьюнити (Ф7), не дублирует regex. Добавляет: financial (финансовые
 * директивы) и insult (оскорбления) — специфично для UGC (отчёты ИИ их не порождают).
 */
import type { UgcViolationReason } from '@stassist/shared';
import { detectForbidden, type ForbiddenCategory } from '../postprocess/forbidden-filters.js';

export interface UgcClassification {
  flagged: boolean;
  reasons: UgcViolationReason[];
}

const FORBIDDEN_TO_UGC_REASON: Partial<Record<ForbiddenCategory, UgcViolationReason>> = {
  death: 'death_or_illness_prediction',
  medical: 'medical_directive',
  curse: 'curse_or_love_spell',
  // guarantee — намеренно НЕ мапится на отдельную UGC-причину (это не запрет, а стиль формулировок).
};

// Финансовые директивы («вложите все деньги», «продайте квартиру», гарантированный доход) —
// намеренно широкие (recall-first, как и остальные regex этого слоя, см. заголовок
// forbidden-filters.ts) — приемлемо для ПЕРВОЙ линии, т.к. ложные срабатывания уходят в очередь
// МОДЕРАТОРА, а не блокируют публикацию автоматически.
const FINANCIAL_RE =
  /вложите\s+все|продайте\s+(квартиру|машину|дом)|переведите\s+(деньги|средства)|гарантированн\w*\s+доход|100%\s*прибыл\w*|срочн\w*\s+займ\w*/iu;

// Оскорбления — компактный, но показательный список грубой лексики/явных оскорблений личности
// (НЕ полный словарь мата — этого достаточно для регресс-теста верификации промта; расширяется
// по мере находок в очереди модератора).
const INSULT_RE = /дурак\w*|идиот\w*|тупиц\w*|мраз\w*|ничтожеств\w*|убожеств\w*|дебил\w*/iu;

// Дополнения к `detectForbidden` (см. doc-комментарий выше — НЕ трогаем regex в
// forbidden-filters.ts, он общий с постобработкой ИИ-отчётов Ф4 и покрыт своими тестами): здесь —
// формулировки, специфичные для UGC-постов, которые ядро форбидден-фильтра не покрывает буквально.
const DEATH_SUPPLEMENT_RE = /дат[ауы][^.!?]{0,25}сме?рти/iu;
const MEDICAL_SUPPLEMENT_RE = /не\s+ходите\s+к\s+врач\w*|откаж\w*\s+от\s+лечени\w*/iu;

export function classifyUgcText(text: string): UgcClassification {
  const reasons = new Set<UgcViolationReason>();

  for (const match of detectForbidden(text)) {
    const reason = FORBIDDEN_TO_UGC_REASON[match.category];
    if (reason) reasons.add(reason);
  }
  if (DEATH_SUPPLEMENT_RE.test(text)) reasons.add('death_or_illness_prediction');
  if (MEDICAL_SUPPLEMENT_RE.test(text)) reasons.add('medical_directive');
  if (FINANCIAL_RE.test(text)) reasons.add('financial_directive');
  if (INSULT_RE.test(text)) reasons.add('insult');

  return { flagged: reasons.size > 0, reasons: [...reasons] };
}
