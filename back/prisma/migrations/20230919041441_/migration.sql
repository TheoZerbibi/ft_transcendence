/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `channel_users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "channel_messages" DROP CONSTRAINT "channel_messages_user_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "channel_users_user_id_key" ON "channel_users"("user_id");

-- AddForeignKey
ALTER TABLE "channel_messages" ADD CONSTRAINT "channel_messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "channel_users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
