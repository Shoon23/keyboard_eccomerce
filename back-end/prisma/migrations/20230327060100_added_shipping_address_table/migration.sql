/*
  Warnings:

  - You are about to drop the `ShippinAddress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ShippinAddress` DROP FOREIGN KEY `ShippinAddress_ordersId_fkey`;

-- DropTable
DROP TABLE `ShippinAddress`;

-- CreateTable
CREATE TABLE `ShippingAddress` (
    `shippingAddressId` VARCHAR(191) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `country` VARCHAR(255) NOT NULL,
    `line1` VARCHAR(255) NOT NULL,
    `line2` VARCHAR(255) NOT NULL,
    `postal_code` VARCHAR(255) NOT NULL,
    `state` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `ordersId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ShippingAddress_email_key`(`email`),
    UNIQUE INDEX `ShippingAddress_ordersId_key`(`ordersId`),
    PRIMARY KEY (`shippingAddressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ShippingAddress` ADD CONSTRAINT `ShippingAddress_ordersId_fkey` FOREIGN KEY (`ordersId`) REFERENCES `Orders`(`ordersId`) ON DELETE RESTRICT ON UPDATE CASCADE;
