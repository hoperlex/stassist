/**
 * PNG для OG-карточек через **resvg** (см. docs/architecture/21-техническая-архитектура.md §6:
 * «генерация PNG для шеринга через resvg в worker», НЕ в браузере/API). Чистая CPU-функция —
 * никакого I/O, годится для unit-теста (без сети/БД/ФС, см. §1 конвенций реализации).
 *
 * Источник SVG-разметки — `renderChartWheelSvg`/`renderMatrixOctagramSvg` из `@stassist/ui/render`
 * (тот же код, что рисует SSR/кабинет — «один код рендерит SVG и на страницах, и в PNG»).
 */
import { Resvg, type ResvgRenderOptions } from '@resvg/resvg-js';

export interface OgImageOptions {
  /** Итоговая ширина PNG в px (высота = ширина, колесо/октаграмма квадратные). */
  width?: number;
  backgroundColor?: string;
}

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

/** Рендерит SVG-строку в PNG-буфер. Бросает, если resvg не смог распарсить SVG. */
export function svgToPngBuffer(svg: string, options: OgImageOptions = {}): Buffer {
  const renderOptions: ResvgRenderOptions = {
    fitTo: { mode: 'width', value: options.width ?? 1200 },
    background: options.backgroundColor,
  };
  const resvg = new Resvg(svg, renderOptions);
  const rendered = resvg.render();
  const png = rendered.asPng();
  return Buffer.from(png);
}

/** true, если буфер начинается с корректной PNG-сигнатуры (базовая проверка валидности файла). */
export function isValidPng(buf: Buffer): boolean {
  return buf.length > PNG_MAGIC.length && buf.subarray(0, PNG_MAGIC.length).equals(PNG_MAGIC);
}
