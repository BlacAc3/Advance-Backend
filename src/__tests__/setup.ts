import { sequelize } from "../config/database"; // Assuming sequelize instance
import { redisClient as redisWrapper } from "../config/redis"; // Assuming redisClient is a node-redis v4+ client instance
// Models are not strictly needed here if using sequelize.sync or iterating sequelize.models
// import { User, Invitation, Employer, Employee } from "../models/index";

// Get the raw Redis client instance from the wrapper
const redisClient = redisWrapper.getClient();

// Optional: Ensure connections are ready before any tests run
beforeAll(async () => {
  try {
    // Authenticate Sequelize connection
    sequelize.authenticate();
    // Sync database, forcing recreation for a clean test environment
    sequelize.sync({ force: true });
    console.log("Database connection authenticated and synced for tests.");

    // Ensure Redis client is connected (for node-redis v4+)
    // The `redisClient` variable holds the raw client instance
    if (!redisClient.isOpen) {
      // Check if the client is already open before attempting to connect
      redisClient.connect();
      console.log("Redis client connected for tests.");
    }
  } catch (error) {
    console.error("Failed to setup connections for testing:", error);
    // Exit the process if essential connections fail, as tests cannot run
    process.exit(1);
  }
});

beforeEach(async () => {
  try {
    // Clear Redis data before each test to ensure test isolation
    await redisClient.flushAll();
  } catch (error) {
    console.error("Error during beforeEach cleanup:", error);
    // Re-throw the error to fail the current test if cleanup fails
    throw error;
  }
});

afterAll(async () => {
  console.log("finished tests");
});
