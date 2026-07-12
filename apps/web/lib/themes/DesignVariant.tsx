/**
 * Рендерит один вариант оформления главной: инъектит его CSS (глобальный, включая правила для
 * body/фона — этим достигается полностраничный образ) и HTML-разметку макета. Одновременно
 * смонтирован только один вариант, поэтому глобальные селекторы вариантов между собой не
 * конфликтуют. Монтируется только на клиенте (по выбору пользователя) — SSR отдаёт «текущий».
 */
import type { VariantAsset } from './variants.js';

export function DesignVariant({ asset }: { asset: VariantAsset }): React.JSX.Element {
  return (
    <div className="zx-variant-root">
      <style dangerouslySetInnerHTML={{ __html: asset.css }} />
      <div dangerouslySetInnerHTML={{ __html: asset.html }} />
    </div>
  );
}
