/*
  Warnings:

  - You are about to drop the column `coordinatorId` on the `Member` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_coordinatorId_fkey";

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "coordinatorId";

-- CreateTable
CREATE TABLE "Coordinator" (
    "coordinatorId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "Coordinator_pkey" PRIMARY KEY ("coordinatorId","eventId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_studentId_key" ON "Member"("studentId");

-- AddForeignKey
ALTER TABLE "Coordinator" ADD CONSTRAINT "Coordinator_coordinatorId_fkey" FOREIGN KEY ("coordinatorId") REFERENCES "Member"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coordinator" ADD CONSTRAINT "Coordinator_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("uId") ON DELETE RESTRICT ON UPDATE CASCADE;
