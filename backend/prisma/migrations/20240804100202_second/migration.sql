/*
  Warnings:

  - You are about to drop the `_EventToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EventToUser" DROP CONSTRAINT "_EventToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToUser" DROP CONSTRAINT "_EventToUser_B_fkey";

-- DropTable
DROP TABLE "_EventToUser";

-- CreateTable
CREATE TABLE "RegisteredEvent" (
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "RegisteredEvent_pkey" PRIMARY KEY ("userId","eventId")
);

-- AddForeignKey
ALTER TABLE "RegisteredEvent" ADD CONSTRAINT "RegisteredEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegisteredEvent" ADD CONSTRAINT "RegisteredEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("uId") ON DELETE RESTRICT ON UPDATE CASCADE;
