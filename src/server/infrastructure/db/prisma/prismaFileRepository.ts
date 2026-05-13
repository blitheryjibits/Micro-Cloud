import type { FileRepository } from "@/server/core/contracts/FileRepository";
import { prisma } from "./prisma";

/**
 * Prisma implementation of the FileRepository contract.
 *
 * This repository is responsible for all database operations
 * related to the File model. It adapts Prisma's API to the
 * domain-level FileRepository interface.
 */
export const prismaFileRepository: FileRepository = {
  async findByKey(key) {
    return prisma.file.findUnique({
      where: { r2Key: key },
    });
  },

  async updateStatus(key, status) {
    await prisma.file.update({
      where: { r2Key: key },
      data: { status },
    });
  },
};
