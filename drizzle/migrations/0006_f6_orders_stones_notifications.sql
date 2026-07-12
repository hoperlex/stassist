CREATE TYPE "public"."notification_kind" AS ENUM('comment_reply', 'friend_request', 'order_ready', 'moderation', 'system');--> statement-breakpoint
CREATE TYPE "public"."order_kind" AS ENUM('pdf_report', 'custom_forecast', 'subscription_gift');--> statement-breakpoint
CREATE TYPE "public"."order_status" AS ENUM('created', 'paid', 'ai_done', 'assigned_expert', 'expert_accepted', 'expert_done', 'delivered', 'cancelled', 'refunded');--> statement-breakpoint
CREATE TYPE "public"."stone_status" AS ENUM('draft', 'reviewed');--> statement-breakpoint
CREATE TABLE "stones" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"properties_md" text NOT NULL,
	"colors" text[] DEFAULT '{}' NOT NULL,
	"zodiac_signs" text[] DEFAULT '{}' NOT NULL,
	"planets" text[] DEFAULT '{}' NOT NULL,
	"decades" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"arcana" integer[] DEFAULT '{}' NOT NULL,
	"chakras" text[] DEFAULT '{}' NOT NULL,
	"purposes" text[] DEFAULT '{}' NOT NULL,
	"suitable_md" text,
	"unsuitable_md" text,
	"photo_keys" text[] DEFAULT '{}' NOT NULL,
	"affiliate_url" text,
	"status" "stone_status" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "stones_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"kind" "order_kind" NOT NULL,
	"subject" jsonb NOT NULL,
	"status" "order_status" DEFAULT 'created' NOT NULL,
	"expert_id" uuid,
	"price_kop" integer NOT NULL,
	"report_id" uuid,
	"error_message" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"kind" "notification_kind" NOT NULL,
	"payload" jsonb NOT NULL,
	"text" text NOT NULL,
	"read_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_expert_id_users_id_fk" FOREIGN KEY ("expert_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_report_id_ai_reports_id_fk" FOREIGN KEY ("report_id") REFERENCES "public"."ai_reports"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;