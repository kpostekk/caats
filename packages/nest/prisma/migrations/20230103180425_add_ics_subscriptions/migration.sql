-- AlterTable
ALTER TABLE "UserSession" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '1 day';

-- CreateTable
CREATE TABLE "IcsSubscriptions" (
    "id" UUID NOT NULL,
    "includeGroups" TEXT[],
    "userId" UUID NOT NULL,

    CONSTRAINT "IcsSubscriptions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "IcsSubscriptions" ADD CONSTRAINT "IcsSubscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
