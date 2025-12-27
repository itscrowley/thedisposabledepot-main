import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    role: { type: String, default: "user" }, // 'admin' or 'user'
  },
  { timestamps: true }
);

export const User = models.User || model("User", UserSchema);
