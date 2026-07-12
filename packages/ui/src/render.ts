/**
 * Точка входа БЕЗ React — только чистые функции SVG-рендера (см. chart-wheel/render-chart-wheel.ts,
 * matrix-octagram/render-matrix-octagram.ts). Используется процессами, которым не нужен React в
 * графе зависимостей — worker (resvg-в-worker для PNG, см. docs/architecture/
 * 21-техническая-архитектура.md §6) и, при необходимости, api. Основной барель `index.ts`
 * (React-компоненты `ChartWheel`/`MatrixOctagram`) — для apps/web.
 */
export { renderChartWheelSvg } from './chart-wheel/render-chart-wheel.js';
export type { ChartWheelInput, ChartWheelPositions, ChartWheelTheme } from './chart-wheel/types.js';
export { SIGN_GLYPHS, BODY_GLYPHS, SIGN_NAMES_RU, BODY_NAMES_RU, glyphForBody } from './chart-wheel/glyphs.js';

export { renderMatrixOctagramSvg } from './matrix-octagram/render-matrix-octagram.js';
export type { MatrixOctagramInput, MatrixOctagramTheme } from './matrix-octagram/types.js';

export { escapeXml, normalizeDeg, polarToXY, longitudeToScreenAngleDeg } from './shared/svg-utils.js';
