-- CreateTable
CREATE TABLE "public"."TriggerVote" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "triggerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "vote" BOOLEAN,

    CONSTRAINT "TriggerVote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TriggerVote_triggerId_userId_key" ON "public"."TriggerVote"("triggerId", "userId");

-- AddForeignKey
ALTER TABLE "public"."TriggerVote" ADD CONSTRAINT "TriggerVote_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "public"."Trigger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TriggerVote" ADD CONSTRAINT "TriggerVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
