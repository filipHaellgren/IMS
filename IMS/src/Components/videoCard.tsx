// src/Card.tsx
import React from 'react';
import styles from '../CSS/videoCard.module.css'; // Import the CSS module

// Define the Product interface directly in the Card component file
export interface Product {
  name: string;
  price: number | null;
  chipset: string;
  memory: number;
  core_clock: number;
  boost_clock: number;
  color: string;
  length: number;
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
      <p><strong>Price:</strong> {product.price ? `$${product.price}` : 'N/A'}</p>
      <p><strong>Chipset:</strong> {product.chipset} </p>
      <p><strong>Memory:</strong> {product.memory} GB</p>
      <p><strong>Core Clock:</strong> {product.core_clock} MHz</p>
      <p><strong>Boost Clock:</strong> {product.boost_clock} MHz</p>
      <p><strong>Color:</strong> {product.color}</p>
      <p><strong>Length:</strong> {product.length} mm</p>
    </div>
  );
};


export default Card;
