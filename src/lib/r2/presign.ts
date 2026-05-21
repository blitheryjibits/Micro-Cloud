// src/lib/r2/presign.ts
import { r2 } from "./client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function createPresignedUploadURL({
  key,
  contentType,
  expiresIn = 120, // default to 2 minutes
}: {
  key: string;
  contentType: string;
  expiresIn?: number;
}) {
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: key,
    ContentType: contentType,
  });

  const url = await getSignedUrl(r2, command, { expiresIn });

  return {
    url,
    key,
  };
}
