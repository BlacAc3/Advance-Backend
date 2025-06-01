import { Sequelize } from "sequelize";
import { logger } from "../utils/logger";

const sequelize = new Sequelize(
  process.env.DB_NAME || "advance",
  process.env.DB_USER || "blacac3",
  process.env.DB_PASSWORD || "blacac3",
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    dialect: "postgres",
    logging: (msg) => logger.info(msg),
  },
);

export { sequelize };

export const setupDatabase = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Database connection established.");
    await sequelize.sync();
    logger.info("Database synchronized.");
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
    throw error;
  }
};
