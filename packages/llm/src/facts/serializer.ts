/**
 * Сериализатор `ChartData → компактный текстовый блок фактов` (см. docs/architecture/
 * 21-техническая-архитектура.md §4 п.2, docs/roadmap/prompts/f4-llm-конвейер.md req.2).
 * Детерминированный, без сети/I-O — snapshot-тестируется (serializer.test.ts).
 *
 * НЕЗЫБЛЕМОЕ ПРАВИЛО: это ЕДИНСТВЕННОЕ место, где текст «видит» числовые данные карты — LLM
 * получает только готовый текст (`text`) и НИКОГДА не вычисляет/не помнит позиции сам (системный
 * промт в src/prompt/system-rules.ts на это прямо указывает).
 *
 * Возвращает также `factKeys` — упорядоченный список ключей `interpretation_chunks.key`,
 * релевантных этой карте (используется ретривером, src/rag/retriever.ts), построенный ТОЛЬКО
 * через src/facts/keys.ts (единый источник формата ключей).
 */
import type { ChartData, Position } from '@stassist/shared';
import { zodiacEnSlugByIndex, type ZodiacSignEnSlug } from '@stassist/shared';
import {
  CLASSICAL_PLANET_SLUGS,
  KARMIC_POINT_SLUGS,
  type ClassicalPlanetSlug,
  ascInSignKey,
  aspectBetweenKey,
  normalizePointSlug,
  planetInHouseKey,
  planetInSignKey,
  pointInHouseKey,
  pointInSignKey,
} from './keys.js';
import { DIGNITY_LABEL_RU, dignityOf } from './dignities.js';
import { detectStelliums, type StelliumInput } from './stelliums.js';
import { degMinStr, houseNumberOfLongitude, orbStr } from './format.js';
import { aspectNameRu, objectNameRu } from './ru-names.js';

export interface SerializedFacts {
  /** Компактный текст на русском для блока «ДАННЫЕ» промта (см. src/prompt/build-prompt.ts). */
  text: string;
  /** Ключи корпуса, релевантные фактам этой карты (без дублей, в порядке появления). */
  factKeys: string[];
}

interface ResolvedObject {
  slug: string;
  nameRu: string;
  signIndex: number;
  signSlug: ZodiacSignEnSlug;
  signDegree: number;
  houseNumber: number | null;
  isRetrograde: boolean;
  longitudeDeg: number;
}

function resolve(slug: string, pos: Position): ResolvedObject {
  return {
    slug,
    nameRu: objectNameRu(slug),
    signIndex: pos.signIndex,
    signSlug: zodiacEnSlugByIndex(pos.signIndex),
    signDegree: pos.signDegree,
    houseNumber: pos.houseNumber,
    isRetrograde: pos.isRetrograde,
    longitudeDeg: pos.longitudeDeg,
  };
}

export function serializeChartFacts(data: ChartData): SerializedFacts {
  const lines: string[] = [];
  const factKeys: string[] = [];
  const seenKeys = new Set<string>();
  const pushKey = (key: string): void => {
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      factKeys.push(key);
    }
  };

  lines.push('ДАННЫЕ КАРТЫ (используй ТОЛЬКО эти факты — не вычисляй и не предполагай позиции):');
  lines.push(
    `Система: зодиак ${data.meta.zodiac === 'sidereal' ? 'сидерический' : 'тропический'}` +
      (data.meta.ayanamsha ? `, айанамша ${data.meta.ayanamsha}` : '') +
      `, дома ${data.meta.houseSystem}, ядро astro-core ${data.meta.coreVersion}.`,
  );
  if (data.meta.noHouses) {
    lines.push(
      'Время рождения неизвестно: Асцендент, MC и дома НЕ рассчитаны — не упоминай их и не ' +
        'предполагай ни один дом; используй только знаки и аспекты.',
    );
  }

  // --- Планеты (10 классических) ---------------------------------------------------------
  const stelliumInputs: StelliumInput[] = [];
  lines.push('', 'Планеты:');
  for (const planet of CLASSICAL_PLANET_SLUGS) {
    const pos = data.bodies[planet as ClassicalPlanetSlug];
    if (!pos) continue;
    const r = resolve(planet, pos);
    stelliumInputs.push({ slug: planet, signIndex: r.signIndex, houseNumber: r.houseNumber });
    const dignity = dignityOf(planet, r.signSlug);
    const dignityNote = dignity ? ` (${DIGNITY_LABEL_RU[dignity]})` : '';
    const houseNote = r.houseNumber !== null ? `, дом ${r.houseNumber}` : '';
    const retroNote = r.isRetrograde ? ', ретроградно' : '';
    lines.push(
      `- ${r.nameRu}: ${degMinStr(r.signDegree)} знака (${r.signSlug})${houseNote}${retroNote}${dignityNote}`,
    );
    pushKey(planetInSignKey(planet, r.signSlug));
    if (r.houseNumber !== null) pushKey(planetInHouseKey(planet, r.houseNumber));
  }

  // --- Хирон + узлы/Лилит/Селена (кармические точки) -------------------------------------
  lines.push('', 'Кармические точки:');
  const karmicResolved = new Map<string, ResolvedObject>();
  if (data.bodies.chiron) {
    const r = resolve('chiron', data.bodies.chiron);
    karmicResolved.set('chiron', r);
    stelliumInputs.push({ slug: 'chiron', signIndex: r.signIndex, houseNumber: r.houseNumber });
  }
  for (const [pointKey, pos] of Object.entries(data.points)) {
    if (!pos) continue;
    const slug = normalizePointSlug(pointKey);
    if (karmicResolved.has(slug)) continue; // meanNode/trueNode -> оба north_node, берём первый
    const r = resolve(slug, pos);
    karmicResolved.set(slug, r);
    stelliumInputs.push({ slug, signIndex: r.signIndex, houseNumber: r.houseNumber });
  }
  // Южный узел: astro-core не считает — это (север + 180°), см. format.ts houseNumberOfLongitude.
  const northNode = karmicResolved.get('north_node');
  if (northNode) {
    const southLon = (northNode.longitudeDeg + 180) % 360;
    const southSignIndex = Math.floor(southLon / 30);
    const houseNumber = data.meta.noHouses ? null : houseNumberOfLongitude(data.houses, southLon);
    const r: ResolvedObject = {
      slug: 'south_node',
      nameRu: objectNameRu('south_node'),
      signIndex: southSignIndex,
      signSlug: zodiacEnSlugByIndex(southSignIndex),
      signDegree: southLon - southSignIndex * 30,
      houseNumber,
      isRetrograde: northNode.isRetrograde,
      longitudeDeg: southLon,
    };
    karmicResolved.set('south_node', r);
    stelliumInputs.push({ slug: 'south_node', signIndex: r.signIndex, houseNumber: r.houseNumber });
  }
  for (const slug of KARMIC_POINT_SLUGS) {
    const r = karmicResolved.get(slug);
    if (!r) continue;
    const houseNote = r.houseNumber !== null ? `, дом ${r.houseNumber}` : '';
    const retroNote = r.isRetrograde ? ', ретроградно' : '';
    lines.push(`- ${r.nameRu}: ${degMinStr(r.signDegree)} знака (${r.signSlug})${houseNote}${retroNote}`);
    pushKey(pointInSignKey(slug, r.signSlug));
    if (r.houseNumber !== null) pushKey(pointInHouseKey(slug, r.houseNumber));
  }

  // --- Асцендент/MC -----------------------------------------------------------------------
  if (!data.meta.noHouses) {
    const ascSignIndex = Math.floor(((data.angles.ascDeg % 360) + 360) % 360 / 30);
    const ascSignSlug = zodiacEnSlugByIndex(ascSignIndex);
    const ascSignDegree = data.angles.ascDeg - ascSignIndex * 30;
    lines.push('', `Асцендент: ${degMinStr(ascSignDegree)} знака (${ascSignSlug})`);
    pushKey(ascInSignKey(ascSignSlug));
  }

  // --- Стеллиумы --------------------------------------------------------------------------
  const stelliums = detectStelliums(stelliumInputs);
  if (stelliums.length > 0) {
    lines.push('', 'Стеллиумы (концентрация 3+ объектов):');
    for (const s of stelliums) {
      const names = s.members.map(objectNameRu).join(', ');
      const where = s.type === 'sign' ? `в знаке ${zodiacEnSlugByIndex(s.value)}` : `в доме ${s.value}`;
      lines.push(`- ${where}: ${names}`);
    }
  }

  // --- Аспекты ------------------------------------------------------------------------------
  if (data.aspects.length > 0) {
    lines.push('', 'Аспекты (орбис/аппликация):');
    for (const aspect of data.aspects) {
      const slugA = normalizePointSlug(aspect.bodyA);
      const slugB = normalizePointSlug(aspect.bodyB);
      const applyNote = aspect.applying ? 'сходящийся (усиливается)' : 'расходящийся (ослабевает)';
      lines.push(
        `- ${objectNameRu(slugA)} ${aspectNameRu(aspect.angleName)} ${objectNameRu(slugB)}, ` +
          `орбис ${orbStr(aspect.orbDeg)}, ${applyNote}`,
      );
      pushKey(aspectBetweenKey(aspect.bodyA, aspect.bodyB, aspect.angleName));
    }
  }

  return { text: lines.join('\n'), factKeys };
}
