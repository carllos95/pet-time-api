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
    CONSTRAINT "petShop_situation_fkey" FOREIGN KEY ("situation") REFERENCES "Situation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_petShop" ("address", "address_number", "city", "cnpj", "description", "id", "logo", "name", "phone", "slug", "uf", "userId", "zip_code") SELECT "address", "address_number", "city", "cnpj", "description", "id", "logo", "name", "phone", "slug", "uf", "userId", "zip_code" FROM "petShop";
DROP TABLE "petShop";
ALTER TABLE "new_petShop" RENAME TO "petShop";
CREATE UNIQUE INDEX "petShop_cnpj_key" ON "petShop"("cnpj");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
