/*
  Warnings:

  - You are about to drop the column `value` on the `TaskResult` table. All the data in the column will be lost.
  - Added the required column `html` to the `TaskResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `object` to the `TaskResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TaskResult" DROP COLUMN "value",
ADD COLUMN     "html" TEXT NOT NULL,
ADD COLUMN     "object" JSONB NOT NULL;
