import { randomUUID } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { InMemoryRefreshTokenRepository } from './refresh-repository.js';
import {
  issueFirstRefreshToken,
  RefreshTokenInvalidError,
  rotateRefreshToken,
} from './refresh-rotation.js';
import { hashOpaqueToken } from './tokens.js';

const TTL = 60 * 60 * 24 * 30;

describe('ротация refresh-токенов (in-memory, без БД)', () => {
  it('первый токен семьи не имеет rotatedFrom', async () => {
    const repo = new InMemoryRefreshTokenRepository();
    const userId = randomUUID();
    const familyId = randomUUID();
    const issued = await issueFirstRefreshToken({ userId, repo, ttlSeconds: TTL, familyId });
    expect(issued.record.rotatedFrom).toBeNull();
    expect(issued.record.familyId).toBe(familyId);
  });

  it('обмен валидного токена гасит старый и выпускает новый той же семьи', async () => {
    const repo = new InMemoryRefreshTokenRepository();
    const userId = randomUUID();
    const familyId = randomUUID();
    const first = await issueFirstRefreshToken({ userId, repo, ttlSeconds: TTL, familyId });

    const outcome = await rotateRefreshToken({
      presentedTokenPlaintext: first.plaintext,
      repo,
      ttlSeconds: TTL,
    });

    expect(outcome.kind).toBe('rotated');
    if (outcome.kind !== 'rotated') throw new Error('unreachable');
    expect(outcome.issued.record.familyId).toBe(familyId);
    expect(outcome.issued.record.rotatedFrom).toBe(first.record.id);
    expect(outcome.issued.plaintext).not.toBe(first.plaintext);

    const oldRow = await repo.findByHash(hashOpaqueToken(first.plaintext));
    expect(oldRow?.revokedAt).not.toBeNull();
  });

  it('цепочка из нескольких ротаций держит одну и ту же familyId', async () => {
    const repo = new InMemoryRefreshTokenRepository();
    const userId = randomUUID();
    const familyId = randomUUID();
    let current = await issueFirstRefreshToken({ userId, repo, ttlSeconds: TTL, familyId });

    for (let i = 0; i < 5; i++) {
      const outcome = await rotateRefreshToken({
        presentedTokenPlaintext: current.plaintext,
        repo,
        ttlSeconds: TTL,
      });
      if (outcome.kind !== 'rotated') throw new Error('unreachable');
      expect(outcome.familyId).toBe(familyId);
      current = outcome.issued;
    }
    expect(repo.snapshot()).toHaveLength(6); // 1 первый + 5 ротаций
  });

  it('REUSE DETECTION: повторное предъявление уже погашенного токена отзывает ВСЮ семью', async () => {
    const repo = new InMemoryRefreshTokenRepository();
    const userId = randomUUID();
    const familyId = randomUUID();
    const first = await issueFirstRefreshToken({ userId, repo, ttlSeconds: TTL, familyId });

    const rotated = await rotateRefreshToken({
      presentedTokenPlaintext: first.plaintext,
      repo,
      ttlSeconds: TTL,
    });
    if (rotated.kind !== 'rotated') throw new Error('unreachable');

    // Атака/гонка: кто-то снова предъявляет ПЕРВЫЙ (уже погашенный) токен.
    const reuse = await rotateRefreshToken({
      presentedTokenPlaintext: first.plaintext,
      repo,
      ttlSeconds: TTL,
    });

    expect(reuse.kind).toBe('reuse-detected');
    if (reuse.kind !== 'reuse-detected') throw new Error('unreachable');
    expect(reuse.familyId).toBe(familyId);
    // К моменту reuse в семье жив только "rotated" токен (первый уже был погашен ДО reuse) —
    // revokeFamily отзывает всё, что ещё не отозвано (т.е. только "rotated").
    expect(reuse.revokedCount).toBe(1);

    // Токен, выпущенный законной ротацией, ТОЖЕ должен стать нерабочим после reuse.
    const afterReuse = await rotateRefreshToken({
      presentedTokenPlaintext: rotated.issued.plaintext,
      repo,
      ttlSeconds: TTL,
    }).catch((e: unknown) => e);
    // rotated.issued теперь отозван (revokedAt != null) → повторное предъявление снова
    // распознаётся как reuse (а не как валидная ротация) — это и есть «вся семья мертва».
    expect(afterReuse).toMatchObject({ kind: 'reuse-detected', familyId });
  });

  it('reuse detection на СОВСЕМ первом токене (обмен ни разу не происходил) невозможен —' +
    ' предъявление свежего токена — это нормальная ротация, не reuse', async () => {
    const repo = new InMemoryRefreshTokenRepository();
    const userId = randomUUID();
    const familyId = randomUUID();
    const first = await issueFirstRefreshToken({ userId, repo, ttlSeconds: TTL, familyId });
    const outcome = await rotateRefreshToken({
      presentedTokenPlaintext: first.plaintext,
      repo,
      ttlSeconds: TTL,
    });
    expect(outcome.kind).toBe('rotated');
  });

  it('неизвестный токен бросает RefreshTokenInvalidError', async () => {
    const repo = new InMemoryRefreshTokenRepository();
    await expect(
      rotateRefreshToken({ presentedTokenPlaintext: 'never-issued', repo, ttlSeconds: TTL }),
    ).rejects.toThrow(RefreshTokenInvalidError);
  });

  it('истёкший (но не погашенный) токен бросает RefreshTokenInvalidError, НЕ reuse', async () => {
    const repo = new InMemoryRefreshTokenRepository();
    const userId = randomUUID();
    const familyId = randomUUID();
    const past = new Date(Date.now() - 10_000);
    const issued = await issueFirstRefreshToken({
      userId,
      repo,
      ttlSeconds: -1,
      familyId,
      now: past,
    });
    await expect(
      rotateRefreshToken({ presentedTokenPlaintext: issued.plaintext, repo, ttlSeconds: TTL }),
    ).rejects.toThrow(RefreshTokenInvalidError);
  });

  it('две независимые семьи одного пользователя (два устройства) не мешают друг другу', async () => {
    const repo = new InMemoryRefreshTokenRepository();
    const userId = randomUUID();
    const familyA = randomUUID();
    const familyB = randomUUID();
    const a = await issueFirstRefreshToken({ userId, repo, ttlSeconds: TTL, familyId: familyA });
    const b = await issueFirstRefreshToken({ userId, repo, ttlSeconds: TTL, familyId: familyB });

    // reuse на семье A (гасим и предъявляем старый снова)
    const rotatedA = await rotateRefreshToken({
      presentedTokenPlaintext: a.plaintext,
      repo,
      ttlSeconds: TTL,
    });
    if (rotatedA.kind !== 'rotated') throw new Error('unreachable');
    const reuseA = await rotateRefreshToken({
      presentedTokenPlaintext: a.plaintext,
      repo,
      ttlSeconds: TTL,
    });
    expect(reuseA.kind).toBe('reuse-detected');

    // семья B не затронута
    const rotatedB = await rotateRefreshToken({
      presentedTokenPlaintext: b.plaintext,
      repo,
      ttlSeconds: TTL,
    });
    expect(rotatedB.kind).toBe('rotated');
  });
});
