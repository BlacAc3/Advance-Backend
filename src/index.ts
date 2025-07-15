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
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger-output.json"; // Correctly importing the JSON file
// import web3Routes from "./routes/web3.routes"; // Keep commented as per user's code
import authRoutes from "./routes/auth.routes"; // Keep as per user's code
import employeeRoutes from "./routes/employee.routes"; // Keep as per user's code
import { connectRedis } from "./config/redis"; // Keep as per user's code

// Load environment variables
config();

const app = express();
const port = parseInt(process.env.PORT || "3000", 10);

// --- Core Middleware Setup ---
// 1. Security Middleware (Helmet first for basic security headers)
app.use(helmet());

// 2. CORS (if needed, uncomment and configure)
// Place CORS here if it applies to all routes, including Swagger UI.
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);

// 3. Trust Proxy (if your app is behind a proxy like Vercel)
app.set("trust proxy", true);

// 4. Body Parsers (MUST come before any route handlers that need to read request bodies)
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// 5. Logging middleware (can be placed early to log all requests)
app.use(
  morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) },
  }),
);

// 6. Rate Limiting (apply to all requests before they hit routes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
// app.use(limiter); // Uncomment to enable rate limiting

// --- API Documentation (Swagger UI) ---
// This MUST come BEFORE your general API routes and especially before any catch-all
// or notFoundHandler, as it needs to serve its own static files.
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --- API Routes ---
// Define your actual API endpoints here.
// The `setupRoutes` function should contain your specific API endpoints.
// Example:
// app.use('/auth', authRoutes);
// app.use('/employees', employeeRoutes);
setupRoutes(app); // Assuming this sets up all your specific API routes

// --- Static File Serving (if you have other static files) ---
// If you have a 'public' directory with other static assets (e.g., an index.html for your main site),
// you would set up express.static here. For a Vercel serverless function primarily serving an API/Swagger,
// Vercel's static asset hosting usually handles root-level static files.
// If you uncomment this, ensure the 'public' directory exists relative to your project root.
/*
const publicDirectoryPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicDirectoryPath));
*/

// --- Error Handling Middleware ---
// 1. Not Found Handler (MUST be placed AFTER all valid routes and static file servers)
// This catches requests that didn't match any of the above routes/middleware.
app.use(notFoundHandler);

// 2. Global Error Handler (MUST be the very last middleware, takes 4 arguments)
// This catches errors thrown by other middleware or route handlers.
// app.use("/", errorHandler as any); // Uncomment to enable global error handling

// --- Server Initialization and Export ---
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

// This block ensures the server only starts when the file is run directly (e.g., `node index.js`)
// and not when it's imported as a module by Vercel.
if (require.main === module) {
  startServer();
}

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  logger.error("Unhandled Rejection:", error);
  // It's often better to let the process crash for unhandled rejections in production,
  // and use a process manager (like PM2 or Kubernetes) to restart it.
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
  // Similar to unhandled rejections, a clean exit is often preferred.
  process.exit(1);
});

// --- Export the Express app for Vercel ---
// Vercel expects your serverless function file to export a handler.
// For Express, you export the app itself.
export default app;
module.exports = app; // For compatibility with CommonJS environments (Vercel often uses this)
