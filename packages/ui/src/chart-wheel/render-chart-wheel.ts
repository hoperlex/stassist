/**
 * ChartWheel — изоморфный SVG-рендер натальной/синастрической карты: ЧИСТАЯ функция без I/O,
 * строит полную SVG-строку (не React-дерево), поэтому один и тот же код используется:
 *  - на SSR-страницах (см. apps/web/pages/natalnaya-karta) через React-обёртку `ChartWheel.tsx`
 *    (dangerouslySetInnerHTML — тот же марк-ап, что и на клиенте после гидратации);
 *  - в кабинете (та же обёртка);
 *  - в воркере для PNG (resvg рендерит эту же строку напрямую, БЕЗ React, см.
 *    apps/worker/src/og/render-og-png.ts) — «один код рендерит SVG и на SSR, и в PNG»
 *    (см. docs/architecture/21-техническая-архитектура.md §6).
 *
 * Известные упрощения MVP (документируются, а не скрываются — см. корневой CLAUDE.md):
 *  - без де-коллизии соседних глифов (тесно стоящие планеты могут визуально перекрываться);
 *  - арабские части (Фортуна) не отображаются;
 *  - синастрия — «биколесо» (домы и зодиак всегда от карты A, планеты B — во внутреннем кольце).
 */
import type { Aspect, AspectAngleName, Position } from '@stassist/shared';
import { BODY_NAMES_RU, SIGN_GLYPHS, SIGN_NAMES_RU, glyphForBody } from './glyphs.js';
import { paletteFor } from './palette.js';
import type { ChartWheelInput, ChartWheelPositions } from './types.js';
import { escapeXml, longitudeToScreenAngleDeg, normalizeDeg, polarToXY } from '../shared/svg-utils.js';

const HARD_ASPECTS = new Set<AspectAngleName>(['square', 'opposition']);
const SOFT_ASPECTS = new Set<AspectAngleName>(['trine', 'sextile']);
const MINOR_ASPECTS = new Set<AspectAngleName>([
  'semisextile', 'semisquare', 'sesquiquadrate', 'quincunx', 'quintile', 'biquintile',
]);

interface RingEntry {
  key: string;
  pos: Position;
  angleDeg: number;
  radius: number;
}

function flattenPositions(positions: ChartWheelPositions): Array<{ key: string; pos: Position }> {
  const out: Array<{ key: string; pos: Position }> = [];
  for (const [key, pos] of Object.entries(positions.bodies)) {
    if (pos) out.push({ key, pos: pos as Position });
  }
  for (const [key, pos] of Object.entries(positions.points)) {
    if (pos) out.push({ key, pos: pos as Position });
  }
  return out;
}

function aspectColor(angleName: AspectAngleName, palette: ReturnType<typeof paletteFor>): { color: string; dashed: boolean } {
  if (angleName === 'conjunction') return { color: palette.aspectNeutral, dashed: false };
  if (HARD_ASPECTS.has(angleName)) return { color: palette.aspectHard, dashed: false };
  if (SOFT_ASPECTS.has(angleName)) return { color: palette.aspectSoft, dashed: false };
  if (MINOR_ASPECTS.has(angleName)) return { color: palette.aspectMinor, dashed: true };
  return { color: palette.aspectNeutral, dashed: true };
}

/** Строит полную SVG-строку (с XML-заголовком отсутствует — годится и для inline, и для resvg). */
export function renderChartWheelSvg(input: ChartWheelInput): string {
  const size = input.size ?? 480;
  const palette = paletteFor(input.theme);
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = size * 0.48;
  const rZodiacInner = size * 0.4;
  const rHouseNum = size * 0.365;
  const hasSecondary = Boolean(input.secondary);
  const rPlanetPrimary = size * (hasSecondary ? 0.34 : 0.3);
  const rPlanetSecondary = size * 0.19;
  const rInner = size * (hasSecondary ? 0.1 : 0.14);

  const primary = input.primary;
  const noHouses = Boolean(primary.noHouses) || primary.houses.length !== 12;
  const ascDeg = noHouses ? 0 : primary.angles.ascDeg;
  const angle = (lonDeg: number): number => longitudeToScreenAngleDeg(lonDeg, ascDeg);

  const svg: string[] = [];
  svg.push(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="${escapeXml(input.title ?? 'Натальная карта')}">`,
  );
  svg.push(`<title>${escapeXml(input.title ?? 'Натальная карта')}</title>`);
  svg.push(`<rect x="0" y="0" width="${size}" height="${size}" fill="${palette.background}" />`);

  // --- зодиакальное кольцо: 12 секторов со стихийной подсветкой + глиф знака ---
  for (let i = 0; i < 12; i++) {
    const segStart = angle(i * 30);
    const segEnd = angle((i + 1) * 30);
    // segStart больше segEnd численно (углы убывают по часовой из-за конвенции CCW) — строим дугу
    // явно по двум точкам на rOuter/rZodiacInner, используя large-arc/sweep = 0 (по часовой в SVG).
    const p1 = polarToXY(cx, cy, rOuter, segStart);
    const p2 = polarToXY(cx, cy, rOuter, segEnd);
    const p3 = polarToXY(cx, cy, rZodiacInner, segEnd);
    const p4 = polarToXY(cx, cy, rZodiacInner, segStart);
    const elementByIndex: Array<'fire' | 'earth' | 'air' | 'water'> = ['fire', 'earth', 'air', 'water'];
    const element = elementByIndex[i % 4]!;
    svg.push(
      `<path d="M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${rOuter.toFixed(2)} ${rOuter.toFixed(2)} 0 0 0 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} L ${p3.x.toFixed(2)} ${p3.y.toFixed(2)} A ${rZodiacInner.toFixed(2)} ${rZodiacInner.toFixed(2)} 0 0 1 ${p4.x.toFixed(2)} ${p4.y.toFixed(2)} Z" fill="${palette.signBand[element]}" stroke="${palette.ringStroke}" stroke-width="1" />`,
    );
    const glyphAngle = angle(i * 30 + 15);
    const glyphPos = polarToXY(cx, cy, (rOuter + rZodiacInner) / 2, glyphAngle);
    svg.push(
      `<text x="${glyphPos.x.toFixed(2)}" y="${glyphPos.y.toFixed(2)}" font-size="${(size * 0.032).toFixed(1)}" text-anchor="middle" dominant-baseline="central" fill="${palette.textPrimary}"><title>${escapeXml(SIGN_NAMES_RU[i]!)}</title>${SIGN_GLYPHS[i]}</text>`,
    );
  }
  svg.push(`<circle cx="${cx}" cy="${cy}" r="${rOuter}" fill="none" stroke="${palette.ringStroke}" stroke-width="1.5" />`);
  svg.push(`<circle cx="${cx}" cy="${cy}" r="${rZodiacInner}" fill="none" stroke="${palette.ringStroke}" stroke-width="1" />`);

  // --- дома: линии куспидов + номера (пропускаются, если время рождения неизвестно) ---
  if (!noHouses) {
    for (let i = 0; i < 12; i++) {
      const cuspDeg = primary.houses[i]!.longitudeDeg;
      const nextCuspDeg = primary.houses[(i + 1) % 12]!.longitudeDeg;
      const a = angle(cuspDeg);
      const isAngular = i === 0 || i === 3 || i === 6 || i === 9; // ASC/IC/DSC/MC
      const p1 = polarToXY(cx, cy, rInner, a);
      const p2 = polarToXY(cx, cy, rZodiacInner, a);
      svg.push(
        `<line x1="${p1.x.toFixed(2)}" y1="${p1.y.toFixed(2)}" x2="${p2.x.toFixed(2)}" y2="${p2.y.toFixed(2)}" stroke="${isAngular ? palette.angleLine : palette.houseLine}" stroke-width="${isAngular ? 2 : 1}" />`,
      );
      const span = normalizeDeg(nextCuspDeg - cuspDeg) || 360;
      const midDeg = cuspDeg + span / 2;
      const midAngle = angle(midDeg);
      const numPos = polarToXY(cx, cy, rHouseNum, midAngle);
      svg.push(
        `<text x="${numPos.x.toFixed(2)}" y="${numPos.y.toFixed(2)}" font-size="${(size * 0.022).toFixed(1)}" text-anchor="middle" dominant-baseline="central" fill="${palette.textSecondary}">${i + 1}</text>`,
      );
    }
    const angleLabels: Array<[number, string]> = [
      [primary.angles.ascDeg, 'ASC'],
      [primary.angles.mcDeg, 'MC'],
      [primary.angles.dscDeg, 'DSC'],
      [primary.angles.icDeg, 'IC'],
    ];
    for (const [lon, label] of angleLabels) {
      const a = angle(lon);
      const pos = polarToXY(cx, cy, rOuter + size * 0.025, a);
      svg.push(
        `<text x="${pos.x.toFixed(2)}" y="${pos.y.toFixed(2)}" font-size="${(size * 0.024).toFixed(1)}" text-anchor="middle" dominant-baseline="central" fill="${palette.angleLine}" font-weight="600">${label}</text>`,
      );
    }
  }

  svg.push(`<circle cx="${cx}" cy="${cy}" r="${rInner}" fill="none" stroke="${palette.ringStroke}" stroke-width="1" />`);

  // --- планеты: карта A на своём кольце, карта B (если есть) — на внутреннем кольце ---
  const plainRing = new Map<string, RingEntry>();
  const prefixedRing = new Map<string, RingEntry>();
  for (const { key, pos } of flattenPositions(primary)) {
    const entry: RingEntry = { key, pos, angleDeg: angle(pos.longitudeDeg), radius: rPlanetPrimary };
    plainRing.set(key, entry);
    prefixedRing.set(`a:${key}`, entry);
  }
  if (input.secondary) {
    for (const { key, pos } of flattenPositions(input.secondary)) {
      const entry: RingEntry = { key, pos, angleDeg: angle(pos.longitudeDeg), radius: rPlanetSecondary };
      prefixedRing.set(`b:${key}`, entry);
    }
  }

  function drawBody(entry: RingEntry, color: string): void {
    const pos = polarToXY(cx, cy, entry.radius, entry.angleDeg);
    const glyph = glyphForBody(entry.key);
    const nameRu = BODY_NAMES_RU[entry.key] ?? entry.key;
    const retro = entry.pos.isRetrograde ? ' ℞' : '';
    svg.push(
      `<text x="${pos.x.toFixed(2)}" y="${pos.y.toFixed(2)}" font-size="${(size * (glyph.length > 1 ? 0.024 : 0.03)).toFixed(1)}" text-anchor="middle" dominant-baseline="central" fill="${color}"><title>${escapeXml(nameRu)}${retro}</title>${escapeXml(glyph)}${retro}</text>`,
    );
  }
  for (const entry of plainRing.values()) drawBody(entry, palette.planetPrimary);
  if (input.secondary) {
    for (const [key, entry] of prefixedRing) {
      if (key.startsWith('b:')) drawBody(entry, palette.planetSecondary);
    }
  }

  // --- аспекты: линии между позициями тел на внутреннем круге ---
  function drawAspects(aspects: readonly Aspect[], ring: Map<string, RingEntry>): void {
    for (const aspect of aspects) {
      const a = ring.get(aspect.bodyA);
      const b = ring.get(aspect.bodyB);
      if (!a || !b) continue; // напр. арабские части — не отображаются на колесе (см. заголовок файла)
      const { color, dashed } = aspectColor(aspect.angleName, palette);
      const p1 = polarToXY(cx, cy, rInner, a.angleDeg);
      const p2 = polarToXY(cx, cy, rInner, b.angleDeg);
      svg.push(
        `<line x1="${p1.x.toFixed(2)}" y1="${p1.y.toFixed(2)}" x2="${p2.x.toFixed(2)}" y2="${p2.y.toFixed(2)}" stroke="${color}" stroke-width="${aspect.angleName === 'conjunction' ? 1 : 1.2}" ${dashed ? 'stroke-dasharray="4 3"' : ''} opacity="0.85" />`,
      );
    }
  }
  drawAspects(primary.aspects, plainRing);
  if (input.crossAspects && input.crossAspects.length > 0) {
    drawAspects(input.crossAspects, prefixedRing);
  }

  svg.push('</svg>');
  return svg.join('');
}
