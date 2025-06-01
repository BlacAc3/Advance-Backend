import { sequelize } from "../config/database";
import { redisClient } from "../config/redis";

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
  // await redisClient.quit();
});

// Reset database and Redis between tests
beforeEach(async () => {
  // Clear all tables
  await sequelize.truncate({ cascade: true });
  // Clear Redis cache
  // Ensure the client is connected before flushing
  if (!redisClient.getClient().isOpen) {
    await redisClient.getClient().connect(); // Or handle connection outside beforeEach
  }
  const redis = redisClient.getClient();
  await redis.flushAll();
});
