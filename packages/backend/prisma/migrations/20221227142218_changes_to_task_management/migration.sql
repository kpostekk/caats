-- AlterEnum
ALTER TYPE "TaskStatus" ADD VALUE 'SKIPPED';

-- DropForeignKey
ALTER TABLE "TaskResult" DROP CONSTRAINT "TaskResult_taskId_fkey";

-- AddForeignKey
ALTER TABLE "TaskResult" ADD CONSTRAINT "TaskResult_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
