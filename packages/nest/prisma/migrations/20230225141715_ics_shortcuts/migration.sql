/*
  Warnings:

  - You are about to drop the `IcsSubscriptions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "IcsSubscriptions" DROP CONSTRAINT "IcsSubscriptions_userId_fkey";

-- AlterTable
ALTER TABLE "UserSession" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '1 day';

-- DropTable
DROP TABLE "IcsSubscriptions";

-- CreateTable
CREATE TABLE "IcsShortcuts" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "IcsShortcuts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "IcsShortcuts" ADD CONSTRAINT "IcsShortcuts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
