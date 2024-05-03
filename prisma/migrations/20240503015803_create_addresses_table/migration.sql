-- CreateTable
CREATE TABLE "addresses" (
    "id" UUID NOT NULL,
    "zip_code" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "number" VARCHAR(10) NOT NULL,
    "complement" VARCHAR(60),
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" CHAR(2) NOT NULL,
    "country" CHAR(3) NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);
