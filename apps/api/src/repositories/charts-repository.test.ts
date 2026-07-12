/**
 * Юнит-тест на находку [pd-leak-charts-data]: `charts.data` содержит `ChartData.input`
 * (точные дата/время/координаты рождения — та же ПД, что `birth_profiles` шифрует AES-256-GCM),
 * поэтому весь blob должен шифроваться тем же keyring на границе репозитория. Чистые функции
 * `encryptChartData`/`decryptChartData` не требуют БД — так же, как `pd-cipher.test.ts` тестирует
 * `encryptPd`/`decryptPd` без I/O.
 */
import { describe, expect, it } from 'vitest';
import { buildPdKeyring } from '@stassist/shared';
import type { ChartData } from '@stassist/shared';
import { decryptChartData, encryptChartData } from './charts-repository.js';

const KEY_V1 = Buffer.alloc(32, 1).toString('base64');

function buildFixtureChartData(): ChartData {
  return {
    kind: 'natal',
    input: {
      dateTime: { year: 1990, month: 5, day: 17, hour: 14, minute: 30, second: 0 },
      timeUnknown: false,
      place: { lat: 55.7558, lon: 37.6173, elevationM: 0 },
      tzId: 'Europe/Moscow',
      preset: {
        zodiac: 'tropical',
        houseSystem: 'placidus',
        bodies: { trueNode: false, trueLilith: false, selena: true, chiron: true },
        orbs: { byAspect: {}, byBody: {} },
        aspectSet: 'major_minor',
      },
    } as ChartData['input'],
    meta: {
      coreVersion: 'test-1',
      coordinateFrame: 'geocentric-apparent-ecliptic-of-date',
      zodiac: 'tropical',
      houseSystem: 'placidus',
      houseSystemFallback: false,
      noHouses: false,
      deltaTSeconds: 70,
      julianDayUT: 2448024.1,
      julianDayTT: 2448024.101,
      gmstDeg: 100,
      gastDeg: 100,
      accuracyNotes: [],
    },
    bodies: {} as ChartData['bodies'],
    points: {},
    arabicParts: {},
    angles: {} as ChartData['angles'],
    houses: [],
    aspects: [],
  };
}

describe('charts-repository: шифрование charts.data (находка [pd-leak-charts-data])', () => {
  it('round-trip: encryptChartData → decryptChartData возвращает исходный ChartData без потерь', () => {
    const keyring = buildPdKeyring(1, { 1: KEY_V1 });
    const data = buildFixtureChartData();

    const ciphertext = encryptChartData(data, keyring);
    const decrypted = decryptChartData(ciphertext, keyring);

    expect(decrypted).toEqual(data);
  });

  it('шифртекст НЕ содержит открытым текстом дату/время/координаты рождения', () => {
    const keyring = buildPdKeyring(1, { 1: KEY_V1 });
    const data = buildFixtureChartData();

    const ciphertext = encryptChartData(data, keyring);

    // Точные значения из input — та же ПД, что birth_profiles.birthDateEnc/latEnc/lonEnc шифрует.
    // (Односимвольные/двузначные подстроки намеренно не проверяем — в высокоэнтропийном base64
    // шифртексте случайное совпадение короткой подстроки статистически ожидаемо и не было бы
    // сигналом об утечке.)
    expect(ciphertext).not.toContain('1990');
    expect(ciphertext).not.toContain('55.7558'); // широта
    expect(ciphertext).not.toContain('37.6173'); // долгота
    expect(ciphertext).not.toContain('Europe/Moscow'); // tzId
    // И сериализованный JSON целиком не должен просвечивать как есть.
    expect(ciphertext).not.toContain('"dateTime"');
    expect(ciphertext).not.toContain('"lat"');
  });

  it('шифртекст помечен версией активного ключа (формат как у encryptPd)', () => {
    const keyring = buildPdKeyring(1, { 1: KEY_V1 });
    const ciphertext = encryptChartData(buildFixtureChartData(), keyring);
    expect(ciphertext.startsWith('v1:')).toBe(true);
  });

  it('разные вызовы шифрования одного и того же chart-объекта дают разный шифртекст (случайный IV)', () => {
    const keyring = buildPdKeyring(1, { 1: KEY_V1 });
    const data = buildFixtureChartData();
    const a = encryptChartData(data, keyring);
    const b = encryptChartData(data, keyring);
    expect(a).not.toBe(b);
  });
});
