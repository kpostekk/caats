/*
  Warnings:

  - You are about to drop the column `subjectCode` on the `TimetableEvent` table. All the data in the column will be lost.
  - You are about to drop the column `subjectName` on the `TimetableEvent` table. All the data in the column will be lost.
  - You are about to drop the `BaseEvent` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[sourceId]` on the table `TimetableEvent` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `TimetableEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endsAt` to the `TimetableEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `TimetableEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceId` to the `TimetableEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startsAt` to the `TimetableEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `TimetableEvent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BaseEvent" DROP CONSTRAINT "BaseEvent_sourceId_fkey";

-- DropForeignKey
ALTER TABLE "TimetableEvent" DROP CONSTRAINT "TimetableEvent_id_fkey";

-- AlterTable
CREATE SEQUENCE timetableevent_id_seq;
ALTER TABLE "TimetableEvent" DROP COLUMN "subjectCode",
DROP COLUMN "subjectName",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "endsAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "sourceId" INTEGER NOT NULL,
ADD COLUMN     "startsAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('timetableevent_id_seq'),
ALTER COLUMN "room" DROP NOT NULL;
ALTER SEQUENCE timetableevent_id_seq OWNED BY "TimetableEvent"."id";

-- DropTable
DROP TABLE "BaseEvent";

-- CreateIndex
CREATE UNIQUE INDEX "TimetableEvent_sourceId_key" ON "TimetableEvent"("sourceId");

-- AddForeignKey
ALTER TABLE "TimetableEvent" ADD CONSTRAINT "TimetableEvent_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "TaskResult"("id") ON DELETE CASCADE ON UPDATE CASCADE;
