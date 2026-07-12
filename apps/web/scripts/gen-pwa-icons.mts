/**
 * Генератор PWA-иконок «Зодиакум» — разовое dev-время (результат коммитим в apps/web/public/).
 * Растеризация через @resvg/resvg-js (тот же движок, что в apps/worker/src/og/render-og-png.ts).
 * Мотив — фирменный LogoMark (см. apps/web/lib/site/SiteLayout.tsx), перекрашенный под контраст
 * на тёмной плитке (градиент ink → peri-deep). Запуск: `pnpm --filter @stassist/web gen:icons`.
 *
 * Скрипт вне tsconfig include и eslint-целей (dev-инструмент), поэтому в gate не участвует;
 * @resvg/resvg-js — devDependency, при `--prod` деплое из образа отбрасывается.
 */
import { Resvg } from '@resvg/resvg-js';
import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');
mkdirSync(publicDir, { recursive: true });

// Палитра под тёмную плитку (базовые фирменные цвета осветлены для контраста).
const INK = '#2A2540';
const PERI_DEEP = '#5B57C7';
const GOLD = '#E6C574';
const MOON = '#DCD9FB';
const PERI_LIGHT = '#9E9CEE';

/** Мотив логотипа в системе координат 40×40 (геометрия LogoMark, перекрашена под тёмный фон). */
function markInner(): string {
  return `
    <circle cx="20" cy="20" r="18.5" stroke="${GOLD}" stroke-width="1.3" opacity="0.85" fill="none"/>
    <circle cx="20" cy="20" r="13" stroke="${PERI_LIGHT}" stroke-width="1.2" opacity="0.7" fill="none"/>
    <path d="M27 13.5a10 10 0 1 0 3.2 9.3A8 8 0 0 1 27 13.5Z" fill="${MOON}"/>
    <path transform="translate(33.5,12.5) scale(0.42)"
      d="M0,-7 C0.6,-2.4 2.4,-0.6 7,0 C2.4,0.6 0.6,2.4 0,7 C-0.6,2.4 -2.4,0.6 -7,0 C-2.4,-0.6 -0.6,-2.4 0,-7 Z"
      fill="${GOLD}"/>
    <circle cx="9.5" cy="27" r="1.6" fill="${GOLD}"/>
  `;
}

/**
 * Собирает SVG-плитку 512×512. markFraction — доля холста под мотив (для maskable ≈0.58 → safe-area
 * ~21% с каждой стороны). rounded — скруглённые углы (иконка-плитка) или полный квадрат (maskable/apple).
 */
function tile(markFraction: number, rounded: boolean): string {
  const S = 512;
  const m = S * markFraction;
  const off = (S - m) / 2;
  const scale = m / 40;
  const rx = rounded ? S * 0.22 : 0;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${INK}"/>
      <stop offset="1" stop-color="${PERI_DEEP}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.42" r="0.55">
      <stop offset="0" stop-color="#FFFFFF" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect x="0" y="0" width="${S}" height="${S}" rx="${rx}" fill="url(#bg)"/>
  <rect x="0" y="0" width="${S}" height="${S}" rx="${rx}" fill="url(#glow)"/>
  <g transform="translate(${off},${off}) scale(${scale})">${markInner()}</g>
</svg>`;
}

function png(svg: string, size: number): Buffer {
  return Buffer.from(new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng());
}

/** Минимальный ICO-контейнер с одним PNG-изображением (современные браузеры принимают PNG-в-ICO). */
function pngToIco(pngBuf: Buffer, size: number): Buffer {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type = icon
  header.writeUInt16LE(1, 4); // image count
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 = 256)
  entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
  entry.writeUInt8(0, 2); // palette count
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(pngBuf.length, 8); // image data size
  entry.writeUInt32LE(22, 12); // offset (6 + 16)
  return Buffer.concat([header, entry, pngBuf]);
}

function out(name: string, data: Buffer | string): void {
  writeFileSync(path.join(publicDir, name), data);
  const len = typeof data === 'string' ? Buffer.byteLength(data) : data.length;
  console.log(`  ✓ ${name} (${len} b)`);
}

const iconTile = tile(0.64, true); // any-иконки/apple — скруглённая плитка
const maskableTile = tile(0.58, false); // maskable — полный квадрат, мотив в safe-зоне
const appleTile = tile(0.62, false); // apple-touch — полный непрозрачный квадрат

console.log('Генерация PWA-иконок → apps/web/public/');
out('favicon.svg', iconTile);
out('favicon.ico', pngToIco(png(iconTile, 32), 32));
out('icon-192.png', png(iconTile, 192));
out('icon-512.png', png(iconTile, 512));
out('icon-maskable-512.png', png(maskableTile, 512));
out('apple-touch-icon.png', png(appleTile, 180));
console.log('Готово.');
