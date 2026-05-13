import { NextResponse } from "next/server";
import type { AuthProvider } from "@/server/core/contracts/AuthProvider";
import type { DatabaseProvider } from "@/server/core/contracts/DatabaseProvider";
import { ApiError } from "@/server/core/errors/ApiError";
import { completeUpload } from "@/server/application/upload/completeUpload";

/**
 * Factory that creates the POST handler for the upload/complete route.
 * This function wires dependency injection and adapts the application
 * use-case to a Next.js API route.
 */
export function createCompleteUploadHandler(deps: {
  auth: AuthProvider;
  db: DatabaseProvider;
}) {
  return async function POST(req: Request) {
    try {
      const body = await req.json();
      const result = await completeUpload(body, deps);

      return NextResponse.json(
        { success: true, data: result },
        { status: 200 },
      );
    } catch (err) {
      if (err instanceof ApiError) {
        return NextResponse.json(
          {
            success: false,
            error: { code: err.code, message: err.message },
          },
          { status: err.statusCode },
        );
      }

      console.error("Unexpected error in completeHandler:", err);

      return NextResponse.json(
        {
          success: false,
          error: { code: "SERVER_ERROR", message: "Unexpected server error" },
        },
        { status: 500 },
      );
    }
  };
}
