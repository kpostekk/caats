/*
  Warnings:

  - You are about to drop the column `constantId` on the `TimetableEvent` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[constantId]` on the table `TaskResult` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `constantId` to the `TaskResult` table without a default value. This is not possible if the table is not empty.

*/
-- Clear Tasks
TRUNCATE "Task" RESTART IDENTITY CASCADE;

-- AlterTable
ALTER TABLE "TaskResult" ADD COLUMN     "constantId" CHAR(16) NOT NULL;

-- AlterTable
ALTER TABLE "TimetableEvent" DROP COLUMN "constantId";

-- AlterTable
ALTER TABLE "UserSession" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '1 day';

-- CreateIndex
CREATE UNIQUE INDEX "TaskResult_constantId_key" ON "TaskResult"("constantId");
