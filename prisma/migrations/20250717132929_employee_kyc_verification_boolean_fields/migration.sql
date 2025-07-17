-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "kyc_stage_final_level_completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "kyc_stage_level_1_completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "kyc_stage_level_2_completed" BOOLEAN NOT NULL DEFAULT false;
