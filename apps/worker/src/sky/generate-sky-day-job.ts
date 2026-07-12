/**
 * Генерация «Неба дня» (Ф9, см. docs/strategy/11-соцраздел-созвездие.md §5, §7): идемпотентный
 * upsert `sky_days` на СЕГОДНЯ и ЗАВТРА по МСК — после первого прогона публичная страница
 * `/nebo-dnya` никогда не пуста, полуночная граница проходит без «дырки» (паттерн day/tomorrow
 * гороскопного конвейера Ф5).
 *
 * Для каждого дня:
 *  1. факты — `astro_calendar` (fallback нейтральный, как loadDaySkyFact в horoscope/jobs.ts) +
 *     `computeNotableAspectsToday`;
 *  2. выбор события (ЧИСТЫЙ select-day-event.ts) и сборка payload/снапшота (build-sky-day.ts);
 *  3. редакционный текст — LLM (buildPrompt → generate → postprocessReport; на stub —
 *     детерминированный осмысленный текст, §2 конвенций). При флаге пост-обработки — безопасный
 *     детерминированный fallback (текст дня обязан выйти в любом случае — «правило непустоты»);
 *  4. пост-тред дня от Астры (`posts.kind='sky_day'`, `author_kind='ai'`, moderation='approved' —
 *     системный редакционный контент, не UGC) + комментарий-затравка.
 *
 * Идемпотентность: строка sky_days уже есть И тред создан → день пропускается (LLM не
 * вызывается — тот же принцип, что countExistingSignsForKey в horoscope/jobs.ts).
 */
import { eq } from 'drizzle-orm';
import type { Logger } from 'pino';
import { comments, posts, skyDays, type Db } from '@stassist/db';
import {
  ASTRA_USER_ID,
  addDays,
  mskNow,
  toDateKeyDay,
  type LlmProvider,
  type SkyDayPayload,
} from '@stassist/shared';
import { buildPrompt, postprocessReport, objectNameRu, aspectNameRu } from '@stassist/llm';
import { findAstroCalendarDay } from '../horoscope/repository.js';
import {
  computeNotableAspectsToday,
  mapAstroCalendarRowToDaySkyFact,
  type DaySkyFact,
} from '../horoscope/astro-day-facts.js';
import { selectDayEvent } from './select-day-event.js';
import { buildSkyDayPayload, buildTransitSnapshot } from './build-sky-day.js';

export interface SkyDayJobDeps {
  db: Db;
  llm: LlmProvider;
  logger: Logger;
}

const FALLBACK_DAY_FACT: Omit<DaySkyFact, 'date'> = {
  moonSignIndex: 0,
  lunarDay: 1,
  phaseName: 'new',
  isVoidOfCourse: false,
  retrogradeBodies: [],
  signIngresses: [],
};

function factsText(title: string, payload: SkyDayPayload): string {
  const lines = [
    `СОБЫТИЕ ДНЯ: ${title}.`,
    payload.notableAspects.length > 0
      ? `Точные аспекты дня: ${payload.notableAspects
          .map((a) => `${objectNameRu(a.bodyA)} ${aspectNameRu(a.angle)} ${objectNameRu(a.bodyB)} (орбис ${a.orbDeg.toFixed(1)}°)`)
          .join('; ')}.`
      : 'Точных аспектов между планетами сегодня нет.',
    `Лунный день: ${payload.lunarDay}.`,
    payload.retrogradeBodies.length > 0
      ? `Ретроградные планеты: ${payload.retrogradeBodies.map(objectNameRu).join(', ')}.`
      : 'Все планеты директны.',
  ];
  return lines.join('\n');
}

/** Безопасный детерминированный текст дня — используется при флаге пост-обработки LLM. */
function fallbackSummary(title: string): string {
  return (
    `Главное событие сегодняшнего неба — ${title.toLowerCase()}. ` +
    'Обратите внимание, как этот день проживается лично у вас: отметьтесь в чек-ине и сравните с откликами других. ' +
    'Небо у всех одно — карта у каждого своя.'
  );
}

async function buildSummaryMd(llm: LlmProvider, title: string, payload: SkyDayPayload): Promise<string> {
  const { system, prompt } = buildPrompt({
    factsText: factsText(title, payload),
    chunkTexts: [],
    task:
      'Напиши редакционный текст «Небо дня» (2-3 коротких абзаца) о сегодняшнем астрособытии для широкой аудитории: ' +
      'что происходит на небе и как это принято трактовать. Тон — тёплый, без фатализма и запугивания, без медицинских и финансовых директив. ' +
      'Не изобретай событий, которых нет в списке фактов.',
  });
  const result = await llm.generate({ system, prompt, maxTokens: 700 });
  const post = postprocessReport({ text: result.text });
  return post.flagged ? fallbackSummary(title) : post.contentMd;
}

const ASTRA_SEED_COMMENT =
  'Я Астра — ИИ-помощница «Зодиакума». Расскажите, как это небо отзывается у вас: сделайте чек-ин выше и оставьте заметку. ' +
  'Отвечу на вопросы о сегодняшней конфигурации.';

/** @returns число дней, по которым что-то записано (0 — всё уже было готово). */
export async function runSkyDayPipeline(deps: SkyDayJobDeps, now = new Date()): Promise<number> {
  const msk = mskNow(now);
  const dayKeys = [toDateKeyDay(msk), toDateKeyDay(addDays(msk, 1))];
  let written = 0;

  for (const dayKey of dayKeys) {
    const existingRows = await deps.db.select().from(skyDays).where(eq(skyDays.dayKey, dayKey)).limit(1);
    const existing = existingRows[0] ?? null;
    if (existing?.threadPostId) continue; // день полностью готов — LLM не вызываем

    const calendarRow = await findAstroCalendarDay(deps.db, dayKey);
    const fact: DaySkyFact = calendarRow
      ? mapAstroCalendarRowToDaySkyFact(calendarRow)
      : { date: dayKey, ...FALLBACK_DAY_FACT };
    if (!calendarRow) {
      deps.logger.warn({ dayKey }, 'sky-day: astro_calendar ещё не содержит эту дату — нейтральный fallback');
    }

    const notableAspects = computeNotableAspectsToday(dayKey);
    const { event, title } = selectDayEvent(fact, notableAspects);
    const payload = buildSkyDayPayload(fact, notableAspects, event);
    const transitPositions = buildTransitSnapshot(dayKey);
    const summaryMd = existing?.summaryMd ?? (await buildSummaryMd(deps.llm, title, payload));

    // Тред дня: системный редакционный пост от Астры (author_kind='ai' — юридическая маркировка).
    const [thread] = await deps.db
      .insert(posts)
      .values({
        authorId: ASTRA_USER_ID,
        authorKind: 'ai',
        kind: 'sky_day',
        title: `Небо дня: ${title}`,
        bodyMd: summaryMd,
        status: 'published',
        moderation: 'approved',
        autoFlags: [],
        commentsCount: 1, // комментарий-затравка ниже
      })
      .returning();
    if (!thread) throw new Error('sky-day: INSERT поста-треда не вернул строку');

    await deps.db.insert(comments).values({
      postId: thread.id,
      authorId: ASTRA_USER_ID,
      authorKind: 'ai',
      bodyMd: ASTRA_SEED_COMMENT,
      status: 'published',
      moderation: 'approved',
    });

    await deps.db
      .insert(skyDays)
      .values({ dayKey, title, summaryMd, payload, transitPositions, threadPostId: thread.id })
      .onConflictDoUpdate({
        target: skyDays.dayKey,
        set: { title, summaryMd, payload, transitPositions, threadPostId: thread.id, updatedAt: new Date() },
      });

    written += 1;
    deps.logger.info({ dayKey, title }, 'sky-day: день записан, тред создан');
  }

  return written;
}
