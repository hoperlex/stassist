import { describe, expect, it } from 'vitest';
import { QUIZ_QUESTIONS, quizSphereFromAnswers, validateQuizAnswers } from './quiz.js';

describe('QUIZ_QUESTIONS', () => {
  it('содержит от 5 до 7 вопросов (req.3 промта Ф8)', () => {
    expect(QUIZ_QUESTIONS.length).toBeGreaterThanOrEqual(5);
    expect(QUIZ_QUESTIONS.length).toBeLessThanOrEqual(7);
  });

  it('первый вопрос — сфера интереса, каждый вопрос имеет ≥2 непустых варианта', () => {
    expect(QUIZ_QUESTIONS[0]!.code).toBe('sphere');
    for (const q of QUIZ_QUESTIONS) {
      expect(q.textRu.length).toBeGreaterThan(5);
      expect(q.options.length).toBeGreaterThanOrEqual(2);
      for (const o of q.options) expect(o.labelRu.length).toBeGreaterThan(1);
    }
  });

  it('коды вопросов уникальны', () => {
    const codes = QUIZ_QUESTIONS.map((q) => q.code);
    expect(new Set(codes).size).toBe(codes.length);
  });
});

describe('validateQuizAnswers', () => {
  it('валидные коды вопрос/ответ проходят', () => {
    const result = validateQuizAnswers({ sphere: 'love', experience: 'beginner' });
    expect(result.valid).toBe(true);
    expect(result.unknownKeys).toEqual([]);
  });

  it('неизвестный вопрос или ответ — помечается', () => {
    const result = validateQuizAnswers({ sphere: 'not-a-real-option', unknown_question: 'x' });
    expect(result.valid).toBe(false);
    expect(result.unknownKeys).toContain('sphere');
    expect(result.unknownKeys).toContain('unknown_question');
  });
});

describe('quizSphereFromAnswers', () => {
  it('извлекает валидную сферу', () => {
    expect(quizSphereFromAnswers({ sphere: 'career' })).toBe('career');
  });

  it('null при отсутствии ответа или невалидном значении — не выдумывает', () => {
    expect(quizSphereFromAnswers(null)).toBeNull();
    expect(quizSphereFromAnswers({})).toBeNull();
    expect(quizSphereFromAnswers({ sphere: 'garbage' })).toBeNull();
  });
});
