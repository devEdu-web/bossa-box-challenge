/*
  Warnings:

  - A unique constraint covering the columns `[link]` on the table `Tool` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Tool_link_key` ON `Tool`(`link`);
