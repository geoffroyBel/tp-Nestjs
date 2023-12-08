/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `end` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `Reservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "createdAt",
DROP COLUMN "end",
DROP COLUMN "start";
