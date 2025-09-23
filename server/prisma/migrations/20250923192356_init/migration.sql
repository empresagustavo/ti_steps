/*
  Warnings:

  - You are about to drop the column `triggerId` on the `Notification` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Notification" DROP CONSTRAINT "Notification_triggerId_fkey";

-- AlterTable
ALTER TABLE "public"."Notification" DROP COLUMN "triggerId";
