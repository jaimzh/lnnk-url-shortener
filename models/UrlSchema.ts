import mongoose, { Schema, model, models } from "mongoose";

const UrlSchema = new Schema(
  {
    shortCode: { type: String, required: true, unique: true, index: true },
    originalUrl: { type: String, required: true },
    clicks: { type: Number, default: 0 },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
  },
  { timestamps: true },
);

if (models.Url) {
  delete (mongoose as any).models.Url;
}

export const Url = model("Url", UrlSchema);

export interface UrlDoc {
  _id: unknown;
  shortCode: string;
  originalUrl: string;
  clicks: number;
  visibility: "public" | "private";
  createdAt: Date;
}
