-- Ф3: SSR-программатика калькуляторов (см. docs/architecture/22-модель-данных.md §5,
-- docs/roadmap/31-конвенции-реализации.md §5) — сгенерировано оффлайн `drizzle-kit generate`
-- из packages/db/src/schema/*.ts, SQL-first, без introspection к живой БД.
--   astro_calendar — предрасчёт лунного календаря (Ф3 worker, 18 мес. окно, опорная локация Москва);
--   compat_pages   — 78 пар совместимости знаков (Ф3 создаёт таблицу+seed-skeleton с body_md=NULL,
--                     ТЕКСТЫ заливает Ф4 — см. drizzle/seed/0002_compat_pages_skeleton.sql);
--   page_cache     — кэш HTML публичных страниц с TTL/тегами (заготовка под будущую программатику);
--   chart_shares   — анонимные обезличенные снапшоты карт для OG-шеринга (введена Ф3 сверх модели
--                     данных документа 22, см. комментарий в packages/db/src/schema/chart-shares.ts).
CREATE TYPE "public"."share_kind" AS ENUM('natal', 'synastry');--> statement-breakpoint
CREATE TABLE "astro_calendar" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date" date NOT NULL,
	"moon_sign_intervals" jsonb NOT NULL,
	"lunar_days" jsonb NOT NULL,
	"voids" jsonb NOT NULL,
	"phases" jsonb NOT NULL,
	"retrogrades" jsonb NOT NULL,
	"ingresses" jsonb NOT NULL,
	"computed" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "astro_calendar_date_unique" UNIQUE("date")
);
--> statement-breakpoint
CREATE TABLE "compat_pages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sign_a" text NOT NULL,
	"sign_b" text NOT NULL,
	"body_md" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "compat_pages_sign_a_sign_b_unique" UNIQUE("sign_a","sign_b")
);
--> statement-breakpoint
CREATE TABLE "page_cache" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"path" text NOT NULL,
	"html" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"tags" text[] DEFAULT '{}' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "page_cache_path_unique" UNIQUE("path")
);
--> statement-breakpoint
CREATE TABLE "chart_shares" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"kind" "share_kind" NOT NULL,
	"positions" jsonb NOT NULL,
	"positions_b" jsonb,
	"theme" text DEFAULT 'light' NOT NULL,
	"og_image_key" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "chart_shares_slug_unique" UNIQUE("slug")
);
