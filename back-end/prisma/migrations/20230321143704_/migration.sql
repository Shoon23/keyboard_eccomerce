-- DropForeignKey
ALTER TABLE `CartItem` DROP FOREIGN KEY `CartItem_product_id_fkey`;

-- AlterTable
ALTER TABLE `CartItem` MODIFY `product_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`product_id`) ON DELETE SET NULL ON UPDATE CASCADE;
