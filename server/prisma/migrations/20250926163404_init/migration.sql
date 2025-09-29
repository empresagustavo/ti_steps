/*
  Warnings:

  - Added the required column `type` to the `Snack` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Snack" ADD COLUMN     "type" "public"."SnackType" NOT NULL;
