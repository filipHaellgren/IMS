// src/ProductList.tsx
import React from 'react';
import Card, { Product } from './videoCard'; // Import Card component and Product type
import styles from '../CSS/ProductList.module.css'; // Import the CSS module


interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className={styles.productList}>
      {products.map((product, index) => (
        <Card key={index} product={product} />
      ))}
    </div>
  );
};


export default ProductList;
