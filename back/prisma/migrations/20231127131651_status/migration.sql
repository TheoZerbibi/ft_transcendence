/*
  Warnings:

  - The values [INEXISTENT] on the enum `RequestStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RequestStatus_new" AS ENUM ('DECLINED', 'PENDING', 'ACCEPTED');
ALTER TYPE "RequestStatus" RENAME TO "RequestStatus_old";
ALTER TYPE "RequestStatus_new" RENAME TO "RequestStatus";
DROP TYPE "RequestStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "friends" ALTER COLUMN "status" DROP DEFAULT;
