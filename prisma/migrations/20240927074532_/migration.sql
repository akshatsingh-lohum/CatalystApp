-- CreateEnum
CREATE TYPE "CUSTOMER_APPROVAL" AS ENUM ('YES', 'NO', 'PENDING');

-- CreateEnum
CREATE TYPE "CLIENT_APPROVAL" AS ENUM ('YES', 'NO', 'PENDING');

-- CreateEnum
CREATE TYPE "STAGE" AS ENUM ('REQUEST', 'SECURITY_CHECKS', 'MATERIAL_TO_WAREHOUSE', 'INCINERATION', 'VAULT', 'PRODUCTION', 'DISPATCH');

-- CreateEnum
CREATE TYPE "COMPANY_STATUS" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "USER_ROLE" AS ENUM ('ADMIN', 'USER', 'DATA_UPLOAD');

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyStatus" "COMPANY_STATUS" NOT NULL,
    "companyCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "companyUpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dealer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "companyID" INTEGER NOT NULL,

    CONSTRAINT "Dealer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" INTEGER,
    "password" TEXT NOT NULL,
    "dealerId" INTEGER NOT NULL,
    "role" "USER_ROLE" NOT NULL,
    "userCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userUpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "lotWeightKg" DOUBLE PRECISION NOT NULL,
    "catalystName" TEXT NOT NULL,
    "lotID" TEXT NOT NULL,
    "catalystPercent" DOUBLE PRECISION,
    "catalystWeight" DOUBLE PRECISION,
    "companyID" INTEGER NOT NULL,
    "dealerId" INTEGER NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SecurityChecks" (
    "id" SERIAL NOT NULL,
    "videos" TEXT NOT NULL,
    "photos" TEXT NOT NULL,
    "lotID" TEXT NOT NULL,
    "stage" "STAGE" NOT NULL,

    CONSTRAINT "SecurityChecks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaterialToWarehouse" (
    "id" SERIAL NOT NULL,
    "lotWeightKg" DOUBLE PRECISION NOT NULL,
    "videos" TEXT NOT NULL,
    "photos" TEXT NOT NULL,
    "clientApproved" "CLIENT_APPROVAL" NOT NULL,
    "lotID" TEXT NOT NULL,
    "stage" "STAGE" NOT NULL,

    CONSTRAINT "MaterialToWarehouse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Incineration" (
    "id" SERIAL NOT NULL,
    "videos" TEXT NOT NULL,
    "photos" TEXT NOT NULL,
    "custApproved" "CUSTOMER_APPROVAL" NOT NULL,
    "clientApproved" "CLIENT_APPROVAL" NOT NULL,
    "lotID" TEXT NOT NULL,
    "stage" "STAGE" NOT NULL,
    "catalystWeight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Incineration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vault" (
    "id" SERIAL NOT NULL,
    "videos" TEXT NOT NULL,
    "lotID" TEXT NOT NULL,
    "stage" "STAGE" NOT NULL,

    CONSTRAINT "Vault_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Production" (
    "id" SERIAL NOT NULL,
    "videos" TEXT NOT NULL,
    "photos" TEXT NOT NULL,
    "lotID" TEXT NOT NULL,
    "stage" "STAGE" NOT NULL,
    "lossPercent" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Production_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dispatch" (
    "id" SERIAL NOT NULL,
    "lotWeightKg" DOUBLE PRECISION NOT NULL,
    "videos" TEXT NOT NULL,
    "photos" TEXT NOT NULL,
    "lotID" TEXT NOT NULL,
    "stage" "STAGE" NOT NULL,
    "dispatchNo" TEXT NOT NULL,

    CONSTRAINT "Dispatch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_companyName_key" ON "Company"("companyName");

-- CreateIndex
CREATE UNIQUE INDEX "Dealer_phone_key" ON "Dealer"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Request_lotID_key" ON "Request"("lotID");

-- CreateIndex
CREATE UNIQUE INDEX "SecurityChecks_lotID_key" ON "SecurityChecks"("lotID");

-- CreateIndex
CREATE UNIQUE INDEX "MaterialToWarehouse_lotID_key" ON "MaterialToWarehouse"("lotID");

-- CreateIndex
CREATE UNIQUE INDEX "Incineration_lotID_key" ON "Incineration"("lotID");

-- CreateIndex
CREATE UNIQUE INDEX "Vault_lotID_key" ON "Vault"("lotID");

-- CreateIndex
CREATE UNIQUE INDEX "Production_lotID_key" ON "Production"("lotID");

-- CreateIndex
CREATE UNIQUE INDEX "Dispatch_lotID_key" ON "Dispatch"("lotID");

-- AddForeignKey
ALTER TABLE "Dealer" ADD CONSTRAINT "Dealer_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_dealerId_fkey" FOREIGN KEY ("dealerId") REFERENCES "Dealer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_dealerId_fkey" FOREIGN KEY ("dealerId") REFERENCES "Dealer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
