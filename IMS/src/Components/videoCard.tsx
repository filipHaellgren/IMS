// src/Card.tsx
import React from "react";
import styles from "../CSS/videoCard.module.css"; // Import the CSS module

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
export interface Product {
  name: string;
  sku: string;
  description: string;
  price: number;
  category: string;
  manufacturer: Manufacturer;
  amountInStock: number;
}

// Props type definition for the Card component
interface CardProps {
  product: Product;
}

// Card component definition
const Card: React.FC<CardProps> = ({ product }) => {
  return (
    <div className={styles.cardStyle}>
      <h2>{product.name}</h2>
      <p>
        <strong>Price:</strong> {product.price ? `$${product.price}` : "N/A"}
      </p>
      <p>
        <strong>Description:</strong> {product.description}{" "}
      </p>
      <p>
        <strong>Category:</strong> {product.category} GB
      </p>
      <p>
        <strong>Amount in stock:</strong> {product.amountInStock} MHz
      </p>
      <p>
        <strong>Manufacturer:</strong> {product.manufacturer.name} MHz
      </p>
      {/* <p><strong>Color:</strong> {product.color}</p>
      <p><strong>Length:</strong> {product.length} mm</p> */}
    </div>
  );
};

export default Card;
