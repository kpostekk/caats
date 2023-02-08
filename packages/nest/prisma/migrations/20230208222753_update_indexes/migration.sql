-- DropIndex
DROP INDEX "TimetableEvent_startsAt_code_groups_idx";

-- AlterTable
ALTER TABLE "UserSession" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '1 day';

-- CreateIndex
CREATE INDEX "TimetableEvent_startsAt_idx" ON "TimetableEvent"("startsAt" ASC);

-- CreateIndex
CREATE INDEX "TimetableEvent_endsAt_idx" ON "TimetableEvent"("endsAt" ASC);

-- CreateIndex
CREATE INDEX "TimetableEvent_groups_idx" ON "TimetableEvent" USING HASH ("groups");

-- CreateIndex
CREATE INDEX "TimetableEvent_hosts_idx" ON "TimetableEvent" USING HASH ("hosts");
