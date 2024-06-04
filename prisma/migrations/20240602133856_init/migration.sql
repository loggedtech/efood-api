/*
  Warnings:

  - You are about to alter the column `zip` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(8)`.
  - A unique constraint covering the columns `[tax_id]` on the table `restaurants` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[domain]` on the table `restaurants` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `domain` to the `restaurants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addresses" ALTER COLUMN "zip" SET DATA TYPE CHAR(8);

-- AlterTable
ALTER TABLE "restaurants" ADD COLUMN     "description" VARCHAR(160),
ADD COLUMN     "domain" VARCHAR(60) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "restaurants_tax_id_key" ON "restaurants"("tax_id");

-- CreateIndex
CREATE UNIQUE INDEX "restaurants_domain_key" ON "restaurants"("domain");
