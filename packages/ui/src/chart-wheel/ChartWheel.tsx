import { useMemo } from 'react';
import { renderChartWheelSvg } from './render-chart-wheel.js';
import type { ChartWheelInput } from './types.js';

/**
 * Изоморфная React-обёртка над {@link renderChartWheelSvg}: та же SVG-строка рендерится и на
 * сервере (SSR-HTML), и на клиенте (после гидратации), и в воркере для PNG (там — напрямую
 * `renderChartWheelSvg`, без React, см. apps/worker/src/og). `dangerouslySetInnerHTML` тут
 * безопасен: разметка строится детерминированной функцией из уже провалидированных
 * zod-схемой чисел (ChartData), а не из пользовательского HTML.
 */
export function ChartWheel(props: ChartWheelInput): React.JSX.Element {
  const svg = useMemo(() => renderChartWheelSvg(props), [props]);
  return <div className="stassist-chart-wheel" dangerouslySetInnerHTML={{ __html: svg }} />;
}
