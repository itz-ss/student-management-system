import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

/**
 * Prisma Client initialization for Prisma 7.
 * Uses the PostgreSQL adapter and a global instance pattern for development.
 */

const globalForPrisma = globalThis;

let prisma;

// Only initialize singletons on the server-side
if (typeof window === "undefined") {
  const connectionString = process.env.DATABASE_URL || process.env.DIRECT_URL;

  if (!connectionString) {
    throw new Error(
      "Missing database connection string. Set DATABASE_URL or DIRECT_URL in your environment."
    );
  }

  const pool = new pg.Pool({
    connectionString,
  });
  const adapter = new PrismaPg(pool);

  prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
  }
}

export { prisma };
