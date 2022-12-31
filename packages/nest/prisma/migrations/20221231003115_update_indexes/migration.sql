-- DropIndex
DROP INDEX "UserSession_id_idx";

-- AlterTable
ALTER TABLE "UserSession" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '1 day';

-- CreateIndex
CREATE INDEX "UserSession_id_expiresAt_idx" ON "UserSession"("id" ASC, "expiresAt" ASC);
