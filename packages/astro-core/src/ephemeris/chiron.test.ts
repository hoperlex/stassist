import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { chironPosition, ChironOutOfRangeError } from './chiron.js';

/**
 * Юлианский день (UT) для григорианской даты — стандартная формула Meeus. Продублирована здесь
 * (а не импортирована из tools/gen-chiron.ts) специально: тест должен независимо проверять
 * рантайм-модуль, а не полагаться на код генератора.
 */
function julianDayUTC(year: number, month: number, day: number, hour: number, minute: number): number {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  const dayFraction = day + (hour + minute / 60) / 24;
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + dayFraction + b - 1524.5;
}

/**
 * Упрощённая гладкая парабола ΔT (см. обоснование точности в шапке tools/gen-chiron.ts) — для
 * теста этого достаточно с большим запасом: допуск сверки ≤2′, а ошибка от разницы ΔT-моделей
 * на порядки меньше (Хирон движется ~0.02°/сутки).
 */
function deltaTSecondsApprox(decimalYear: number): number {
  return 62 + 0.3932 * (decimalYear - 2000) + 0.0058 * (decimalYear - 2000) ** 2;
}

function jdTTFromCalendar(year: number, month: number, day: number, hour = 0, minute = 0): number {
  const jdUT = julianDayUTC(year, month, day, hour, minute);
  const decimalYear = year + (month - 0.5) / 12;
  return jdUT + deltaTSecondsApprox(decimalYear) / 86400;
}

/** Кратчайшая знаковая разность b-a в градусах, диапазон (-180,180]. */
function shortestDeltaDegrees(a: number, b: number): number {
  let d = (b - a) % 360;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return d;
}

describe('chironPosition', () => {
  it('возвращает конечные значения в разумных пределах для дат внутри диапазона', () => {
    const dates: Array<[number, number, number]> = [
      [1970, 2, 1],
      [2000, 1, 1],
      [2025, 6, 15],
    ];
    for (const [year, month, day] of dates) {
      const jdTT = jdTTFromCalendar(year, month, day);
      const pos = chironPosition(jdTT);

      expect(Number.isFinite(pos.longitudeDeg)).toBe(true);
      expect(Number.isFinite(pos.latitudeDeg)).toBe(true);
      expect(Number.isFinite(pos.speedLongDegPerDay)).toBe(true);
      expect(pos.longitudeDeg).toBeGreaterThanOrEqual(0);
      expect(pos.longitudeDeg).toBeLessThan(360);
      expect(Math.abs(pos.latitudeDeg)).toBeLessThanOrEqual(20);
      expect(pos.isRetrograde).toBe(pos.speedLongDegPerDay < 0);
    }
  });

  it('непрерывна по времени: соседние сутки дают близкую долготу (без скачков wraparound)', () => {
    const referenceDates: Array<[number, number, number]> = [
      [1950, 3, 10],
      [2010, 11, 20],
      [2099, 12, 25],
    ];
    for (const [year, month, day] of referenceDates) {
      const jdTT1 = jdTTFromCalendar(year, month, day);
      const jdTT2 = jdTTFromCalendar(year, month, day + 1);
      const pos1 = chironPosition(jdTT1);
      const pos2 = chironPosition(jdTT2);

      const diff = Math.abs(shortestDeltaDegrees(pos1.longitudeDeg, pos2.longitudeDeg));
      expect(diff).toBeLessThan(3); // Хирон физически не может пройти больше пары градусов за сутки
    }
  });

  it('бросает ChironOutOfRangeError вне диапазона таблицы (1800 и 2200 годы)', () => {
    const jdTT1800 = jdTTFromCalendar(1800, 1, 1);
    const jdTT2200 = jdTTFromCalendar(2200, 1, 1);

    expect(() => chironPosition(jdTT1800)).toThrow(ChironOutOfRangeError);
    expect(() => chironPosition(jdTT2200)).toThrow(ChironOutOfRangeError);
  });

  it('в сообщении ошибки присутствует значение JD TT', () => {
    const jdTT1800 = jdTTFromCalendar(1800, 1, 1);
    try {
      chironPosition(jdTT1800);
      expect.fail('ожидалось исключение ChironOutOfRangeError');
    } catch (err) {
      expect(err).toBeInstanceOf(ChironOutOfRangeError);
      expect((err as Error).message).toContain(String(jdTT1800));
    }
  });

  // ── Кросс-проверка с сырыми данными JPL Horizons ──────────────────────────────────────────
  // Читаем закэшированный чанк напрямую (tools/data/chiron-horizons/) и сравниваем интерполяцию
  // с исходной точкой Horizons — это независимая (от генератора) проверка качества фита Чебышёва.
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const CACHE_FILE = path.resolve(
    __dirname,
    '../../../../tools/data/chiron-horizons/chiron_2000_2004.txt',
  );
  const cacheAvailable = existsSync(CACHE_FILE);

  const MONTHS: Record<string, number> = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
  };

  function parseFirstHorizonsPoint(raw: string): {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    lonDeg: number;
    latDeg: number;
  } {
    const lines = raw.split(/\r?\n/);
    const headerLine = lines.find((l) => l.includes('ObsEcLon') && l.includes('ObsEcLat'));
    if (!headerLine) throw new Error('в кэш-файле не найден заголовок ObsEcLon/ObsEcLat');
    const lonColEnd = headerLine.indexOf('ObsEcLon') + 'ObsEcLon'.length;
    const latColEnd = headerLine.indexOf('ObsEcLat') + 'ObsEcLat'.length;
    const soeIdx = lines.findIndex((l) => l.trim() === '$$SOE');
    if (soeIdx === -1) throw new Error('в кэш-файле не найден маркер $$SOE');
    const dataLine = lines[soeIdx + 1]!;

    const dateField = dataLine.slice(0, 18).trim();
    const lonField = dataLine.slice(18, lonColEnd).trim();
    const latField = dataLine.slice(lonColEnd, latColEnd).trim();

    const m = /^(\d{4})-([A-Za-z]{3})-(\d{2})\s+(\d{2}):(\d{2})/.exec(dateField);
    if (!m) throw new Error(`не удалось распарсить дату кэш-файла: "${dateField}"`);
    const month = MONTHS[m[2]!]!;

    return {
      year: Number.parseInt(m[1]!, 10),
      month,
      day: Number.parseInt(m[3]!, 10),
      hour: Number.parseInt(m[4]!, 10),
      minute: Number.parseInt(m[5]!, 10),
      lonDeg: Number.parseFloat(lonField),
      latDeg: Number.parseFloat(latField),
    };
  }

  (cacheAvailable ? it : it.skip)(
    'интерполяция совпадает с сырой точкой JPL Horizons из кэша (допуск ≤2′)',
    () => {
      const raw = readFileSync(CACHE_FILE, 'utf8');
      const point = parseFirstHorizonsPoint(raw);
      const jdTT = jdTTFromCalendar(point.year, point.month, point.day, point.hour, point.minute);

      const pos = chironPosition(jdTT);

      const lonDiffArcmin = Math.abs(shortestDeltaDegrees(pos.longitudeDeg, point.lonDeg)) * 60;
      const latDiffArcmin = Math.abs(pos.latitudeDeg - point.latDeg) * 60;

      expect(lonDiffArcmin).toBeLessThanOrEqual(2);
      expect(latDiffArcmin).toBeLessThanOrEqual(2);
    },
  );
});
