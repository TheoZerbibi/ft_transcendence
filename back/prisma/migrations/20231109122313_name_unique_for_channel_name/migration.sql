/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `channels` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "channel_users" RENAME CONSTRAINT "channel_users_pk" TO "channel_users_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "channels_name_key" ON "channels"("name");

-- RenameIndex
ALTER INDEX "channel_users_channel_id_user_id_uindex" RENAME TO "channel_users_channel_id_user_id_key";
