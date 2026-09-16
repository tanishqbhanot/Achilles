import mongoose, { Document, Schema } from "mongoose";

export interface IResume extends Document {
  userId: mongoose.Types.ObjectId;
  originalName: string;
  s3Key: string;
  mimeType: string;
  size: number;
  version: number;
  status: "uploaded" | "processing" | "processed" | "failed";
  uploadedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const resumeSchema = new Schema<IResume>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    originalName: {
      type: String,
      required: true,
      trim: true,
    },

    s3Key: {
      type: String,
      required: true,
      unique: true,
    },

    mimeType: {
      type: String,
      required: true,
    },

    size: {
      type: Number,
      required: true,
    },

    version: {
      type: Number,
      required: true,
      default: 1,
    },

    status: {
      type: String,
      enum: [
        "uploaded",
        "processing",
        "processed",
        "failed",
      ],
      default: "uploaded",
    },

    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Resume = mongoose.model<IResume>(
  "Resume",
  resumeSchema
);