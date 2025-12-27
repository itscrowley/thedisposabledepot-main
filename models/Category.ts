import mongoose, { Schema, model, models } from "mongoose";

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String },
  },
  { timestamps: true }
);

export const Category = models.Category || model("Category", CategorySchema);
