// @vitest-environment node

import { describe, it, expect, vi } from "vitest";
import { createPresignedUploadURL } from "../presign";
import type { PutObjectCommandInput } from "@aws-sdk/client-s3";

// Mock AWS SDK modules
vi.mock("@aws-sdk/client-s3", () => {
  class MockS3Client {
    send = vi.fn();
  }

  const PutObjectCommand = vi.fn().mockImplementation(function (
    input: PutObjectCommandInput,
  ) {
    return input;
  });

  return {
    S3Client: MockS3Client,
    PutObjectCommand,
  };
});

vi.mock("@aws-sdk/s3-request-presigner", () => {
  return {
    getSignedUrl: vi.fn().mockResolvedValue("https://fake-presigned-url.com"),
  };
});

describe("createPresignedUploadURL", () => {
  it("returns a presigned URL and key", async () => {
    const result = await createPresignedUploadURL({
      key: "test-file.png",
      contentType: "image/png",
    });

    expect(result).toEqual({
      url: "https://fake-presigned-url.com",
      key: "test-file.png",
    });
  });

  it("passes correct params to PutObjectCommand", async () => {
    const { PutObjectCommand } = await import("@aws-sdk/client-s3");

    await createPresignedUploadURL({
      key: "abc.txt",
      contentType: "text/plain",
    });

    expect(PutObjectCommand).toHaveBeenCalledWith({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: "abc.txt",
      ContentType: "text/plain",
    });
  });
});
