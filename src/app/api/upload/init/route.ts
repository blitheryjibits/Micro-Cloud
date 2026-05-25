import { NextResponse } from "next/server";
import { createPresignedUploadURL } from "@/lib/r2/presign";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  const session = await auth.api.getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { filename, contentType, folderId, size } = await req.json();

  // 1. Generate presigned URL
  const { url, key } = await createPresignedUploadURL({
    key: filename,
    contentType,
  });

  // 2. Create pending DB record
  await prisma.file.create({
    data: {
      name: filename,
      r2Key: key,
      mimeType: contentType,
      size: size,
      folderId: folderId,
      userId: session.user.id,
      status: "PENDING",
    },
  });

  // 3. Return presigned URL + key
  return NextResponse.json({ url, key });
}
