-- DropForeignKey
ALTER TABLE "channel_messages" DROP CONSTRAINT "channel_messages_channel_id_fkey";

-- DropForeignKey
ALTER TABLE "channel_messages" DROP CONSTRAINT "channel_messages_user_id_fkey";

-- DropIndex
DROP INDEX "channel_users_user_id_key";

-- AddForeignKey
ALTER TABLE "channel_messages" ADD CONSTRAINT "channel_messages_user_id_channel_id_fkey" FOREIGN KEY ("user_id", "channel_id") REFERENCES "channel_users"("user_id", "channel_id") ON DELETE CASCADE ON UPDATE CASCADE;
