/**
 * Обезличенный снапшот `chart_shares` (positions/positionsB, см. packages/shared/src/schemas/
 * calc.ts `SharePositions`) → вход для {@link renderChartWheelSvg} (`@stassist/ui/render`) — та
 * же функция, что рисует SSR-страницу шеринга (см. apps/web pages/podelitsya/@slug). ЧИСТАЯ
 * функция, не трогает БД/сеть — юнит-тестируется напрямую.
 */
import type { ChartWheelInput } from '@stassist/ui/render';
import type { SharePositions, ShareKind } from '@stassist/shared';

export interface ShareSvgSource {
  kind: ShareKind;
  positions: SharePositions;
  positionsB: SharePositions | null;
  /** Ф9, только kind='transit_day': подпись отклика на карточке (см. chart_shares.caption). */
  caption?: string | null;
  theme: 'light' | 'dark';
}

function toWheelPositions(p: SharePositions) {
  return {
    bodies: p.bodies,
    points: p.points,
    angles: p.angles,
    houses: p.houses,
    aspects: p.aspects,
    noHouses: p.meta.noHouses,
  };
}

const SHARE_TITLE_RU: Record<ShareKind, string> = {
  natal: 'Натальная карта — Зодиакум',
  synastry: 'Совместимость — Зодиакум',
  transit_day: 'Небо дня — Зодиакум',
};

export function buildShareChartWheelInput(source: ShareSvgSource): ChartWheelInput {
  // Биколесо: synastry — вторая наталка, transit_day — натал (primary) + транзитный снапшот дня.
  const secondary =
    (source.kind === 'synastry' || source.kind === 'transit_day') && source.positionsB
      ? toWheelPositions(source.positionsB)
      : undefined;
  return {
    theme: source.theme,
    primary: toWheelPositions(source.positions),
    secondary,
    title: SHARE_TITLE_RU[source.kind],
  };
}

function escapeXml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Наивный перенос подписи на строки ≤`max` символов по словам (caption ≤120 — максимум 3 строки). */
function wrapCaption(caption: string, max = 44): string[] {
  const words = caption.split(/\s+/);
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    if (line && (line + ' ' + word).length > max) {
      lines.push(line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

/**
 * Ф9: карточка «Небо дня» с подписью — колесо (см. buildShareChartWheelInput) компонуется в
 * OG-формат 1200×630 с текстом слева. ЧИСТАЯ функция над готовой SVG-строкой колеса: вложенный
 * `<svg x y>` валиден для resvg. Для карточек без caption вызывающая сторона использует
 * SVG колеса как есть (см. process-pending-shares.ts).
 */
export function composeTransitDayShareSvg(wheelSvg: string, caption: string, theme: 'light' | 'dark'): string {
  const background = theme === 'dark' ? '#1a1730' : '#ffffff';
  const textPrimary = theme === 'dark' ? '#f0ecff' : '#2b2640';
  const textSecondary = theme === 'dark' ? '#a89fd0' : '#6f6894';
  const positionedWheel = wheelSvg.replace('<svg ', '<svg x="660" y="75" ');
  const lines = wrapCaption(caption)
    .map((line, i) => `<text x="72" y="${300 + i * 44}" font-family="serif" font-size="32" fill="${textPrimary}">${escapeXml(line)}</text>`)
    .join('');
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630" role="img" aria-label="${escapeXml(caption)}">`,
    `<rect x="0" y="0" width="1200" height="630" fill="${background}" />`,
    `<text x="72" y="120" font-family="serif" font-size="44" fill="${textPrimary}">Небо дня</text>`,
    `<text x="72" y="170" font-family="sans-serif" font-size="24" fill="${textSecondary}">небо у всех одно — карта у каждого своя</text>`,
    lines,
    `<text x="72" y="560" font-family="sans-serif" font-size="22" fill="${textSecondary}">Зодиакум · а как это небо у тебя?</text>`,
    positionedWheel,
    '</svg>',
  ].join('');
}
