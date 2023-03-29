/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_userId_fkey`;

-- DropTable
DROP TABLE `Order`;

-- CreateTable
CREATE TABLE `Orders` (
    `ordersId` VARCHAR(191) NOT NULL,
    `amount` VARCHAR(255) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Orders_userId_key`(`userId`),
    PRIMARY KEY (`ordersId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderItem` (
    `orderItemId` VARCHAR(191) NOT NULL,
    `price` VARCHAR(255) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `status` VARCHAR(255) NOT NULL DEFAULT 'pending',
    `currency` VARCHAR(100) NOT NULL DEFAULT 'php',
    `productId` VARCHAR(191) NOT NULL,
    `ordersId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`orderItemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_ordersId_fkey` FOREIGN KEY (`ordersId`) REFERENCES `Orders`(`ordersId`) ON DELETE RESTRICT ON UPDATE CASCADE;
