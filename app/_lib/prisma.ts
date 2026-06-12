import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

declare global {
  var cachedPrisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  prisma = new PrismaClient({ adapter });
} else {
  if (!global.cachedPrisma) {
    const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    global.cachedPrisma = new PrismaClient({ adapter });
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;
