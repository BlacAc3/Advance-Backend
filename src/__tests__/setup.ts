import { sequelize } from '../config/database';
import redisClient from '../config/redis';

// Global setup before all tests
beforeAll(async () => {
  // Sync database with test schema
  await sequelize.sync({ force: true });
});

// Global teardown after all tests
afterAll(async () => {
  // Close database connection
  await sequelize.close();
  // Close Redis connection
  await redisClient.quit();
});

// Reset database between tests
beforeEach(async () => {
  // Clear all tables
  await sequelize.truncate({ cascade: true });
  // Clear Redis cache
  const redis = redisClient.getClient();
  await redis.flushall();
}); 