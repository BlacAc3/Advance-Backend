/*
  Warnings:

  - The values [full] on the enum `EnumEmployeesKycStage` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `kyc_stage_final_level_completed` on the `employees` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nin]` on the table `employees` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bvn]` on the table `employees` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "EnumPayrollStatus" AS ENUM ('UPLOADED', 'PARSED', 'PROCESSING', 'COMPLETED', 'FAILED');

-- AlterEnum
BEGIN;
CREATE TYPE "EnumEmployeesKycStage_new" AS ENUM ('none', 'level_1', 'level_2', 'level_3');
ALTER TABLE "employees" ALTER COLUMN "kyc_stage" DROP DEFAULT;
ALTER TABLE "employees" ALTER COLUMN "kyc_stage" TYPE "EnumEmployeesKycStage_new" USING ("kyc_stage"::text::"EnumEmployeesKycStage_new");
ALTER TYPE "EnumEmployeesKycStage" RENAME TO "EnumEmployeesKycStage_old";
ALTER TYPE "EnumEmployeesKycStage_new" RENAME TO "EnumEmployeesKycStage";
DROP TYPE "EnumEmployeesKycStage_old";
ALTER TABLE "employees" ALTER COLUMN "kyc_stage" SET DEFAULT 'level_1';
COMMIT;

-- AlterTable
ALTER TABLE "employees" DROP COLUMN "kyc_stage_final_level_completed",
ADD COLUMN     "bvn" VARCHAR(11),
ADD COLUMN     "bvn_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "kyc_stage_level_3_completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "nin" VARCHAR(11),
ADD COLUMN     "nin_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "terms_accepted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "terms_accepted_at" TIMESTAMPTZ(6),
ALTER COLUMN "kyc_stage" SET DEFAULT 'level_1';

-- CreateTable
CREATE TABLE "payrolls" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "employer_id" UUID NOT NULL,
    "original_file_name" VARCHAR(255) NOT NULL,
    "file_mime_type" VARCHAR(100) NOT NULL,
    "parsed_data" JSONB NOT NULL,
    "status" "EnumPayrollStatus" NOT NULL DEFAULT 'UPLOADED',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payrolls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_nin_key" ON "employees"("nin");

-- CreateIndex
CREATE UNIQUE INDEX "employees_bvn_key" ON "employees"("bvn");

-- AddForeignKey
ALTER TABLE "payrolls" ADD CONSTRAINT "payrolls_employer_id_fkey" FOREIGN KEY ("employer_id") REFERENCES "employers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
