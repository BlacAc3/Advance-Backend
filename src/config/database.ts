import { Sequelize } from 'sequelize';
import { logger } from '../utils/logger';

const {
  DB_HOST = 'localhost',
  DB_PORT = '5432',
  DB_NAME = 'advancepay',
  DB_USER = 'postgres',
  DB_PASSWORD = 'postgres',
} = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  dialect: 'postgres',
  logging: (msg) => logger.debug(msg),
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: true,
    underscored: true,
  },
});

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connection has been established successfully.');
    return true;
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    throw error;
  }
};

export const syncDatabase = async (force: boolean = false) => {
  try {
    await sequelize.sync({ force });
    logger.info(`Database synced successfully. Force: ${force}`);
    return true;
  } catch (error) {
    logger.error('Error syncing database:', error);
    throw error;
  }
}; 