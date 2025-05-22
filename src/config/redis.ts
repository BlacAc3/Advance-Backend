import { createClient, RedisClientType } from 'redis';
import { logger } from '../utils/logger';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

// Create a custom Redis client type with our specific methods
interface CustomRedisClient extends RedisClientType {
  set(key: string, value: string, options?: { EX?: number }): Promise<'OK'>;
  get(key: string): Promise<string | null>;
  del(key: string): Promise<number>;
  hset(key: string, field: string, value: string): Promise<number>;
  hget(key: string, field: string): Promise<string | null>;
  hgetall(key: string): Promise<Record<string, string>>;
  lpush(key: string, value: string): Promise<number>;
  rpop(key: string): Promise<string | null>;
  sadd(key: string, member: string): Promise<number>;
  sismember(key: string, member: string): Promise<number>;
  exists(key: string): Promise<number>;
  expire(key: string, seconds: number): Promise<number>;
  quit(): Promise<'OK'>;
}

// Create the Redis client
const client = createClient({
  url: redisUrl
}) as CustomRedisClient;

// Set up event handlers
client.on('error', (error: Error) => {
  logger.error('Redis Client Error:', error);
});

client.on('connect', () => {
  logger.info('Redis Client Connected');
});

// Create a wrapper with utility methods
const redisWrapper = {
  // Basic operations
  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    try {
      if (ttlSeconds) {
        await client.set(key, value, { EX: ttlSeconds });
      } else {
        await client.set(key, value);
      }
    } catch (error) {
      logger.error('Redis set error:', error);
      throw error;
    }
  },

  async get(key: string): Promise<string | null> {
    try {
      return await client.get(key);
    } catch (error) {
      logger.error('Redis get error:', error);
      throw error;
    }
  },

  async del(key: string): Promise<void> {
    try {
      await client.del(key);
    } catch (error) {
      logger.error('Redis del error:', error);
      throw error;
    }
  },

  // Hash operations
  async hset(key: string, field: string, value: string): Promise<void> {
    try {
      await client.hset(key, field, value);
    } catch (error) {
      logger.error('Redis hset error:', error);
      throw error;
    }
  },

  async hget(key: string, field: string): Promise<string | null> {
    try {
      return await client.hget(key, field);
    } catch (error) {
      logger.error('Redis hget error:', error);
      throw error;
    }
  },

  async hgetall(key: string): Promise<Record<string, string>> {
    try {
      return await client.hgetall(key);
    } catch (error) {
      logger.error('Redis hgetall error:', error);
      throw error;
    }
  },

  // List operations
  async lpush(key: string, value: string): Promise<void> {
    try {
      await client.lpush(key, value);
    } catch (error) {
      logger.error('Redis lpush error:', error);
      throw error;
    }
  },

  async rpop(key: string): Promise<string | null> {
    try {
      return await client.rpop(key);
    } catch (error) {
      logger.error('Redis rpop error:', error);
      throw error;
    }
  },

  // Set operations
  async sadd(key: string, member: string): Promise<void> {
    try {
      await client.sadd(key, member);
    } catch (error) {
      logger.error('Redis sadd error:', error);
      throw error;
    }
  },

  async sismember(key: string, member: string): Promise<boolean> {
    try {
      return (await client.sismember(key, member)) === 1;
    } catch (error) {
      logger.error('Redis sismember error:', error);
      throw error;
    }
  },

  // Key management
  async exists(key: string): Promise<boolean> {
    try {
      return (await client.exists(key)) === 1;
    } catch (error) {
      logger.error('Redis exists error:', error);
      throw error;
    }
  },

  async expire(key: string, seconds: number): Promise<void> {
    try {
      await client.expire(key, seconds);
    } catch (error) {
      logger.error('Redis expire error:', error);
      throw error;
    }
  },

  // Connection management
  async quit(): Promise<void> {
    try {
      await client.quit();
    } catch (error) {
      logger.error('Redis quit error:', error);
      throw error;
    }
  },

  // Get the raw Redis client for advanced operations
  getClient(): CustomRedisClient {
    return client;
  }
};

// Export the Redis wrapper
export const redisClient = redisWrapper;

// Connect to Redis
export const connectRedis = async () => {
  try {
    await client.connect();
  } catch (error) {
    logger.error('Failed to connect to Redis:', error);
    process.exit(1);
  }
}; 