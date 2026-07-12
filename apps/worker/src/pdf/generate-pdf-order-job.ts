/**
 * Оркестрация генерации PDF-заказа (req.1-3 промта Ф6): читает `orders.status='paid'`, считает
 * нужный продукт (`@stassist/numerology-core`, детерминированно), собирает чанки корпуса,
 * запрашивает короткий связующий абзац у `LlmProvider` (конвейер Ф4, БЕЗ утечки ПД — промт
 * содержит только уже вычисленные числа/арканы, НЕ дату/имя/место рождения, см. `buildIntroPrompt`
 * ниже), рендерит PDF (pdfkit), сохраняет в `ObjectStorage`, создаёт `ai_reports`(kind='order'),
 * переводит заказ в `delivered`, отправляет письмо (`Mailer`) и `notifications`(kind='order_ready').
 *
 * Оркестрация НЕ юнит-тестируется (I/O: БД/LLM/storage/почта — см. §1 конвенций реализации);
 * все чистые части (расчёты, сборка контента, рендер PDF) покрыты unit-тестами отдельно
 * (`*-report-content.test.ts`, `render-pdf-report.test.ts`).
 */
import { eq } from 'drizzle-orm';
import type { Logger } from 'pino';
import { users, type Db } from '@stassist/db';
import {
  matrixFactEntries,
  numerologyCoreNumberKey,
  numerologyCycleKey,
  numerologyMatrixCellKey,
  numerologyMatrixLineKey,
  PSYCHOMATRIX_CELL_SLUGS_BY_DIGIT,
  PSYCHOMATRIX_LINE_SLUGS,
  type ChunkRepository,
} from '@stassist/llm';
import {
  compareMatrixOfDestiny,
  lifePathNumber,
  matrixOfDestiny,
  nameNumbers,
  personalCycles,
  psychoMatrix,
  type MatrixOfDestinyCompatibilityResult,
} from '@stassist/numerology-core';
import {
  orderSubjectSchema,
  PDF_PRODUCT_CATALOG,
  type LlmProvider,
  type Mailer,
  type ObjectStorage,
  type OrderReadyPayload,
  type PdCipherKeyring,
} from '@stassist/shared';
import { renderMatrixOctagramSvg } from '@stassist/ui/render';
import { svgToPngBuffer } from '../og/render-og-png.js';
import { findNumerologyBirthData } from './birth-profile-lookup.js';
import { buildMatrixReportContent } from './matrix-report-content.js';
import { buildPsychomatrixReportContent } from './psychomatrix-report-content.js';
import { buildNumerologyProfileReportContent } from './numerology-profile-report-content.js';
import { buildOrderReadyMail } from './mail-templates.js';
import { insertNotification } from './notifications-repository.js';
import { insertOrderReport } from './order-report-repository.js';
import { findPaidOrders, markOrderAiDone, markOrderCancelled, markOrderDelivered, type OrderRow } from './orders-repository.js';
import type { PdfReportContent } from './report-content-types.js';
import { renderPdfReport } from './render-pdf-report.js';

/** Промт для связующего абзаца — ТОЛЬКО уже вычисленные числа/арканы (см. заголовок файла: не
 *  утекает дата/имя/место рождения третьей стороне — LLM-провайдеру). */
function buildIntroPrompt(productLabel: string, facts: Record<string, number>): string {
  const factsLine = Object.entries(facts)
    .map(([k, v]) => `${k}=${v}`)
    .join(', ');
  return (
    `Напиши короткое (3-4 предложения) дружелюбное вступление на русском языке к платному PDF-отчёту ` +
    `«${productLabel}» нумерологического портала. Уже вычисленные числа отчёта: ${factsLine}. ` +
    `Не придумывай новых фактов и не упоминай медицинские/финансовые гарантии — только тон и общее ` +
    `объяснение, как читать отчёт дальше.`
  );
}

function pdfContentToMarkdown(content: PdfReportContent): string {
  const parts: string[] = [`# ${content.titleRu}`];
  if (content.subtitleRu) parts.push(content.subtitleRu);
  parts.push(...content.introParagraphs);
  for (const section of content.sections) {
    parts.push(`## ${section.heading}`, ...section.paragraphs);
  }
  parts.push('---', ...content.disclaimerParagraphs);
  return parts.join('\n\n');
}

export interface PdfOrderJobDeps {
  db: Db;
  llm: LlmProvider;
  chunkRepository: ChunkRepository;
  storage: ObjectStorage;
  mailer: Mailer;
  keyring: PdCipherKeyring;
  appUrl: string;
  logger: Logger;
}

export async function processOnePdfOrder(deps: PdfOrderJobDeps, order: OrderRow): Promise<void> {
  const { db, llm, chunkRepository, storage, mailer, keyring, appUrl, logger } = deps;
  try {
    const subject = orderSubjectSchema.parse(order.subject);
    const birth = await findNumerologyBirthData(db, order.userId, subject.birthProfileId, keyring);
    if (!birth) throw new Error(`birth_profiles не найден для заказа ${order.id}`);

    const generatedAtIso = new Date().toISOString();
    const coverNoteRu = `Подготовлено для профиля «${birth.label}»`;

    let pdfContent: PdfReportContent;
    let calcBlock: Record<string, unknown>;
    let coverImagePng: Buffer | undefined;
    let llmProviderName = 'stub';
    let tokensIn = 0;
    let tokensOut = 0;

    if (subject.productType === 'matrix_full_pdf') {
      const matrixResult = matrixOfDestiny(birth);
      const entries = matrixFactEntries(matrixResult);
      const chunks = await chunkRepository.getByKeys(entries.map((e) => e.key));
      const chunkTexts = new Map(chunks.map((c) => [c.key, c.text]));

      let compare: MatrixOfDestinyCompatibilityResult | undefined;
      if (subject.variant === 'compat' && subject.partnerBirthProfileId) {
        const partnerBirth = await findNumerologyBirthData(db, order.userId, subject.partnerBirthProfileId, keyring);
        if (partnerBirth) compare = compareMatrixOfDestiny(birth, partnerBirth);
      }

      const gen = await llm.generate({
        prompt: buildIntroPrompt('Матрица судьбы', {
          center: matrixResult.corePoints.center,
          day: matrixResult.corePoints.day,
          month: matrixResult.corePoints.month,
          year: matrixResult.corePoints.yearSum,
        }),
        maxTokens: 300,
      });
      llmProviderName = gen.provider;
      tokensIn = gen.tokensIn;
      tokensOut = gen.tokensOut;

      pdfContent = buildMatrixReportContent({
        matrixResult,
        chunkTexts,
        introText: gen.text,
        variant: subject.variant,
        compare,
        coverNoteRu,
        generatedAtIso,
      });
      calcBlock = { matrixResult, variant: subject.variant };

      const octagramSvg = renderMatrixOctagramSvg({ corePoints: matrixResult.corePoints, title: pdfContent.titleRu });
      coverImagePng = svgToPngBuffer(octagramSvg, { width: 640, backgroundColor: '#ffffff' });
    } else if (subject.productType === 'psychomatrix_pdf') {
      const psychoResult = psychoMatrix(birth);
      const keys = [
        ...Object.values(PSYCHOMATRIX_CELL_SLUGS_BY_DIGIT).map((slug) => numerologyMatrixCellKey(slug)),
        ...PSYCHOMATRIX_LINE_SLUGS.map((slug) => numerologyMatrixLineKey(slug)),
      ];
      const chunks = await chunkRepository.getByKeys(keys);
      const chunkTexts = new Map(chunks.map((c) => [c.key, c.text]));

      const gen = await llm.generate({
        prompt: buildIntroPrompt('Психоматрица (квадрат Пифагора)', {
          number1: psychoResult.number1,
          number2: psychoResult.number2,
          number3: psychoResult.number3,
          number4: psychoResult.number4,
        }),
        maxTokens: 300,
      });
      llmProviderName = gen.provider;
      tokensIn = gen.tokensIn;
      tokensOut = gen.tokensOut;

      pdfContent = buildPsychomatrixReportContent({
        psychoMatrix: psychoResult,
        chunkTexts,
        introText: gen.text,
        coverNoteRu,
        generatedAtIso,
      });
      calcBlock = { psychoMatrix: psychoResult };
    } else {
      const lifePath = lifePathNumber(birth);
      const nameNums = subject.fullName ? nameNumbers(subject.fullName) : undefined;
      const now = new Date();
      const cycles = personalCycles(birth, { day: now.getUTCDate(), month: now.getUTCMonth() + 1, year: now.getUTCFullYear() });
      const keys = [
        numerologyCoreNumberKey('life_path', lifePath.lifePathNumber),
        ...(nameNums
          ? [
              numerologyCoreNumberKey('expression', nameNums.expressionNumber),
              numerologyCoreNumberKey('soul', nameNums.soulUrgeNumber),
              numerologyCoreNumberKey('personality', nameNums.personalityNumber),
            ]
          : []),
        numerologyCycleKey('personal_year', cycles.personalYear),
        numerologyCycleKey('personal_month', cycles.personalMonth),
        numerologyCycleKey('personal_day', cycles.personalDay),
      ];
      const chunks = await chunkRepository.getByKeys(keys);
      const chunkTexts = new Map(chunks.map((c) => [c.key, c.text]));

      const gen = await llm.generate({
        prompt: buildIntroPrompt('Нумерологический профиль', { lifePath: lifePath.lifePathNumber, personalYear: cycles.personalYear }),
        maxTokens: 300,
      });
      llmProviderName = gen.provider;
      tokensIn = gen.tokensIn;
      tokensOut = gen.tokensOut;

      pdfContent = buildNumerologyProfileReportContent({
        lifePath,
        nameNumbers: nameNums,
        cycles,
        chunkTexts,
        introText: gen.text,
        coverNoteRu,
        generatedAtIso,
      });
      calcBlock = { lifePath, nameNumbers: nameNums ?? null, cycles };
    }

    const { buffer, pageCount } = await renderPdfReport(pdfContent, { coverImagePng });
    const pdfKey = `orders/${order.id}.pdf`;
    await storage.put(pdfKey, buffer, 'application/pdf');

    const reportId = await insertOrderReport(db, {
      userId: order.userId,
      birthProfileId: subject.birthProfileId,
      contentMd: pdfContentToMarkdown(pdfContent),
      calcBlock,
      pdfKey,
      orderId: order.id,
      provider: llmProviderName,
      tokensIn,
      tokensOut,
    });
    await markOrderAiDone(db, order.id, reportId);

    const pdfUrl = await storage.getSignedUrl(pdfKey, 60 * 60 * 24 * 7);
    await markOrderDelivered(db, order.id);

    const userRows = await db.select({ email: users.email }).from(users).where(eq(users.id, order.userId)).limit(1);
    const email = userRows[0]?.email;
    if (email) {
      await mailer.send(
        buildOrderReadyMail({ to: email, productType: subject.productType, pdfUrl, cabinetUrl: `${appUrl}/app` }),
      );
    }
    const payload: OrderReadyPayload = { orderId: order.id, reportId };
    await insertNotification(db, {
      userId: order.userId,
      kind: 'order_ready',
      text: `Ваш PDF-отчёт «${PDF_PRODUCT_CATALOG[subject.productType].titleRu}» готов`,
      payload,
    });

    logger.info({ orderId: order.id, pageCount }, 'pdf-order: заказ доставлен');
  } catch (err) {
    logger.error({ err, orderId: order.id }, 'pdf-order: не удалось сгенерировать PDF');
    await markOrderCancelled(db, order.id, err instanceof Error ? err.message : String(err));
  }
}

export async function processPaidOrders(deps: PdfOrderJobDeps): Promise<number> {
  const paid = await findPaidOrders(deps.db);
  let processed = 0;
  for (const order of paid) {
    await processOnePdfOrder(deps, order);
    processed += 1;
  }
  return processed;
}
