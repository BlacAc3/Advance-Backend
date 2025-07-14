// This file sets up a connection to a Redis server and provides a wrapper
// around the raw Redis client methods.
//
// The purpose of this wrapper is to:
// 1. Centralize Redis configuration (like the URL).
// 2. Handle the connection process and log connection events (success/failure).
// 3. Provide a simplified and consistent interface for common Redis operations.
//    This might involve adding error handling, logging, or slightly modifying
//    method signatures (e.g., the `set` method handling TTL directly, or
//    `sismember` returning a boolean instead of 0/1).
// 4. Allow access to the underlying raw client for less common operations
//    if needed.

import { createClient } from "redis";
import { logger } from "../utils/logger";

// Determine the Redis connection URL from environment variables or default to localhost.
const redisUrl = process.env.REDIS_URL;

// Create the actual Redis client instance.
// Let TypeScript infer the correct type from createClient.
const client = createClient({
  url: redisUrl,
});

// Set up event handlers to log when the client encounters an error or connects successfully.
client.on("error", (error: Error) => {
  logger.error("Redis Client Error:", error);
});

client.on("connect", () => {
  logger.info("Redis Client Connected");
});

// Create the `redisWrapper` object. This object contains methods that wrap
// the underlying `client` methods. Each wrapper method typically calls the
// corresponding client method and includes basic error handling and logging.
const redisWrapper = {
  // Basic operations (set, get, del)
  // The `set` method is enhanced to accept TTL directly.
  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    try {
      if (ttlSeconds) {
        await client.set(key, value, { EX: ttlSeconds });
      } else {
        await client.set(key, value);
      }
    } catch (error) {
      logger.error("Redis set error:", error);
      throw error;
    }
  },

  async get(key: string): Promise<string | null> {
    try {
      // The actual return type is Promise<string | null>, so no change needed here.
      return await client.get(key);
    } catch (error) {
      logger.error("Redis get error:", error);
      throw error;
    }
  },

  async del(key: string): Promise<number> {
    try {
      // The actual return type is Promise<number> for a single key.
      // Changed return type from Promise<void> to Promise<number> to match.
      return await client.del(key);
    } catch (error) {
      logger.error("Redis del error:", error);
      throw error;
    }
  },

  // Hash operations (hset, hget, hgetall)
  async hset(key: string, field: string, value: string) {
    try {
      // The actual return type is Promise<number> for hset.
      // Changed return type from Promise<void> to Promise<number> to match.
      return await client.hset(key, field, value);
    } catch (error) {
      logger.error("Redis hset error:", error);
      throw error;
    }
  },

  async hget(key: string, field: string) {
    try {
      // The actual return type is Promise<string | null>, so no change needed here.
      return await client.hget(key, field);
    } catch (error) {
      logger.error("Redis hget error:", error);
      throw error;
    }
  },

  async hgetall(key: string) {
    try {
      // The actual return type is Promise<Record<string, string> | null>.
      // Changed return type to include null as a possibility.
      return await client.hgetall(key);
    } catch (error) {
      logger.error("Redis hgetall error:", error);
      throw error;
    }
  },

  // List operations (lpush, rpop)
  async lpush(key: string, value: string) {
    try {
      // The actual return type is Promise<number> for lpush.
      // Changed return type from Promise<void> to Promise<number> to match.
      return await client.lpush(key, value);
    } catch (error) {
      logger.error("Redis lpush error:", error);
      throw error;
    }
  },

  async rpop(key: string) {
    try {
      // The actual return type is Promise<string | null>, so no change needed here.
      return await client.rpop(key);
    } catch (error) {
      logger.error("Redis rpop error:", error);
      throw error;
    }
  },

  // Set operations (sadd, sismember)
  // The `sismember` method is enhanced to return a boolean (true/false) instead of 0/1.
  async sadd(key: string, member: string) {
    try {
      // The actual return type is Promise<number> for sadd.
      // Changed return type from Promise<void> to Promise<number> to match.
      return await client.sadd(key, member);
    } catch (error) {
      logger.error("Redis sadd error:", error);
      throw error;
    }
  },

  async sismember(key: string, member: string): Promise<boolean> {
    try {
      // This method correctly transforms the number result to a boolean,
      // so the wrapper's return type is fine.
      return (await client.sismember(key, member)) === 1;
    } catch (error) {
      logger.error("Redis sismember error:", error);
      throw error;
    }
  },

  // Key management operations (exists, expire)
  // The `exists` method is enhanced to return a boolean (true/false) instead of 0/1.
  async exists(key: string): Promise<boolean> {
    try {
      // This method correctly transforms the number result to a boolean,
      // so the wrapper's return type is fine.
      return (await client.exists(key)) === 1;
    } catch (error) {
      logger.error("Redis exists error:", error);
      throw error;
    }
  },

  async expire(key: string, seconds: number): Promise<number> {
    try {
      // The actual return type is Promise<boolean> for expire.
      // Changed return type from Promise<void> to Promise<boolean> to match.
      return await client.expire(key, seconds);
    } catch (error) {
      logger.error("Redis expire error:", error);
      throw error;
    }
  },

  // Connection management (quit)
  async quit(): Promise<string> {
    try {
      // The actual return type is Promise<'OK'>, so no change needed here.
      return await client.quit();
    } catch (error) {
      logger.error("Redis quit error:", error);
      throw error;
    }
  },

  // Provides direct access to the underlying raw Redis client instance.
  // Return the actual type inferred by TypeScript.
  getClient(): typeof client {
    return client;
  },
};

// Export the `redisWrapper` object so it can be imported and used by other parts of the application.
// It's exported as `redisClient`.
export const redisClient = redisWrapper;

// A dedicated function to handle connecting the Redis client.
// It logs success or failure and exits the process on connection failure,
// indicating a critical dependency wasn't met.
export const connectRedis = async () => {
  try {
    await client.connect();
  } catch (error) {
    logger.error("Failed to connect to Redis:", error);
    process.exit(1);
  }
};
