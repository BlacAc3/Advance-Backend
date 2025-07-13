import "dotenv/config";
import { PrismaClient } from "../../src/generated/prisma";

const getDatabaseUrl = () => {
  return process.env.DATABASE_URL;
  if (process.env.NODE_ENV === "test") {
    const testDbUrl =
      process.env.TEST_DATABASE_URL ||
      `postgres://${process.env.TEST_DB_USER || "test_user"}:${process.env.TEST_DB_PASSWORD || "test_password"}@${process.env.TEST_DB_HOST || "localhost"}:${process.env.TEST_DB_PORT || "5433"}/${process.env.TEST_DB_NAME || "test_db"}`;

    // When running tests, ensure process.env.DATABASE_URL is set.
    // Prisma Client often performs internal checks based on this environment variable
    // even when the URL is explicitly provided in the `datasources` option.
    if (!process.env.DATABASE_URL) {
      process.env.DATABASE_URL = testDbUrl;
    }
    return testDbUrl;
  }
  return process.env.DATABASE_URL!;
};

const createPrismaClient = () => {
  const databaseUrl = getDatabaseUrl();

  return new PrismaClient();
};

const setupDatabase = async () => {
  try {
    const prisma = createPrismaClient();

    // Test the connection
    await prisma.$connect();

    console.log("Database setup completed successfully");
    return prisma;
  } catch (error) {
    console.error("Database setup failed:", error);
    throw error;
  }
};

// Create the main Prisma client instance
export const prisma = createPrismaClient();

// Export the factory for custom connections if needed
export { createPrismaClient, setupDatabase };
