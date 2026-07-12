/**
 * Стеллиumы — скопление 3+ объектов в одном знаке или доме (см. requirement сериализатора в
 * docs/architecture/21-техническая-архитектура.md §4). Чистая функция кластеризации: `astro-core`
 * этого не считает (нет такого поля в `ChartData`).
 */
export interface StelliumInput {
  slug: string;
  signIndex: number;
  houseNumber: number | null;
}

export interface Stellium {
  type: 'sign' | 'house';
  /** signIndex (0-11) для type='sign', номер дома (1-12) для type='house'. */
  value: number;
  members: string[];
}

const MIN_STELLIUM_SIZE = 3;

export function detectStelliums(bodies: StelliumInput[]): Stellium[] {
  const bySign = new Map<number, string[]>();
  const byHouse = new Map<number, string[]>();
  for (const b of bodies) {
    bySign.set(b.signIndex, [...(bySign.get(b.signIndex) ?? []), b.slug]);
    if (b.houseNumber !== null) {
      byHouse.set(b.houseNumber, [...(byHouse.get(b.houseNumber) ?? []), b.slug]);
    }
  }
  const stelliums: Stellium[] = [];
  for (const [signIndex, members] of [...bySign.entries()].sort((a, b) => a[0] - b[0])) {
    if (members.length >= MIN_STELLIUM_SIZE) stelliums.push({ type: 'sign', value: signIndex, members });
  }
  for (const [houseNumber, members] of [...byHouse.entries()].sort((a, b) => a[0] - b[0])) {
    if (members.length >= MIN_STELLIUM_SIZE) stelliums.push({ type: 'house', value: houseNumber, members });
  }
  return stelliums;
}
