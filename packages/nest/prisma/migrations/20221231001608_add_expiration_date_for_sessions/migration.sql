/*
  Warnings:

  - The primary key for the `UserSession` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `accessToken` on the `UserSession` table. All the data in the column will be lost.
  - You are about to drop the column `userAgent` on the `UserSession` table. All the data in the column will be lost.
  - The required column `id` was added to the `UserSession` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "UserSession" DROP CONSTRAINT "UserSession_pkey",
DROP COLUMN "accessToken",
DROP COLUMN "userAgent",
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL DEFAULT now() + interval '1 day',
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "UserSession_pkey" PRIMARY KEY ("id");
