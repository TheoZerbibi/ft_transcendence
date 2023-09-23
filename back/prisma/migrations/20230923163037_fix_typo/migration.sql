/*
  Warnings:

  - You are about to drop the column `update_at` on the `channels` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "channel_users" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "channels" DROP COLUMN "update_at",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
