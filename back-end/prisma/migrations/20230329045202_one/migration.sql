/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `CheckOut` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `CheckOut_userId_key` ON `CheckOut`(`userId`);
