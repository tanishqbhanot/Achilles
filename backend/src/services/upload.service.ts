import {
  PutObjectCommand,
} from "@aws-sdk/client-s3";

import { randomUUID } from "crypto";

import { s3Client } from "../config/s3";
import { Resume } from "../models/Resume";

interface UploadResumeInput {
  userId: string;
  file: Express.Multer.File;
}

export const uploadResume = async ({
  userId,
  file,
}: UploadResumeInput) => {
  const bucket = process.env.AWS_S3_BUCKET;

  if (!bucket) {
    throw new Error("AWS_S3_BUCKET is not configured");
  }

  const extension = file.originalname
    .split(".")
    .pop()
    ?.toLowerCase();

  const key = `resumes/${userId}/${randomUUID()}.${extension}`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      Metadata: {
        userId,
        originalName: file.originalname,
      },
    })
  );

  const previousResume = await Resume.findOne({
    userId,
  }).sort({
    version: -1,
  });

  const version = previousResume
    ? previousResume.version + 1
    : 1;

  const resume = await Resume.create({
    userId,
    originalName: file.originalname,
    s3Key: key,
    mimeType: file.mimetype,
    size: file.size,
    version,
    status: "uploaded",
  });

  return resume;
};