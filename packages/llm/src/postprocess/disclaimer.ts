/**
 * Автодисклеймер (незыблемое правило №2 f4-промта: «каждый отчёт содержит… дисклеймер
 * „информационно-развлекательный характер“»). Переиспользует ЕДИНЫЙ текст из
 * `@stassist/shared` (legal/doc-versions.ts, DISCLAIMER_TEXT_RU) — не дублирует формулировку.
 */
import { DISCLAIMER_TEXT_RU } from '@stassist/shared';

export function appendDisclaimer(contentMd: string): string {
  if (contentMd.includes(DISCLAIMER_TEXT_RU)) return contentMd;
  return `${contentMd}\n\n---\n\n${DISCLAIMER_TEXT_RU}`;
}
