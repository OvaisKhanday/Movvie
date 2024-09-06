/*
  Warnings:

  - The primary key for the `bookmark` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `bookmark` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to alter the column `title` on the `bookmark` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(127)`.
  - You are about to alter the column `startDate` on the `bookmark` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Date`.
  - You are about to alter the column `userId` on the `bookmark` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.

*/
-- DropForeignKey
ALTER TABLE `bookmark` DROP FOREIGN KEY `Bookmark_userId_fkey`;

-- AlterTable
ALTER TABLE `bookmark` DROP PRIMARY KEY,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `id` INTEGER UNSIGNED NOT NULL,
    MODIFY `title` VARCHAR(127) NOT NULL,
    MODIFY `backdropPath` VARCHAR(255) NOT NULL,
    MODIFY `posterPath` VARCHAR(255) NOT NULL,
    MODIFY `startDate` DATE NOT NULL,
    MODIFY `userId` INTEGER UNSIGNED NOT NULL,
    ADD PRIMARY KEY (`userId`, `id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Bookmark` ADD CONSTRAINT `Bookmark_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
