-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "workerId" UUID;

-- AlterTable
ALTER TABLE "UserSession" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '1 day';

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Scraper"("id") ON DELETE SET NULL ON UPDATE CASCADE;
