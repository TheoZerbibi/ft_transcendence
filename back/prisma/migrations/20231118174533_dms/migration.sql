/*
  Warnings:

  - You are about to drop the column `sender_id` on the `direct_messages` table. All the data in the column will be lost.
  - You are about to drop the column `target_id` on the `direct_messages` table. All the data in the column will be lost.
  - Added the required column `friend_id` to the `direct_messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `direct_messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "direct_messages" DROP CONSTRAINT "direct_messages_sender_id_fkey";

-- AlterTable
ALTER TABLE "direct_messages" DROP COLUMN "sender_id",
DROP COLUMN "target_id",
ADD COLUMN     "friend_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "direct_messages" ADD CONSTRAINT "direct_messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
