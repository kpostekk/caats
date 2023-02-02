/*
  Warnings:

  - You are about to drop the column `name` on the `TimetableEvent` table. All the data in the column will be lost.
  - Added the required column `subject` to the `TimetableEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TimetableEvent"
RENAME "name" TO "subject";

-- AlterTable
ALTER TABLE "UserSession" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '1 day';
