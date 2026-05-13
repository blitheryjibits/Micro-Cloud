import { ApiError as NextApiError } from "next/dist/server/api-utils";
import type { ErrorCode } from "@/server/core/errors/ErrorCodes";
import type { StatusCodes } from "@/server/core/errors/ApiStatusCodes";

/**
 * * Usage:
 * ------
 * Throw this error inside API route `try` blocks to signal a controlled,
 * intentional failure. The global `catch` block should detect `instanceof ApiError`
 * and convert it into your unified JSON response format:
 *
 * {
 *   success: false,
 *   error: {
 *     code: "INVALID_INPUT",
 *     message: "Missing required field: key"
 *   }
 */

export class ApiError extends NextApiError {
  code: ErrorCode;

  constructor(code: ErrorCode, message: string, status: StatusCodes) {
    super(status, message);
    this.code = code;
  }
}
