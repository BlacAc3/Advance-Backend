// jest.setup.ts

import { PrismaClient, Prisma } from "../generated/prisma";
import { redisClient as redisWrapper } from "../config/redis";

const redisClient = redisWrapper.getClient();
let prisma: PrismaClient;

/**
 * Cleans the database using TRUNCATE statements.
 * This is significantly faster and more robust for relational databases.
 * It also resets auto-incrementing IDs.
 * @param prismaClient The initialized PrismaClient instance.
 */
async function cleanDatabase(prismaClient: PrismaClient) {
  // Fetch actual table names from the database's information schema.
  // This is more robust as it accounts for Prisma's default pluralization
  // and any `@map` attributes defined in the schema, which are not
  // directly available from Prisma.dmmf for table names.
  const result = await prismaClient.$queryRaw<{ tablename: string }[]>`
    SELECT tablename FROM pg_tables WHERE schemaname = current_schema();
  `;

  const dbTableNames = result.map((row) => row.tablename);

  // Filter out Prisma's internal migration table and quote the table names
  const tablesToTruncate = dbTableNames
    .filter((tableName) => tableName !== "_prisma_migrations") // Prisma's migration table is typically '_prisma_migrations' in PostgreSQL
    .map((tableName) => `"${tableName}"`) // Important: Quote table names for PostgreSQL to handle case sensitivity or special characters
    .join(", ");

  // Ensure there are tables to truncate before attempting the query
  if (!tablesToTruncate) {
    console.warn("No tables found to truncate. Skipping database cleanup.");
    return;
  }

  try {
    // TRUNCATE TABLE statement is fast and resets auto-incrementing IDs (RESTART IDENTITY)
    // CASCADE ensures dependent tables are also truncated.
    await prismaClient.$executeRawUnsafe(
      `TRUNCATE TABLE ${tablesToTruncate} RESTART IDENTITY CASCADE;`,
    );
  } catch (error) {
    console.error("Error truncating tables:", error);
    throw error;
  }
}

// ... (rest of your beforeAll, beforeEach, afterAll hooks remain the same)

beforeAll(async () => {
  process.env.NODE_ENV = "test";

  try {
    prisma = new PrismaClient();
    await prisma.$connect();

    if (!redisClient.isOpen) {
      await redisClient.connect();
    }

    // Add database cleanup here
    await cleanDatabase(prisma);
  } catch (error) {
    console.error("Failed to setup connections for testing:", error);
    throw error;
  }
}, 40000);

beforeEach(async () => {
  try {
    await redisClient.flushAll();
  } catch (error) {
    console.error("Error during beforeEach cleanup:", error);
    throw error;
  }
}, 40000);

afterAll(async () => {
  await cleanDatabase(prisma);
  await prisma.$disconnect();
  if (redisClient.isOpen) {
    await redisClient.quit();
  }
}, 50000);
