-- CreateEnum
CREATE TYPE "public"."SnackType" AS ENUM ('BREAKFAST', 'AFTERNOON');

-- CreateTable
CREATE TABLE "public"."Snack" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "isPromised" BOOLEAN NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Snack_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Snack" ADD CONSTRAINT "Snack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
