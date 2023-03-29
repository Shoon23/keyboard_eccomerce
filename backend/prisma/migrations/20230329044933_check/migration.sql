/*
  Warnings:

  - You are about to drop the column `userId` on the `Orders` table. All the data in the column will be lost.
  - Added the required column `checkOutId` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Orders` DROP FOREIGN KEY `Orders_userId_fkey`;

-- AlterTable
ALTER TABLE `Orders` DROP COLUMN `userId`,
    ADD COLUMN `checkOutId` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `CheckOut` (
    `checkOutId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`checkOutId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CheckOut` ADD CONSTRAINT `CheckOut_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_checkOutId_fkey` FOREIGN KEY (`checkOutId`) REFERENCES `CheckOut`(`checkOutId`) ON DELETE RESTRICT ON UPDATE CASCADE;
