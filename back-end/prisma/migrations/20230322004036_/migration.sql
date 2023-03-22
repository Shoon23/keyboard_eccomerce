/*
  Warnings:

  - The primary key for the `Cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cart_id` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Cart` table. All the data in the column will be lost.
  - The primary key for the `CartItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cart_id` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `cart_item_id` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `CartItem` table. All the data in the column will be lost.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `product_description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `product_name` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `product_price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `product_stock` on the `Product` table. All the data in the column will be lost.
  - The primary key for the `ProductReviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `product_id` on the `ProductReviews` table. All the data in the column will be lost.
  - You are about to drop the column `review_description` on the `ProductReviews` table. All the data in the column will be lost.
  - You are about to drop the column `review_id` on the `ProductReviews` table. All the data in the column will be lost.
  - You are about to drop the column `review_star` on the `ProductReviews` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `ProductReviews` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - The required column `cartId` was added to the `Cart` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `userId` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cartId` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - The required column `cartItem_id` was added to the `CartItem` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `productDescription` to the `Product` table without a default value. This is not possible if the table is not empty.
  - The required column `productId` was added to the `Product` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `productName` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productStock` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `ProductReviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewDescription` to the `ProductReviews` table without a default value. This is not possible if the table is not empty.
  - The required column `reviewId` was added to the `ProductReviews` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `reviewStar` to the `ProductReviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ProductReviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - The required column `userId` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `Cart` DROP FOREIGN KEY `Cart_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `CartItem` DROP FOREIGN KEY `CartItem_cart_id_fkey`;

-- DropForeignKey
ALTER TABLE `CartItem` DROP FOREIGN KEY `CartItem_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `ProductReviews` DROP FOREIGN KEY `ProductReviews_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `ProductReviews` DROP FOREIGN KEY `ProductReviews_user_id_fkey`;

-- AlterTable
ALTER TABLE `Cart` DROP PRIMARY KEY,
    DROP COLUMN `cart_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `cartId` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`cartId`);

-- AlterTable
ALTER TABLE `CartItem` DROP PRIMARY KEY,
    DROP COLUMN `cart_id`,
    DROP COLUMN `cart_item_id`,
    DROP COLUMN `product_id`,
    ADD COLUMN `cartId` VARCHAR(191) NOT NULL,
    ADD COLUMN `cartItem_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `productId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`cartItem_id`);

-- AlterTable
ALTER TABLE `Product` DROP PRIMARY KEY,
    DROP COLUMN `product_description`,
    DROP COLUMN `product_id`,
    DROP COLUMN `product_name`,
    DROP COLUMN `product_price`,
    DROP COLUMN `product_stock`,
    ADD COLUMN `productDescription` LONGTEXT NOT NULL,
    ADD COLUMN `productId` VARCHAR(191) NOT NULL,
    ADD COLUMN `productName` VARCHAR(255) NOT NULL,
    ADD COLUMN `productPrice` INTEGER NOT NULL,
    ADD COLUMN `productStock` INTEGER NOT NULL,
    ADD PRIMARY KEY (`productId`);

-- AlterTable
ALTER TABLE `ProductReviews` DROP PRIMARY KEY,
    DROP COLUMN `product_id`,
    DROP COLUMN `review_description`,
    DROP COLUMN `review_id`,
    DROP COLUMN `review_star`,
    DROP COLUMN `user_id`,
    ADD COLUMN `productId` VARCHAR(191) NOT NULL,
    ADD COLUMN `reviewDescription` LONGTEXT NOT NULL,
    ADD COLUMN `reviewId` VARCHAR(191) NOT NULL,
    ADD COLUMN `reviewStar` SMALLINT NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`reviewId`);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `created_at`,
    DROP COLUMN `first_name`,
    DROP COLUMN `last_name`,
    DROP COLUMN `user_id`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `firstName` VARCHAR(255) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(255) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `Cart_userId_key` ON `Cart`(`userId`);

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`cartId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`productId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductReviews` ADD CONSTRAINT `ProductReviews_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductReviews` ADD CONSTRAINT `ProductReviews_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;
