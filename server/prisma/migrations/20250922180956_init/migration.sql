/*
  Warnings:

  - Made the column `vote` on table `TriggerVote` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."TriggerVote" ALTER COLUMN "vote" SET NOT NULL;
