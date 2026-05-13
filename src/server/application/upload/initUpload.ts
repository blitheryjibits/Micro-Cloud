import type { AuthProvider } from "@/server/core/contracts/AuthProvider";
import type { DatabaseProvider } from "@/server/core/contracts/DatabaseProvider";
import { ApiError } from "@/server/core/errors/ApiError";

/**
 * Application use-case: initUpload
 *
 * This function contains the core business logic for initializing a file upload.
 * It validates the session, validates input, and ensures the user is authorized
 * to create a file record. It is framework-agnostic and depends only on
 * domain-level contracts (AuthProvider, DatabaseProvider).
 */
export async function initUpload(
  body: { key?: string; size?: number; mimeType?: string },
  deps: { auth: AuthProvider; db: DatabaseProvider },
) {
  const { auth, db } = deps;

  // 1. Validate session
  const session = await auth.getSession();
  if (!session?.user) {
    throw new ApiError(
      "UNAUTHORIZED",
      "Session expired or user not authenticated",
      401,
    );
  }

  // 2. Validate input
  if (!body.key) {
    throw new ApiError("BAD_REQUEST", "Missing required field: key", 400);
  }
  if (!body.size) {
    throw new ApiError("BAD_REQUEST", "Missing required field: size", 400);
  }
  if (!body.mimeType) {
    throw new ApiError("BAD_REQUEST", "Missing required field: mimeType", 400);
  }

  const { key, size, mimeType } = body;

  // 3. Ensure file does not already exist
  const existing = await db.file.findByKey(key);
  if (existing) {
    throw new ApiError("CONFLICT", "A file with this key already exists", 409);
  }

  // 4. Create file metadata record
  await db.file.create({
    key,
    size,
    mimeType,
    userId: session.user.id,
    status: "PENDING",
  });

  // 5. Return a pure result object
  return {
    message: "Upload initialized successfully",
    key,
    size,
    mimeType,
  };
}
