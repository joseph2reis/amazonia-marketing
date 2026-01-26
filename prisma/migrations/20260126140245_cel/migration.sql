/*
  Warnings:

  - You are about to drop the column `whatsapp` on the `Company` table. All the data in the column will be lost.
  - Added the required column `cel` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cel" TEXT NOT NULL,
    "cep" TEXT,
    "logradouro" TEXT,
    "bairro" TEXT,
    "cidade" TEXT,
    "description" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Company" ("approved", "bairro", "cep", "cidade", "cnpj", "createdAt", "description", "id", "logradouro", "name", "phone", "updatedAt", "userId") SELECT "approved", "bairro", "cep", "cidade", "cnpj", "createdAt", "description", "id", "logradouro", "name", "phone", "updatedAt", "userId" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
CREATE UNIQUE INDEX "Company_cnpj_key" ON "Company"("cnpj");
CREATE UNIQUE INDEX "Company_userId_key" ON "Company"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
