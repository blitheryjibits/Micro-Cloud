/**
 * AuthProvider defines the domain-level contract for retrieving
 * authenticated user sessions. It is intentionally framework- and
 * provider-agnostic so the application layer can depend on a stable
 * interface regardless of the underlying auth system.
 */
export interface AuthProvider {
  /**
   * Returns the current authenticated session, or null if the user
   * is not authenticated. The shape of the returned session is kept
   * minimal to avoid leaking provider-specific details.
   */
  getSession(): Promise<{ user: { id: string } } | null>;
}
