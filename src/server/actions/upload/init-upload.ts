"use server";

import { prisma } from "@/lib/db/prisma";
import { requireUser } from "@/lib/auth/session";
import { createPresignedUploadURL } from "@/lib/r2/presign";
import { randomUUID } from "crypto";

export async function initUploadAction({
  mimeType,
  size,
  name = "unnamed",
}: {
  mimeType: string;
  size: number;
  name: string;
}) {
  const user = await requireUser();

  const key = `${user.id}/${randomUUID()}`;

  // 1. Create DB record
  const file = await prisma.file.create({
    data: {
      userId: user.id,
      r2Key: key,
      mimeType,
      size,
      name,
      status: "PENDING",
    },
  });

  // 2. Generate presigned URL
  const { url } = await createPresignedUploadURL({
    key,
    contentType: mimeType,
  });

  return {
    uploadUrl: url,
    fileId: file.id,
    key,
  };
}
