import { Response } from "express";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: any;
}

export function sendSuccess<T>(
  res: Response,
  data: T,
  message?: string,
  statusCode: number = 200,
): Response<ApiResponse<T>> {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message,
  };
  return res.status(statusCode).json(response);
}

export function sendError<T>(
  res: Response,
  error: any,
  message?: string,
  statusCode: number = 400,
): Response<ApiResponse<T>> {
  // console.error(error);
  const response: ApiResponse<T> = {
    success: false,
    error: process.env.NODE_ENV === "development" ? error : undefined, // only return error in development
    message: message || "An error occurred",
  };
  return res.status(statusCode).json(response);
}
