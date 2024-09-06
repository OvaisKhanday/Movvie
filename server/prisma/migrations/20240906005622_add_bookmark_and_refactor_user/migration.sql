/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `isAdmin` on the `user` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `age` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(4)` to `UnsignedTinyInt`.
  - You are about to drop the `userimage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `userimage` DROP FOREIGN KEY `UserImage_userId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `isAdmin`,
    ADD COLUMN `picture` MEDIUMBLOB NULL,
    ADD COLUMN `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `age` TINYINT UNSIGNED NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `userimage`;

-- CreateTable
CREATE TABLE `Bookmark` (
    `id` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `adult` BOOLEAN NOT NULL DEFAULT false,
    `backdropPath` VARCHAR(191) NOT NULL,
    `posterPath` VARCHAR(191) NOT NULL,
    `mediaType` ENUM('MOVIE', 'TV') NOT NULL,
    `startDate` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Bookmark` ADD CONSTRAINT `Bookmark_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
