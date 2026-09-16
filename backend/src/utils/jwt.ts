import jwt from "jsonwebtoken";

interface JwtPayload {
    userId: string;
}

export const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign(
    { userId } satisfies JwtPayload,
    secret,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    } as jwt.SignOptions
  );
};

export const verifyToken = (token: string): JwtPayload => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.verify(token, secret) as JwtPayload;
};