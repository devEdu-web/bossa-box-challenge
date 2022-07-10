/*
  Warnings:

  - You are about to drop the column `tag_id` on the `TagsOnTools` table. All the data in the column will be lost.
  - You are about to drop the column `tool_id` on the `TagsOnTools` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Tool` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tagId` to the `TagsOnTools` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toolId` to the `TagsOnTools` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `TagsOnTools` DROP FOREIGN KEY `TagsOnTools_tag_id_fkey`;

-- DropForeignKey
ALTER TABLE `TagsOnTools` DROP FOREIGN KEY `TagsOnTools_tool_id_fkey`;

-- AlterTable
ALTER TABLE `TagsOnTools` DROP COLUMN `tag_id`,
    DROP COLUMN `tool_id`,
    ADD COLUMN `tagId` INTEGER NOT NULL,
    ADD COLUMN `toolId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Tool` MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `description` LONGTEXT NOT NULL;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Tool_title_key` ON `Tool`(`title`);

-- AddForeignKey
ALTER TABLE `TagsOnTools` ADD CONSTRAINT `TagsOnTools_toolId_fkey` FOREIGN KEY (`toolId`) REFERENCES `Tool`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TagsOnTools` ADD CONSTRAINT `TagsOnTools_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
