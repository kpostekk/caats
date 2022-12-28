-- CreateIndex
CREATE INDEX "TaskResult_object_idx" ON "TaskResult" USING GIN ("object");
