import { describe, expect, it } from 'vitest';
import { HOROSCOPE_HUMOR_SYSTEM_RULES_RU, HOROSCOPE_LENGTH_RANGE_CHARS, HOROSCOPE_SYSTEM_RULES_RU } from './tone.js';

describe('HOROSCOPE_SYSTEM_RULES_RU — тон-правила реального LLM-пути', () => {
  it('требует опоры только на блок АСТРОСОБЫТИЯ (анти-галлюцинации)', () => {
    expect(HOROSCOPE_SYSTEM_RULES_RU).toContain('АСТРОСОБЫТИЯ');
    expect(HOROSCOPE_SYSTEM_RULES_RU).toMatch(/не выдумывай|не вычисляй/i);
  });

  it('явно требует конкретику и запрещает штампы («звёзды советуют»/пафос)', () => {
    expect(HOROSCOPE_SYSTEM_RULES_RU).toMatch(/КОНКРЕТИК/);
    expect(HOROSCOPE_SYSTEM_RULES_RU).toMatch(/штамп/i);
    expect(HOROSCOPE_SYSTEM_RULES_RU).toMatch(/любому знаку|любой день/i);
  });

  it('содержит анти-фатализм и запреты (мед/смерть/гарантии)', () => {
    expect(HOROSCOPE_SYSTEM_RULES_RU).toMatch(/без фатализма/i);
    expect(HOROSCOPE_SYSTEM_RULES_RU).toMatch(/ЗАПРЕЩЕНО/);
    expect(HOROSCOPE_SYSTEM_RULES_RU).toMatch(/медицинск/i);
  });

  it('требует антидубляж зачинов (история + между знаками выпуска)', () => {
    expect(HOROSCOPE_SYSTEM_RULES_RU).toMatch(/НЕДАВНИЕ ЗАЧИНЫ/);
    expect(HOROSCOPE_SYSTEM_RULES_RU).toMatch(/разных знаков/i);
  });

  it('шуточный тон-промт помечает контур как несерьёзный', () => {
    expect(HOROSCOPE_HUMOR_SYSTEM_RULES_RU).toMatch(/ирони|шуточн/i);
    expect(HOROSCOPE_HUMOR_SYSTEM_RULES_RU).toMatch(/НЕ реальный/i);
  });

  it('диапазоны длины: день короче развёрнутых периодов', () => {
    expect(HOROSCOPE_LENGTH_RANGE_CHARS.day[1]).toBeLessThan(HOROSCOPE_LENGTH_RANGE_CHARS.week[0]);
  });
});
