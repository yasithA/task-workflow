/*
  Warnings:

  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Task";

-- DropEnum
DROP TYPE "TaskState";

-- CreateTable
CREATE TABLE "TaskEvents" (
    "id" TEXT NOT NULL,
    "eventLog" JSONB[],
    "currentEvent" INTEGER NOT NULL,

    CONSTRAINT "TaskEvents_pkey" PRIMARY KEY ("id")
);
