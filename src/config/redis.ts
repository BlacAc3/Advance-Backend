import Redis from 'ioredis';
import { logger } from '../utils/logger';

// Redis connection options
const redisOptions = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  db: parseInt(process.env.REDIS_DB || '0'),
  retryStrategy: (times: number) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 3
};

// Create Redis client
const redis = new Redis(redisOptions);

// Handle Redis connection events
redis.on('connect', () => {
  logger.info('Redis client connected');
});

redis.on('error', (error) => {
  logger.error('Redis client error:', error);
});

redis.on('close', () => {
  logger.warn('Redis client connection closed');
});

redis.on('reconnecting', () => {
  logger.info('Redis client reconnecting...');
});

// Utility functions for common Redis operations
export const redisClient = {
  // Basic operations
  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    try {
      if (ttlSeconds) {
        await redis.set(key, value, 'EX', ttlSeconds);
      } else {
        await redis.set(key, value);
      }
    } catch (error) {
      logger.error('Redis set error:', error);
      throw error;
    }
  },

  async get(key: string): Promise<string | null> {
    try {
      return await redis.get(key);
    } catch (error) {
      logger.error('Redis get error:', error);
      throw error;
    }
  },

  async del(key: string): Promise<void> {
    try {
      await redis.del(key);
    } catch (error) {
      logger.error('Redis del error:', error);
      throw error;
    }
  },

  // Hash operations
  async hset(key: string, field: string, value: string): Promise<void> {
    try {
      await redis.hset(key, field, value);
    } catch (error) {
      logger.error('Redis hset error:', error);
      throw error;
    }
  },

  async hget(key: string, field: string): Promise<string | null> {
    try {
      return await redis.hget(key, field);
    } catch (error) {
      logger.error('Redis hget error:', error);
      throw error;
    }
  },

  async hgetall(key: string): Promise<Record<string, string>> {
    try {
      return await redis.hgetall(key);
    } catch (error) {
      logger.error('Redis hgetall error:', error);
      throw error;
    }
  },

  // List operations
  async lpush(key: string, value: string): Promise<void> {
    try {
      await redis.lpush(key, value);
    } catch (error) {
      logger.error('Redis lpush error:', error);
      throw error;
    }
  },

  async rpop(key: string): Promise<string | null> {
    try {
      return await redis.rpop(key);
    } catch (error) {
      logger.error('Redis rpop error:', error);
      throw error;
    }
  },

  // Set operations
  async sadd(key: string, member: string): Promise<void> {
    try {
      await redis.sadd(key, member);
    } catch (error) {
      logger.error('Redis sadd error:', error);
      throw error;
    }
  },

  async sismember(key: string, member: string): Promise<boolean> {
    try {
      return (await redis.sismember(key, member)) === 1;
    } catch (error) {
      logger.error('Redis sismember error:', error);
      throw error;
    }
  },

  // Key management
  async exists(key: string): Promise<boolean> {
    try {
      return (await redis.exists(key)) === 1;
    } catch (error) {
      logger.error('Redis exists error:', error);
      throw error;
    }
  },

  async expire(key: string, seconds: number): Promise<void> {
    try {
      await redis.expire(key, seconds);
    } catch (error) {
      logger.error('Redis expire error:', error);
      throw error;
    }
  },

  // Connection management
  async quit(): Promise<void> {
    try {
      await redis.quit();
    } catch (error) {
      logger.error('Redis quit error:', error);
      throw error;
    }
  },

  // Get the raw Redis client for advanced operations
  getClient(): Redis {
    return redis;
  }
};

// Export the Redis client instance
export default redisClient; 