-- AlterTable
ALTER TABLE "UserSession" ADD COLUMN     "invalidated" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '1 day';

-- CreateIndex
CREATE INDEX "User_id_idx" ON "User"("id" ASC);

-- CreateIndex
CREATE INDEX "UserSession_id_idx" ON "UserSession"("id" ASC);
