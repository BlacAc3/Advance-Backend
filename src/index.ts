import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "dotenv";
import { rateLimit } from "express-rate-limit";
import { errorHandler } from "./middleware/errorHandler";
import { notFoundHandler } from "./middleware/notFoundHandler";
import { setupRoutes } from "./routes";
import { setupDatabase } from "./config/database";
import { logger } from "./utils/logger";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger-output.json";
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
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
});
app.use(limiter);

// API routes
setupRoutes(app);
// app.use("/api/v1/web3", web3Routes);
// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/employer", employerRoutes);

// Serve Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health check endpoint
app.get("/api/v1/public/health", (_req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is running",
  });
});

// Error handling
app.use(notFoundHandler);
// app.use("/", errorHandler);

// Start server
const startServer = async () => {
  try {
    // Initialize database connection
    await setupDatabase();
    await connectRedis();

    app.listen(port, "0.0.0.0", () => {
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
