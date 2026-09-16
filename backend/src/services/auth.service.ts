import { User } from "../models/User";
import { comparePassword, hashPassword } from "../utils/password";
import { generateToken } from "../utils/jwt";
import { OAuth2Client } from "google-auth-library";

interface SignupData {
  name: string;
  email: string;
  password: string;
}

interface AuthResult {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
  token: string;
}

const sanitizeUser = (user: any) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  role: user.role,
  avatar: user.avatar,
});

export const signupUser = async (
  data: SignupData
): Promise<AuthResult> => {
  const email = data.email.trim().toLowerCase();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("An account with this email already exists");
  }

  const hashedPassword = await hashPassword(data.password);

  const user = await User.create({
    name: data.name.trim(),
    email,
    password: hashedPassword,
    authProvider: "local",
  });

  const token = generateToken(user._id.toString());

  return {
    user: sanitizeUser(user),
    token,
  };
};

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResult> => {
  const user = await User.findOne({
    email: email.trim().toLowerCase(),
  }).select("+password");

  if (!user || !user.password) {
    throw new Error("Invalid email or password");
  }

  const passwordMatches = await comparePassword(
    password,
    user.password
  );

  if (!passwordMatches) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user._id.toString());

  return {
    user: sanitizeUser(user),
    token,
  };
};

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

interface GoogleUserData {
  googleId: string;
  email: string;
  name: string;
  avatar?: string;
}

export const loginWithGoogle = async (
  idToken: string
): Promise<AuthResult> => {
  if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error("GOOGLE_CLIENT_ID is not configured");
  }

  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new Error("Invalid Google token");
  }

  if (!payload.sub || !payload.email) {
    throw new Error("Google account information is incomplete");
  }

  if (payload.email_verified !== true) {
    throw new Error("Google email is not verified");
  }

  const googleUserData: GoogleUserData = {
    googleId: payload.sub,
    email: payload.email.toLowerCase(),
    name: payload.name || "Google User",
    avatar: payload.picture,
  };

  let user = await User.findOne({
    googleId: googleUserData.googleId,
  });

  if (!user) {
    user = await User.findOne({
      email: googleUserData.email,
    });

    if (user) {
      user.googleId = googleUserData.googleId;
      user.avatar = user.avatar || googleUserData.avatar;
      await user.save();
    } else {
      user = await User.create({
        name: googleUserData.name,
        email: googleUserData.email,
        googleId: googleUserData.googleId,
        avatar: googleUserData.avatar,
        authProvider: "google",
      });
    }
  }

  const token = generateToken(user._id.toString());

  return {
    user: sanitizeUser(user),
    token,
  };
};