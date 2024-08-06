-- DropForeignKey
ALTER TABLE "Club" DROP CONSTRAINT "Club_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Coordinator" DROP CONSTRAINT "Coordinator_coordinatorId_fkey";

-- DropForeignKey
ALTER TABLE "Coordinator" DROP CONSTRAINT "Coordinator_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_clubId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_clubId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_studentId_fkey";

-- DropForeignKey
ALTER TABLE "RegisteredEvent" DROP CONSTRAINT "RegisteredEvent_eventId_fkey";

-- DropForeignKey
ALTER TABLE "RegisteredEvent" DROP CONSTRAINT "RegisteredEvent_userId_fkey";

-- AddForeignKey
ALTER TABLE "Club" ADD CONSTRAINT "Club_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("uId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("uId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("uId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("uId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coordinator" ADD CONSTRAINT "Coordinator_coordinatorId_fkey" FOREIGN KEY ("coordinatorId") REFERENCES "Member"("studentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coordinator" ADD CONSTRAINT "Coordinator_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("uId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegisteredEvent" ADD CONSTRAINT "RegisteredEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegisteredEvent" ADD CONSTRAINT "RegisteredEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("uId") ON DELETE CASCADE ON UPDATE CASCADE;
