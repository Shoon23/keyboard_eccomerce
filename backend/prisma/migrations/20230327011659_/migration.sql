-- AlterTable
ALTER TABLE `Order` MODIFY `status` VARCHAR(255) NOT NULL DEFAULT 'pending',
    MODIFY `currency` VARCHAR(100) NOT NULL DEFAULT 'php';
