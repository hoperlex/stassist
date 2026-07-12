/**
 * Метод Брента — поиск корня гладкой функции на интервале с разными знаками на концах.
 * Стандартный алгоритм (Brent, 1973; см. также Numerical Recipes, «zbrent») — комбинация
 * бисекции, секущих и обратной квадратичной интерполяции с гарантированной сходимостью.
 */
export interface BrentOptions {
  readonly tol?: number;
  readonly maxIter?: number;
}

export class NoBracketError extends Error {
  constructor() {
    super('Метод Брента: функция должна иметь разные знаки на концах интервала');
    this.name = 'NoBracketError';
  }
}

export function brentRoot(f: (x: number) => number, x1: number, x2: number, options: BrentOptions = {}): number {
  const tol = options.tol ?? 1e-10;
  const maxIter = options.maxIter ?? 100;

  let a = x1;
  let b = x2;
  let fa = f(a);
  let fb = f(b);

  if (fa === 0) return a;
  if (fb === 0) return b;
  if (fa * fb > 0) throw new NoBracketError();

  if (Math.abs(fa) < Math.abs(fb)) {
    [a, b] = [b, a];
    [fa, fb] = [fb, fa];
  }

  let c = a;
  let fc = fa;
  let mflag = true;
  let d = 0;

  for (let iter = 0; iter < maxIter; iter++) {
    if (fb === 0 || Math.abs(b - a) < tol) return b;

    let s: number;
    if (fa !== fc && fb !== fc) {
      // Обратная квадратичная интерполяция.
      s =
        (a * fb * fc) / ((fa - fb) * (fa - fc)) +
        (b * fa * fc) / ((fb - fa) * (fb - fc)) +
        (c * fa * fb) / ((fc - fa) * (fc - fb));
    } else {
      // Секущая.
      s = b - (fb * (b - a)) / (fb - fa);
    }

    const cond1 = (s - (3 * a + b) / 4) * (s - b) >= 0;
    const cond2 = mflag && Math.abs(s - b) >= Math.abs(b - c) / 2;
    const cond3 = !mflag && Math.abs(s - b) >= Math.abs(c - d) / 2;
    const cond4 = mflag && Math.abs(b - c) < tol;
    const cond5 = !mflag && Math.abs(c - d) < tol;

    if (cond1 || cond2 || cond3 || cond4 || cond5) {
      s = (a + b) / 2;
      mflag = true;
    } else {
      mflag = false;
    }

    const fs = f(s);
    d = c;
    c = b;
    fc = fb;

    if (fa * fs < 0) {
      b = s;
      fb = fs;
    } else {
      a = s;
      fa = fs;
    }

    if (Math.abs(fa) < Math.abs(fb)) {
      [a, b] = [b, a];
      [fa, fb] = [fb, fa];
    }
  }

  return b;
}

/**
 * Сканирует [x1,x2] с шагом step и возвращает первый найденный брекет со сменой знака f.
 * Полезно, когда точный брекет заранее неизвестен (например поиск ингресса/аспекта на широком
 * интервале дат).
 */
export function scanForBracket(
  f: (x: number) => number,
  x1: number,
  x2: number,
  step: number,
): [number, number] | null {
  let prevX = x1;
  let prevF = f(x1);
  for (let x = x1 + step; x <= x2 + 1e-12; x += step) {
    const clampedX = Math.min(x, x2);
    const curF = f(clampedX);
    if (prevF === 0) return [prevX, prevX];
    if (prevF * curF < 0) return [prevX, clampedX];
    prevX = clampedX;
    prevF = curF;
    if (clampedX === x2) break;
  }
  return null;
}
