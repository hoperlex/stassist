/** Карта Davison: реальная (не абстрактная) середина по времени и месту двух карт. */
export interface DavisonMidpoint {
  readonly utc: Date;
  readonly lat: number;
  readonly lon: number;
}

/**
 * Середина по времени — арифметическое среднее двух UTC-моментов; середина по месту —
 * арифметическое среднее широт/долгот (упрощение, принятое большинством калькуляторов Davison;
 * строгая середина по большому кругу отличается на малых расстояниях пренебрежимо, а на очень
 * больших — задокументированное ограничение MVP, см. ACCURACY.md). Долгота усредняется по
 * кратчайшей дуге, чтобы пары вблизи antimeridian (±180°) не давали середину на другой стороне
 * Земли.
 */
export function davisonMidpoint(
  utcA: Date,
  latA: number,
  lonA: number,
  utcB: Date,
  latB: number,
  lonB: number,
): DavisonMidpoint {
  const midMs = (utcA.getTime() + utcB.getTime()) / 2;
  const lat = (latA + latB) / 2;

  let dLon = lonB - lonA;
  if (dLon > 180) dLon -= 360;
  if (dLon < -180) dLon += 360;
  let lon = lonA + dLon / 2;
  if (lon > 180) lon -= 360;
  if (lon < -180) lon += 360;

  return { utc: new Date(midMs), lat, lon };
}
