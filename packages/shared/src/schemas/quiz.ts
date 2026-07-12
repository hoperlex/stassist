/**
 * Квиз-онбординг после первого расчёта (промт Ф8 req.3: «5-7 вопросов: сфера интереса, опыт,
 * цели» → персонализированный пейвол). Находка [контент/спецификация] f8.md: «промт не задаёт ни
 * вопросов квиза, ни вариантов ответов, ни правила маппинга — источника контента нет» — здесь
 * задан конкретный контент (7 вопросов, статичный каталог, тот же паттерн, что `PLAN_CATALOG`).
 */
import { z } from 'zod';

export const QUIZ_CODE = 'onboarding_v1';

export const quizSphereSchema = z.enum(['love', 'career', 'money', 'self', 'health', 'family']);
export type QuizSphere = z.infer<typeof quizSphereSchema>;

export interface QuizOption {
  code: string;
  labelRu: string;
}

export interface QuizQuestion {
  code: string;
  textRu: string;
  options: QuizOption[];
}

/**
 * 7 вопросов (в границах промта «5-7»): сфера интереса (1), опыт (2), цели (3-4), формат/частота
 * (5-6), текущий запрос (7) — русские тексты, не заглушки (правило непустоты §6 конвенций
 * реализации).
 */
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    code: 'sphere',
    textRu: 'Что вас сейчас больше всего интересует?',
    options: [
      { code: 'love', labelRu: 'Отношения и любовь' },
      { code: 'career', labelRu: 'Карьера и дело' },
      { code: 'money', labelRu: 'Деньги и финансы' },
      { code: 'self', labelRu: 'Самопознание и предназначение' },
      { code: 'health', labelRu: 'Здоровье и энергия' },
      { code: 'family', labelRu: 'Семья и дети' },
    ],
  },
  {
    code: 'experience',
    textRu: 'Насколько хорошо вы знакомы с астрологией?',
    options: [
      { code: 'beginner', labelRu: 'Только начинаю разбираться' },
      { code: 'some_knowledge', labelRu: 'Знаю базовые понятия' },
      { code: 'experienced', labelRu: 'Разбираюсь глубоко, читаю карты сама/сам' },
    ],
  },
  {
    code: 'goal',
    textRu: 'Что вы хотите получить от Stassist?',
    options: [
      { code: 'daily_guidance', labelRu: 'Ежедневные подсказки и ориентиры' },
      { code: 'deep_understanding', labelRu: 'Глубокое понимание своей натальной карты' },
      { code: 'decision_support', labelRu: 'Поддержку в принятии важных решений' },
      { code: 'curiosity', labelRu: 'Просто интересно, что скажут звёзды' },
    ],
  },
  {
    code: 'frequency',
    textRu: 'Как часто вы хотели бы получать прогнозы?',
    options: [
      { code: 'daily', labelRu: 'Каждый день' },
      { code: 'weekly', labelRu: 'Раз в неделю' },
      { code: 'occasionally', labelRu: 'Только когда мне это важно' },
    ],
  },
  {
    code: 'format',
    textRu: 'Какой формат вам удобнее?',
    options: [
      { code: 'short_text', labelRu: 'Короткие тексты, по существу' },
      { code: 'detailed_reports', labelRu: 'Подробные развёрнутые разборы' },
      { code: 'chat_dialog', labelRu: 'Диалог с ИИ-астропомощником, можно спросить' },
    ],
  },
  {
    code: 'life_stage',
    textRu: 'На каком этапе жизни вы сейчас?',
    options: [
      { code: 'studying', labelRu: 'Учусь, выбираю путь' },
      { code: 'career_building', labelRu: 'Строю карьеру' },
      { code: 'family_planning', labelRu: 'Строю отношения или семью' },
      { code: 'established', labelRu: 'Устоявшаяся жизнь, ищу баланс' },
      { code: 'transition', labelRu: 'Крупные перемены, новый этап' },
    ],
  },
  {
    code: 'concern',
    textRu: 'Что беспокоит вас больше всего прямо сейчас?',
    options: [
      { code: 'relationships', labelRu: 'Отношения с близкими людьми' },
      { code: 'work_decisions', labelRu: 'Важное решение по работе или делу' },
      { code: 'self_growth', labelRu: 'Личностный рост и развитие' },
      { code: 'timing_of_events', labelRu: 'Подходящее время для важного шага' },
      { code: 'none', labelRu: 'Ничего конкретного, просто интересуюсь' },
    ],
  },
];

const questionCodeSet = new Set(QUIZ_QUESTIONS.map((q) => q.code));

export const quizAnswersRequestSchema = z.object({
  quizCode: z.literal(QUIZ_CODE).default(QUIZ_CODE),
  /** `Record<questionCode, answerCode>` — валидируется структурно здесь, семантически (коды
   *  вопросов/ответов существуют в каталоге) — в роуте (`validateQuizAnswers`, ниже). */
  answers: z.record(z.string(), z.string()),
});
export type QuizAnswersRequest = z.infer<typeof quizAnswersRequestSchema>;

export const quizAnswersResponseSchema = z.object({
  quizCode: z.string(),
  answers: z.record(z.string(), z.string()),
  completedAt: z.string().nullable(),
});
export type QuizAnswersResponse = z.infer<typeof quizAnswersResponseSchema>;

/** Честная семантическая валидация (коды вопросов/ответов реально существуют в каталоге) — ЧИСТАЯ
 *  функция, детерминированная, используется и роутом, и юнит-тестами напрямую. */
export function validateQuizAnswers(answers: Record<string, string>): { valid: boolean; unknownKeys: string[] } {
  const unknownKeys: string[] = [];
  for (const [questionCode, answerCode] of Object.entries(answers)) {
    const question = QUIZ_QUESTIONS.find((q) => q.code === questionCode);
    if (!question || !question.options.some((o) => o.code === answerCode)) {
      unknownKeys.push(questionCode);
    }
  }
  return { valid: unknownKeys.length === 0, unknownKeys };
}

/** Извлекает сферу интереса из ответов квиза (вопрос `sphere`) — `null`, если квиз не пройден или
 *  ответ на этот вопрос отсутствует (честно, не подставляем случайное значение). */
export function quizSphereFromAnswers(answers: Record<string, string> | null | undefined): QuizSphere | null {
  const raw = answers?.sphere;
  const parsed = quizSphereSchema.safeParse(raw);
  return parsed.success ? parsed.data : null;
}

export { questionCodeSet as QUIZ_QUESTION_CODES };
