/**
 * Находка [pd-leak-synastry-redaction]: `REDACT_PATHS` не покрывал вложенные `req.body.a.*`/
 * `req.body.b.*` (calc-синастрия, dateTime/place ДВУХ карт) и `req.body.notes`. Сейчас
 * `serializers.req` (см. doc-комментарий logging.ts) заменяет `req` на `{method,url,headers}`
 * ДО применения redact — тело запроса им не передаётся, поэтому реальная утечка сегодня
 * невозможна. Этот тест проверяет саму redact-КОНФИГУРАЦИЮ (`buildLoggerOptions(...).redact`)
 * НАПРЯМУЮ через pino, без serializers — как если бы body-логирование когда-нибудь включили
 * (защита-в-глубину должна уже сейчас работать корректно, а не полагаться только на «тело не
 * логируется»).
 */
import { Writable } from 'node:stream';
import pino from 'pino';
import { describe, expect, it } from 'vitest';
import { buildLoggerOptions, REDACT_PATHS } from './logging.js';

class CaptureStream extends Writable {
  lines: string[] = [];
  override _write(chunk: Buffer, _enc: string, callback: () => void): void {
    this.lines.push(chunk.toString('utf8'));
    callback();
  }
  json(): Record<string, unknown> {
    return JSON.parse(this.lines[this.lines.length - 1]!);
  }
}

function buildRawLogger(): { logger: pino.Logger; stream: CaptureStream } {
  const stream = new CaptureStream();
  // Только redact — БЕЗ serializers.req (тот в приложении перезаписывает req целиком до того,
  // как redact успеет что-либо увидеть, см. doc-комментарий выше); здесь тестируется именно
  // корректность самих путей в REDACT_PATHS.
  const { redact } = buildLoggerOptions('info');
  const logger = pino({ level: 'info', redact }, stream);
  return { logger, stream };
}

describe('REDACT_PATHS — синастрия (req.body.a/b.dateTime/place) и req.body.notes', () => {
  it('редактирует dateTime и place ОБЕИХ карт синастрии, не трогая несвязанные поля', () => {
    const { logger, stream } = buildRawLogger();
    logger.info({
      req: {
        body: {
          a: { dateTime: { year: 1990, month: 5, day: 17 }, place: { lat: 55.75, lon: 37.6 }, tzId: 'Europe/Moscow' },
          b: { dateTime: { year: 1992, month: 1, day: 1 }, place: { lat: 59.93, lon: 30.3 }, tzId: 'Europe/Moscow' },
        },
      },
    });
    const { body } = stream.json().req as { body: { a: Record<string, unknown>; b: Record<string, unknown> } };
    expect(body.a.dateTime).toBe('[скрыто]');
    expect(body.a.place).toBe('[скрыто]');
    expect(body.b.dateTime).toBe('[скрыто]');
    expect(body.b.place).toBe('[скрыто]');
    // tzId НЕ в списке редактируемых путей — сам по себе не идентифицирует точное время/место
    // рождения так же однозначно, как dateTime/place; проверяем, что redact не накрыл объект
    // a/b целиком по ошибке (слишком широкое правило было бы тоже багом).
    expect(body.a.tzId).toBe('Europe/Moscow');
  });

  it('редактирует req.body.notes', () => {
    const { logger, stream } = buildRawLogger();
    logger.info({ req: { body: { notes: 'Заметка о клиенте: ФИО, номер телефона.' } } });
    const { body } = stream.json().req as { body: { notes: unknown } };
    expect(body.notes).toBe('[скрыто]');
  });

  it('REDACT_PATHS содержит все ожидаемые пути (регрессия на список)', () => {
    expect(REDACT_PATHS).toEqual(
      expect.arrayContaining([
        'req.body.a.dateTime',
        'req.body.a.place',
        'req.body.b.dateTime',
        'req.body.b.place',
        'req.body.notes',
      ]),
    );
  });
});
