import { describe, expect, it } from 'vitest';
import { assignPaywallVariant, buildPaywallContent, PAYWALL_VARIANTS } from './paywall.js';

describe('assignPaywallVariant', () => {
  it('детерминирован — тот же seed всегда даёт тот же вариант', () => {
    expect(assignPaywallVariant('user-123')).toBe(assignPaywallVariant('user-123'));
  });

  it('возвращает только объявленные варианты', () => {
    for (const seed of ['a', 'b', 'c', 'user-1', 'anon-xyz', '']) {
      expect(PAYWALL_VARIANTS).toContain(assignPaywallVariant(seed));
    }
  });

  it('распределяет по обоим вариантам на достаточной выборке (не вырождается в константу)', () => {
    const seen = new Set<string>();
    for (let i = 0; i < 100; i++) seen.add(assignPaywallVariant(`seed-${i}`));
    expect(seen.size).toBe(2);
  });
});

describe('buildPaywallContent', () => {
  it('оба варианта дают непустой, различающийся копирайт (req.3: «оффер/копирайт»)', () => {
    const control = buildPaywallContent('control', null);
    const trialFirst = buildPaywallContent('trial_first', null);
    expect(control.headlineRu).not.toBe(trialFirst.headlineRu);
    expect(control.ctaLabelRu).not.toBe(trialFirst.ctaLabelRu);
    expect(control.headlineRu.length).toBeGreaterThan(5);
    expect(trialFirst.headlineRu.length).toBeGreaterThan(5);
    expect(control.bullets.length).toBeGreaterThan(0);
    expect(trialFirst.bullets.length).toBeGreaterThan(0);
  });

  it('trial_first явно акцентирует бесплатный триал (badge задан)', () => {
    const content = buildPaywallContent('trial_first', null);
    expect(content.badgeRu).toMatch(/бесплатно/i);
  });

  it('персонализация: текст меняется по сфере квиза (req.3: «тексты вариируются по ответам»)', () => {
    const love = buildPaywallContent('control', 'love');
    const career = buildPaywallContent('control', 'career');
    const none = buildPaywallContent('control', null);
    expect(love.headlineRu).not.toBe(career.headlineRu);
    expect(love.headlineRu).not.toBe(none.headlineRu);
    expect(love.headlineRu).toContain('отношения');
  });

  it('цена и план соответствуют PLAN_CATALOG.premium_m', () => {
    const content = buildPaywallContent('control', null);
    expect(content.planCode).toBe('premium_m');
    expect(content.priceKop).toBe(34_900);
    expect(content.trialDays).toBe(7);
  });
});
