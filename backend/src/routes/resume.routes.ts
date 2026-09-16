import { Router } from "express";

import { getResumeS3KeyController, uploadResumeController } from "../controllers/resume.controller";

import { requireAuth } from "../middleware/auth.middleware";
import { uploadResume } from "../middleware/upload.middleware";

const router = Router();

router.post(
  "/",
  requireAuth,
  uploadResume.single("resume"),
  uploadResumeController
);

router.get(
  "/",
  requireAuth,
  getResumeS3KeyController
);

export default router;