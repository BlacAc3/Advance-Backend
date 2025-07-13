-- CreateEnum
CREATE TYPE "EnumAdvancesStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'PAID', 'REPAID', 'DEFAULTED');

-- CreateEnum
CREATE TYPE "EnumDemoRequestsStatus" AS ENUM ('PENDING', 'CONTACTED', 'SCHEDULED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "EnumEmployeesKycStage" AS ENUM ('none', 'level_1', 'level_2', 'full');

-- CreateEnum
CREATE TYPE "EnumEmployeesKycStatus" AS ENUM ('pending', 'submitted', 'in_review', 'approved', 'rejected', 'needs_info', 'expired');

-- CreateEnum
CREATE TYPE "EnumInvitationsRole" AS ENUM ('EMPLOYER', 'EMPLOYEE');

-- CreateEnum
CREATE TYPE "EnumInvitationsStatus" AS ENUM ('pending', 'accepted', 'rejected', 'expired');

-- CreateEnum
CREATE TYPE "EnumLiquidityPoolTransactionType" AS ENUM ('CONTRIBUTION', 'WITHDRAWAL', 'ADVANCE_FUNDING', 'REPAYMENT');

-- CreateEnum
CREATE TYPE "EnumUsersRole" AS ENUM ('ADMIN', 'EMPLOYER', 'EMPLOYEE', 'WEB3_USER', 'REGULAR_USER', 'MARKETER');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "EnumUsersRole" NOT NULL DEFAULT 'WEB3_USER',
    "wallet_address" VARCHAR(255),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_wallet_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marketers" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "registration_date" TIMESTAMPTZ(6) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "marketers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "marketer_id" INTEGER,
    "company_name" VARCHAR(255) NOT NULL,
    "registration_date" TIMESTAMPTZ(6) NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "verification_date" TIMESTAMPTZ(6),
    "verified_by" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "employer_id" UUID NOT NULL,
    "kyc_stage" "EnumEmployeesKycStage" NOT NULL DEFAULT 'none',
    "kyc_status" "EnumEmployeesKycStatus" NOT NULL DEFAULT 'pending',
    "kyc_submitted_at" TIMESTAMPTZ(6),
    "kyc_reviewed_at" TIMESTAMPTZ(6),
    "kyc_reviewer_id" UUID,
    "kyc_notes" TEXT,
    "salary" DECIMAL(20,0),
    "registration_date" TIMESTAMPTZ(6) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "advances" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "employee_id" UUID NOT NULL,
    "amount" DECIMAL(20,0) NOT NULL,
    "repayment_amount" DECIMAL(20,0) NOT NULL,
    "request_date" TIMESTAMPTZ(6) NOT NULL,
    "approval_date" TIMESTAMPTZ(6),
    "payment_date" TIMESTAMPTZ(6),
    "due_date" TIMESTAMPTZ(6) NOT NULL,
    "status" "EnumAdvancesStatus" NOT NULL DEFAULT 'PENDING',
    "transaction_hash" VARCHAR(66),
    "repayment_transaction_hash" VARCHAR(66),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "advances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "liquidity_pool" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "employer_id" UUID NOT NULL,
    "amount" DECIMAL(20,0) NOT NULL,
    "transaction_type" "EnumLiquidityPoolTransactionType" NOT NULL,
    "transaction_hash" VARCHAR(66) NOT NULL,
    "timestamp" TIMESTAMPTZ(6) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "liquidity_pool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invitations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "target_email" VARCHAR(255) NOT NULL,
    "sender_user_id" UUID NOT NULL,
    "recipient_user_id" UUID,
    "expires_at" TIMESTAMPTZ(6) NOT NULL,
    "status" "EnumInvitationsStatus" NOT NULL DEFAULT 'pending',
    "role" "EnumInvitationsRole" NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "demo_requests" (
    "id" SERIAL NOT NULL,
    "company_name" VARCHAR(255) NOT NULL,
    "contact_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "company_size" INTEGER NOT NULL,
    "message" TEXT,
    "status" "EnumDemoRequestsStatus" NOT NULL DEFAULT 'PENDING',
    "scheduled_date" TIMESTAMPTZ(6),
    "notes" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "demo_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_wallet_address_key" ON "users"("wallet_address");

-- CreateIndex
CREATE UNIQUE INDEX "marketers_user_id_key" ON "marketers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "employers_user_id_key" ON "employers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "employers_company_name_key" ON "employers"("company_name");

-- CreateIndex
CREATE UNIQUE INDEX "employees_user_id_key" ON "employees"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "liquidity_pool_transaction_hash_key" ON "liquidity_pool"("transaction_hash");

-- CreateIndex
CREATE UNIQUE INDEX "demo_requests_email_key" ON "demo_requests"("email");

-- AddForeignKey
ALTER TABLE "marketers" ADD CONSTRAINT "marketers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employers" ADD CONSTRAINT "employers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employers" ADD CONSTRAINT "employers_marketer_id_fkey" FOREIGN KEY ("marketer_id") REFERENCES "marketers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employers" ADD CONSTRAINT "employers_verified_by_fkey" FOREIGN KEY ("verified_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_employer_id_fkey" FOREIGN KEY ("employer_id") REFERENCES "employers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_kyc_reviewer_id_fkey" FOREIGN KEY ("kyc_reviewer_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advances" ADD CONSTRAINT "advances_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "liquidity_pool" ADD CONSTRAINT "liquidity_pool_employer_id_fkey" FOREIGN KEY ("employer_id") REFERENCES "employers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_sender_user_id_fkey" FOREIGN KEY ("sender_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_recipient_user_id_fkey" FOREIGN KEY ("recipient_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
