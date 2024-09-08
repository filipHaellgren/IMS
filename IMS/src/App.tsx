// src/App.tsx
import React, { useState } from 'react';
import ProductList from './Components/ProductList'; // Import the ProductList component
import { Product } from './Components/videoCard'; // Import Product type for type assertion
import data from '../src/assets/Json/videoCards.json'; // Importing the JSON file
import Pagination from './Components/Pagination';
import SearchFilter from './Components/SearchFilter'; // Import the SearchFilter component

const App = () => {
  const products: Product[] = data;
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products); // State for filtered products
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8); // Number of posts per page

  // Calculate indices for the current page
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  // Get the current posts based on pagination
  const currentPosts = filteredProducts.slice(firstPostIndex, lastPostIndex);

  // Handle filter update from SearchFilter component
  const handleFilter = (filtered: Product[]) => {
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  return (
    <div style={appStyle}>
      {/* Add the SearchFilter component */}
      <SearchFilter products={products} onFilter={handleFilter} />

      {/* Render the filtered and paginated products */}
      <ProductList products={currentPosts} />

      {/* Pagination component with updated totalPosts */}
      <Pagination
        totalPosts={filteredProducts.length} // Pass the length of filteredProducts here
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
