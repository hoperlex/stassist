import { describe, expect, it } from 'vitest';
import { parseConfig } from '../config.js';
import { createPorts } from './factory.js';
import { FakePaymentProvider } from './payment-provider.js';
import { YookassaPaymentProvider } from './yookassa-payment-provider.js';

const baseEnv = { NODE_ENV: 'test', COOKIE_SECRET: 'x'.repeat(32), CORS_ALLOWLIST: 'https://stassist.ru' } as NodeJS.ProcessEnv;

describe('createPorts: payments (Ф8 — реальный адаптер ЮKassa за портом)', () => {
  it('PAYMENTS=stub (дефолт) → FakePaymentProvider', () => {
    const config = parseConfig(baseEnv);
    const ports = createPorts(config);
    expect(ports.payments).toBeInstanceOf(FakePaymentProvider);
  });

  it('PAYMENTS=yookassa с ключами → YookassaPaymentProvider (не бросает)', () => {
    const config = parseConfig({
      ...baseEnv,
      PAYMENTS: 'yookassa',
      YOOKASSA_SHOP_ID: 'shop-1',
      YOOKASSA_SECRET_KEY: 'secret-1',
    } as NodeJS.ProcessEnv);
    const ports = createPorts(config);
    expect(ports.payments).toBeInstanceOf(YookassaPaymentProvider);
  });
});
