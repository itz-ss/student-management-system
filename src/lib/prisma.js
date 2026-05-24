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

  // Configure pg Pool with sensible defaults for hosted DBs (e.g. Supabase).
  // Use SSL when required and set timeouts so failures surface quickly during dev.
  const pool = new pg.Pool({
    connectionString,
    // If your provider requires SSL, this enables it for the pool. In production
    // you should validate certificates properly and not set rejectUnauthorized: false.
    ssl: {
      rejectUnauthorized: false,
    },
    // Fail fast when the database is unreachable
    connectionTimeoutMillis: 5000,
    // Keep idle clients for a reasonable time
    idleTimeoutMillis: 30000,
  });
  const adapter = new PrismaPg(pool);

  prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
  }
}

export { prisma };
