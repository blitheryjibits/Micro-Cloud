import type { AuthProvider } from "@/server/core/contracts/AuthProvider";
import type { DatabaseProvider } from "@/server/core/contracts/DatabaseProvider";
import { ApiError } from "@/server/core/errors/ApiError";

/**
 * Application use-case: completeUpload
 *
 * This function contains the core business logic for marking an uploaded file
 * as successfully processed. It is framework-agnostic and depends only on
 * domain-level contracts (AuthProvider, DatabaseProvider).
 */
export async function completeUpload(
  body: { key?: string },
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

  const key = body.key;

  // 3. Fetch file metadata
  const file = await db.file.findByKey(key);
  if (!file) {
    throw new ApiError(
      "NOT_FOUND",
      "File with the provided key was not found",
      404,
    );
  }

  // 4. Authorization check
  if (file.userId !== session.user.id) {
    throw new ApiError(
      "FORBIDDEN",
      "You do not have permission to modify this file",
      403,
    );
  }

  // 5. Update file status
  await db.file.updateStatus(key, "SUCCESS");

  // 6. Return a pure result object
  return {
    message: "File metadata successfully updated",
    key,
  };
}
