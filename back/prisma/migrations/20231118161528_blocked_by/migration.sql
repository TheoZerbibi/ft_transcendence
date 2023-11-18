/*
  Warnings:

  - The primary key for the `blocked` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `blocked` table. All the data in the column will be lost.
  - Added the required column `blocked_by_id` to the `blocked` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "blocked" DROP CONSTRAINT "blocked_user_id_fkey";

-- AlterTable
ALTER TABLE "blocked" DROP CONSTRAINT "blocked_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "blocked_by_id" INTEGER NOT NULL,
ADD CONSTRAINT "blocked_pkey" PRIMARY KEY ("blocked_by_id", "blocked_id");

-- AddForeignKey
ALTER TABLE "blocked" ADD CONSTRAINT "blocked_blocked_by_id_fkey" FOREIGN KEY ("blocked_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
