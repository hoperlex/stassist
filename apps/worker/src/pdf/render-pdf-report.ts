/**
 * Рендер `PdfReportContent` → PDF-буфер через **pdfkit** (см. §2 промта Ф6 «PDF-инструментарий
 * без docker: предпочтительно чистый JS — pdfkit… не требует chromium/системных бинарей»).
 * Полностью в памяти (readable-stream → Buffer), не пишет на диск — юнит-тестируется без
 * файловой системы (§1 конвенций реализации).
 *
 * Оглавление — кликабельное (см. верификацию промта Ф6 «оглавление кликабельно»): каждая строка
 * TOC — `doc.text(..., { goTo: destName })`, куда прыгает клик, а начало соответствующего раздела
 * помечено `{ destination: destName }`; ДОПОЛНИТЕЛЬНО каждый раздел добавлен в PDF outline
 * (`doc.outline.addItem`) — стандартная панель «Закладки» большинства PDF-читалок. Постраничные
 * номера — двупроходно через `bufferPages` (пишем контент, затем `switchToPage` на каждую
 * страницу и рисуем футер) — стандартный приём pdfkit для «номер страницы из N».
 */
import PDFDocument from 'pdfkit';
import { registerReportFonts, REPORT_FONT_BOLD, REPORT_FONT_REGULAR } from './fonts.js';
import type { PdfReportContent } from './report-content-types.js';

export interface RenderPdfReportOptions {
  /** PNG-буфер иллюстрации на обложку (напр. октаграмма матрицы, см. render-pdf-report.test.ts). */
  coverImagePng?: Buffer;
}

export interface RenderedPdfReport {
  buffer: Buffer;
  pageCount: number;
}

const PAGE_MARGIN = 56;
const CONTENT_WIDTH_A4 = 595.28 - PAGE_MARGIN * 2;

function formatDateRu(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function renderPdfReport(
  content: PdfReportContent,
  options: RenderPdfReportOptions = {},
): Promise<RenderedPdfReport> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: PAGE_MARGIN, bottom: PAGE_MARGIN, left: PAGE_MARGIN, right: PAGE_MARGIN },
      bufferPages: true,
      info: {
        Title: content.titleRu,
        Author: 'Зодиакум',
        Subject: content.subtitleRu ?? '',
      },
    });
    registerReportFonts(doc);

    const buffers: Buffer[] = [];
    // `bufferedPageRange()` перестаёт быть достоверным ПОСЛЕ `doc.end()` (буфер страниц уже
    // сброшен в поток) — поэтому число страниц фиксируется в замыкании ДО `doc.end()` (см. цикл
    // футеров ниже), а не пере-запрашивается в обработчике 'end'.
    let finalPageCount = 0;
    doc.on('data', (chunk: Buffer) => buffers.push(chunk));
    doc.on('error', reject);
    doc.on('end', () => {
      resolve({ buffer: Buffer.concat(buffers), pageCount: finalPageCount });
    });

    // --- Обложка -------------------------------------------------------------------------------
    doc.font(REPORT_FONT_BOLD).fontSize(26).text(content.titleRu, { align: 'center' });
    if (content.subtitleRu) {
      doc.moveDown(0.5);
      doc.font(REPORT_FONT_REGULAR).fontSize(14).fillColor('#555555').text(content.subtitleRu, { align: 'center' });
      doc.fillColor('black');
    }
    if (options.coverImagePng) {
      doc.moveDown(2);
      doc.image(options.coverImagePng, { fit: [320, 320], align: 'center' });
    }
    doc.moveDown(2);
    if (content.coverNoteRu) {
      doc.font(REPORT_FONT_REGULAR).fontSize(12).text(content.coverNoteRu, { align: 'center' });
      doc.moveDown(0.5);
    }
    doc.font(REPORT_FONT_REGULAR).fontSize(10).fillColor('#888888');
    doc.text(`Сформировано: ${formatDateRu(content.generatedAtIso)}`, { align: 'center' });
    doc.fillColor('black');

    // --- Оглавление ------------------------------------------------------------------------------
    doc.addPage();
    doc.font(REPORT_FONT_BOLD).fontSize(18).text('Оглавление', { destination: 'toc' });
    doc.moveDown(1);
    const destNames = content.sections.map((_, i) => `section-${i}`);
    doc.font(REPORT_FONT_REGULAR).fontSize(11);
    content.sections.forEach((section, i) => {
      doc
        .fillColor('#1a4fbf')
        .text(`${i + 1}. ${section.heading}`, { width: CONTENT_WIDTH_A4, goTo: destNames[i], underline: true });
      doc.moveDown(0.35);
    });
    doc.fillColor('black');
    doc.moveDown(0.5);
    doc.font(REPORT_FONT_REGULAR).fontSize(11).fillColor('#1a4fbf');
    doc.text('Дисклеймер', { width: CONTENT_WIDTH_A4, goTo: 'disclaimer', underline: true });
    doc.fillColor('black');

    // --- Введение --------------------------------------------------------------------------------
    if (content.introParagraphs.length > 0) {
      doc.addPage();
      doc.font(REPORT_FONT_BOLD).fontSize(16).text('Введение');
      doc.moveDown(0.6);
      doc.font(REPORT_FONT_REGULAR).fontSize(11);
      for (const paragraph of content.introParagraphs) {
        doc.text(paragraph, { align: 'justify' });
        doc.moveDown(0.6);
      }
    }

    // --- Разделы -----------------------------------------------------------------------------
    content.sections.forEach((section, i) => {
      doc.addPage();
      doc.outline.addItem(section.heading);
      doc
        .font(REPORT_FONT_BOLD)
        .fontSize(16)
        .text(`${i + 1}. ${section.heading}`, { destination: destNames[i] });
      if (section.caption) {
        doc.font(REPORT_FONT_REGULAR).fontSize(10).fillColor('#666666').text(section.caption);
        doc.fillColor('black');
      }
      if (section.badge) {
        doc.moveDown(0.3);
        doc.font(REPORT_FONT_REGULAR).fontSize(9).fillColor('#a15c00').text(`⚠ ${section.badge}`);
        doc.fillColor('black');
      }
      doc.moveDown(0.6);
      doc.font(REPORT_FONT_REGULAR).fontSize(11);
      for (const paragraph of section.paragraphs) {
        doc.text(paragraph, { align: 'justify' });
        doc.moveDown(0.6);
      }
    });

    // --- Дисклеймер --------------------------------------------------------------------------
    doc.addPage();
    doc.outline.addItem('Дисклеймер');
    doc.font(REPORT_FONT_BOLD).fontSize(16).text('Дисклеймер', { destination: 'disclaimer' });
    doc.moveDown(0.6);
    doc.font(REPORT_FONT_REGULAR).fontSize(10);
    for (const paragraph of content.disclaimerParagraphs) {
      doc.text(paragraph);
      doc.moveDown(0.4);
    }

    // --- Номера страниц (двупроходно, см. заголовок файла) ---------------------------------------
    const range = doc.bufferedPageRange();
    finalPageCount = range.count;
    for (let i = range.start; i < range.start + range.count; i++) {
      doc.switchToPage(i);
      doc
        .font(REPORT_FONT_REGULAR)
        .fontSize(8)
        .fillColor('#999999')
        .text(`Зодиакум · стр. ${i - range.start + 1} из ${range.count}`, PAGE_MARGIN, doc.page.height - PAGE_MARGIN + 22, {
          width: CONTENT_WIDTH_A4,
          align: 'center',
        });
      doc.fillColor('black');
    }

    doc.end();
  });
}
