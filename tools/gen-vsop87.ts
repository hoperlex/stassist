/**
 * Оффлайн data-step (см. docs/roadmap/31-конвенции-реализации.md §4): парсит закоммиченный
 * кэш `tools/data/vsop87d-earth-raw.txt` (официальные данные VSOP87D для Земли, IMCCE —
 * https://ftp.imcce.fr/pub/ephem/planets/vsop87/VSOP87D.ear, гелиоцентрические сферические
 * координаты (L,B,R) в динамической эклиптике и равноденствии ЭПОХИ ДАТЫ — то есть прецессия
 * уже встроена в ряды, доопределять её не нужно) и генерирует TS-таблицу коэффициентов
 * `packages/astro-core/src/ephemeris/vsop87-earth-data.generated.ts`.
 *
 * НЕ часть build/CI — запускается вручную командой `pnpm data:gen-vsop87`. Результат коммитится.
 *
 * Формат строки термина (см. `tools/data/vsop87.doc`, разделы HEADER RECORD/TERM RECORD, а также
 * официальный README IMCCE): Fortran-формат `1x,4i1,i5,12i3,f15.11,2f18.11,f14.11,f20.11`.
 * После разбиения строки по пробелам это соответствует токенам:
 *   [0]  = "ivibicit" — 4 слитных однозначных кода (версия, тело, координата, степень T)
 *   [1]  = n — номер члена ряда (не используется)
 *   [2..13] = 12 целых коэффициентов средних долгот (не используются — работаем через (A,B,C))
 *   [14] = S, [15] = K — амплитуды в форме (1) (не используются)
 *   [16] = A, [17] = B, [18] = C — амплитуда/фаза/частота формы (2): term = A·cos(B + C·τ)
 * ic (третья цифра токена [0]): 1=долгота L, 2=широта B, 3=радиус-вектор R.
 * it (четвёртая цифра токена [0]): степень τ (тысяч юлианских лет от J2000 TT), 0..5.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW_PATH = path.join(__dirname, 'data', 'vsop87d-earth-raw.txt');
const OUT_PATH = path.join(
  __dirname,
  '..',
  'packages',
  'astro-core',
  'src',
  'ephemeris',
  'vsop87-earth-data.generated.ts',
);

interface Term {
  a: number;
  b: number;
  c: number;
}

/**
 * Амплитудный порог отсечения (радианы для L/B, а.е. для R). Даёт точность заведомо лучше
 * заявленной цели ~1″ (доля отброшенных по амплитуде членов вносит суммарную ошибку на порядки
 * меньше 1″ на диапазоне ±150 лет от J2000 — все крупные члены с периодами, значимыми на этом
 * интервале, сохраняются; проверяется юнит-/кросс-валидационными тестами ядра).
 */
const AMPLITUDE_THRESHOLD = 5e-8;

function parse(): { L: Term[][]; B: Term[][]; R: Term[][] } {
  const raw = readFileSync(RAW_PATH, 'utf8');
  const lines = raw.split('\n');

  const L: Term[][] = [[], [], [], [], [], []];
  const B: Term[][] = [[], [], [], [], [], []];
  const R: Term[][] = [[], [], [], [], [], []];

  let termLines = 0;
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line.length === 0) continue;
    if (line.startsWith('VSOP87')) continue; // заголовок блока

    const tokens = line.split(/\s+/);
    if (tokens.length < 19) continue; // защита от мусорных строк

    const head = tokens[0]!;
    if (head.length !== 4) continue;
    const ic = Number(head[2]);
    const it = Number(head[3]);

    const a = Number(tokens[16]);
    const b = Number(tokens[17]);
    const c = Number(tokens[18]);
    if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(c)) continue;

    let bucket: Term[][];
    if (ic === 1) bucket = L;
    else if (ic === 2) bucket = B;
    else if (ic === 3) bucket = R;
    else continue;

    if (Math.abs(a) < AMPLITUDE_THRESHOLD) continue; // усечение по амплитуде

    bucket[it]!.push({ a, b, c });
    termLines++;
  }

  console.log(`gen-vsop87: разобрано ${termLines} членов ряда (после усечения по амплитуде)`);
  return { L, B, R };
}

function formatSeries(name: string, series: Term[][]): string {
  const powers = series
    .map((terms, power) => {
      const items = terms
        .map((t) => `{a:${t.a.toPrecision(10)},b:${t.b.toPrecision(10)},c:${t.c.toPrecision(10)}}`)
        .join(',');
      return `  /* τ^${power}, ${terms.length} членов */ [${items}],`;
    })
    .join('\n');
  return `export const ${name}: readonly (readonly Vsop87Term[])[] = [\n${powers}\n];`;
}

function main(): void {
  const { L, B, R } = parse();

  const totalCounts = {
    L: L.map((t) => t.length),
    B: B.map((t) => t.length),
    R: R.map((t) => t.length),
  };
  console.log('gen-vsop87: число членов по степеням τ:', JSON.stringify(totalCounts));

  const header = `/**
 * АВТОСГЕНЕРИРОВАНО \`tools/gen-vsop87.ts\` из \`tools/data/vsop87d-earth-raw.txt\`
 * (официальные данные VSOP87D, IMCCE — https://ftp.imcce.fr/pub/ephem/planets/vsop87/VSOP87D.ear).
 * НЕ РЕДАКТИРОВАТЬ РУКАМИ. Гелиоцентрические сферические координаты Земли (L,B,R) в динамической
 * эклиптике и равноденствии ЭПОХИ ДАТЫ (прецессия уже встроена в ряды VSOP87D).
 * term = a·cos(b + c·τ), τ — тысячи юлианских лет TT от J2000. Долгота Земли — сумма по степеням τ.
 * Амплитудный порог усечения: ${AMPLITUDE_THRESHOLD} (рад для L/B, а.е. для R).
 */
export interface Vsop87Term {
  readonly a: number;
  readonly b: number;
  readonly c: number;
}
`;

  const out = [
    header,
    formatSeries('VSOP87D_EARTH_L', L),
    formatSeries('VSOP87D_EARTH_B', B),
    formatSeries('VSOP87D_EARTH_R', R),
    '',
  ].join('\n\n');

  writeFileSync(OUT_PATH, out, 'utf8');
  console.log(`gen-vsop87: записано ${OUT_PATH}`);
}

main();
