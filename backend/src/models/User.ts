import mongoose, {Document, Schema} from "mongoose";

export interface IUser extends Document {
      name: string;
  email: string;
  password?: string;
  googleId?: string;
  authProvider: "local" | "google";
  role: "candidate" | "admin" | "employer";
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      select: false,
    },

    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      required: true,
    },

    role: {
      type: String,
      enum: ["candidate", "admin", "employer"],
      default: "candidate",
    },

    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", UserSchema);