import "dotenv/config";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_PUBLIC_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

async function testR2() {
  console.log("Testing with:", {
    endpoint: process.env.R2_PUBLIC_ENDPOINT,
    bucket: process.env.R2_BUCKET_NAME,
    accessKey: process.env.R2_ACCESS_KEY_ID,
    secretKey: process.env.R2_SECRET_ACCESS_KEY ? "loaded" : "missing",
  });

  try {
    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: "test.txt",
        Body: "hello world",
      }),
    );

    console.log("Upload OK");
  } catch (err) {
    console.error("R2 test failed:", err);
  }
}

testR2();
