/*
  Warnings:

  - A unique constraint covering the columns `[sourceId]` on the table `BaseEvent` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `room` to the `BaseEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `BaseEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BaseEvent" ADD COLUMN     "groups" TEXT[],
ADD COLUMN     "hosts" TEXT[],
ADD COLUMN     "room" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BaseEvent_sourceId_key" ON "BaseEvent"("sourceId");
