/*
  Warnings:

  - You are about to drop the column `object` on the `TaskResult` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "TaskResult_object_idx";

-- AlterTable
ALTER TABLE "TaskResult" DROP COLUMN "object",
ADD COLUMN     "values" JSONB[];

-- CreateIndex
CREATE INDEX "TaskResult_values_idx" ON "TaskResult" USING GIN ("values");
