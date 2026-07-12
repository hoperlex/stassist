/**
 * cache_key — единственный источник правды по формуле (см. находку [корректность-кэша] в
 * _work/build/findings/f4.md): «профиль + тип разбора + версия промта + preset_id + core_version»
 * (+ sphere для natal_full, т.к. каждая сфера — отдельный текст, + partnerBirthProfileId для
 * synastry). Смена пресета ИЛИ апгрейд ядра/промта → новый ключ → кэш не отдаёт протухший отчёт.
 * `packages/llm/src/reports/pipeline.ts` ищет существующий `ai_reports` со status='done' по
 * этому ключу ПЕРЕД тем, как звать LlmProvider (см. requirement «повторный запрос не платит»).
 */
import { createHash } from 'node:crypto';
import type { ReportKind } from '@stassist/shared';

export interface CacheKeyInput {
  birthProfileId: string;
  kind: ReportKind;
  promptVersion: string;
  presetId: string;
  coreVersion: string;
  /** Только для kind='natal_full' — каждая сфера кэшируется отдельно. */
  sphere?: string;
  /** Только для kind='synastry'. */
  partnerBirthProfileId?: string;
  /** Только для kind='custom_question' — разные вопросы не должны схлопываться в один кэш. */
  question?: string;
}

export function buildCacheKey(input: CacheKeyInput): string {
  const parts = [
    input.birthProfileId,
    input.kind,
    input.promptVersion,
    input.presetId,
    input.coreVersion,
    input.sphere ?? '',
    input.partnerBirthProfileId ?? '',
    input.question ?? '',
  ];
  return createHash('sha256').update(parts.join('|')).digest('hex');
}
