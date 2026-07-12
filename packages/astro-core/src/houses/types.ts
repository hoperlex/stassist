/** Общие типы для модулей систем домов. */
export interface HouseCusps {
  /** Долготы куспидов домов 1..12, индекс 0 = дом 1. */
  readonly cusps: readonly number[];
}

export interface HouseComputationContext {
  readonly ramcDeg: number;
  readonly obliquityDeg: number;
  readonly latDeg: number;
  readonly ascDeg: number;
  readonly mcDeg: number;
}
