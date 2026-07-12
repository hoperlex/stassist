/**
 * Оффлайн data-step: скачивает наблюдательские эфемериды астероида 2060 Chiron (Хирон) с
 * JPL Horizons (https://ssd.jpl.nasa.gov/api/horizons.api) за 1900-01-01..2100-01-01,
 * кэширует сырые ответы в `tools/data/chiron-horizons/` и строит из них кусочную
 * аппроксимацию Чебышёва, которую записывает в
 * `packages/astro-core/src/ephemeris/chiron-data.generated.ts`.
 *
 * НЕ часть build/CI — запускается вручную командой `pnpm data:gen-chiron` (из корня репо).
 * Кэш-first: если чанк уже есть на диске — сеть не трогаем; `--refresh` форсирует перекачку
 * всех чанков заново. Результат (и кэш, и сгенерированная таблица) коммитится в репозиторий.
 *
 * Почему Хирон вообще нужно тянуть отдельно: `astronomy-engine` (и вообще ни одна open-source
 * JS-библиотека без Swiss Ephemeris) не считает малые тела/астероиды — только большие планеты.
 * JPL Horizons — официальный государственный источник (NASA/JPL), поэтому его данные, один раз
 * предрассчитанные офлайн и закоммиченные, можно безопасно интерполировать в рантайме без сети.
 *
 * Система координат (см. постановку задачи и docs/roadmap/31-конвенции-реализации.md):
 * `EPHEM_TYPE=OBSERVER`, `QUANTITIES=31` → колонки `ObsEcLon`/`ObsEcLat` — это ИМЕННО видимая
 * (apparent) геоцентрическая эклиптическая долгота/широта ЭПОХИ ДАТЫ (с учётом светового
 * времени, гравитационного отклонения и аберрации) — та же система, что и весь остальной
 * астрокор и astro.com. `CENTER='500@399'` — геоцентр. Проверено реальными запросами к API.
 *
 * Формат ответа Horizons — фиксированной ширины (Fortran-style), например:
 *   ` Date__(UT)__HR:MN        ObsEcLon    ObsEcLat`
 *   ` 2000-Jan-01 00:00     251.5603761   4.0686422`
 * Дата всегда занимает ровно 18 символов (" YYYY-Mon-DD HH:MM"), поэтому границу поля долготы
 * можно взять фиксированной; конец полей долготы/широты вычисляем динамически по заголовку
 * (позиции окончания текста "ObsEcLon"/"ObsEcLat") — это устойчиво к склейке чисел без пробела
 * при отрицательной широте (её присутствие лишь сдвигает цифры влево внутри того же поля).
 *
 * ΔT (TT − UT): своя самодостаточная реализация полинома Espenak–Meeus (NASA,
 * https://eclipse.gsfc.nasa.gov/SEhelp/deltatpoly2004.html) — специально НЕ импортируем ничего
 * из packages/astro-core (на момент написания этого скрипта нужного модуля там могло не быть,
 * да и это изолированный оффлайн-инструмент, дублирование ΔT-логики здесь — осознанное решение).
 * Реализованы только ветви, релевантные диапазону 1900–2150 (наш диапазон — 1900–2100, все точки
 * внутри 1900–2100 → используются ветви 1900–1920..2050–2150); для гипотетических дат вне этого
 * диапазона (в генераторе не встречается) — гладкий параболический fallback
 * `ΔT ≈ 62 + 0.3932·(year−2000) + 0.0058·(year−2000)²` секунд, который для 1900–2100 расходится
 * с табличным полиномом на пренебрежимую для нас величину: Хирон движется ~7–8°/год (~0.02°/сутки),
 * и даже разница ΔT в десятки секунд даёт ошибку по долготе много меньше 1″ (секунда ΔT ⇒ доля
 * суток ⇒ на 4-5 порядков меньше 0.02°). Табличные ветви ниже сверены на непрерывность на стыках
 * (значения на границах соседних ветвей совпадают с точностью до ~0.01–0.05 с, как и ожидается от
 * независимо подогнанных кусочных полиномов) — это даёт уверенность, что коэффициенты не перепутаны.
 */
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CACHE_DIR = path.join(ROOT, 'tools', 'data', 'chiron-horizons');
const OUTPUT_FILE = path.join(
  ROOT,
  'packages',
  'astro-core',
  'src',
  'ephemeris',
  'chiron-data.generated.ts',
);

const HORIZONS_URL = 'https://ssd.jpl.nasa.gov/api/horizons.api';
const CHIRON_COMMAND = '2060'; // small-body designation 2060 Chiron (1977 UB), проверено вручную.

const RANGE_START_YEAR = 1900;
const RANGE_END_YEAR = 2100; // верхняя граница диапазона (STOP_TIME последнего чанка)
const CHUNK_YEARS = 5; // 200 лет / 5 = 40 чанков
const STEP = '2 d'; // ~913 точек на чанк, ~36600 точек на весь диапазон
const OVERLAP_DAYS = 5; // нахлёст окна аппроксимации по краям, для устойчивости фита
const DEFAULT_DEGREE = 10; // степень Чебышёва по умолчанию (11 коэффициентов)
const MAX_DEGREE = 14; // повышенная степень, если базовой не хватает точности
const RESIDUAL_THRESHOLD_ARCSEC = 30; // порог невязки, после которого поднимаем степень
const RETRY_ATTEMPTS = 3; // 1 попытка + 2 повтора
const RETRY_DELAY_MS = 1500;
const REQUEST_TIMEOUT_MS = 60_000;
const POLITE_PAUSE_MS = 250; // пауза между реальными сетевыми запросами (200–300 мс)
const DATE_FIELD_WIDTH = 18; // ширина поля " YYYY-Mon-DD HH:MM" в ответе Horizons (CAL_FORMAT=CAL)

// ────────────────────────────────────────────────────────────────────────────────────────────
// ΔT (Espenak–Meeus) и юлианский день (UT)
// ────────────────────────────────────────────────────────────────────────────────────────────

/** Десятичный год для формул ΔT (стандартное приближение Meeus: игнорируем день месяца). */
export function decimalYearFromDate(year: number, month: number): number {
  return year + (month - 0.5) / 12;
}

/**
 * ΔT = TT − UT, секунды. Полином Espenak–Meeus (NASA), ветви для 1900–2150 — см. пояснение
 * в шапке файла. Вне этого диапазона — гладкая парабола (fallback, здесь фактически не достигается).
 */
export function deltaTSeconds(year: number): number {
  const y = year;
  if (y >= 1900 && y < 1920) {
    const t = y - 1900;
    return -2.79 + 1.494119 * t - 0.0598939 * t ** 2 + 0.0061966 * t ** 3 - 0.000197 * t ** 4;
  }
  if (y >= 1920 && y < 1941) {
    const t = y - 1920;
    return 21.2 + 0.84493 * t - 0.0761 * t ** 2 + 0.0020936 * t ** 3;
  }
  if (y >= 1941 && y < 1961) {
    const t = y - 1950;
    return 29.07 + 0.407 * t - t ** 2 / 233 + t ** 3 / 2547;
  }
  if (y >= 1961 && y < 1986) {
    const t = y - 1975;
    return 45.45 + 1.067 * t - t ** 2 / 260 - t ** 3 / 718;
  }
  if (y >= 1986 && y < 2005) {
    const t = y - 2000;
    return (
      63.86 +
      0.3345 * t -
      0.060374 * t ** 2 +
      0.0017275 * t ** 3 +
      0.000651814 * t ** 4 +
      0.00002373599 * t ** 5
    );
  }
  if (y >= 2005 && y < 2050) {
    const t = y - 2000;
    return 62.92 + 0.32217 * t + 0.005589 * t ** 2;
  }
  if (y >= 2050 && y < 2150) {
    return -20 + 32 * ((y - 1820) / 100) ** 2 - 0.5628 * (2150 - y);
  }
  // Fallback вне табличных ветвей (в этом генераторе не достигается, т.к. диапазон дат 1900–2100).
  return 62 + 0.3932 * (y - 2000) + 0.0058 * (y - 2000) ** 2;
}

/** Юлианский день (UT) для григорианской календарной даты — стандартная формула Meeus. */
export function julianDayUTC(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second = 0,
): number {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  const dayFraction = day + (hour + minute / 60 + second / 3600) / 24;
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + dayFraction + b - 1524.5;
}

/** JD TT для 00:00 UT заданной григорианской даты (используется для границ годовых окон). */
export function jdTTForCalendar(year: number, month: number, day: number): number {
  const jdUT = julianDayUTC(year, month, day, 0, 0);
  return jdUT + deltaTSeconds(decimalYearFromDate(year, month)) / 86400;
}

// ────────────────────────────────────────────────────────────────────────────────────────────
// Парсинг ответа Horizons
// ────────────────────────────────────────────────────────────────────────────────────────────

const MONTH_NUMBERS: Record<string, number> = {
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

interface ParsedDateTime {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

function parseHorizonsDateTime(text: string): ParsedDateTime | null {
  const m = /^(\d{4})-([A-Za-z]{3})-(\d{2})\s+(\d{2}):(\d{2})/.exec(text);
  if (!m) return null;
  const monStr = m[2]!;
  const month = MONTH_NUMBERS[monStr];
  if (!month) return null;
  return {
    year: Number.parseInt(m[1]!, 10),
    month,
    day: Number.parseInt(m[3]!, 10),
    hour: Number.parseInt(m[4]!, 10),
    minute: Number.parseInt(m[5]!, 10),
  };
}

export interface RawPoint {
  readonly jdUT: number;
  readonly jdTT: number;
  readonly lonDeg: number;
  readonly latDeg: number;
}

/**
 * Разбирает сырой текстовый ответ Horizons (между `$$SOE`/`$$EOE`) в точки {jdTT, lon, lat}.
 * Границы полей долготы/широты берём из заголовка колонок (устойчиво к склейке при отриц. широте).
 */
export function parseChunkText(raw: string, label: string): RawPoint[] {
  const lines = raw.split(/\r?\n/);
  const headerLine = lines.find((l) => l.includes('ObsEcLon') && l.includes('ObsEcLat'));
  if (!headerLine) {
    throw new Error(
      `[${label}] не найден заголовок колонок ObsEcLon/ObsEcLat — формат ответа Horizons изменился?`,
    );
  }
  const lonColEnd = headerLine.indexOf('ObsEcLon') + 'ObsEcLon'.length;
  const latColEnd = headerLine.indexOf('ObsEcLat') + 'ObsEcLat'.length;

  const soeIdx = lines.findIndex((l) => l.trim() === '$$SOE');
  const eoeIdx = lines.findIndex((l) => l.trim() === '$$EOE');
  if (soeIdx === -1 || eoeIdx === -1 || eoeIdx <= soeIdx) {
    throw new Error(`[${label}] не найдены маркеры $$SOE/$$EOE в ответе Horizons`);
  }

  const points: RawPoint[] = [];
  for (const line of lines.slice(soeIdx + 1, eoeIdx)) {
    if (line.trim().length === 0) continue;
    const dateField = line.slice(0, DATE_FIELD_WIDTH).trim();
    const lonField = line.slice(DATE_FIELD_WIDTH, lonColEnd).trim();
    const latField = line.slice(lonColEnd, latColEnd).trim();

    const dt = parseHorizonsDateTime(dateField);
    const lonDeg = Number.parseFloat(lonField);
    const latDeg = Number.parseFloat(latField);
    if (!dt || !Number.isFinite(lonDeg) || !Number.isFinite(latDeg)) {
      throw new Error(`[${label}] не удалось распарсить строку эфемериды: "${line}"`);
    }

    const jdUT = julianDayUTC(dt.year, dt.month, dt.day, dt.hour, dt.minute);
    const jdTT = jdUT + deltaTSeconds(decimalYearFromDate(dt.year, dt.month)) / 86400;
    points.push({ jdUT, jdTT, lonDeg, latDeg });
  }
  return points;
}

// ────────────────────────────────────────────────────────────────────────────────────────────
// Скачивание чанков (кэш-first)
// ────────────────────────────────────────────────────────────────────────────────────────────

export interface ChunkDef {
  readonly startYear: number;
  readonly stopYear: number; // эксклюзивная верхняя граница (STOP_TIME)
  readonly filename: string;
}

export function buildChunkPlan(): ChunkDef[] {
  const chunks: ChunkDef[] = [];
  for (let start = RANGE_START_YEAR; start < RANGE_END_YEAR; start += CHUNK_YEARS) {
    const stop = start + CHUNK_YEARS;
    chunks.push({ startYear: start, stopYear: stop, filename: `chiron_${start}_${stop - 1}.txt` });
  }
  return chunks;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchChunkFromApi(startYear: number, stopYear: number): Promise<string> {
  const params = new URLSearchParams({
    format: 'text',
    COMMAND: `'${CHIRON_COMMAND}'`,
    OBJ_DATA: 'NO',
    MAKE_EPHEM: 'YES',
    EPHEM_TYPE: 'OBSERVER',
    CENTER: "'500@399'",
    START_TIME: `'${startYear}-01-01'`,
    STOP_TIME: `'${stopYear}-01-01'`,
    STEP_SIZE: `'${STEP}'`,
    QUANTITIES: "'31'",
    CAL_FORMAT: 'CAL',
    ANG_FORMAT: 'DEG',
  });

  const controller = new AbortController();
  const timeoutHandle = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(HORIZONS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }
    const text = await res.text();
    if (!text.includes('$$SOE') || !text.includes('$$EOE')) {
      throw new Error(`ответ Horizons без $$SOE/$$EOE (похоже на ошибку): ${text.slice(0, 400)}`);
    }
    return text;
  } finally {
    clearTimeout(timeoutHandle);
  }
}

async function fetchChunkWithRetry(startYear: number, stopYear: number): Promise<string> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= RETRY_ATTEMPTS; attempt++) {
    try {
      return await fetchChunkFromApi(startYear, stopYear);
    } catch (err) {
      lastError = err;
      const message = err instanceof Error ? err.message : String(err);
      console.error(
        `[Horizons] попытка ${attempt}/${RETRY_ATTEMPTS} для чанка ${startYear}-${stopYear} не удалась: ${message}`,
      );
      if (attempt < RETRY_ATTEMPTS) await sleep(RETRY_DELAY_MS);
    }
  }
  throw lastError instanceof Error
    ? lastError
    : new Error(`Не удалось скачать чанк ${startYear}-${stopYear}`);
}

async function loadChunk(def: ChunkDef, refresh: boolean): Promise<{ raw: string; fromCache: boolean }> {
  const filePath = path.join(CACHE_DIR, def.filename);
  if (!refresh && existsSync(filePath)) {
    return { raw: await readFile(filePath, 'utf8'), fromCache: true };
  }
  console.log(
    `[Horizons] запрашиваю чанк ${def.filename} (${def.startYear}-01-01 .. ${def.stopYear}-01-01, шаг ${STEP})…`,
  );
  const raw = await fetchChunkWithRetry(def.startYear, def.stopYear);
  await writeFile(filePath, raw, 'utf8');
  await sleep(POLITE_PAUSE_MS);
  return { raw, fromCache: false };
}

// ────────────────────────────────────────────────────────────────────────────────────────────
// Развёртка долготы (unwrap)
// ────────────────────────────────────────────────────────────────────────────────────────────

/** Разворачивает последовательность долгот (град.) так, чтобы не было скачков через 0/360. */
export function unwrapDegrees(values: readonly number[]): number[] {
  if (values.length === 0) return [];
  const result: number[] = [values[0]!];
  for (let i = 1; i < values.length; i++) {
    const prev = result[i - 1]!;
    let curr = values[i]!;
    let diff = curr - prev;
    while (diff > 180) {
      curr -= 360;
      diff -= 360;
    }
    while (diff < -180) {
      curr += 360;
      diff += 360;
    }
    result.push(curr);
  }
  return result;
}

// ────────────────────────────────────────────────────────────────────────────────────────────
// Чебышёв: базис, МНК-фит, вычисление ряда, невязка
// ────────────────────────────────────────────────────────────────────────────────────────────

/** T_0(x)..T_degree(x) по стандартной рекуррентной формуле Чебышёва первого рода. */
export function chebyshevBasis(x: number, degree: number): number[] {
  const t = new Array<number>(degree + 1);
  t[0] = 1;
  if (degree >= 1) t[1] = x;
  for (let k = 2; k <= degree; k++) t[k] = 2 * x * t[k - 1]! - t[k - 2]!;
  return t;
}

/** Решает Ax=b методом Гаусса с частичным выбором ведущего элемента (A — квадратная n×n). */
function solveLinearSystem(a: readonly (readonly number[])[], b: readonly number[]): number[] {
  const n = b.length;
  const m: number[][] = a.map((row, i) => [...row, b[i]!]);

  for (let col = 0; col < n; col++) {
    let pivotRow = col;
    let pivotVal = Math.abs(m[col]![col]!);
    for (let r = col + 1; r < n; r++) {
      const v = Math.abs(m[r]![col]!);
      if (v > pivotVal) {
        pivotVal = v;
        pivotRow = r;
      }
    }
    if (pivotRow !== col) {
      const tmp = m[col]!;
      m[col] = m[pivotRow]!;
      m[pivotRow] = tmp;
    }
    const pivot = m[col]![col]!;
    if (Math.abs(pivot) < 1e-300) {
      throw new Error(
        'Вырожденная матрица нормальных уравнений при фите Чебышёва — увеличьте число точек или уменьшите степень.',
      );
    }
    for (let r = col + 1; r < n; r++) {
      const factor = m[r]![col]! / pivot;
      if (factor === 0) continue;
      for (let c = col; c <= n; c++) {
        m[r]![c] = m[r]![c]! - factor * m[col]![c]!;
      }
    }
  }

  const x = new Array<number>(n).fill(0);
  for (let row = n - 1; row >= 0; row--) {
    let sum = m[row]![n]!;
    for (let c = row + 1; c < n; c++) sum -= m[row]![c]! * x[c]!;
    x[row] = sum / m[row]![row]!;
  }
  return x;
}

/** МНК-фит ряда Чебышёва степени `degree` к точкам (xs[i], ys[i]) через нормальные уравнения. */
export function fitChebyshevLeastSquares(xs: readonly number[], ys: readonly number[], degree: number): number[] {
  const n = degree + 1;
  const ata: number[][] = Array.from({ length: n }, () => new Array<number>(n).fill(0));
  const aty: number[] = new Array<number>(n).fill(0);

  for (let k = 0; k < xs.length; k++) {
    const basis = chebyshevBasis(xs[k]!, degree);
    const y = ys[k]!;
    for (let i = 0; i < n; i++) {
      aty[i] = aty[i]! + basis[i]! * y;
      const rowI = ata[i]!;
      for (let j = 0; j < n; j++) {
        rowI[j] = rowI[j]! + basis[i]! * basis[j]!;
      }
    }
  }
  return solveLinearSystem(ata, aty);
}

/** Значение ряда Чебышёва (коэффициенты любой длины — степень = coeffs.length-1) в точке x. */
export function evalChebyshevSeries(coeffs: readonly number[], x: number): number {
  const basis = chebyshevBasis(x, coeffs.length - 1);
  let sum = 0;
  for (let i = 0; i < coeffs.length; i++) sum += coeffs[i]! * basis[i]!;
  return sum;
}

/** Максимальная абсолютная невязка |предсказание − факт| по всем точкам (в тех же единицах, что ys). */
export function maxAbsResidual(xs: readonly number[], ys: readonly number[], coeffs: readonly number[]): number {
  let maxAbs = 0;
  for (let i = 0; i < xs.length; i++) {
    const diff = Math.abs(evalChebyshevSeries(coeffs, xs[i]!) - ys[i]!);
    if (diff > maxAbs) maxAbs = diff;
  }
  return maxAbs;
}

/** Округление до `digits` значащих цифр — чтобы не тащить в текст файла избыточную точность double. */
export function roundSig(x: number, digits: number): number {
  if (x === 0 || !Number.isFinite(x)) return 0;
  const magnitudeExp = Math.floor(Math.log10(Math.abs(x))) + 1;
  const factor = 10 ** (digits - magnitudeExp);
  return Math.round(x * factor) / factor;
}

// ────────────────────────────────────────────────────────────────────────────────────────────
// Сборка окон и генерация TS-файла
// ────────────────────────────────────────────────────────────────────────────────────────────

interface GeneratedWindow {
  jdStartTT: number;
  jdEndTT: number;
  lonCoeffs: number[];
  latCoeffs: number[];
}

interface GenerationStats {
  worstResidualArcsec: number;
  meanResidualArcsec: number;
  cachedCount: number;
  fetchedCount: number;
  totalPoints: number;
}

function renderOutputFile(windows: readonly GeneratedWindow[], stats: GenerationStats): string {
  const first = windows[0]!;
  const last = windows[windows.length - 1]!;
  const windowsSrc = windows
    .map(
      (w) =>
        `  { jdStartTT: ${w.jdStartTT}, jdEndTT: ${w.jdEndTT}, lonCoeffs: [${w.lonCoeffs.join(', ')}], latCoeffs: [${w.latCoeffs.join(', ')}] },`,
    )
    .join('\n');

  return `/**
 * Автосгенерировано \`tools/gen-chiron.ts\` из данных JPL Horizons (кэш в
 * tools/data/chiron-horizons/ — small body 2060 Chiron, EPHEM_TYPE=OBSERVER, QUANTITIES=31,
 * т.е. видимая геоцентрическая эклиптическая долгота/широта ЭПОХИ ДАТЫ).
 * НЕ РЕДАКТИРОВАТЬ РУКАМИ — перегенерировать командой \`pnpm data:gen-chiron\`.
 *
 * Диапазон: 1900-01-01..2100-01-01 (JD TT), ${windows.length} окон по 1 календарному году.
 * Аппроксимация: кусочный Чебышёв (МНК), базовая степень ${DEFAULT_DEGREE}, при невязке
 * > ${RESIDUAL_THRESHOLD_ARCSEC}″ степень окна поднимается до ${MAX_DEGREE}.
 * Невязка фита по всем окнам: макс=${stats.worstResidualArcsec.toFixed(3)}″,
 * среднее(макс. невязка на окно)=${stats.meanResidualArcsec.toFixed(3)}″.
 * Источник: ${stats.cachedCount} чанков из кэша + ${stats.fetchedCount} скачано заново с JPL
 * Horizons, суммарно ${stats.totalPoints} точек эфемериды (шаг ${STEP}).
 */

export interface ChironChebyshevWindow {
  readonly jdStartTT: number;
  readonly jdEndTT: number;
  /** Коэффициенты Чебышёва для развёрнутой (unwrapped) эклиптической долготы, градусы. */
  readonly lonCoeffs: readonly number[];
  /** Коэффициенты Чебышёва для эклиптической широты, градусы. */
  readonly latCoeffs: readonly number[];
}

export const CHIRON_CHEBYSHEV_WINDOWS: readonly ChironChebyshevWindow[] = [
${windowsSrc}
];

export const CHIRON_RANGE_JD_TT: { readonly start: number; readonly end: number } = {
  start: ${first.jdStartTT},
  end: ${last.jdEndTT},
};
`;
}

async function main(): Promise<void> {
  const refresh = process.argv.includes('--refresh');
  await mkdir(CACHE_DIR, { recursive: true });

  const chunkPlan = buildChunkPlan();
  let cachedCount = 0;
  let fetchedCount = 0;
  const allPoints: RawPoint[] = [];

  for (const def of chunkPlan) {
    const { raw, fromCache } = await loadChunk(def, refresh);
    if (fromCache) cachedCount += 1;
    else fetchedCount += 1;

    const points = parseChunkText(raw, def.filename);
    if (points.length === 0) {
      throw new Error(`[${def.filename}] чанк без единой точки эфемериды`);
    }
    allPoints.push(...points);
  }
  allPoints.sort((p, q) => p.jdTT - q.jdTT);
  console.log(
    `Чанков из кэша: ${cachedCount}, скачано заново: ${fetchedCount}, всего точек эфемериды: ${allPoints.length}.`,
  );

  // Общие границы годовых окон (вычисляются один раз на год, чтобы соседние окна стыковались
  // без зазоров/нахлёстов — jdEndTT окна N всегда буквально равен jdStartTT окна N+1).
  const boundaryYearsCount = RANGE_END_YEAR - RANGE_START_YEAR + 1; // 201 граница на 200 окон
  const yearBoundaryJdTT: number[] = [];
  for (let i = 0; i < boundaryYearsCount; i++) {
    yearBoundaryJdTT.push(roundSig(jdTTForCalendar(RANGE_START_YEAR + i, 1, 1), 10));
  }

  const windows: GeneratedWindow[] = [];
  const perWindowMaxResidualArcsec: number[] = [];

  for (let i = 0; i < boundaryYearsCount - 1; i++) {
    const year = RANGE_START_YEAR + i;
    const jdStartTT = yearBoundaryJdTT[i]!;
    const jdEndTT = yearBoundaryJdTT[i + 1]!;

    const windowPoints = allPoints.filter(
      (p) => p.jdTT >= jdStartTT - OVERLAP_DAYS && p.jdTT <= jdEndTT + OVERLAP_DAYS,
    );
    if (windowPoints.length < (DEFAULT_DEGREE + 1) * 2) {
      throw new Error(`[окно ${year}] недостаточно точек для устойчивого фита: ${windowPoints.length}`);
    }

    const lonUnwrapped = unwrapDegrees(windowPoints.map((p) => p.lonDeg));
    const latVals = windowPoints.map((p) => p.latDeg);
    const halfSpan = (jdEndTT - jdStartTT) / 2;
    const xs = windowPoints.map((p) => (p.jdTT - jdStartTT) / halfSpan - 1);

    let degree = DEFAULT_DEGREE;
    let lonCoeffs = fitChebyshevLeastSquares(xs, lonUnwrapped, degree);
    let latCoeffs = fitChebyshevLeastSquares(xs, latVals, degree);
    let maxResidArcsec =
      Math.max(maxAbsResidual(xs, lonUnwrapped, lonCoeffs), maxAbsResidual(xs, latVals, latCoeffs)) * 3600;

    if (maxResidArcsec > RESIDUAL_THRESHOLD_ARCSEC) {
      degree = MAX_DEGREE;
      lonCoeffs = fitChebyshevLeastSquares(xs, lonUnwrapped, degree);
      latCoeffs = fitChebyshevLeastSquares(xs, latVals, degree);
      maxResidArcsec =
        Math.max(maxAbsResidual(xs, lonUnwrapped, lonCoeffs), maxAbsResidual(xs, latVals, latCoeffs)) * 3600;
    }

    perWindowMaxResidualArcsec.push(maxResidArcsec);
    windows.push({
      jdStartTT,
      jdEndTT,
      lonCoeffs: lonCoeffs.map((c) => roundSig(c, 10)),
      latCoeffs: latCoeffs.map((c) => roundSig(c, 10)),
    });
  }

  const worstResidualArcsec = Math.max(...perWindowMaxResidualArcsec);
  const meanResidualArcsec =
    perWindowMaxResidualArcsec.reduce((s, v) => s + v, 0) / perWindowMaxResidualArcsec.length;
  console.log(
    `Невязка фита по ${windows.length} окнам: макс=${worstResidualArcsec.toFixed(3)}″, ` +
      `среднее(макс. невязка на окно)=${meanResidualArcsec.toFixed(3)}″.`,
  );
  const overThreshold = perWindowMaxResidualArcsec.filter((v) => v > RESIDUAL_THRESHOLD_ARCSEC).length;
  if (overThreshold > 0) {
    console.warn(
      `Внимание: ${overThreshold} окон(а) превышают порог ${RESIDUAL_THRESHOLD_ARCSEC}″ даже на степени ${MAX_DEGREE}.`,
    );
  }

  const fileContent = renderOutputFile(windows, {
    worstResidualArcsec,
    meanResidualArcsec,
    cachedCount,
    fetchedCount,
    totalPoints: allPoints.length,
  });
  await writeFile(OUTPUT_FILE, fileContent, 'utf8');
  console.log(`Записано: ${path.relative(ROOT, OUTPUT_FILE)}`);

  try {
    execSync(`npx prettier --write ${JSON.stringify(OUTPUT_FILE)}`, { cwd: ROOT, stdio: 'ignore' });
  } catch {
    console.warn('Не удалось прогнать prettier по сгенерированному файлу (не критично).');
  }
}

const isMainModule =
  process.argv[1] !== undefined && pathToFileURL(process.argv[1]).href === import.meta.url;
if (isMainModule) {
  main().catch((err: unknown) => {
    console.error(err);
    process.exit(1);
  });
}
