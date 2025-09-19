/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "public"."NavMain" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "NavMain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserRelNavMain" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,
    "navMainId" TEXT NOT NULL,

    CONSTRAINT "UserRelNavMain_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."NavMain" ADD CONSTRAINT "NavMain_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."NavMain"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserRelNavMain" ADD CONSTRAINT "UserRelNavMain_navMainId_fkey" FOREIGN KEY ("navMainId") REFERENCES "public"."NavMain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserRelNavMain" ADD CONSTRAINT "UserRelNavMain_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
