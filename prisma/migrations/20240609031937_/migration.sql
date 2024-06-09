/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Issue` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Issue_url_key` ON `Issue`(`url`);
