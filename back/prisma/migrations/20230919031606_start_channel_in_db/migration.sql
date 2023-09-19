/*
  Warnings:

  - You are about to drop the column `createdAt` on the `channels` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `channels` table. All the data in the column will be lost.
  - You are about to drop the `channel_messages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `channel_users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "channel_messages" DROP CONSTRAINT "channel_messages_channelId_fkey";

-- DropForeignKey
ALTER TABLE "channel_messages" DROP CONSTRAINT "channel_messages_userId_fkey";

-- DropForeignKey
ALTER TABLE "channel_users" DROP CONSTRAINT "channel_users_channelId_fkey";

-- DropForeignKey
ALTER TABLE "channel_users" DROP CONSTRAINT "channel_users_userId_fkey";

-- DropIndex
DROP INDEX "channels_id_key";

-- DropIndex
DROP INDEX "channels_name_key";

-- DropIndex
DROP INDEX "users_id_key";

-- AlterTable
ALTER TABLE "channels" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "channel_messages";

-- DropTable
DROP TABLE "channel_users";
