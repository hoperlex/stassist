CREATE TYPE "public"."ai_report_kind" AS ENUM('natal_full', 'big3', 'synastry', 'solar_year', 'transit_month', 'matrix_full', 'custom_question', 'order');--> statement-breakpoint
CREATE TYPE "public"."ai_report_status" AS ENUM('queued', 'generating', 'done', 'failed', 'flagged');--> statement-breakpoint
CREATE TYPE "public"."chat_message_role" AS ENUM('user', 'assistant');--> statement-breakpoint
CREATE TYPE "public"."interpretation_quality" AS ENUM('draft', 'reviewed');--> statement-breakpoint
CREATE TYPE "public"."interpretation_tradition" AS ENUM('western', 'vedic', 'karmic', 'numerology');--> statement-breakpoint
CREATE TYPE "public"."report_feedback_rating" AS ENUM('good', 'bad');--> statement-breakpoint
CREATE TYPE "public"."wiki_article_section" AS ENUM('planets', 'signs', 'houses', 'aspects', 'schools', 'nakshatras', 'arcana', 'lunar_days', 'stones', 'glossary');--> statement-breakpoint
CREATE TYPE "public"."wiki_article_status" AS ENUM('draft', 'reviewed', 'published');--> statement-breakpoint
CREATE TABLE "wiki_articles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"section" "wiki_article_section" NOT NULL,
	"title" text NOT NULL,
	"body_md" text,
	"status" "wiki_article_status" DEFAULT 'draft' NOT NULL,
	"editor_id" uuid,
	"version" integer DEFAULT 1 NOT NULL,
	"seo" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "wiki_articles_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "interpretation_chunks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" text NOT NULL,
	"tradition" "interpretation_tradition" DEFAULT 'western' NOT NULL,
	"text" text NOT NULL,
	"source_article_id" uuid,
	"embedding" vector(1024),
	"quality" "interpretation_quality" DEFAULT 'draft' NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "interpretation_chunks_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "ai_reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"birth_profile_id" uuid,
	"chart_id" uuid,
	"kind" "ai_report_kind" NOT NULL,
	"status" "ai_report_status" DEFAULT 'queued' NOT NULL,
	"input" jsonb NOT NULL,
	"content_md" text,
	"calc_block" jsonb,
	"chunks_used" jsonb,
	"prompt_version" text NOT NULL,
	"corpus_version" text,
	"provider" text,
	"tokens_in" integer,
	"tokens_out" integer,
	"cost_micros" integer,
	"pdf_key" text,
	"cache_key" text NOT NULL,
	"error_message" text,
	"completed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chat_messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid NOT NULL,
	"role" "chat_message_role" NOT NULL,
	"content" text NOT NULL,
	"chart_refs" jsonb,
	"tokens" integer,
	"flagged" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chat_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"birth_profile_id" uuid,
	"title" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "report_feedback" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"report_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"rating" "report_feedback_rating" NOT NULL,
	"comment" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "wiki_articles" ADD CONSTRAINT "wiki_articles_editor_id_users_id_fk" FOREIGN KEY ("editor_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interpretation_chunks" ADD CONSTRAINT "interpretation_chunks_source_article_id_wiki_articles_id_fk" FOREIGN KEY ("source_article_id") REFERENCES "public"."wiki_articles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_reports" ADD CONSTRAINT "ai_reports_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_reports" ADD CONSTRAINT "ai_reports_birth_profile_id_birth_profiles_id_fk" FOREIGN KEY ("birth_profile_id") REFERENCES "public"."birth_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_reports" ADD CONSTRAINT "ai_reports_chart_id_charts_id_fk" FOREIGN KEY ("chart_id") REFERENCES "public"."charts"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_session_id_chat_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."chat_sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat_sessions" ADD CONSTRAINT "chat_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat_sessions" ADD CONSTRAINT "chat_sessions_birth_profile_id_birth_profiles_id_fk" FOREIGN KEY ("birth_profile_id") REFERENCES "public"."birth_profiles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report_feedback" ADD CONSTRAINT "report_feedback_report_id_ai_reports_id_fk" FOREIGN KEY ("report_id") REFERENCES "public"."ai_reports"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report_feedback" ADD CONSTRAINT "report_feedback_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "interpretation_chunks_embedding_hnsw_idx" ON "interpretation_chunks" USING hnsw ("embedding" vector_cosine_ops);--> statement-breakpoint
CREATE INDEX "ai_reports_cache_key_idx" ON "ai_reports" USING btree ("cache_key");