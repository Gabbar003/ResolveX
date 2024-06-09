/*
  Warnings:

  - You are about to drop the column `gitAccessToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `gitAccessToken`,
    ADD COLUMN `issueCount` INTEGER NULL;
