/**
 * packages/ui — общие React-компоненты (SVG-карта ChartWheel, октаграмма матрицы судьбы,
 * виджеты), см. docs/architecture/21-техническая-архитектура.md §1, §6 и docs/roadmap/prompts/
 * f3-калькуляторы-и-карта.md. Первые компоненты — Ф3.
 */
export const UI_PACKAGE_VERSION = '0.1.0-f3';

export { ChartWheel } from './chart-wheel/ChartWheel.js';
export { renderChartWheelSvg } from './chart-wheel/render-chart-wheel.js';
export type { ChartWheelInput, ChartWheelPositions, ChartWheelTheme } from './chart-wheel/types.js';
export { SIGN_GLYPHS, BODY_GLYPHS, SIGN_NAMES_RU, BODY_NAMES_RU, glyphForBody } from './chart-wheel/glyphs.js';

export { MatrixOctagram } from './matrix-octagram/MatrixOctagram.js';
export { renderMatrixOctagramSvg } from './matrix-octagram/render-matrix-octagram.js';
export type { MatrixOctagramInput, MatrixOctagramTheme } from './matrix-octagram/types.js';

export { escapeXml, normalizeDeg, polarToXY, longitudeToScreenAngleDeg } from './shared/svg-utils.js';
