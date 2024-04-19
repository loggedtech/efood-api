-- CreateTable
CREATE TABLE "addresses" (
    "id" UUID NOT NULL,
    "zip_code" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);
