import type { AuthProvider } from "@/server/core/contracts/AuthProvider";
import { auth } from "@/lib/auth/better-auth";

/**
 * Adapter that implements the AuthProvider contract using Better Auth.
 *
 * This keeps Better Auth isolated in the infrastructure layer and exposes
 * a stable, framework-agnostic interface to the application layer.
 */
export const betterAuthProvider: AuthProvider = {
  async getSession() {
    return auth.api.getSession();
  },
};
