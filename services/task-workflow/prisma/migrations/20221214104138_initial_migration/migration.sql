-- CreateEnum
CREATE TYPE "TaskState" AS ENUM ('Planned', 'InProgress', 'Completed', 'Paused', 'Abandoned');

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "state" "TaskState" NOT NULL DEFAULT 'Planned',
    "comment" TEXT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
