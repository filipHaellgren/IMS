import mongoose, { Schema, Document } from 'mongoose';

// Contact subdocument
interface Contact {
  name: string;
  email: string;
  phone: string;
}

// Manufacturer subdocument
interface Manufacturer {
  name: string;
  country: string;
  website: string;
  description: string;
  address: string;
  contactInfo: Contact;
}

// Product model
export interface Product extends Document { 
  name: string;
  sku: string;
  description: string;
  price: number;
  category: string;
  manufacturer: Manufacturer;
  amountInStock: number;
}

// Contact Schema
const ContactSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, match: /.+@.+\..+/ },  // Email validation
  phone: { type: String, required: true },
});

// Manufacturer Schema
const ManufacturerSchema: Schema = new Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  website: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  contactInfo: { type: ContactSchema, required: true }, 
});

// Product Schema
const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },  // Unique SKU
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },  // Validation for non-negative price
  category: { type: String, required: true },
  manufacturer: { type: ManufacturerSchema, required: true },
  amountInStock: { type: Number, required: true, min: 0 },  // Validation for non-negative stock amount
});

const Product = mongoose.model<Product>('Product', ProductSchema);

export default Product;