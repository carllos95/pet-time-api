/*
  Warnings:

  - You are about to drop the `Situation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Situation";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "situation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "situation" TEXT NOT NULL DEFAULT 'ATIVO'
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_petShop" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "phone" TEXT,
    "cnpj" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "address_number" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "slug" TEXT,
    "userId" TEXT NOT NULL,
    "situation" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "petShop_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "petShop_situation_fkey" FOREIGN KEY ("situation") REFERENCES "situation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_petShop" ("address", "address_number", "city", "cnpj", "description", "id", "logo", "name", "phone", "situation", "slug", "uf", "userId", "zip_code") SELECT "address", "address_number", "city", "cnpj", "description", "id", "logo", "name", "phone", "situation", "slug", "uf", "userId", "zip_code" FROM "petShop";
DROP TABLE "petShop";
ALTER TABLE "new_petShop" RENAME TO "petShop";
CREATE UNIQUE INDEX "petShop_cnpj_key" ON "petShop"("cnpj");
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userTypeId" INTEGER DEFAULT 2,
    "situation" INTEGER,
    CONSTRAINT "users_userTypeId_fkey" FOREIGN KEY ("userTypeId") REFERENCES "userType" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "users_situation_fkey" FOREIGN KEY ("situation") REFERENCES "situation" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_users" ("created_at", "document", "email", "id", "name", "password", "phone", "situation", "userTypeId") SELECT "created_at", "document", "email", "id", "name", "password", "phone", "situation", "userTypeId" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
