-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'STUDENT');

-- CreateTable
CREATE TABLE "User" (
    "uId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "clubName" TEXT,
    "eventId" TEXT,
    "role" "UserType" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uId")
);

-- CreateTable
CREATE TABLE "Club" (
    "uId" TEXT NOT NULL,
    "clubName" TEXT NOT NULL,

    CONSTRAINT "Club_pkey" PRIMARY KEY ("uId")
);

-- CreateTable
CREATE TABLE "Event" (
    "uId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "venue" TEXT NOT NULL,
    "fees" INTEGER,
    "clubId" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("uId")
);

-- CreateTable
CREATE TABLE "Member" (
    "studentId" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "coordinatorId" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("studentId","clubId")
);

-- CreateTable
CREATE TABLE "_EventToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToUser_AB_unique" ON "_EventToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToUser_B_index" ON "_EventToUser"("B");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("uId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("uId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("uId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_coordinatorId_fkey" FOREIGN KEY ("coordinatorId") REFERENCES "Event"("uId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToUser" ADD CONSTRAINT "_EventToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("uId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToUser" ADD CONSTRAINT "_EventToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("uId") ON DELETE CASCADE ON UPDATE CASCADE;
