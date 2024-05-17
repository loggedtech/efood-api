/*
  Warnings:

  - You are about to drop the column `place` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `zip_code` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `owner_id` on the `restaurants` table. All the data in the column will be lost.
  - You are about to drop the column `slogan` on the `restaurants` table. All the data in the column will be lost.
  - You are about to drop the column `restaurant_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - Added the required column `street` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_restaurant_id_fkey";

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "place",
DROP COLUMN "zip_code",
ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "zip" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "restaurants" DROP COLUMN "owner_id",
DROP COLUMN "slogan";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "restaurant_id",
DROP COLUMN "role",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "members" (
    "id" SERIAL NOT NULL,
    "restaurant_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'PREPARER',

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
