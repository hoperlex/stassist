/**
 * Детерминированный текстовый «черновой» генератор корпуса (см. заголовок phrase-banks.ts).
 * Каждая функция строит 2-4 предложения на русском, психологический/поддерживающий тон, без
 * фатализма (не «случится X», а «склонность к X», «может проявляться как X»). Все тексты —
 * quality='draft' (см. corpus/build-corpus.ts) — реальный редактор дорабатывает их позже.
 */
import type { ClassicalPlanetSlug, KarmicPointSlug, PlanetOverviewSlug } from '../facts/keys.js';
import { aspectNameRu, objectNameRu, signRuInfoByEnSlug } from '../facts/ru-names.js';
import { hashPick } from './hash-pick.js';
import {
  ARCANUM_META,
  ASPECT_QUALITY,
  CROSS_THEME,
  ELEMENT_THEME,
  HOUSE_THEME,
  NUMEROLOGY_CYCLE_THEME,
  NUMEROLOGY_NUMBER_THEME,
  PLANET_META,
  PSYCHOMATRIX_CELL_LABEL_RU,
  PSYCHOMATRIX_CELL_THEME,
  SIGN_EXPRESSION,
} from './phrase-banks.js';

const SUPPORTIVE_CLOSERS = [
  'Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.',
  'Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.',
  'Это одна из граней личности, которую можно развивать в свою пользу.',
] as const;

export function planetOverviewText(planet: PlanetOverviewSlug): string {
  const meta = PLANET_META[planet];
  return (
    `${meta.ru} в натальной карте отвечает за ${meta.theme}. ` +
    `Это архетипическая тема, которая проявляется в характере независимо от знака и дома, ` +
    `но именно их сочетание задаёт конкретную окраску. ` +
    hashPick(`planet:${planet}`, SUPPORTIVE_CLOSERS)
  );
}

export function signOverviewText(signSlug: string): string {
  const sign = signRuInfoByEnSlug(signSlug);
  const expression = SIGN_EXPRESSION[signSlug] ?? 'через собственный, узнаваемый стиль поведения';
  return (
    `${sign.nameRu} — знак стихии ${sign.elementRu}, ${sign.quality === 'cardinal' ? 'кардинальный' : sign.quality === 'fixed' ? 'фиксированный' : 'мутабельный'} по качеству. ` +
    `Люди с сильным влиянием ${sign.nameRuGenitive} склонны проявлять себя ${expression}. ` +
    hashPick(`sign:${signSlug}`, SUPPORTIVE_CLOSERS)
  );
}

export function houseOverviewText(house: number): string {
  const theme = HOUSE_THEME[house] ?? 'одну из сфер жизненного опыта';
  return (
    `${house}-й дом натальной карты отвечает за ${theme}. ` +
    `Планеты, попадающие в этот дом, окрашивают соответствующую область жизни своей энергией. ` +
    hashPick(`house:${house}`, SUPPORTIVE_CLOSERS)
  );
}

export function aspectOverviewText(angle: string): string {
  const quality = ASPECT_QUALITY[angle] ?? 'особый характер взаимодействия энергий';
  return (
    `Аспект «${aspectNameRu(angle)}» описывает, как две энергии соотносятся друг с другом: ${quality}. ` +
    `Конкретный смысл зависит от того, какие именно объекты карты соединены этим аспектом.`
  );
}

export function elementOverviewText(element: string): string {
  const theme = ELEMENT_THEME[element] ?? 'особый способ проживания опыта';
  return `Стихия отвечает за ${theme}. Баланс стихий в карте показывает, какие ресурсы даются легко, а какие требуют сознательного развития.`;
}

export function crossOverviewText(cross: string): string {
  const theme = CROSS_THEME[cross] ?? 'особый стиль включения в дело';
  return `Крест (качество знака) отражает ${theme}. Это то, как человек в принципе подходит к любому начинанию — независимо от темы.`;
}

export function planetInSignText(planet: ClassicalPlanetSlug, signSlug: string): string {
  const meta = PLANET_META[planet];
  const sign = signRuInfoByEnSlug(signSlug);
  const expression = SIGN_EXPRESSION[signSlug] ?? 'через собственный стиль';
  return (
    `${meta.ru} в знаке ${sign.nameRuGenitive} проявляет ${meta.theme.split(',')[0]} ${expression}. ` +
    `Это сочетание задаёт индивидуальную окраску базовой темы ${meta.ruGenitive}. ` +
    hashPick(`planet_in_sign:${planet}:${signSlug}`, SUPPORTIVE_CLOSERS)
  );
}

export function planetInHouseText(planet: ClassicalPlanetSlug, house: number): string {
  const meta = PLANET_META[planet];
  const theme = HOUSE_THEME[house] ?? 'соответствующую сферу жизни';
  return (
    `${meta.ru} в ${house}-м доме направляет энергию, связанную с темой ${meta.ruGenitive}, в сферу «${theme}». ` +
    `Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.`
  );
}

export function ascInSignText(signSlug: string): string {
  const sign = signRuInfoByEnSlug(signSlug);
  const expression = SIGN_EXPRESSION[signSlug] ?? 'через собственный стиль';
  return (
    `Асцендент в знаке ${sign.nameRuGenitive} формирует первое впечатление и стиль, в котором человек ` +
    `встречает новые ситуации ${expression}. ` +
    `Это «маска» и одновременно естественная манера включаться в мир — то, что видят окружающие раньше всего остального.`
  );
}

export function pointInSignText(point: KarmicPointSlug, signSlug: string): string {
  const sign = signRuInfoByEnSlug(signSlug);
  const name = objectNameRu(point);
  const themeByPoint: Record<KarmicPointSlug, string> = {
    chiron: 'зону наиболее чувствительного, но и наиболее целительного опыта',
    north_node: 'направление осознанного роста',
    south_node: 'привычную, комфортную территорию, которую полезно не превращать в единственную опору',
    lilith: 'непризнанную часть личности, которая просит признания',
    selena: 'тонкую интуитивную чувствительность',
  };
  return (
    `${name} в знаке ${sign.nameRuGenitive} указывает на ${themeByPoint[point]}. ` +
    `Эта тема проявляется через стиль, свойственный ${sign.nameRuGenitive}. ` +
    hashPick(`point_in_sign:${point}:${signSlug}`, SUPPORTIVE_CLOSERS)
  );
}

export function pointInHouseText(point: KarmicPointSlug, house: number): string {
  const name = objectNameRu(point);
  const theme = HOUSE_THEME[house] ?? 'соответствующую сферу жизни';
  return `${name} в ${house}-м доме концентрирует свою тему вокруг сферы «${theme}» — именно там она разворачивается наиболее заметно.`;
}

export function aspectBetweenObjectsText(nameA: string, angle: string, nameB: string): string {
  const quality = ASPECT_QUALITY[angle] ?? 'особый характер взаимодействия';
  return (
    // «Связка A — B» вместо «между A и B» — обходит необходимость склонять RU-имена планет в
    // творительном падеже (словарь facts/ru-names.ts хранит только именительный).
    `Связка «${nameA} — ${nameB}» образует аспект «${aspectNameRu(angle)}»: ${quality}. ` +
    `Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.`
  );
}

export function arcanumPositionText(arcanum: number, positionLabelRu: string): string {
  const meta = ARCANUM_META[arcanum];
  const name = meta?.name ?? `Аркан ${arcanum}`;
  const keyword = meta?.keyword ?? 'индивидуальную тему этой позиции матрицы';
  return (
    `Аркан ${arcanum} («${name}») в позиции «${positionLabelRu}» раскрывает тему: ${keyword}. ` +
    `В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. ` +
    hashPick(`arcanum:${arcanum}:${positionLabelRu}`, SUPPORTIVE_CLOSERS)
  );
}

export function numerologyCoreNumberText(categoryRu: string, value: number): string {
  const theme = NUMEROLOGY_NUMBER_THEME[value] ?? 'индивидуальное сочетание качеств';
  return (
    `${categoryRu}, равное ${value}, указывает на ${theme}. ` +
    `Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. ` +
    hashPick(`numerology_core:${categoryRu}:${value}`, SUPPORTIVE_CLOSERS)
  );
}

export function numerologyCycleText(categoryRu: string, value: number): string {
  const theme = NUMEROLOGY_CYCLE_THEME[value] ?? 'индивидуальную окраску периода';
  return `${categoryRu} ${value} — это ${theme}. Числа циклов показывают общий фон периода, а не конкретные события.`;
}

export function numerologyMatrixCellText(slug: string): string {
  const theme = PSYCHOMATRIX_CELL_THEME[slug] ?? 'одну из граней личности';
  const label = PSYCHOMATRIX_CELL_LABEL_RU[slug] ?? slug;
  return `Ячейка психоматрицы «${label}» отражает ${theme}. Количество цифр в ячейке — лишь ориентир для саморефлексии, а не жёсткий диагноз.`;
}

export function numerologyMatrixLineText(slug: string): string {
  return `Сочетание чисел по позиции «${slug}» психоматрицы показывает, как соответствующие качества взаимно усиливают или уравновешивают друг друга.`;
}

export function compatPairText(signAEnSlug: string, signBEnSlug: string): string {
  const a = signRuInfoByEnSlug(signAEnSlug);
  const b = signRuInfoByEnSlug(signBEnSlug);
  const sameSign = signAEnSlug === signBEnSlug;
  const elementNote =
    a.element === b.element
      ? `Оба партнёра принадлежат к стихии ${a.elementRu} — это даёт схожий темп и понятную друг другу логику реакций.`
      : `Разные стихии (${a.elementRu} и ${b.elementRu}) создают контраст, который может быть как источником притяжения, так и точкой трения — многое зависит от готовности слышать различия.`;
  return (
    `Совместимость ${a.nameRuGenitive} и ${sameSign ? 'ещё одного представителя того же знака' : b.nameRuGenitive}: ` +
    `${a.nameRu} привносит в пару качества, которые проявляются ${SIGN_EXPRESSION[signAEnSlug] ?? 'через собственный стиль'}, ` +
    `а ${sameSign ? 'партнёр с тем же знаком усиливает эти же черты' : `${b.nameRu} — качества, которые проявляются ${SIGN_EXPRESSION[signBEnSlug] ?? 'через собственный стиль'}`}. ` +
    `${elementNote} ` +
    `Совместимость знаков — это общий ориентир: реальная динамика пары определяется полными натальными картами обоих партнёров.`
  );
}
