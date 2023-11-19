/*
  Warnings:

  - You are about to drop the column `user_id` on the `direct_messages` table. All the data in the column will be lost.
  - Added the required column `sender_id` to the `direct_messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "direct_messages" DROP CONSTRAINT "direct_messages_user_id_fkey";

-- AlterTable
ALTER TABLE "direct_messages" DROP COLUMN "user_id",
ADD COLUMN     "sender_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "direct_messages" ADD CONSTRAINT "direct_messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
