/*
  Warnings:

  - You are about to drop the `TagsOnTools` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `TagsOnTools` DROP FOREIGN KEY `TagsOnTools_tagId_fkey`;

-- DropForeignKey
ALTER TABLE `TagsOnTools` DROP FOREIGN KEY `TagsOnTools_toolId_fkey`;

-- DropTable
DROP TABLE `TagsOnTools`;

-- CreateTable
CREATE TABLE `_TagToTool` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TagToTool_AB_unique`(`A`, `B`),
    INDEX `_TagToTool_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_TagToTool` ADD CONSTRAINT `_TagToTool_A_fkey` FOREIGN KEY (`A`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TagToTool` ADD CONSTRAINT `_TagToTool_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tool`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
