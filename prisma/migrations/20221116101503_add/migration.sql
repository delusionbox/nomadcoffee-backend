/*
  Warnings:

  - A unique constraint covering the columns `[category]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url]` on the table `CoffeeShopPhoto` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `caption` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "caption" TEXT NOT NULL,
ADD COLUMN     "category" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_category_key" ON "Category"("category");

-- CreateIndex
CREATE UNIQUE INDEX "CoffeeShopPhoto_url_key" ON "CoffeeShopPhoto"("url");
