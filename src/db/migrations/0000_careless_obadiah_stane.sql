CREATE TYPE "public"."enum_advances_status" AS ENUM('PENDING', 'APPROVED', 'REJECTED', 'PAID', 'REPAID', 'DEFAULTED');--> statement-breakpoint
CREATE TYPE "public"."enum_demo_requests_status" AS ENUM('PENDING', 'CONTACTED', 'SCHEDULED', 'COMPLETED', 'CANCELLED');--> statement-breakpoint
CREATE TYPE "public"."enum_employees_kycStage" AS ENUM('none', 'level_1', 'level_2', 'full');--> statement-breakpoint
CREATE TYPE "public"."enum_employees_kycStatus" AS ENUM('pending', 'submitted', 'in_review', 'approved', 'rejected', 'needs_info', 'expired');--> statement-breakpoint
CREATE TYPE "public"."enum_invitations_role" AS ENUM('EMPLOYER', 'EMPLOYEE');--> statement-breakpoint
CREATE TYPE "public"."enum_invitations_status" AS ENUM('pending', 'accepted', 'rejected', 'expired');--> statement-breakpoint
CREATE TYPE "public"."enum_liquidity_pool_transactionType" AS ENUM('CONTRIBUTION', 'WITHDRAWAL', 'ADVANCE_FUNDING', 'REPAYMENT');--> statement-breakpoint
CREATE TYPE "public"."enum_users_role" AS ENUM('ADMIN', 'EMPLOYER', 'EMPLOYEE', 'WEB3_USER', 'REGULAR_USER', 'MARKETER');--> statement-breakpoint
CREATE TABLE "advances" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"employee_id" uuid NOT NULL,
	"amount" numeric(20, 0) NOT NULL,
	"repayment_amount" numeric(20, 0) NOT NULL,
	"request_date" timestamp with time zone NOT NULL,
	"approval_date" timestamp with time zone,
	"payment_date" timestamp with time zone,
	"due_date" timestamp with time zone NOT NULL,
	"status" "enum_advances_status" DEFAULT 'PENDING' NOT NULL,
	"transaction_hash" varchar(66),
	"repayment_transaction_hash" varchar(66),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "demo_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_name" varchar(255) NOT NULL,
	"contact_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	"company_size" integer NOT NULL,
	"message" text,
	"status" "enum_demo_requests_status" DEFAULT 'PENDING' NOT NULL,
	"scheduled_date" timestamp with time zone,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "demo_requests_email_key" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "employees" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"employer_id" uuid NOT NULL,
	"kyc_stage" "enum_employees_kycStage" DEFAULT 'none' NOT NULL,
	"kyc_status" "enum_employees_kycStatus" DEFAULT 'pending' NOT NULL,
	"kyc_submitted_at" timestamp with time zone,
	"kyc_reviewed_at" timestamp with time zone,
	"kyc_reviewer_id" uuid,
	"kyc_notes" text,
	"salary" numeric(20, 0),
	"registration_date" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "employees_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "employees_user_id_key" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "employers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"marketer_id" integer,
	"company_name" varchar(255) NOT NULL,
	"registration_date" timestamp with time zone NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"verification_date" timestamp with time zone,
	"verified_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "employers_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "employers_company_name_unique" UNIQUE("company_name"),
	CONSTRAINT "employers_user_id_key" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "invitations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"target_email" varchar(255) NOT NULL,
	"sender_user_id" uuid NOT NULL,
	"recipient_user_id" uuid,
	"expires_at" timestamp with time zone NOT NULL,
	"status" "enum_invitations_status" DEFAULT 'pending' NOT NULL,
	"role" "enum_invitations_role" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "liquidity_pool" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"employer_id" uuid NOT NULL,
	"amount" numeric(20, 0) NOT NULL,
	"transaction_type" "enum_liquidity_pool_transactionType" NOT NULL,
	"transaction_hash" varchar(66) NOT NULL,
	"timestamp" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "liquidity_pool_transaction_hash_key" UNIQUE("transaction_hash")
);
--> statement-breakpoint
CREATE TABLE "marketers" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"registration_date" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "marketers_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "marketers_user_id_key" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "SequelizeMeta" (
	"name" varchar(255) PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(255),
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" "enum_users_role" DEFAULT 'WEB3_USER' NOT NULL,
	"wallet_address" varchar(255),
	"is_active" boolean DEFAULT true NOT NULL,
	"is_wallet_verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_wallet_address_unique" UNIQUE("wallet_address"),
	CONSTRAINT "users_username_key" UNIQUE("username"),
	CONSTRAINT "users_email_key" UNIQUE("email"),
	CONSTRAINT "users_wallet_address_key" UNIQUE("wallet_address")
);
--> statement-breakpoint
ALTER TABLE "advances" ADD CONSTRAINT "advances_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_employer_id_fkey" FOREIGN KEY ("employer_id") REFERENCES "public"."employers"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_kyc_reviewer_id_fkey" FOREIGN KEY ("kyc_reviewer_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "employers" ADD CONSTRAINT "employers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "employers" ADD CONSTRAINT "employers_marketer_id_fkey" FOREIGN KEY ("marketer_id") REFERENCES "public"."marketers"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "employers" ADD CONSTRAINT "employers_verified_by_fkey" FOREIGN KEY ("verified_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_sender_user_id_fkey" FOREIGN KEY ("sender_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_recipient_user_id_fkey" FOREIGN KEY ("recipient_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "liquidity_pool" ADD CONSTRAINT "liquidity_pool_employer_id_fkey" FOREIGN KEY ("employer_id") REFERENCES "public"."employers"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "marketers" ADD CONSTRAINT "marketers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;