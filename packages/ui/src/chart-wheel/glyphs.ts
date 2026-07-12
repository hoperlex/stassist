/**
 * Источник глифов ChartWheel (найдено верификацией — f3.md [internal-completeness] «не оговорён
 * источник глифов»): используются ТОЛЬКО символы блока Юникода «Miscellaneous Symbols»
 * (U+2600–26FF, знаки зодиака и классические планеты) — они покрыты стандартными шрифтами с
 * широкой юникод-поддержкой (DejaVu Sans и т.п.), которые есть и у resvg (fontdb ищет системные
 * шрифты), и в браузере/SSR. Для тел БЕЗ надёжного юникод-глифа (Хирон, узлы, Лилит, Селена) —
 * НЕ используются экзотические астрологические шрифты (риск «молча сломанной» картинки при
 * resvg-рендере без эмбеда шрифта, см. находку) — вместо этого короткая кириллическая
 * аббревиатура как текст. Детерминированно и шрифто-независимо.
 */

export const SIGN_GLYPHS: readonly string[] = [
  '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓',
];

/** Юникод-глифы классических тел (широкая поддержка шрифтов) + аббревиатуры для второстепенных. */
export const BODY_GLYPHS: Record<string, string> = {
  sun: '☉',
  moon: '☽',
  mercury: '☿',
  venus: '♀',
  mars: '♂',
  jupiter: '♃',
  saturn: '♄',
  uranus: '♅',
  neptune: '♆',
  pluto: '♇',
  chiron: 'Хир',
  meanNode: '☊',
  trueNode: '☊',
  meanLilith: 'Лил',
  trueLilith: 'Лил',
  selena: 'Сел',
};

export function glyphForBody(key: string): string {
  return BODY_GLYPHS[key] ?? key.slice(0, 3);
}

export const SIGN_NAMES_RU: readonly string[] = [
  'Овен', 'Телец', 'Близнецы', 'Рак', 'Лев', 'Дева',
  'Весы', 'Скорпион', 'Стрелец', 'Козерог', 'Водолей', 'Рыбы',
];

export const BODY_NAMES_RU: Record<string, string> = {
  sun: 'Солнце',
  moon: 'Луна',
  mercury: 'Меркурий',
  venus: 'Венера',
  mars: 'Марс',
  jupiter: 'Юпитер',
  saturn: 'Сатурн',
  uranus: 'Уран',
  neptune: 'Нептун',
  pluto: 'Плутон',
  chiron: 'Хирон',
  meanNode: 'Северный узел',
  trueNode: 'Северный узел (истинный)',
  meanLilith: 'Лилит',
  trueLilith: 'Лилит (истинная)',
  selena: 'Селена',
};
