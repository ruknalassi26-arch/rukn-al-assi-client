import { AppError } from "./AppError";

export class ApiError extends AppError {
  public readonly details?: Record<string, unknown>;

  constructor(
    message: string,
    statusCode = 400,
    code = "API_ERROR",
    details?: Record<string, unknown>
  ) {
    super(message, statusCode, code);
    this.name = "ApiError";
    this.details = details;
  }
}
