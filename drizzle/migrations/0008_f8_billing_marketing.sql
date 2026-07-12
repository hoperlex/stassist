CREATE TYPE "public"."email_optout_scope" AS ENUM('all', 'digest', 'marketing');--> statement-breakpoint
CREATE TYPE "public"."experiment_event_kind" AS ENUM('exposed', 'converted');--> statement-breakpoint
CREATE TYPE "public"."payment_provider" AS ENUM('yookassa', 'cloudpayments', 'stub');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('pending', 'succeeded', 'canceled', 'refunded');--> statement-breakpoint
CREATE TYPE "public"."plan_code" AS ENUM('free', 'premium_m', 'premium_y');--> statement-breakpoint
CREATE TYPE "public"."plan_period" AS ENUM('none', 'month', 'year');--> statement-breakpoint
CREATE TYPE "public"."promo_code_kind" AS ENUM('percent_discount', 'fixed_discount_kop', 'trial_extension_days');--> statement-breakpoint
CREATE TYPE "public"."receipt_status" AS ENUM('not_required', 'pending', 'sent', 'failed');--> statement-breakpoint
CREATE TYPE "public"."subscription_status" AS ENUM('trial', 'active', 'past_due', 'cancelled', 'expired');--> statement-breakpoint
CREATE TABLE "plans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" "plan_code" NOT NULL,
	"title_ru" text NOT NULL,
	"price_kop" integer NOT NULL,
	"period" "plan_period" NOT NULL,
	"trial_days" integer DEFAULT 0 NOT NULL,
	"features" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "plans_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"plan_code" "plan_code" NOT NULL,
	"status" "subscription_status" DEFAULT 'trial' NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"current_period_end" timestamp with time zone NOT NULL,
	"cancel_at_period_end" boolean DEFAULT false NOT NULL,
	"provider" "payment_provider" DEFAULT 'stub' NOT NULL,
	"provider_sub_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"order_id" uuid,
	"subscription_id" uuid,
	"provider" "payment_provider" NOT NULL,
	"provider_payment_id" text NOT NULL,
	"amount_kop" integer NOT NULL,
	"currency" text DEFAULT 'RUB' NOT NULL,
	"status" "payment_status" DEFAULT 'pending' NOT NULL,
	"receipt_status" "receipt_status" DEFAULT 'not_required' NOT NULL,
	"idempotency_key" text NOT NULL,
	"raw" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "payments_provider_payment_id_unique" UNIQUE("provider_payment_id"),
	CONSTRAINT "payments_idempotency_key_unique" UNIQUE("idempotency_key")
);
--> statement-breakpoint
CREATE TABLE "webhook_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider" "payment_provider" NOT NULL,
	"event_id" text NOT NULL,
	"type" text NOT NULL,
	"payload" jsonb NOT NULL,
	"processed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "webhook_events_event_id_unique" UNIQUE("event_id")
);
--> statement-breakpoint
CREATE TABLE "promo_codes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"kind" "promo_code_kind" NOT NULL,
	"value" integer NOT NULL,
	"valid_until" timestamp with time zone,
	"max_uses" integer,
	"used_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "promo_codes_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "experiments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"variants" jsonb NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "experiments_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "experiment_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"anon_id" text,
	"experiment_code" text NOT NULL,
	"variant" text NOT NULL,
	"event" "experiment_event_kind" NOT NULL,
	"meta" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quiz_answers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"quiz_code" text NOT NULL,
	"answers" jsonb NOT NULL,
	"completed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "email_optouts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"scope" "email_optout_scope" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "email_optouts_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_plan_code_plans_code_fk" FOREIGN KEY ("plan_code") REFERENCES "public"."plans"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_subscription_id_subscriptions_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "public"."subscriptions"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experiment_events" ADD CONSTRAINT "experiment_events_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experiment_events" ADD CONSTRAINT "experiment_events_experiment_code_experiments_code_fk" FOREIGN KEY ("experiment_code") REFERENCES "public"."experiments"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_answers" ADD CONSTRAINT "quiz_answers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;