// src/App.tsx
import React, { useState }  from 'react';
import ProductList from './Components/ProductList'; // Import the new ProductList component
import { Product } from './Components/videoCard'; // Import Product type for type assertion
import data from '../src/assets/Json/videoCards.json'; // Importing the JSON file
import Pagination from './Components/Pagination';


const App = () => {
  const products: Product[] = data;
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] =useState(8);


  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = products.slice(firstPostIndex, lastPostIndex)

  return (
    <div style={appStyle}>
      <ProductList products={currentPosts} />
      <Pagination 
      totalPosts={products.length} 
      postsPerPage={postsPerPage}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      />
    </div>
  );
};

// Inline CSS for the app container
const appStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '16px',
};

export default App;
