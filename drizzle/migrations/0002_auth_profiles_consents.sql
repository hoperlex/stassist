-- Ф2: auth, профили рождения, 152-ФЗ (см. docs/architecture/22-модель-данных.md §1-2, §7б).
-- Сгенерировано оффлайн `drizzle-kit generate` из packages/db/src/schema/*.ts — SQL-first,
-- без introspection к живой БД (см. §5 конвенций реализации). Файл переименован из авто-имени
-- в описательное — тег в meta/_journal.json обновлён синхронно.
-- ALTER TABLE "users" ADD COLUMN ... NOT NULL ниже безопасен только для ПУСТОЙ таблицы (сервис
-- ещё не в проде, реальных строк users нет); при наличии данных потребовался бы многошаговый
-- ALTER (добавить nullable → backfill → NOT NULL).
CREATE TYPE "public"."aspect_set" AS ENUM('major', 'major_minor');--> statement-breakpoint
CREATE TYPE "public"."ayanamsha" AS ENUM('lahiri', 'raman', 'kp', 'fagan_bradley', 'yukteswar');--> statement-breakpoint
CREATE TYPE "public"."birth_profile_kind" AS ENUM('self', 'other', 'celebrity');--> statement-breakpoint
CREATE TYPE "public"."chart_kind" AS ENUM('natal', 'transit', 'progression', 'symbolic_direction', 'solar_return', 'lunar_return', 'synastry', 'composite', 'davison', 'horary');--> statement-breakpoint
CREATE TYPE "public"."consent_kind" AS ENUM('pd_processing', 'marketing');--> statement-breakpoint
CREATE TYPE "public"."house_system" AS ENUM('placidus', 'koch', 'regiomontanus', 'porphyry', 'equal', 'whole_sign');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('user', 'editor', 'moderator', 'admin', 'expert');--> statement-breakpoint
CREATE TYPE "public"."user_status" AS ENUM('active', 'blocked', 'deleted');--> statement-breakpoint
CREATE TYPE "public"."zodiac_type" AS ENUM('tropical', 'sidereal');--> statement-breakpoint
CREATE TABLE "refresh_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"token_hash" text NOT NULL,
	"family_id" uuid NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"rotated_from" uuid,
	"revoked_at" timestamp with time zone,
	"ip_hash" text,
	"ua_hint" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "refresh_tokens_token_hash_unique" UNIQUE("token_hash")
);
--> statement-breakpoint
CREATE TABLE "password_resets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"token_hash" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"used_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "password_resets_token_hash_unique" UNIQUE("token_hash")
);
--> statement-breakpoint
CREATE TABLE "email_verifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"token_hash" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"used_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "email_verifications_token_hash_unique" UNIQUE("token_hash")
);
--> statement-breakpoint
CREATE TABLE "consents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"kind" "consent_kind" NOT NULL,
	"doc_version" text NOT NULL,
	"granted_at" timestamp with time zone DEFAULT now() NOT NULL,
	"revoked_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "birth_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"label" text NOT NULL,
	"kind" "birth_profile_kind" DEFAULT 'self' NOT NULL,
	"birth_date_enc" text NOT NULL,
	"birth_time_enc" text,
	"time_unknown" boolean DEFAULT false NOT NULL,
	"place_name_enc" text NOT NULL,
	"lat_enc" text NOT NULL,
	"lon_enc" text NOT NULL,
	"tz_id" text NOT NULL,
	"gender" text,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "calc_presets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"code" text,
	"name" text NOT NULL,
	"zodiac" "zodiac_type" DEFAULT 'tropical' NOT NULL,
	"ayanamsha" "ayanamsha",
	"house_system" "house_system" DEFAULT 'placidus' NOT NULL,
	"bodies" jsonb NOT NULL,
	"orbs" jsonb NOT NULL,
	"aspect_set" "aspect_set" DEFAULT 'major_minor' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "calc_presets_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "charts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"birth_profile_id" uuid,
	"preset_id" uuid NOT NULL,
	"kind" chart_kind DEFAULT 'natal' NOT NULL,
	"ref_chart_id" uuid,
	"moment" timestamp with time zone,
	"data" jsonb NOT NULL,
	"core_version" text NOT NULL,
	"checksum" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "celebrities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"birth_data" jsonb,
	"category" text,
	"wiki_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "celebrities_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "geocode_cache" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"query_norm" text NOT NULL,
	"place_name" text NOT NULL,
	"lat" double precision NOT NULL,
	"lon" double precision NOT NULL,
	"tz_id" text NOT NULL,
	"provider" text NOT NULL,
	"fetched_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "geocode_cache_query_norm_unique" UNIQUE("query_norm")
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "email_verified_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password_hash" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "display_name" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "avatar_key" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "user_role" DEFAULT 'user' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "status" "user_status" DEFAULT 'active' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "tz" text DEFAULT 'Europe/Moscow' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "locale" text DEFAULT 'ru' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "deleted_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "password_resets" ADD CONSTRAINT "password_resets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "email_verifications" ADD CONSTRAINT "email_verifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consents" ADD CONSTRAINT "consents_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "birth_profiles" ADD CONSTRAINT "birth_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "calc_presets" ADD CONSTRAINT "calc_presets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "charts" ADD CONSTRAINT "charts_birth_profile_id_birth_profiles_id_fk" FOREIGN KEY ("birth_profile_id") REFERENCES "public"."birth_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "charts" ADD CONSTRAINT "charts_preset_id_calc_presets_id_fk" FOREIGN KEY ("preset_id") REFERENCES "public"."calc_presets"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");