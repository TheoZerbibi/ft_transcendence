-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('INEXISTENT', 'PENDING', 'ACCEPTED', 'DECLINED');

-- AlterTable
ALTER TABLE "friends" ADD COLUMN     "status" "RequestStatus" NOT NULL DEFAULT 'INEXISTENT';
