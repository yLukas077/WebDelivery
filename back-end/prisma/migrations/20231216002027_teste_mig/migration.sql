/*
  Warnings:

  - Added the required column `password` to the `stores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
DELETE FROM stores;

ALTER TABLE "stores" ADD COLUMN     "password" TEXT NOT NULL;
