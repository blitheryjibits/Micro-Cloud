// @vitest-environment node

import { describe, it, expect, vi } from "vitest";
import { createPresignedUploadURL } from "../presign";

// Mock AWS SDK modules
vi.mock("@aws-sdk/client-s3", () => {
  return {
    PutObjectCommand: vi.fn().mockImplementation((input) => input),
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
