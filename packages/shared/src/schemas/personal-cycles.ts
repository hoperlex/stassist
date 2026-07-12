/**
 * Виджет «ваш персональный год/месяц/день» (кабинет, req.6 промта Ф6): краткий текст из чанков
 * `numerology:personal_year|month|day:*` (Ф4) поверх детерминированного расчёта
 * `@stassist/numerology-core` `personalCycles`. Тот же паттерн честного empty-state
 * (`computed: boolean`), что `astroWeatherTodayResponseSchema`/`lunarCalendarMonthResponseSchema`.
 */
import { z } from 'zod';

export const personalCyclesWidgetResponseSchema = z.object({
  personalYear: z.number().int().min(1).max(9).nullable(),
  personalMonth: z.number().int().min(1).max(9).nullable(),
  personalDay: z.number().int().min(1).max(9).nullable(),
  yearText: z.string().nullable(),
  monthText: z.string().nullable(),
  dayText: z.string().nullable(),
  /** false = нет ни одного профиля рождения у пользователя — честный empty-state, а не 404/500. */
  computed: z.boolean(),
});
export type PersonalCyclesWidgetResponse = z.infer<typeof personalCyclesWidgetResponseSchema>;
