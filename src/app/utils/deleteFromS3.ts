// src/utils/deleteFromS3.ts

import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../configs/s3.config";

export const deleteFromS3 = async (fileUrl?: string) => {
  if (!fileUrl) return;

  const bucketName = process.env.AWS_S3_BUCKET_NAME;

  if (!bucketName) {
    throw new Error("AWS_S3_BUCKET_NAME is missing");
  }

  const key = new URL(fileUrl).pathname.substring(1);

  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    })
  );
};