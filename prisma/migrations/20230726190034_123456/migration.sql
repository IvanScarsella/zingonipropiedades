-- CreateEnum
CREATE TYPE "propertyType" AS ENUM ('Terreno', 'Casa', 'Departamento');

-- CreateEnum
CREATE TYPE "operationType" AS ENUM ('Venta', 'Alquiler');

-- CreateTable
CREATE TABLE "property" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "operationType" "operationType" NOT NULL,
    "propertyType" "propertyType" NOT NULL,
    "location" TEXT NOT NULL,
    "rooms" INTEGER NOT NULL DEFAULT 0,
    "images" TEXT[],

    CONSTRAINT "property_pkey" PRIMARY KEY ("id")
);
