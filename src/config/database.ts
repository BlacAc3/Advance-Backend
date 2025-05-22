import { Sequelize } from 'sequelize';
import { logger } from '../utils/logger';

const sequelize = new Sequelize(
  process.env.DB_NAME || 'advancepay',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: (msg) => logger.info(msg),
  }
);

export { sequelize };

export const setupDatabase = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connection established.');
    await sequelize.sync();
    logger.info('Database synchronized.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    throw error;
  }
}; 