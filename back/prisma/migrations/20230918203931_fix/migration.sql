/*
  Warnings:

  - The primary key for the `gamePlayers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `gameID` on the `gamePlayers` table. All the data in the column will be lost.
  - Added the required column `gameId` to the `gamePlayers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "gamePlayers" DROP CONSTRAINT "gamePlayers_gameID_fkey";

-- AlterTable
ALTER TABLE "gamePlayers" DROP CONSTRAINT "gamePlayers_pkey",
DROP COLUMN "gameID",
ADD COLUMN     "gameId" INTEGER NOT NULL,
ADD CONSTRAINT "gamePlayers_pkey" PRIMARY KEY ("playerId", "gameId");

-- AddForeignKey
ALTER TABLE "gamePlayers" ADD CONSTRAINT "gamePlayers_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;
