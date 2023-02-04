-- CreateEnum
CREATE TYPE "ConnectionStatus" AS ENUM ('AWAITING', 'BUSY', 'DISCONNECTED');

-- AlterTable
ALTER TABLE "UserSession" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '1 day';

-- CreateTable
CREATE TABLE "Scraper" (
    "id" UUID NOT NULL,
    "alias" TEXT NOT NULL,
    "ownerId" UUID NOT NULL,
    "taskId" INTEGER,
    "state" "ConnectionStatus" NOT NULL DEFAULT 'DISCONNECTED',
    "lastSeen" TIMESTAMP(3),

    CONSTRAINT "Scraper_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Scraper_taskId_key" ON "Scraper"("taskId");

-- AddForeignKey
ALTER TABLE "Scraper" ADD CONSTRAINT "Scraper_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scraper" ADD CONSTRAINT "Scraper_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;
