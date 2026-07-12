/**
 * MatrixOctagram — изоморфный SVG-рендер октаграммы «матрицы судьбы» (см. findings f3.md
 * [internal-completeness] «SVG-октаграмма не выделена как переиспользуемый компонент»):
 * ЧИСТАЯ функция без I/O, та же дисциплина, что и ChartWheel (см. render-chart-wheel.ts) —
 * переиспользуется Ф6 (PDF матрицы) через resvg.
 *
 * Рисует ТОЛЬКО числа арканов (1–22) — вычисленный факт (`@stassist/numerology-core`,
 * `corePointsMethodologyVerified: true`). Текстовые ТРАКТОВКИ арканов — контент, которым
 * владеет Ф4 (см. docs/roadmap/31-конвенции-реализации.md §6) — этот компонент их не рисует;
 * страница-потребитель (apps/web pages/matrica-sudby) обязана показать честный empty-state рядом.
 */
import { escapeXml, polarToXY } from '../shared/svg-utils.js';
import { paletteFor } from './palette.js';
import type { MatrixOctagramInput } from './types.js';

interface OctagramVertex {
  code: string;
  labelRu: string;
  angleDeg: number;
  value: number;
}

/** Экранные углы 8 вершин (см. заголовок файла: A/B/C/D — прямой квадрат, F1..F4 — повёрнутый). */
function buildVertices(input: MatrixOctagramInput): OctagramVertex[] {
  const cp = input.corePoints;
  return [
    { code: 'A', labelRu: 'День', angleDeg: 90, value: cp.day },
    { code: 'F1', labelRu: 'Ф1', angleDeg: 45, value: cp.f1 },
    { code: 'B', labelRu: 'Месяц', angleDeg: 0, value: cp.month },
    { code: 'F2', labelRu: 'Ф2', angleDeg: 315, value: cp.f2 },
    { code: 'C', labelRu: 'Год', angleDeg: 270, value: cp.yearSum },
    { code: 'F3', labelRu: 'Ф3', angleDeg: 225, value: cp.f3 },
    { code: 'D', labelRu: 'Задачи', angleDeg: 180, value: cp.tasks },
    { code: 'F4', labelRu: 'Ф4', angleDeg: 135, value: cp.f4 },
  ];
}

export function renderMatrixOctagramSvg(input: MatrixOctagramInput): string {
  const size = input.size ?? 420;
  const palette = paletteFor(input.theme);
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = size * 0.4;
  const nodeRadius = size * 0.055;

  const vertices = buildVertices(input);
  const byCode = new Map(vertices.map((v) => [v.code, v]));
  const xy = (v: OctagramVertex) => polarToXY(cx, cy, rOuter, v.angleDeg);

  const svg: string[] = [];
  const title = input.title ?? 'Матрица судьбы';
  svg.push(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="${escapeXml(title)}">`,
  );
  svg.push(`<title>${escapeXml(title)}</title>`);
  svg.push(`<rect x="0" y="0" width="${size}" height="${size}" fill="${palette.background}" />`);

  // прямой квадрат A-B-C-D
  const square1 = ['A', 'B', 'C', 'D'].map((c) => xy(byCode.get(c)!));
  svg.push(
    `<polygon points="${square1.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ')}" fill="none" stroke="${palette.squareA}" stroke-width="1.5" />`,
  );
  // повёрнутый квадрат F1-F2-F3-F4
  const square2 = ['F1', 'F2', 'F3', 'F4'].map((c) => xy(byCode.get(c)!));
  svg.push(
    `<polygon points="${square2.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ')}" fill="none" stroke="${palette.squareB}" stroke-width="1.5" />`,
  );

  // диагонали F-квадрата — линия отношений (F1-F3) и денежная линия (F2-F4), см.
  // numerology-core matrixOfDestinyDerivedSections: relationshipLine=reduce(f1+f3), moneyLine=reduce(f2+f4)
  const f1 = xy(byCode.get('F1')!);
  const f3 = xy(byCode.get('F3')!);
  const f2 = xy(byCode.get('F2')!);
  const f4 = xy(byCode.get('F4')!);
  svg.push(
    `<line x1="${f1.x.toFixed(2)}" y1="${f1.y.toFixed(2)}" x2="${f3.x.toFixed(2)}" y2="${f3.y.toFixed(2)}" stroke="${palette.relationshipLine}" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.8" />`,
  );
  svg.push(
    `<line x1="${f2.x.toFixed(2)}" y1="${f2.y.toFixed(2)}" x2="${f4.x.toFixed(2)}" y2="${f4.y.toFixed(2)}" stroke="${palette.moneyLine}" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.8" />`,
  );

  // спицы от центра (E) к каждой из 8 вершин
  for (const v of vertices) {
    const p = xy(v);
    svg.push(
      `<line x1="${cx}" y1="${cy}" x2="${p.x.toFixed(2)}" y2="${p.y.toFixed(2)}" stroke="${palette.spoke}" stroke-width="1" opacity="0.6" />`,
    );
  }

  // центр — E (зона комфорта)
  svg.push(
    `<circle cx="${cx}" cy="${cy}" r="${nodeRadius}" fill="${palette.centerFill}" stroke="${palette.nodeStroke}" stroke-width="1.5" />`,
  );
  svg.push(
    `<text x="${cx}" y="${cy}" font-size="${(size * 0.05).toFixed(1)}" text-anchor="middle" dominant-baseline="central" fill="${palette.nodeText}" font-weight="700">${input.corePoints.center}</text>`,
  );

  // 8 вершин: кружок с номером аркана + подпись кода точки
  for (const v of vertices) {
    const p = xy(v);
    svg.push(
      `<circle cx="${p.x.toFixed(2)}" cy="${p.y.toFixed(2)}" r="${nodeRadius}" fill="${palette.nodeFill}" stroke="${palette.nodeStroke}" stroke-width="1.5" />`,
    );
    svg.push(
      `<text x="${p.x.toFixed(2)}" y="${p.y.toFixed(2)}" font-size="${(size * 0.045).toFixed(1)}" text-anchor="middle" dominant-baseline="central" fill="${palette.nodeText}" font-weight="700"><title>${escapeXml(v.labelRu)}</title>${v.value}</text>`,
    );
    const labelPos = polarToXY(cx, cy, rOuter + size * 0.075, v.angleDeg);
    svg.push(
      `<text x="${labelPos.x.toFixed(2)}" y="${labelPos.y.toFixed(2)}" font-size="${(size * 0.028).toFixed(1)}" text-anchor="middle" dominant-baseline="central" fill="${palette.textSecondary}">${escapeXml(v.labelRu)}</text>`,
    );
  }

  svg.push('</svg>');
  return svg.join('');
}
