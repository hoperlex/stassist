/**
 * Проверяет, что pdfkit реально даёт непустой валидный PDF-буфер (см. верификацию промта Ф6:
 * «генерация PDF ≤30 с, корректная кириллица, оглавление кликабельно… все разделы заполнены»,
 * находку [pdf-toolchain] в _work/build/findings/f6.md — pdfkit НЕ требует chromium/системных
 * бинарей, поэтому, в отличие от playwright-варианта, эта проверка идёт в test:unit БЕЗ инфры).
 */
import { describe, expect, it } from 'vitest';
import type { PdfReportContent } from './report-content-types.js';
import { renderPdfReport } from './render-pdf-report.js';

function sampleContent(sectionsCount: number): PdfReportContent {
  return {
    titleRu: 'Матрица судьбы — полная расшифровка',
    subtitleRu: 'Тестовый профиль · кириллица: Овен, Скорпион, Ф1—Ф4',
    coverNoteRu: 'Подготовлено для профиля «Тест»',
    introParagraphs: ['Это вступление отчёта, проверяющее перенос строк и русский текст.'],
    sections: Array.from({ length: sectionsCount }, (_, i) => ({
      heading: `Раздел ${i + 1} — проверка кириллицы «ёжик», «Юпитер»`,
      caption: `Аркан ${(i % 22) + 1}`,
      paragraphs: [`Текст раздела номер ${i + 1}. ${'Довольно длинный абзац для проверки переноса строк. '.repeat(4)}`],
      badge: i === 0 ? 'рабочая гипотеза — требует сверки заказчиком' : undefined,
    })),
    disclaimerParagraphs: ['Материалы носят информационно-развлекательный характер.', 'Не является медицинской консультацией.'],
    generatedAtIso: '2026-07-12T10:00:00.000Z',
  };
}

const PDF_MAGIC = '%PDF-';
const PDF_EOF = '%%EOF';

describe('renderPdfReport — pdfkit даёт непустой валидный PDF-буфер (без сети/ФС/БД)', () => {
  it('буфер начинается с сигнатуры %PDF- и заканчивается %%EOF', async () => {
    const { buffer } = await renderPdfReport(sampleContent(3));
    expect(buffer.subarray(0, PDF_MAGIC.length).toString('latin1')).toBe(PDF_MAGIC);
    const tail = buffer.subarray(Math.max(0, buffer.length - 32)).toString('latin1');
    expect(tail).toContain(PDF_EOF);
  });

  it('буфер существенного размера (не пустая заглушка)', async () => {
    const { buffer } = await renderPdfReport(sampleContent(3));
    expect(buffer.length).toBeGreaterThan(3000);
  });

  it('число страниц = обложка + оглавление + введение + N разделов + дисклеймер', async () => {
    const { pageCount } = await renderPdfReport(sampleContent(5));
    // обложка(1) + оглавление(1) + введение(1) + 5 разделов + дисклеймер(1) = 9
    expect(pageCount).toBe(9);
  });

  it('30-страничная «матрица судьбы»: попадает в целевой диапазон 25–35 страниц (req.1 промта Ф6)', async () => {
    const { pageCount } = await renderPdfReport(sampleContent(30));
    expect(pageCount).toBeGreaterThanOrEqual(25);
    expect(pageCount).toBeLessThanOrEqual(35);
  });

  it('встраивает TTF-шрифт с кириллицей (не только базовые 14 PDF-шрифтов без кириллицы)', async () => {
    const { buffer } = await renderPdfReport(sampleContent(1));
    const text = buffer.toString('latin1');
    // FontFile2 = встроенная программа TrueType-шрифта (см. fonts.ts) — доказательство, что
    // документ НЕ полагается на базовые 14 PDF-шрифтов (Helvetica и т.п., без кириллицы).
    expect(text).toContain('FontFile2');
    expect(text).toContain('DejaVuSans');
  });

  it('без разделов и без обложки-картинки всё равно рендерит непустой валидный PDF (пустой корпус — не крах)', async () => {
    const { buffer, pageCount } = await renderPdfReport(sampleContent(0));
    expect(buffer.subarray(0, PDF_MAGIC.length).toString('latin1')).toBe(PDF_MAGIC);
    expect(pageCount).toBeGreaterThanOrEqual(3);
  });
});
