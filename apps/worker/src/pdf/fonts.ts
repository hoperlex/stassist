/**
 * Шрифты для PDF-отчётов (см. docs/roadmap/prompts/f6-нумерология-и-камни.md req.1-2,
 * верификация «корректная кириллица»). pdfkit'овские базовые 14 PDF-шрифтов (Helvetica и т.п.)
 * используют WinAnsiEncoding и НЕ содержат кириллических глифов — печать русского текста ими даёт
 * пустые прямоугольники/мусор. Поэтому здесь встраивается TTF-шрифт с полным покрытием кириллицы.
 *
 * Шрифт — DejaVu Sans (Regular/Bold), бандл в `apps/worker/assets/fonts/` (см. README.md там же):
 * свободная лицензия (Bitstream Vera + общественное достояние дополнений DejaVu, разрешает
 * встраивание в документы), НЕ зависит от того, установлены ли системные шрифты в окружении, где
 * реально исполняется worker (докер-образ/прод-хост) — важно, т.к. §2 конвенций реализации требует
 * «надёжен локально» для PDF-инструментария без docker/системных бинарей.
 *
 * Путь к файлам вычисляется относительно ЭТОГО модуля (`import.meta.url`), а не `process.cwd()` —
 * работает одинаково из `src/pdf/fonts.ts` (dev, tsx) и `dist/pdf/fonts.js` (prod, `tsc`), т.к. оба
 * лежат на одинаковой глубине (`<pkg-root>/{src|dist}/pdf/`), см. `../../assets/fonts/...` ниже.
 */
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import type PDFKit from 'pdfkit';

const ASSETS_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'assets', 'fonts');

export const REPORT_FONT_REGULAR = 'StassistReportSans';
export const REPORT_FONT_BOLD = 'StassistReportSansBold';

/** Регистрирует шрифты с кириллицей в документе — вызывать один раз сразу после `new PDFDocument()`. */
export function registerReportFonts(doc: PDFKit.PDFDocument): void {
  doc.registerFont(REPORT_FONT_REGULAR, path.join(ASSETS_DIR, 'DejaVuSans.ttf'));
  doc.registerFont(REPORT_FONT_BOLD, path.join(ASSETS_DIR, 'DejaVuSans-Bold.ttf'));
  doc.font(REPORT_FONT_REGULAR);
}
