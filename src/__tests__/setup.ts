import { sequelize } from "../config/database";
import { redisClient } from "../config/redis";

process.env.JWT_SECRET = process.env.JWT_SECRET || "your_test_jwt_secret_key";
process.env.JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "your_test_jwt_refresh_secret_key";

// Global setup before all tests
beforeAll(async () => {
  // Sync database with test schema
  await sequelize.sync({ force: true });
});

// Global teardown after all tests
// Note: Closing connections (DB and Redis) should typically be handled
// by Jest's globalTeardown, not here if this file is run per test suite.
// Removing close/quit from here prevents "client is closed" errors
// when moving between test suites.
afterAll(async () => {
  // Close database connection (handled globally)
  // await sequelize.close();
  // Close Redis connection (handled globally)
  await redisClient.quit();
});

// Reset database and Redis between tests
beforeEach(async () => {
  // Clear Redis cache
  // Ensure the client is connected and ready before flushing.
  const redis = redisClient.getClient();

  if (!redis.isOpen) {
    try {
      // Await connection. If Redis is unavailable or slow, this could time out.
      await redis.connect();
    } catch (error) {
      // Log connection errors. A connection failure here will prevent flushing.
      console.error("Failed to connect to Redis in beforeEach:", error);
    }
  }

  if (redis.isOpen) {
    await redis.flushAll();
  } else {
    console.warn(
      "Redis client not open after attempted connection in beforeEach. Skipping flushAll.",
    );
  }

  // No other operations that might cause timeouts within this hook.
});
