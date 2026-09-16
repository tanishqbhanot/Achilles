import {Router} from "express";
import {
  signup,
  login,
  logout,
  getMe,
  googleLogin
} from "../controllers/auth.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { googleAuthSchema, loginSchema, signupSchema } from "../validators/auth.validator";
import { validate} from "../middleware/validate.middleware";

const router = Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);
router.get("/me", requireAuth, getMe);
router.post("/google", validate(googleAuthSchema), googleLogin);

export default router;