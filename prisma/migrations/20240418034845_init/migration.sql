/*
  Warnings:

  - You are about to drop the `BuddyRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BuddyRequest" DROP CONSTRAINT "BuddyRequest_requestedId_fkey";

-- DropForeignKey
ALTER TABLE "BuddyRequest" DROP CONSTRAINT "BuddyRequest_requesterId_fkey";

-- AlterTable
ALTER TABLE "PendingRequest" ADD COLUMN     "accepted" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "BuddyRequest";
