import mongoose from "./utils/db";

const ProductSchema = new mongoose.Schema({
  name: String,
  sku: String,
  description: String,
  price: Number,
  category: String,
  amountInStock: Number,
  manufacturer: {
    name: String,
    country: String,
    website: String,
    description: String,
    address: String,
    contactInfo: {
      name: String,
      email: String,
      phone: String,
    },
  },
});

export const Product = mongoose.model("Product", ProductSchema);
