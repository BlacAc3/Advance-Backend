import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "dotenv";
import { rateLimit } from "express-rate-limit";
import { errorHandler } from "./middleware/errorHandler";
import { notFoundHandler } from "./middleware/notFoundHandler";
import { setupRoutes } from "./routes";
import { setupDatabase } from "./db/database";
import { logger } from "./utils/logger";
// import web3Routes from "./routes/web3.routes";
import authRoutes from "./routes/auth.routes";
import employeeRoutes from "./routes/employee.routes";
import { connectRedis } from "./config/redis";

// Load environment variables
config();

const app = express();
const port = parseInt(process.env.PORT || "3000", 10);

// Security middleware
app.use(helmet());
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL || "http://localhost:3000",
//     credentials: true,
//   }),
// );
app.set("trust proxy", true);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//
// API routes
setupRoutes(app);

// Logging middleware
app.use(
  morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) },
  }),
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
// app.use(limiter);

// Error handling
// app.use("/", errorHandler as any);
app.use(notFoundHandler);

// Start server
const startServer = async () => {
  try {
    // Initialize database connection
    await setupDatabase();
    await connectRedis();

    app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
      logger.info(`Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};
if (require.main === module) {
  startServer();
}

// Handle unhandled promise rejections
process.on("unhandledRejection", (error: Error) => {
  logger.error("Unhandled Rejection:", error);
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error: Error) => {
  logger.error("Uncaught Exception:", error);
  process.exit(1);
});

export default app;
module.exports = app;
