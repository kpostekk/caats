/*
  Warnings:

  - You are about to drop the column `alias` on the `IcsSubscriptions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[publicAlias]` on the table `IcsSubscriptions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "IcsSubscriptions" DROP COLUMN "alias",
ADD COLUMN     "publicAlias" TEXT;

-- AlterTable
ALTER TABLE "UserSession" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '1 day';

-- CreateIndex
CREATE UNIQUE INDEX "IcsSubscriptions_publicAlias_key" ON "IcsSubscriptions"("publicAlias");
