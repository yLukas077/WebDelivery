/*
  Warnings:

  - You are about to drop the column `userId` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `customerId` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_userId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_userId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_categoryId_fkey";

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "userId",
ADD COLUMN     "customerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "userId",
ADD COLUMN     "customerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "categoryId",
ADD COLUMN     "storeId" TEXT NOT NULL;

-- DropTable
DROP TABLE "categories";

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "storeId" TEXT,
    "productId" TEXT,
    "reviewId" TEXT,
    "deliveryId" TEXT,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stores" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "openingHours" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "averageRating" DOUBLE PRECISION DEFAULT 0,
    "licenses" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deliveries" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "estimatedDelivery" TIMESTAMP(3) NOT NULL,
    "actualDelivery" TIMESTAMP(3),

    CONSTRAINT "deliveries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stores_email_key" ON "stores"("email");

-- CreateIndex
CREATE UNIQUE INDEX "stores_cnpj_key" ON "stores"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "deliveries_orderId_key" ON "deliveries"("orderId");

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "reviews"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_deliveryId_fkey" FOREIGN KEY ("deliveryId") REFERENCES "deliveries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
