import dotenv from "dotenv";

dotenv.config();

const requiredEnv = [
  "MONGO_URI",
  "JWT_SECRET",
  "AWS_REGION",
  "AWS_S3_BUCKET",
];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`${key} is not configured`);
  }
}

export const env = {
  port: process.env.PORT || "5000",
  mongoUri: process.env.MONGO_URI!,
  jwtSecret: process.env.JWT_SECRET!,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  awsRegion: process.env.AWS_REGION!,
  awsS3Bucket: process.env.AWS_S3_BUCKET!,
};