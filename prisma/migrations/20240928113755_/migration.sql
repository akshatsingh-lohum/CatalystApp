/*
  Warnings:

  - The values [ADMIN] on the enum `USER_ROLE` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Dealer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "USER_ROLE_new" AS ENUM ('SUPER_ADMIN', 'COMPANY_ADMIN', 'DEALER_ADMIN', 'VIEWER', 'DATA_UPLOAD', 'USER');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "USER_ROLE_new" USING ("role"::text::"USER_ROLE_new");
ALTER TYPE "USER_ROLE" RENAME TO "USER_ROLE_old";
ALTER TYPE "USER_ROLE_new" RENAME TO "USER_ROLE";
DROP TYPE "USER_ROLE_old";
COMMIT;

-- CreateIndex
CREATE UNIQUE INDEX "Dealer_email_key" ON "Dealer"("email");
