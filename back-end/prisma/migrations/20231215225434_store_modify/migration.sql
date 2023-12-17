/*
  Warnings:

  - You are about to drop the column `licenses` on the `stores` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `stores` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "stores" DROP COLUMN "licenses",
DROP COLUMN "status";
