-- Ф9: системный пользователь «Астра» — ИИ-участница сообщества (docs/strategy/
-- 11-соцраздел-созвездие.md §1, §5). От её имени worker создаёт пост-тред «Небо дня»,
-- комментарий-затравку и воскресный дайджест; ВЕСЬ её контент помечается author_kind='ai'
-- (см. packages/db/src/schema/enums.ts ugcAuthorKindEnum).
--
-- UUID фиксированный — единый источник правды: ASTRA_USER_ID в packages/shared/src/schemas/sky.ts.
-- password_hash — заведомо невалидный маркер (не argon2/bcrypt-формат): логин под Астрой
-- невозможен ни с каким паролем (verify такого хэша всегда падает). e-mail — служебный домен
-- .invalid (RFC 2606), письма на него не уходят.
-- Идемпотентно: ON CONFLICT (id) обновляет только отображаемые поля.

INSERT INTO "users" ("id", "email", "password_hash", "display_name", "role", "status", "tz", "locale")
VALUES (
  'a57a0000-0000-4000-8000-000000000001',
  'astra@system.zodiacum.invalid',
  '!system-account-no-login',
  'Астра',
  'user',
  'active',
  'Europe/Moscow',
  'ru'
)
ON CONFLICT ("id") DO UPDATE SET
  "display_name" = EXCLUDED."display_name",
  "updated_at" = now();
