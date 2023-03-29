/*
  Warnings:

  - You are about to drop the column `ordersId` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the `Orders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `CartItem` DROP FOREIGN KEY `CartItem_ordersId_fkey`;

-- DropForeignKey
ALTER TABLE `Orders` DROP FOREIGN KEY `Orders_userId_fkey`;

-- AlterTable
ALTER TABLE `CartItem` DROP COLUMN `ordersId`;

-- DropTable
DROP TABLE `Orders`;
