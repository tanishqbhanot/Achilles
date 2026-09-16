import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { uploadResume, getResumeS3Key } from "../services/upload.service";

export const uploadResumeController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
      return;
    }

    const resume = await uploadResume({
      userId: req.user.id,
      file: req.file,
    });

    res.status(201).json({
      success: true,
      message: "Resume uploaded successfully",
      resume: {
        id: resume._id,
        originalName: resume.originalName,
        mimeType: resume.mimeType,
        size: resume.size,
        version: resume.version,
        status: resume.status,
        uploadedAt: resume.uploadedAt,
      },
    });
  } catch (error) {
    console.error("Resume upload error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to upload resume",
    });
  }
};

export const getResumeS3KeyController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const s3Key = await getResumeS3Key(req.user.id);

    if (!s3Key) {
      res.status(404).json({
        success: false,
        message: "Resume not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      s3Key,
    });
  } catch (error) {
    console.error("Get resume error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get resume",
    });
  }
};