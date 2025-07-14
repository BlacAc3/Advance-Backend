import winston from "winston";

const logLevel = process.env.LOG_LEVEL || "info";

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json(),
);

// Create the logger instance
export const logger = winston.createLogger({
  level: logLevel,
  format: logFormat,
  defaultMeta: { service: "advancepay-backend" },
  transports: [
    // In serverless environments like Vercel, file-based logging is not persistent.
    // Logs should be sent to the console (stdout/stderr) where they are captured
    // by the serverless platform's logging system.
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(
          ({ timestamp, level, message, ...meta }) =>
            `${timestamp} [${level}]: ${message} ${
              Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""
            }`,
        ),
      ),
    }),
  ],
});

// Create a stream object for Morgan
export const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

// Export a function to log errors with context
export const logError = (error: Error, context?: Record<string, unknown>) => {
  logger.error({
    message: error.message,
    stack: error.stack,
    ...context,
  });
};

// Export a function to log API requests
export const logApiRequest = (
  method: string,
  path: string,
  statusCode: number,
  responseTime: number,
  userAgent?: string,
) => {
  logger.info("API Request", {
    method,
    path,
    statusCode,
    responseTime: `${responseTime}ms`,
    userAgent,
  });
};
