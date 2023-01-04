-- DropIndex
DROP INDEX "TimetableEvent_startsAt_code_name_idx";

-- AlterTable
ALTER TABLE "UserSession" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '1 day';

-- CreateIndex
CREATE INDEX "TimetableEvent_startsAt_code_groups_idx" ON "TimetableEvent"("startsAt" ASC, "code" ASC, "groups" ASC);
