/*
  Warnings:

  - Added the required column `is_on_diet` to the `snacks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "snacks" ADD COLUMN     "is_on_diet" BOOLEAN NOT NULL,
ALTER COLUMN "hour" SET DATA TYPE TEXT;
