import { describe, expect, it } from 'vitest';
import { buildPdKeyring, decryptPd, encryptPd, PdCipherError } from './pd-cipher.js';

const KEY_V1 = Buffer.alloc(32, 1).toString('base64');
const KEY_V2 = Buffer.alloc(32, 2).toString('base64');

describe('AES-256-GCM round-trip (шифрование ПД)', () => {
  it('шифрует и расшифровывает исходную строку без потерь', () => {
    const keyring = buildPdKeyring(1, { 1: KEY_V1 });
    const ciphertext = encryptPd('1990-05-17', keyring);
    expect(ciphertext).not.toContain('1990-05-17');
    expect(decryptPd(ciphertext, keyring)).toBe('1990-05-17');
  });

  it('два шифрования одного и того же значения дают разный шифртекст (случайный IV)', () => {
    const keyring = buildPdKeyring(1, { 1: KEY_V1 });
    const a = encryptPd('Москва', keyring);
    const b = encryptPd('Москва', keyring);
    expect(a).not.toBe(b);
  });

  it('шифртекст содержит версию активного ключа как префикс', () => {
    const keyring = buildPdKeyring(1, { 1: KEY_V1 });
    expect(encryptPd('x', keyring).startsWith('v1:')).toBe(true);
  });

  it('ротация: старые записи (версия 1) расшифровываются после смены активной версии на 2', () => {
    const keyringV1Active = buildPdKeyring(1, { 1: KEY_V1, 2: KEY_V2 });
    const oldCiphertext = encryptPd('55.7558', keyringV1Active);

    const keyringV2Active = buildPdKeyring(2, { 1: KEY_V1, 2: KEY_V2 });
    expect(decryptPd(oldCiphertext, keyringV2Active)).toBe('55.7558');

    const newCiphertext = encryptPd('55.7558', keyringV2Active);
    expect(newCiphertext.startsWith('v2:')).toBe(true);
  });

  it('бросает PdCipherError при порче шифртекста (authTag не совпадёт)', () => {
    const keyring = buildPdKeyring(1, { 1: KEY_V1 });
    const ciphertext = encryptPd('секрет', keyring);
    const tampered = ciphertext.slice(0, -4) + 'AAAA';
    expect(() => decryptPd(tampered, keyring)).toThrow(PdCipherError);
  });

  it('бросает PdCipherError, если версия ключа неизвестна keyring', () => {
    const keyring = buildPdKeyring(1, { 1: KEY_V1 });
    const ciphertext = encryptPd('x', keyring);
    const otherKeyring = buildPdKeyring(2, { 2: KEY_V2 });
    expect(() => decryptPd(ciphertext, otherKeyring)).toThrow(/версии 1/);
  });

  it('buildPdKeyring бросает, если ключ не 32 байта', () => {
    expect(() => buildPdKeyring(1, { 1: Buffer.from('слишком короткий').toString('base64') })).toThrow(
      PdCipherError,
    );
  });

  it('buildPdKeyring бросает, если активная версия отсутствует среди переданных ключей', () => {
    expect(() => buildPdKeyring(3, { 1: KEY_V1 })).toThrow(/активная версия/);
  });
});
