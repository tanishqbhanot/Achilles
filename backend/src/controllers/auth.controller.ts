import {Request, Response} from "express";
import {loginUser, signupUser} from "../services/auth.service";
import { authCookieOptions } from "../config/cookies";
import { AuthRequest } from "../middleware/auth.middleware";
import { loginWithGoogle } from "../services/auth.service";

export const signup = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
      return;
    }

    const result = await signupUser({
      name,
      email,
      password,
    });

    res.cookie("auth_token", result.token, authCookieOptions);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: result.user,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong";

    res.status(400).json({
      success: false,
      message,
    });
  }
};

export const login = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
      return;
    }

    const result = await loginUser(email, password);

    res.cookie("auth_token", result.token, authCookieOptions);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: result.user,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong";

    res.status(401).json({
      success: false,
      message,
    });
  }
};

export const logout = (
  _req: Request,
  res: Response
): void => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const getMe = (
  req: AuthRequest,
  res: Response
): void => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const googleLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { credential } = req.body;

    if (!credential) {
      res.status(400).json({
        success: false,
        message: "Google credential is required",
      });
      return;
    }

    const result = await loginWithGoogle(credential);

    res.cookie(
      "auth_token",
      result.token,
      authCookieOptions
    );

    res.status(200).json({
      success: true,
      message: "Google login successful",
      user: result.user,
    });
  } catch (error) {
    console.error("Google login error:", error);

    res.status(401).json({
      success: false,
      message: "Google authentication failed",
    });
  }
};