/*
  Warnings:

  - The primary key for the `IcsSubscriptions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `publicAlias` on the `IcsSubscriptions` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "IcsSubscriptions_publicAlias_key";

-- AlterTable
ALTER TABLE "IcsSubscriptions" DROP CONSTRAINT "IcsSubscriptions_pkey",
DROP COLUMN "publicAlias",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "IcsSubscriptions_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserSession" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '1 day';
