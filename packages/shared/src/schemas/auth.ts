/**
 * Zod-схемы auth (регистрация/логин/reset/verify) — единый источник правды для API (валидация
 * запросов) и фронта (формы кабинета), см. docs/architecture/21-техническая-архитектура.md §5.
 */
import { z } from 'zod';

/** Минимум 8 символов, хотя бы одна буква и одна цифра — простая, но не пустая политика. */
export const passwordSchema = z
  .string()
  .min(8, 'Минимум 8 символов')
  .max(200)
  .regex(/[A-Za-zА-Яа-яЁё]/, 'Должна быть хотя бы одна буква')
  .regex(/[0-9]/, 'Должна быть хотя бы одна цифра');

export const emailSchema = z.string().trim().toLowerCase().email('Некорректный e-mail');

export const registerRequestSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  displayName: z.string().trim().min(1).max(100).optional(),
});
export type RegisterRequest = z.infer<typeof registerRequestSchema>;

export const loginRequestSchema = z.object({
  email: emailSchema,
  password: z.string().min(1),
});
export type LoginRequest = z.infer<typeof loginRequestSchema>;

/** Единый ответ и на регистрацию, и на верификацию e-mail — без утечки, зарегистрирован ли адрес. */
export const genericAckResponseSchema = z.object({
  message: z.string(),
});

export const emailVerifyRequestSchema = z.object({
  token: z.string().min(1),
});
export type EmailVerifyRequest = z.infer<typeof emailVerifyRequestSchema>;

export const passwordResetRequestSchema = z.object({
  email: emailSchema,
});
export type PasswordResetRequest = z.infer<typeof passwordResetRequestSchema>;

export const passwordResetConfirmSchema = z.object({
  token: z.string().min(1),
  newPassword: passwordSchema,
  /** Отозвать все остальные сессии (все refresh-семьи), кроме текущей — выбор пользователя. */
  revokeOtherSessions: z.boolean().default(true),
});
export type PasswordResetConfirm = z.infer<typeof passwordResetConfirmSchema>;

/** Ответ на успешный логин/обновление — access-токен в теле, refresh — httpOnly cookie. */
export const authSessionResponseSchema = z.object({
  accessToken: z.string(),
  expiresIn: z.number().int().positive(),
  user: z.object({
    id: z.string().uuid(),
    email: z.string(),
    displayName: z.string().nullable(),
    role: z.string(),
    emailVerified: z.boolean(),
  }),
});
export type AuthSessionResponse = z.infer<typeof authSessionResponseSchema>;

/** Claims access-токена (EdDSA) — БЕЗ ПД (док. 21 §5: «без ПД в клеймах»), только id/роль. */
export const accessTokenClaimsSchema = z.object({
  sub: z.string().uuid(),
  role: z.string(),
  jti: z.string(),
  iat: z.number(),
  exp: z.number(),
});

/** Удаление аккаунта (право на забвение) — требует подтверждения текущим паролем. */
export const accountDeleteRequestSchema = z.object({
  password: z.string().min(1),
});
export type AccountDeleteRequest = z.infer<typeof accountDeleteRequestSchema>;
export type AccessTokenClaims = z.infer<typeof accessTokenClaimsSchema>;
