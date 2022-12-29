/*
  Warnings:

  - You are about to drop the column `values` on the `TaskResult` table. All the data in the column will be lost.
  - Added the required column `object` to the `TaskResult` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "TaskResult_values_idx";

-- AlterTable
ALTER TABLE "TaskResult" DROP COLUMN "values",
ADD COLUMN     "object" JSONB NOT NULL;

-- CreateIndex
CREATE INDEX "TaskResult_object_idx" ON "TaskResult" USING GIN ("object");
