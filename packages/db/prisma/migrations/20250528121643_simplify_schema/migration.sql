/*
  Warnings:

  - You are about to drop the `RecordsOfUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userUid,url]` on the table `Record` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userUid` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RecordsOfUser" DROP CONSTRAINT "RecordsOfUser_recordId_fkey";

-- DropForeignKey
ALTER TABLE "RecordsOfUser" DROP CONSTRAINT "RecordsOfUser_userId_fkey";

-- DropIndex
DROP INDEX "Record_url_key";

-- AlterTable
ALTER TABLE "Record" ADD COLUMN     "userUid" TEXT NOT NULL;

-- DropTable
DROP TABLE "RecordsOfUser";

-- CreateIndex
CREATE UNIQUE INDEX "Record_userUid_url_key" ON "Record"("userUid", "url");

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
