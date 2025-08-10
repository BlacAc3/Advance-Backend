/*
  Warnings:

  - Added the required column `available_advance` to the `advances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `earned_to_date` to the `advances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employer_id` to the `advances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `net_amount` to the `advances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service_fee` to the `advances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service_fee_percentage` to the `advances` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EnumEmployerTier" AS ENUM ('NEW', 'API_VERIFIED', 'PLATFORM_TRUSTED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EnumAdvancesStatus" ADD VALUE 'PENDING_EMPLOYER_APPROVAL';
ALTER TYPE "EnumAdvancesStatus" ADD VALUE 'DISBURSED';

-- AlterTable
ALTER TABLE "advances" ADD COLUMN     "approved_by" UUID,
ADD COLUMN     "available_advance" DECIMAL(20,0) NOT NULL,
ADD COLUMN     "disbursement_date" TIMESTAMPTZ(6),
ADD COLUMN     "earned_to_date" DECIMAL(20,0) NOT NULL,
ADD COLUMN     "employer_id" UUID NOT NULL,
ADD COLUMN     "net_amount" DECIMAL(20,0) NOT NULL,
ADD COLUMN     "pool_utilization_at_request" DECIMAL(5,2),
ADD COLUMN     "rejected_by" UUID,
ADD COLUMN     "rejection_reason" TEXT,
ADD COLUMN     "repayment_date" TIMESTAMPTZ(6),
ADD COLUMN     "risk_score" INTEGER,
ADD COLUMN     "service_fee" DECIMAL(20,0) NOT NULL,
ADD COLUMN     "service_fee_percentage" DECIMAL(5,2) NOT NULL;

-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "bank_account_number" VARCHAR(20),
ADD COLUMN     "bank_name" VARCHAR(100),
ADD COLUMN     "credit_score" INTEGER NOT NULL DEFAULT 500,
ADD COLUMN     "current_advance_balance" DECIMAL(20,0) NOT NULL DEFAULT 0,
ADD COLUMN     "days_worked" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "start_date" TIMESTAMPTZ(6),
ADD COLUMN     "total_advances_repaid" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_advances_taken" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "employers" ADD COLUMN     "advance_percentage_limit" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "auto_approve_advances" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "bank_history_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "default_rate" DECIMAL(5,2) NOT NULL DEFAULT 0,
ADD COLUMN     "months_on_platform" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "tier" "EnumEmployerTier" NOT NULL DEFAULT 'NEW',
ADD COLUMN     "total_advances_processed" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "risk_adjustments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "employer_id" UUID,
    "adjustment_type" VARCHAR(50) NOT NULL,
    "previous_value" DECIMAL(20,2) NOT NULL,
    "new_value" DECIMAL(20,2) NOT NULL,
    "reason" TEXT NOT NULL,
    "trigger_metric" VARCHAR(100),
    "trigger_value" DECIMAL(20,2),
    "adjustment_date" TIMESTAMPTZ(6) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "risk_adjustments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reserve_fund" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "amount" DECIMAL(20,0) NOT NULL,
    "transaction_type" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,
    "related_advance_id" UUID,
    "transaction_hash" VARCHAR(66),
    "timestamp" TIMESTAMPTZ(6) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reserve_fund_pkey" PRIMARY KEY ("id")
);
