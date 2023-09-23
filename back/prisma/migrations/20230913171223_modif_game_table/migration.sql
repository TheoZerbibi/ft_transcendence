-- AddForeignKey
ALTER TABLE "gamePlayers" ADD CONSTRAINT "gamePlayers_gameID_fkey" FOREIGN KEY ("gameID") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
