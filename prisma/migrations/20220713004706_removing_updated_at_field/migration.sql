/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `TagsOnTools` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Tool` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Tag` DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `TagsOnTools` DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `Tool` DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `updatedAt`;
