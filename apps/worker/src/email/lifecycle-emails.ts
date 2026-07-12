/**
 * E-mail-цепочки жизненного цикла (req.8 промта Ф8): «брошенный расчёт» (24ч после создания
 * профиля рождения без последующего ИИ-разбора), «конец триала» (за 2 дня до currentPeriodEnd),
 * еженедельный дайджест. Push ОТЛОЖЕН на 1.x — см. находку [полнота/зависимости] f8.md: в MVP нет
 * push-инфраструктуры (service worker/хранение подписок) ни в одной фазе, только e-mail.
 *
 * УПРОЩЕНИЕ (честно, не скрыто): окна выборки — «ровно 1 час» под часовой cron
 * (`ABANDONED_CALC_CRON`/`TRIAL_ENDING_CRON`, см. worker.ts) БЕЗ отдельной таблицы-маркера «письмо
 * уже отправлено» — при сбое/повторном прогоне ровно в то же окно возможен дубль напоминания.
 * Это НЕ платёжная операция (маркетинговое письмо, не идемпотентность денег) — риск дубля
 * низкой серьёзности, задокументирован как приемлемый компромисс MVP, а не забыт молча.
 */
import { and, eq, gte, isNull, lt } from 'drizzle-orm';
import type { Logger } from 'pino';
import { aiReports, birthProfiles, subscriptions, users, type Db } from '@stassist/db';
import type { Mailer } from '@stassist/shared';
import { isEmailOptedOut } from './optouts-repository.js';
import { buildAbandonedCalcMail, buildTrialEndingMail, buildWeeklyDigestMail } from './mail-templates.js';

export interface LifecycleEmailDeps {
  db: Db;
  mailer: Mailer;
  appUrl: string;
  logger: Logger;
}

/** Брошенный расчёт: профиль создан 24-25ч назад, у пользователя (подтверждён e-mail, активен) НЕТ
 *  ни одного ai_reports, созданного после профиля — «посчитал карту и не вернулся». */
export async function sendAbandonedCalcEmails(deps: LifecycleEmailDeps): Promise<number> {
  const { db, mailer, appUrl, logger } = deps;
  const now = new Date();
  const windowStart = new Date(now.getTime() - 25 * 60 * 60 * 1000);
  const windowEnd = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const candidates = await db
    .select({
      profileId: birthProfiles.id,
      profileLabel: birthProfiles.label,
      userId: birthProfiles.userId,
      email: users.email,
      emailVerifiedAt: users.emailVerifiedAt,
      status: users.status,
    })
    .from(birthProfiles)
    .innerJoin(users, eq(users.id, birthProfiles.userId))
    .where(and(gte(birthProfiles.createdAt, windowStart), lt(birthProfiles.createdAt, windowEnd), eq(users.status, 'active')));

  let sent = 0;
  for (const c of candidates) {
    if (!c.emailVerifiedAt) continue;
    if (await isEmailOptedOut(db, c.email, 'digest')) continue;

    const followUp = await db
      .select({ id: aiReports.id })
      .from(aiReports)
      .where(and(eq(aiReports.userId, c.userId), gte(aiReports.createdAt, windowStart)))
      .limit(1);
    if (followUp.length > 0) continue; // не «брошенный» — пользователь уже смотрел разбор

    try {
      await mailer.send(buildAbandonedCalcMail({ to: c.email, appUrl, profileLabel: c.profileLabel }));
      sent += 1;
    } catch (err) {
      logger.error({ err, userId: c.userId }, 'lifecycle-email: не удалось отправить «брошенный расчёт»');
    }
  }
  return sent;
}

/** Конец триала: subscriptions.status='trial', currentPeriodEnd через 2 дня (окно 1ч). */
export async function sendTrialEndingEmails(deps: LifecycleEmailDeps): Promise<number> {
  const { db, mailer, appUrl, logger } = deps;
  const now = new Date();
  const windowStart = new Date(now.getTime() + 47 * 60 * 60 * 1000);
  const windowEnd = new Date(now.getTime() + 49 * 60 * 60 * 1000);

  const candidates = await db
    .select({ userId: subscriptions.userId, currentPeriodEnd: subscriptions.currentPeriodEnd, email: users.email })
    .from(subscriptions)
    .innerJoin(users, eq(users.id, subscriptions.userId))
    .where(and(eq(subscriptions.status, 'trial'), gte(subscriptions.currentPeriodEnd, windowStart), lt(subscriptions.currentPeriodEnd, windowEnd)));

  let sent = 0;
  for (const c of candidates) {
    if (await isEmailOptedOut(db, c.email, 'digest')) continue;
    try {
      await mailer.send(
        buildTrialEndingMail({
          to: c.email,
          appUrl,
          currentPeriodEndRu: c.currentPeriodEnd.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' }),
        }),
      );
      sent += 1;
    } catch (err) {
      logger.error({ err, userId: c.userId }, 'lifecycle-email: не удалось отправить «конец триала»');
    }
  }
  return sent;
}

/** Еженедельный дайджест: все активные пользователи с подтверждённым e-mail, не отписавшиеся от
 *  digest/all. MVP-текст обзорный (не персонализирован по знаку/карте) — задел персонализации
 *  оставлен на следующую итерацию, честно не выдаём общий текст за персональный разбор в самом
 *  письме (заголовок «Ваша астронеделя» — приглашение зайти в кабинет за персональным контентом). */
export async function sendWeeklyDigestEmails(deps: LifecycleEmailDeps): Promise<number> {
  const { db, mailer, appUrl, logger } = deps;

  const candidates = await db
    .select({ id: users.id, email: users.email })
    .from(users)
    .where(and(eq(users.status, 'active'), isNull(users.deletedAt)));

  let sent = 0;
  for (const c of candidates) {
    if (!c.email) continue;
    if (await isEmailOptedOut(db, c.email, 'digest')) continue;
    try {
      await mailer.send(buildWeeklyDigestMail({ to: c.email, appUrl }));
      sent += 1;
    } catch (err) {
      logger.error({ err, userId: c.id }, 'lifecycle-email: не удалось отправить еженедельный дайджест');
    }
  }
  return sent;
}
