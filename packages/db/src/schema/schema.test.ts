/**
 * Unit-тест схемы: без БД (никаких сетевых/файловых обращений) — проверяет форму таблиц и
 * согласованность с seed-данными. Ловит опечатки в именах колонок/таблиц раньше, чем
 * drizzle-kit generate или живая БД.
 */
import { getTableColumns, getTableName } from 'drizzle-orm';
import type { Pool } from 'pg';
import { describe, expect, it } from 'vitest';
import * as schema from './index.js';
import { createDb } from '../client.js';
import { SYSTEM_CALC_PRESETS } from '../seed/system-calc-presets.js';

describe('таблицы Ф2', () => {
  it('users содержит полный набор колонок по 22-модель-данных.md §1', () => {
    const cols = Object.keys(getTableColumns(schema.users));
    expect(cols).toEqual(
      expect.arrayContaining([
        'email',
        'emailVerifiedAt',
        'passwordHash',
        'displayName',
        'avatarKey',
        'role',
        'status',
        'tz',
        'locale',
      ]),
    );
  });

  it('refresh_tokens содержит поля для ротации и reuse detection', () => {
    const cols = Object.keys(getTableColumns(schema.refreshTokens));
    expect(cols).toEqual(
      expect.arrayContaining(['tokenHash', 'familyId', 'expiresAt', 'rotatedFrom', 'revokedAt']),
    );
  });

  it('birth_profiles: 🔒-поля именованы с суффиксом Enc (шифртекст, не читать напрямую)', () => {
    const cols = Object.keys(getTableColumns(schema.birthProfiles));
    expect(cols).toEqual(
      expect.arrayContaining(['birthDateEnc', 'birthTimeEnc', 'placeNameEnc', 'latEnc', 'lonEnc', 'tzId', 'timeUnknown']),
    );
  });

  it('имена таблиц соответствуют докe данных (snake_case)', () => {
    expect(getTableName(schema.emailVerifications)).toBe('email_verifications');
    expect(getTableName(schema.geocodeCache)).toBe('geocode_cache');
    expect(getTableName(schema.calcPresets)).toBe('calc_presets');
  });
});

describe('таблицы Ф6', () => {
  it('stones содержит purposes (находка [data-model] в f6.md) и полный набор соответствий', () => {
    const cols = Object.keys(getTableColumns(schema.stones));
    expect(cols).toEqual(
      expect.arrayContaining([
        'slug',
        'name',
        'propertiesMd',
        'colors',
        'zodiacSigns',
        'planets',
        'decades',
        'arcana',
        'chakras',
        'purposes',
        'status',
      ]),
    );
  });

  it('orders содержит статусную модель и ссылку на report_id (doc 22 §3)', () => {
    const cols = Object.keys(getTableColumns(schema.orders));
    expect(cols).toEqual(
      expect.arrayContaining(['userId', 'kind', 'subject', 'status', 'priceKop', 'reportId']),
    );
  });

  it('notifications содержит payload и readAt (doc 22 §7б)', () => {
    const cols = Object.keys(getTableColumns(schema.notifications));
    expect(cols).toEqual(expect.arrayContaining(['userId', 'kind', 'payload', 'text', 'readAt']));
  });

  it('имена таблиц Ф6 — snake_case', () => {
    expect(getTableName(schema.stones)).toBe('stones');
    expect(getTableName(schema.orders)).toBe('orders');
    expect(getTableName(schema.notifications)).toBe('notifications');
  });
});

describe('таблицы Ф7', () => {
  it('posts содержит chart_id (анонимная копия, НЕ отдельная таблица — см. doc-комментарий posts.ts)', () => {
    const cols = Object.keys(getTableColumns(schema.posts));
    expect(cols).toEqual(
      expect.arrayContaining(['authorId', 'kind', 'title', 'bodyMd', 'chartId', 'celebrityId', 'status', 'moderation', 'likesCount', 'commentsCount']),
    );
  });

  it('comments поддерживает markedUsefulAt (репутация за полезный разбор, req.2 промта)', () => {
    const cols = Object.keys(getTableColumns(schema.comments));
    expect(cols).toEqual(expect.arrayContaining(['postId', 'authorId', 'parentId', 'bodyMd', 'markedUsefulAt']));
  });

  it('friendships хранит направленное согласие на шеринг карты (sharedByUser/sharedByFriend)', () => {
    const cols = Object.keys(getTableColumns(schema.friendships));
    expect(cols).toEqual(expect.arrayContaining(['userId', 'friendId', 'status', 'sharedByUser', 'sharedByFriend']));
  });

  it('reactions/reports_ugc используют полиморфную (entity,entityId) связь без FK', () => {
    expect(Object.keys(getTableColumns(schema.reactions))).toEqual(expect.arrayContaining(['userId', 'entity', 'entityId', 'kind']));
    expect(Object.keys(getTableColumns(schema.reportsUgc))).toEqual(expect.arrayContaining(['reporterId', 'entity', 'entityId', 'reason', 'status']));
  });

  it('wiki_article_revisions хранит журнал версий (article_id, version, editor_id)', () => {
    const cols = Object.keys(getTableColumns(schema.wikiArticleRevisions));
    expect(cols).toEqual(expect.arrayContaining(['articleId', 'version', 'title', 'bodyMd', 'editorId']));
  });

  it('имена таблиц Ф7 — snake_case', () => {
    expect(getTableName(schema.posts)).toBe('posts');
    expect(getTableName(schema.comments)).toBe('comments');
    expect(getTableName(schema.reactions)).toBe('reactions');
    expect(getTableName(schema.friendships)).toBe('friendships');
    expect(getTableName(schema.reportsUgc)).toBe('reports_ugc');
    expect(getTableName(schema.reputation)).toBe('reputation');
    expect(getTableName(schema.wikiArticleRevisions)).toBe('wiki_article_revisions');
  });
});

describe('таблицы Ф8', () => {
  it('plans содержит цену/период/триал/фичи (doc 22 §4)', () => {
    const cols = Object.keys(getTableColumns(schema.plans));
    expect(cols).toEqual(expect.arrayContaining(['code', 'titleRu', 'priceKop', 'period', 'trialDays', 'features']));
  });

  it('subscriptions хранит cancelAtPeriodEnd (отмена в 1 клик — статус до конца периода)', () => {
    const cols = Object.keys(getTableColumns(schema.subscriptions));
    expect(cols).toEqual(
      expect.arrayContaining(['userId', 'planCode', 'status', 'currentPeriodEnd', 'cancelAtPeriodEnd', 'provider', 'providerSubId']),
    );
  });

  it('payments содержит idempotencyKey и receiptStatus (54-ФЗ каркас)', () => {
    const cols = Object.keys(getTableColumns(schema.payments));
    expect(cols).toEqual(
      expect.arrayContaining(['orderId', 'subscriptionId', 'provider', 'providerPaymentId', 'amountKop', 'status', 'receiptStatus', 'idempotencyKey']),
    );
  });

  it('webhook_events.eventId — идемпотентность доставки', () => {
    const cols = Object.keys(getTableColumns(schema.webhookEvents));
    expect(cols).toEqual(expect.arrayContaining(['provider', 'eventId', 'type', 'payload', 'processedAt']));
  });

  it('experiments/experiment_events/quiz_answers/email_optouts — A/B и квиз-каркас (doc 22 §7б)', () => {
    expect(Object.keys(getTableColumns(schema.experiments))).toEqual(expect.arrayContaining(['code', 'variants', 'active']));
    expect(Object.keys(getTableColumns(schema.experimentEvents))).toEqual(
      expect.arrayContaining(['userId', 'anonId', 'experimentCode', 'variant', 'event', 'meta']),
    );
    expect(Object.keys(getTableColumns(schema.quizAnswers))).toEqual(
      expect.arrayContaining(['userId', 'quizCode', 'answers', 'completedAt']),
    );
    expect(Object.keys(getTableColumns(schema.emailOptouts))).toEqual(expect.arrayContaining(['email', 'scope']));
  });

  it('имена таблиц Ф8 — snake_case', () => {
    expect(getTableName(schema.plans)).toBe('plans');
    expect(getTableName(schema.subscriptions)).toBe('subscriptions');
    expect(getTableName(schema.payments)).toBe('payments');
    expect(getTableName(schema.webhookEvents)).toBe('webhook_events');
    expect(getTableName(schema.promoCodes)).toBe('promo_codes');
    expect(getTableName(schema.experiments)).toBe('experiments');
    expect(getTableName(schema.experimentEvents)).toBe('experiment_events');
    expect(getTableName(schema.quizAnswers)).toBe('quiz_answers');
    expect(getTableName(schema.emailOptouts)).toBe('email_optouts');
  });
});

describe('createDb', () => {
  it('не подключается к сети при создании (ленивая обёртка)', () => {
    // Фиктивный "пул" — createDb не должен трогать его методы синхронно.
    const fakePool = {} as Pool;
    expect(() => createDb(fakePool)).not.toThrow();
  });
});

describe('SYSTEM_CALC_PRESETS (seed)', () => {
  it('содержит минимум «Современная западная» и «Классическая» (см. doc 20 «Границы MVP»)', () => {
    const codes = SYSTEM_CALC_PRESETS.map((p) => p.code);
    expect(codes).toContain('modern_western');
    expect(codes).toContain('classical');
  });

  it('каждый пресет имеет непустые orbs.byAspect', () => {
    for (const preset of SYSTEM_CALC_PRESETS) {
      expect(Object.keys(preset.orbs.byAspect).length).toBeGreaterThan(0);
    }
  });

  it('коды уникальны', () => {
    const codes = SYSTEM_CALC_PRESETS.map((p) => p.code);
    expect(new Set(codes).size).toBe(codes.length);
  });
});
