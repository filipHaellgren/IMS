// src/App.tsx
import React from 'react';
import Card,{ Product } from './videoCard';
import data from '../src/assets/Json/videoCards.json'; // Importing the JSON file


const App: React.FC = () => {
  // Type assertion to match the imported data with the Product type
  const products: Product[] = data;

  return (
    <div style={appStyle}>
      {products.map((product, index) => (
        <Card key={index} product={product} />
      ))}
    </div>
  );
};

// Inline CSS for the app container
const appStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  gap: '16px',
  padding: '16px',
};

export default App;