/*
  Warnings:

  - You are about to drop the column `html` on the `TaskResult` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TaskResult" DROP COLUMN "html";

-- CreateTable
CREATE TABLE "BaseEvent" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "sourceId" INTEGER NOT NULL,

    CONSTRAINT "BaseEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimetableEvent" (
    "id" INTEGER NOT NULL,
    "subjectCode" TEXT NOT NULL,
    "subjectName" TEXT NOT NULL,
    "groups" TEXT[],
    "hosts" TEXT[],
    "room" TEXT NOT NULL,

    CONSTRAINT "TimetableEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BaseEvent" ADD CONSTRAINT "BaseEvent_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "TaskResult"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimetableEvent" ADD CONSTRAINT "TimetableEvent_id_fkey" FOREIGN KEY ("id") REFERENCES "BaseEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
