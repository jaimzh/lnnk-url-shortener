import mongoose, { Schema, model, models } from 'mongoose';

const UrlSchema = new Schema(
  {
    shortCode: { type: String, required: true, unique: true, index: true },
    originalUrl: { type: String, required: true },
    clicks: { type: Number, default: 0 },
    
  },
  { timestamps: true }
);


export const Url = models.Url || model('Url', UrlSchema);




