import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes";
import manufacturerRoutes from "./routes/manufacturerRoutes";
import * as fs from "fs";
import Product from "./models/Product";
import cors from "cors";

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error("MONGO_URI is not defined in .env file");
  process.exit(1); // Exit if MongoDB connection string is missing
}

// Connect to MongoDB
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
    // fs.readFile("computer_parts.json", "utf8", (err, data) => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    //   // print the data to the console
    //   const parse = JSON.parse(data);
    //   parse.forEach(async (product: any) => {
    //     const newProduct = new Product(product);
    //     await newProduct.save();
    //   });
    // });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process if connection fails
  });

// Routes
app.use("/api/products", productRoutes);
app.use("/api", manufacturerRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
