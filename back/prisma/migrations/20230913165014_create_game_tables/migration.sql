-- CreateTable
CREATE TABLE "games" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" TIMESTAMP(3),
    "endAt" TIMESTAMP(3),

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gamePlayers" (
    "playerId" INTEGER NOT NULL,
    "gameID" INTEGER NOT NULL,
    "isWin" BOOLEAN,
    "isSpec" BOOLEAN,

    CONSTRAINT "gamePlayers_pkey" PRIMARY KEY ("playerId","gameID")
);

-- CreateIndex
CREATE UNIQUE INDEX "games_id_key" ON "games"("id");

-- CreateIndex
CREATE UNIQUE INDEX "games_uid_key" ON "games"("uid");
