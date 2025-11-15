import mongoose, { models } from "mongoose";

const ExtraPriceSchema = new mongoose.Schema({
  name: String,
  price: Number
})

const MenuItemSchema = new mongoose.Schema({
  name: { type: String },
  image: { type: String },
  description: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  rawmeatcategory: { type: mongoose.Schema.Types.ObjectId, ref: "RawMeatCategory" },
  basePrice: { type: Number },
  sizes: { type: [ExtraPriceSchema] },
  extraIngredientsPrices: { type: [ExtraPriceSchema] },
}, { timestamps: true })

export const MenuItem = models?.MenuItem || mongoose.model("MenuItem", MenuItemSchema);