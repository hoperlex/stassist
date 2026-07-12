CREATE TYPE "public"."horoscope_period" AS ENUM('day', 'tomorrow', 'week', 'month', 'year');--> statement-breakpoint
CREATE TYPE "public"."horoscope_scope" AS ENUM('zodiac', 'eastern', 'lunar_day', 'profession');--> statement-breakpoint
CREATE TYPE "public"."horoscope_status" AS ENUM('draft', 'moderation', 'published');--> statement-breakpoint
CREATE TYPE "public"."horoscope_topic" AS ENUM('general', 'love', 'money', 'career', 'health');--> statement-breakpoint
ALTER TYPE "public"."ai_report_kind" ADD VALUE 'personal_horoscope';--> statement-breakpoint
CREATE TABLE "horoscopes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"scope" "horoscope_scope" NOT NULL,
	"sign" text NOT NULL,
	"period" "horoscope_period" NOT NULL,
	"topic" "horoscope_topic" DEFAULT 'general' NOT NULL,
	"date_key" text NOT NULL,
	"body_md" text NOT NULL,
	"humor" boolean DEFAULT false NOT NULL,
	"astro_events" jsonb NOT NULL,
	"status" "horoscope_status" DEFAULT 'draft' NOT NULL,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "horoscopes_uniq_key" UNIQUE("scope","sign","period","topic","date_key","humor")
);
