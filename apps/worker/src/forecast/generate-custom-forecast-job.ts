/**
 * Оркестрация конвейера индивидуальных прогнозов (req.4 промта Ф8): читает `orders.status='paid'`
 * `kind='custom_forecast'`, находит натальную карту профиля, считает по типу заказа
 * (`apps/worker/src/forecast/custom-forecast-content.ts` — детерминировано, через
 * `@stassist/astro-core`), запрашивает короткое вступление у `LlmProvider` (факты БЕЗ ПД — только
 * заголовок продукта, см. `buildIntroPrompt` ниже), рендерит PDF (pdfkit, переиспользует
 * `../pdf/render-pdf-report.ts`), сохраняет, доставляет (письмо+уведомление) — тот же
 * poll-по-статусу паттерн, что `../pdf/generate-pdf-order-job.ts` (PDF-заказы Ф6).
 *
 * Оркестрация НЕ юнит-тестируется (I/O) — расчёты покрыты `custom-forecast-content.test.ts`,
 * рендер PDF — `../pdf/render-pdf-report.test.ts` (уже существует, переиспользуется как есть).
 */
import { eq } from 'drizzle-orm';
import type { Logger } from 'pino';
import { users, type Db } from '@stassist/db';
import {
  customForecastSubjectSchema,
  type ChartData,
  type LlmProvider,
  type Mailer,
  type ObjectStorage,
  type PdCipherKeyring,
} from '@stassist/shared';
import {
  buildElectivesContent,
  buildEventDateContent,
  buildPeriodMapContent,
  computeElectiveWindowsForOrder,
} from './custom-forecast-content.js';
import { findBirthProfileLabel, findNatalChartByBirthProfileId } from './charts-repository.js';
import { buildCustomForecastReadyMail } from './mail-templates.js';
import { insertNotification } from '../pdf/notifications-repository.js';
import { insertOrderReport } from '../pdf/order-report-repository.js';
import { findPaidCustomForecastOrders, markOrderAiDone, markOrderCancelled, markOrderDelivered, type OrderRow } from './orders-repository.js';
import type { PdfReportContent } from '../pdf/report-content-types.js';
import { renderPdfReport } from '../pdf/render-pdf-report.js';

function buildIntroPrompt(titleRu: string, question: string | undefined): string {
  return (
    `Напиши короткое (2-3 предложения) дружелюбное вступление на русском языке к платному отчёту ` +
    `«${titleRu}» астрологического портала.` +
    (question ? ` Вопрос пользователя (контекст, не факт для расчёта): «${question}».` : '') +
    ` Не придумывай конкретных дат/аспектов — они уже посчитаны и приведены ниже в отчёте отдельно, ` +
    `твоя часть — только тон и общее объяснение, как читать отчёт дальше. Не давай медицинских, ` +
    `финансовых или юридических гарантий.`
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

export interface CustomForecastJobDeps {
  db: Db;
  llm: LlmProvider;
  storage: ObjectStorage;
  mailer: Mailer;
  keyring: PdCipherKeyring;
  appUrl: string;
  logger: Logger;
}

export async function processOneCustomForecastOrder(deps: CustomForecastJobDeps, order: OrderRow): Promise<void> {
  const { db, llm, storage, mailer, keyring, appUrl, logger } = deps;
  try {
    const subject = customForecastSubjectSchema.parse(order.subject);
    const chart = await findNatalChartByBirthProfileId(db, subject.birthProfileId, keyring);
    if (!chart) {
      throw new Error(`натальная карта не найдена для профиля ${subject.birthProfileId} — пересчитайте профиль рождения`);
    }
    const chartData = chart.data as ChartData;
    const label = await findBirthProfileLabel(db, subject.birthProfileId);
    const coverNoteRu = label ? `Подготовлено для профиля «${label}»` : 'Подготовлено по вашей натальной карте';
    const generatedAtIso = new Date().toISOString();

    let titleRuForPrompt: string;
    if (subject.type === 'event_date') titleRuForPrompt = 'Прогноз на дату события';
    else if (subject.type === 'period_map') titleRuForPrompt = 'Карта периода';
    else titleRuForPrompt = 'Поиск благоприятного окна';

    const gen = await llm.generate({ prompt: buildIntroPrompt(titleRuForPrompt, subject.question), maxTokens: 300 });

    let pdfContent: PdfReportContent;
    let calcBlock: Record<string, unknown>;

    if (subject.type === 'event_date') {
      pdfContent = buildEventDateContent({
        subject,
        natalBodies: chartData.bodies,
        coverNoteRu,
        introText: gen.text,
        generatedAtIso,
      });
      calcBlock = { type: subject.type, eventDate: subject.eventDate };
    } else if (subject.type === 'period_map') {
      pdfContent = buildPeriodMapContent({
        subject,
        natalBodies: chartData.bodies,
        coverNoteRu,
        introText: gen.text,
        generatedAtIso,
      });
      calcBlock = { type: subject.type, periodStart: subject.periodStart, periodEnd: subject.periodEnd };
    } else {
      const windows = computeElectiveWindowsForOrder(subject, chartData.bodies);
      pdfContent = buildElectivesContent({ subject, windows, coverNoteRu, introText: gen.text, generatedAtIso });
      calcBlock = { type: subject.type, windows };
    }

    const { buffer, pageCount } = await renderPdfReport(pdfContent);
    const pdfKey = `orders/${order.id}.pdf`;
    await storage.put(pdfKey, buffer, 'application/pdf');

    const reportId = await insertOrderReport(db, {
      userId: order.userId,
      birthProfileId: subject.birthProfileId,
      contentMd: pdfContentToMarkdown(pdfContent),
      calcBlock,
      pdfKey,
      orderId: order.id,
      provider: gen.provider,
      tokensIn: gen.tokensIn,
      tokensOut: gen.tokensOut,
    });
    await markOrderAiDone(db, order.id, reportId);

    const pdfUrl = await storage.getSignedUrl(pdfKey, 60 * 60 * 24 * 7);
    await markOrderDelivered(db, order.id);

    const userRows = await db.select({ email: users.email }).from(users).where(eq(users.id, order.userId)).limit(1);
    const email = userRows[0]?.email;
    if (email) {
      await mailer.send(buildCustomForecastReadyMail({ to: email, titleRu: pdfContent.titleRu, pdfUrl, cabinetUrl: `${appUrl}/app` }));
    }
    await insertNotification(db, {
      userId: order.userId,
      kind: 'order_ready',
      text: `Ваш индивидуальный прогноз «${pdfContent.titleRu}» готов`,
      payload: { orderId: order.id, reportId },
    });

    logger.info({ orderId: order.id, pageCount }, 'custom-forecast: заказ доставлен');
  } catch (err) {
    logger.error({ err, orderId: order.id }, 'custom-forecast: не удалось сгенерировать прогноз');
    await markOrderCancelled(db, order.id, err instanceof Error ? err.message : String(err));
  }
}

export async function processPaidCustomForecastOrders(deps: CustomForecastJobDeps): Promise<number> {
  const paid = await findPaidCustomForecastOrders(deps.db);
  let processed = 0;
  for (const order of paid) {
    await processOneCustomForecastOrder(deps, order);
    processed += 1;
  }
  return processed;
}
