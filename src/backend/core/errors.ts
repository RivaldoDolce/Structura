export class AppError extends Error {
  public readonly code: string;
  public readonly httpStatus: number;

  constructor(code: string, message: string, httpStatus: number = 500) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.httpStatus = httpStatus;
  }
}

export const ErrorCodes = {
  VALIDATION_ERROR: { code: "VALIDATION_ERROR", httpStatus: 400 },
  UNAUTHORIZED: { code: "UNAUTHORIZED", httpStatus: 401 },
  FORBIDDEN: { code: "FORBIDDEN", httpStatus: 403 },
  NOT_FOUND: { code: "NOT_FOUND", httpStatus: 404 },
  CONFLICT: { code: "CONFLICT", httpStatus: 409 },
  PAYMENT_FAILED: { code: "PAYMENT_FAILED", httpStatus: 402 },
  RATE_LIMITED: { code: "RATE_LIMITED", httpStatus: 429 },
  INTERNAL: { code: "INTERNAL", httpStatus: 500 },
} as const;

export type ErrorCode = keyof typeof ErrorCodes;

export function createAppError(code: ErrorCode, details?: string): AppError {
  const { httpStatus } = ErrorCodes[code];
  return new AppError(code, details || code, httpStatus);
}
