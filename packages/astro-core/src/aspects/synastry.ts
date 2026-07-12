/**
 * Межкартовые (синастрические) аспекты: аспекты МЕЖДУ телами двух разных карт (а не внутри одной
 * карты). Переиспользует геометрию/орбисы {@link detectAspects} — префиксует ключи тел ('a:'/'b:')
 * и отбрасывает пары внутри одной карты (которые detectAspects тоже посчитал бы, раз объединённый
 * список содержит оба набора тел).
 *
 * Используется публичным калькулятором совместимости (`/sovmestimost/{a}-i-{b}`, см. docs/roadmap/
 * prompts/f3-калькуляторы-и-карта.md) — чистая функция, без I/O, без сохранения дат рождения.
 */
import type { Aspect, AspectSet, OrbsConfig } from '@stassist/shared';
import { detectAspects, type AspectableBody } from './index.js';

export interface SynastryAspectsConfig {
  readonly aspectSet: AspectSet;
  readonly orbs?: OrbsConfig;
}

/**
 * @param bodiesA тела/точки карты A (ключи БЕЗ префикса, например `sun`, `meanNode`)
 * @param bodiesB тела/точки карты B
 * @returns аспекты, где `bodyA` всегда из карты A (префикс `a:`), `bodyB` — из карты B (`b:`)
 */
export function detectSynastryAspects(
  bodiesA: readonly AspectableBody[],
  bodiesB: readonly AspectableBody[],
  config: SynastryAspectsConfig,
): Aspect[] {
  const prefixedA = bodiesA.map((b) => ({ ...b, key: `a:${b.key}` }));
  const prefixedB = bodiesB.map((b) => ({ ...b, key: `b:${b.key}` }));
  const all = detectAspects([...prefixedA, ...prefixedB], config);
  return all.filter(
    (aspect) =>
      (aspect.bodyA.startsWith('a:') && aspect.bodyB.startsWith('b:')) ||
      (aspect.bodyA.startsWith('b:') && aspect.bodyB.startsWith('a:')),
  );
}
