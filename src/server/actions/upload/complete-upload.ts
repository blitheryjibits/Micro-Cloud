"use server";

import { prisma } from "@/lib/db/prisma";

export async function completeUploadAction({
  fileId,
  r2Key,
  fileName,
}: {
  fileId: string;
  r2Key: string;
  fileName: string;
}) {
  try {
    await prisma.file.update({
      where: { id: fileId },
      data: { status: "COMPLETED", r2Key, name: fileName },
    });
  } catch (error) {
    console.error("Error updating file status:", error);
    return { success: false, error: "Failed to complete upload" };
  }

  return { success: true };
}
