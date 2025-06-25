import { Sequelize, Dialect } from "sequelize";
import { logger } from "../utils/logger";

const sequelize = new Sequelize(
  process.env.DB_NAME_DEV || "advance",
  process.env.DB_USER_DEV || "blacac3",
  process.env.DB_PASSWORD_DEV || "blacac3",
  {
    host: process.env.DB_HOST_DEV || "localhost",
    port: Number(process.env.DB_PORT_DEV) || 5432,
    dialect: (process.env.DB_DIALECT_DEV as Dialect) || ("postgres" as Dialect),
    logging: (msg) => logger.info(msg),
  },
);

export { sequelize };

export const setupDatabase = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Database connection established.");
    logger.info("Database synchronized.");
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
    throw error;
  }
};
