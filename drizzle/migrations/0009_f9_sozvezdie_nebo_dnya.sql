CREATE TYPE "public"."sky_checkin_verdict" AS ENUM('hit', 'partial', 'miss');--> statement-breakpoint
CREATE TYPE "public"."ugc_author_kind" AS ENUM('human', 'ai');--> statement-breakpoint
ALTER TYPE "public"."post_kind" ADD VALUE 'sky_day';--> statement-breakpoint
ALTER TYPE "public"."share_kind" ADD VALUE 'transit_day';--> statement-breakpoint
CREATE TABLE "sky_days" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"day_key" date NOT NULL,
	"title" text NOT NULL,
	"summary_md" text NOT NULL,
	"payload" jsonb NOT NULL,
	"transit_positions" jsonb NOT NULL,
	"thread_post_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "sky_days_day_key_unique" UNIQUE("day_key")
);
--> statement-breakpoint
CREATE TABLE "sky_checkins" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"day_key" date NOT NULL,
	"verdict" "sky_checkin_verdict" NOT NULL,
	"note" text,
	"note_comment_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "sky_checkins_user_day_uniq" UNIQUE("user_id","day_key")
);
--> statement-breakpoint
CREATE TABLE "sky_streaks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"current" integer DEFAULT 0 NOT NULL,
	"best" integer DEFAULT 0 NOT NULL,
	"last_checkin_day" date,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "sky_streaks_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "chart_shares" ADD COLUMN "caption" text;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "author_kind" "ugc_author_kind" DEFAULT 'human' NOT NULL;--> statement-breakpoint
ALTER TABLE "comments" ADD COLUMN "author_kind" "ugc_author_kind" DEFAULT 'human' NOT NULL;--> statement-breakpoint
ALTER TABLE "sky_days" ADD CONSTRAINT "sky_days_thread_post_id_posts_id_fk" FOREIGN KEY ("thread_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sky_checkins" ADD CONSTRAINT "sky_checkins_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sky_checkins" ADD CONSTRAINT "sky_checkins_day_key_sky_days_day_key_fk" FOREIGN KEY ("day_key") REFERENCES "public"."sky_days"("day_key") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sky_checkins" ADD CONSTRAINT "sky_checkins_note_comment_id_comments_id_fk" FOREIGN KEY ("note_comment_id") REFERENCES "public"."comments"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sky_streaks" ADD CONSTRAINT "sky_streaks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;