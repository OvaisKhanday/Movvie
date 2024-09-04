/*
  Warnings:

  - You are about to alter the column `age` on the `user` table. The data in that column could be lost. The data in that column will be cast from `UnsignedTinyInt` to `VarChar(4)`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `age` VARCHAR(4) NOT NULL;
