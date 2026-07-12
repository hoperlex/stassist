/**
 * Поведение при `time_unknown` (см. незакрытую находку [внутренняя-полнота-edge-case] в
 * _work/build/findings/f4.md): big3 буквально требует Асцендент, natal_full имеет сферы,
 * завязанные на дома. Решение — деградация, а не отказ: big3 = Солнце+Луна с явной пометкой;
 * natal_full — исключаем дом-зависимые факты (сериализатор и так не построит их, см.
 * facts/serializer.ts: при `meta.noHouses` дома/Асцендент не упоминаются вообще), добавляем
 * дисклеймер о неполноте.
 */
import type { NatalFullSphere, ReportKind } from '@stassist/shared';

export interface TimeUnknownDecision {
  /** Разбор ВСЕГДА продолжается (не блокируем) — просто с меньшим набором фактов. */
  proceed: true;
  /** Явная пометка для пользователя — null, если время известно (ничего добавлять не нужно). */
  disclaimerNote: string | null;
}

export function resolveTimeUnknown(kind: ReportKind, sphere: NatalFullSphere | undefined, noHouses: boolean): TimeUnknownDecision {
  if (!noHouses) return { proceed: true, disclaimerNote: null };

  if (kind === 'big3') {
    return {
      proceed: true,
      disclaimerNote:
        'Время рождения неизвестно: Асцендент не рассчитан. Разбор построен по Солнцу и Луне ' +
        '(без учёта Асцендента и домов) — сообщи об этом ограничении в тексте явно.',
    };
  }

  if (kind === 'natal_full') {
    const houseHeavy: NatalFullSphere[] = ['relationships', 'career', 'resources'];
    const note =
      sphere && houseHeavy.includes(sphere)
        ? 'Время рождения неизвестно: дома и Асцендент не рассчитаны — сфера, завязанная на дом, ' +
          'описывается только через знаки и аспекты, без указания конкретного дома. Явно сообщи об этом ограничении.'
        : 'Время рождения неизвестно: дома и Асцендент не рассчитаны — не упоминай ни один дом.';
    return { proceed: true, disclaimerNote: note };
  }

  return {
    proceed: true,
    disclaimerNote: 'Время рождения неизвестно: дома и Асцендент не рассчитаны — не упоминай ни один дом.',
  };
}
