import type { FileRepository } from "./FileRepository";

/**
 * DatabaseProvider defines the contract for all database access
 * required by the application layer. It aggregates repositories.
 *
 * This allows the application layer to depend on a single injected
 * provider rather than individual repositories.
 */
export interface DatabaseProvider {
  file: FileRepository;
}
