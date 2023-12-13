/*
  Warnings:

  - Made the column `side` on table `game_players` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "game_players" ALTER COLUMN "side" SET NOT NULL,
ALTER COLUMN "side" SET DEFAULT 0;
