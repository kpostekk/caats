/*
  Warnings:

  - Added the required column `constantId` to the `TimetableEvent` table without a default value. This is not possible if the table is not empty.

*/
-- Remove all current events, tasks and results
TRUNCATE TABLE "Task" RESTART IDENTITY CASCADE;

-- DropIndex
DROP INDEX "TaskResult_taskId_createdAt_idx";

-- DropIndex
DROP INDEX "User_id_idx";

-- DropIndex
DROP INDEX "UserSession_id_expiresAt_idx";

-- AlterTable
ALTER TABLE "TimetableEvent" ADD COLUMN     "constantId" CHAR(16) NOT NULL;

-- AlterTable
ALTER TABLE "UserSession" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '1 day';

-- CreateIndex
CREATE INDEX "TaskResult_createdAt_idx" ON "TaskResult"("createdAt" DESC);

-- CreateIndex
CREATE INDEX "UserSession_expiresAt_idx" ON "UserSession"("expiresAt" ASC);
