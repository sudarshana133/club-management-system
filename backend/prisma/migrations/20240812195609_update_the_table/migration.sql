/*
  Warnings:

  - You are about to drop the `_TeamMembers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TeamMembers" DROP CONSTRAINT "_TeamMembers_A_fkey";

-- DropForeignKey
ALTER TABLE "_TeamMembers" DROP CONSTRAINT "_TeamMembers_B_fkey";

-- DropTable
DROP TABLE "_TeamMembers";

-- CreateTable
CREATE TABLE "RegisteredTeam" (
    "userId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "RegisteredTeam_pkey" PRIMARY KEY ("userId","teamId")
);

-- AddForeignKey
ALTER TABLE "RegisteredTeam" ADD CONSTRAINT "RegisteredTeam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegisteredTeam" ADD CONSTRAINT "RegisteredTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("uId") ON DELETE CASCADE ON UPDATE CASCADE;
