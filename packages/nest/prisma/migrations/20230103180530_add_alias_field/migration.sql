-- AlterTable
ALTER TABLE "IcsSubscriptions" ADD COLUMN     "alias" TEXT;

-- AlterTable
ALTER TABLE "UserSession" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '1 day';
