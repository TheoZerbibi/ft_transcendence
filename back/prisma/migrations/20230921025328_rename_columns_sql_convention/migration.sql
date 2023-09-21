/*
  Warnings:

  - The primary key for the `gamePlayers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `gameId` on the `gamePlayers` table. All the data in the column will be lost.
  - You are about to drop the column `isSpec` on the `gamePlayers` table. All the data in the column will be lost.
  - You are about to drop the column `isWin` on the `gamePlayers` table. All the data in the column will be lost.
  - You are about to drop the column `playerId` on the `gamePlayers` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `endAt` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `startedAt` on the `games` table. All the data in the column will be lost.
  - Added the required column `game_id` to the `gamePlayers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player_id` to the `gamePlayers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "gamePlayers" DROP CONSTRAINT "gamePlayers_gameId_fkey";

-- DropForeignKey
ALTER TABLE "gamePlayers" DROP CONSTRAINT "gamePlayers_playerId_fkey";

-- AlterTable
ALTER TABLE "gamePlayers" DROP CONSTRAINT "gamePlayers_pkey",
DROP COLUMN "gameId",
DROP COLUMN "isSpec",
DROP COLUMN "isWin",
DROP COLUMN "playerId",
ADD COLUMN     "game_id" INTEGER NOT NULL,
ADD COLUMN     "is_spec" BOOLEAN,
ADD COLUMN     "is_win" BOOLEAN,
ADD COLUMN     "player_id" INTEGER NOT NULL,
ADD CONSTRAINT "gamePlayers_pkey" PRIMARY KEY ("player_id", "game_id");

-- AlterTable
ALTER TABLE "games" DROP COLUMN "createdAt",
DROP COLUMN "endAt",
DROP COLUMN "startedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "end_at" TIMESTAMP(3),
ADD COLUMN     "is_private" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "started_at" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "gamePlayers" ADD CONSTRAINT "gamePlayers_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gamePlayers" ADD CONSTRAINT "gamePlayers_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;
