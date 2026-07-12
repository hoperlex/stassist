/**
 * Промежуточное представление PDF-отчёта (см. docs/roadmap/prompts/f6-нумерология-и-камни.md
 * req.1-2) — ЧИСТЫЕ данные, без I/O: строится `matrix-report-content.ts`/`psychomatrix-report-
 * content.ts`/`numerology-profile-report-content.ts` из уже готовых чисел
 * (`@stassist/numerology-core`) и уже полученных текстов чанков (вызывающий job делает I/O,
 * см. `generate-pdf-order-job.ts`), рендерится в буфер `render-pdf-report.ts` (pdfkit).
 * Разделение содержания и рендера — чтобы сборку контента можно было юнит-тестировать без pdfkit,
 * а рендер — тестировать на валидность PDF без БД (§1 конвенций реализации).
 */

export interface PdfSection {
  heading: string;
  /** Необязательная короткая подпись под заголовком (напр. «Аркан 7 — Колесница»). */
  caption?: string;
  paragraphs: string[];
  /** Бейдж честности методики (напр. «рабочая гипотеза — требует сверки заказчиком»), см.
   *  `matrixOfDestinyDerivedSections().methodologyVerified` в `@stassist/numerology-core`. */
  badge?: string;
}

export interface PdfReportContent {
  titleRu: string;
  subtitleRu?: string;
  /** Строка на обложке — кому подготовлен отчёт (без ПД: имя/label профиля, НЕ дата/место рождения). */
  coverNoteRu?: string;
  introParagraphs: string[];
  sections: PdfSection[];
  disclaimerParagraphs: string[];
  generatedAtIso: string;
}
