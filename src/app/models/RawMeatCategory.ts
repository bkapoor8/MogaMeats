import { Schema, model, models } from "mongoose";

const RawMeatCategorySchema = new Schema({
  name: { type: String, require: true, unique: true },
  image: { type: String },
}, { timestamps: true });

export const RawMeatCategory = models?.RawMeatCategory || model('RawMeatCategory', RawMeatCategorySchema);