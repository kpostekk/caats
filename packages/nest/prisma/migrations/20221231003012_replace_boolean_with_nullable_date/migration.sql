/*
  Warnings:

  - You are about to drop the column `invalidated` on the `UserSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserSession" DROP COLUMN "invalidated",
ADD COLUMN     "revokedAt" TIMESTAMP(3),
ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '1 day';
