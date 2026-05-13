import type { DatabaseProvider } from "@/server/core/contracts/DatabaseProvider";
import { prismaFileRepository } from "./prismaFileRepository";

/**
 * Prisma-based implementation of the DatabaseProvider contract.
 *
 * This object is injected into handler factories and application services.
 * It exposes repository implementations that wrap Prisma and conform to
 * the domain-level interfaces defined in /server/core/contracts.
 */
export const prismaDatabaseProvider: DatabaseProvider = {
  file: prismaFileRepository,
};
