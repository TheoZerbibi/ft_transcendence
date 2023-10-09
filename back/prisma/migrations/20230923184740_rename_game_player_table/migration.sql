/*
  Warnings:

  - You are about to drop the `gamePlayers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "gamePlayers" DROP CONSTRAINT "gamePlayers_game_id_fkey";

-- DropForeignKey
ALTER TABLE "gamePlayers" DROP CONSTRAINT "gamePlayers_player_id_fkey";

-- DropTable
DROP TABLE "gamePlayers";

-- CreateTable
CREATE TABLE "game_players" (
    "player_id" INTEGER NOT NULL,
    "game_id" INTEGER NOT NULL,
    "is_win" BOOLEAN,
    "is_spec" BOOLEAN,

    CONSTRAINT "game_players_pkey" PRIMARY KEY ("player_id","game_id")
);

-- AddForeignKey
ALTER TABLE "game_players" ADD CONSTRAINT "game_players_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_players" ADD CONSTRAINT "game_players_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;
