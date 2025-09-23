-- CreateTable
CREATE TABLE "public"."Trigger" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "phrase" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "proposerId" TEXT NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Trigger_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Trigger" ADD CONSTRAINT "Trigger_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Trigger" ADD CONSTRAINT "Trigger_proposerId_fkey" FOREIGN KEY ("proposerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
