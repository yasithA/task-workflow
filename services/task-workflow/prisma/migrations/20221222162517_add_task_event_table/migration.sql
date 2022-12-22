-- CreateTable
CREATE TABLE "TaskEvents" (
    "id" TEXT NOT NULL,
    "eventLog" JSONB[],
    "currentEvent" INTEGER NOT NULL,

    CONSTRAINT "TaskEvents_pkey" PRIMARY KEY ("id")
);
