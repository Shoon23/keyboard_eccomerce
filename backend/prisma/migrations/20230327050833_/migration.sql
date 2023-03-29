-- CreateTable
CREATE TABLE `ShippinAddress` (
    `shippingAddressId` VARCHAR(191) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `country` VARCHAR(255) NOT NULL,
    `line1` VARCHAR(255) NOT NULL,
    `line2` VARCHAR(255) NOT NULL,
    `postal_code` INTEGER NOT NULL,
    `state` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `ordersId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ShippinAddress_email_key`(`email`),
    UNIQUE INDEX `ShippinAddress_ordersId_key`(`ordersId`),
    PRIMARY KEY (`shippingAddressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ShippinAddress` ADD CONSTRAINT `ShippinAddress_ordersId_fkey` FOREIGN KEY (`ordersId`) REFERENCES `Orders`(`ordersId`) ON DELETE RESTRICT ON UPDATE CASCADE;
