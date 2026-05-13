/**
 * FileRepository defines the domain-level contract for interacting
 * with File records in the database. It is intentionally ORM-agnostic.
 */
export interface FileRepository {
  /**
   * Find a file by its R2 object key.
   */
  findByKey(key: string): Promise<{ userId: string } | null>;

  /**
   * Update the status of a file (e.g., "SUCCESS", "FAILED").
   */
  updateStatus(key: string, status: string): Promise<void>;

  create(data: {
    key: string;
    size: number;
    mimeType: string;
    userId: string;
    status: string;
  }): Promise<void>;
}
