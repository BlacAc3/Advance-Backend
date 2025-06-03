export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational = true,
  ) {
    super(message);
    this.name = "ApiError";
    // Error.captureStackTrace is often unnecessary when simply extending Error
    // in modern JavaScript environments, as the stack trace is captured automatically.
    // Removed for simplicity and reduced boilerplate.
    // Error.captureStackTrace(this, this.constructor);
  }
}

// Simplified specific error types. Removed repetitive captureStackTrace.
// They extend the base Error class and primarily serve for type discrimination.
export class JWTError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "JWTError";
    // Error.captureStackTrace removed for simplicity
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
    // Error.captureStackTrace removed for simplicity
  }
}

export class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DatabaseError";
    // Error.captureStackTrace removed for simplicity
  }
}

export class Web3Error extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Web3Error";
    // Error.captureStackTrace removed for simplicity
  }
}

// This type remains suitable for structuring error responses, especially from an API.
export type ErrorResponse = {
  status: "error";
  message: string;
  code?: number; // Maps well to ApiError.statusCode
  details?: unknown; // Optional field for additional error context
};
