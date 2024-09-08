// src/Components/SearchFilter.tsx
import React, { useState, useEffect } from 'react';
import { Product } from './videoCard'; // Import the Product type

interface SearchFilterProps {
  products: Product[];
  onFilter: (filteredProducts: Product[]) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ products, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories from the product list
  const categories = ['All', ...new Set(products.map((product) => product.category || ''))];

  // Effect to filter products whenever the search term or category changes
  useEffect(() => {
    filterProducts(searchTerm, selectedCategory);
  }, [searchTerm, selectedCategory]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  // Filter products based on search term and category
  const filterProducts = (term: string, category: string) => {
    const filtered = products.filter((product) => {
      const matchesSearchTerm = product.name.toLowerCase().includes(term.toLowerCase());
      const matchesCategory = category === 'All' || product.category === category;
      return matchesSearchTerm && matchesCategory;
    });

    // Pass filtered products to the parent component
    onFilter(filtered);
  };

  return (
    <div style={filterContainerStyle}>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearch}
        style={inputStyle}
      />

      <select value={selectedCategory} onChange={handleCategoryChange} style={selectStyle}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

// Inline styles (replace with CSS module or external styles if needed)
const filterContainerStyle: React.CSSProperties = {
  display: 'flex',
  gap: '10px',
  marginBottom: '20px',
};

const inputStyle: React.CSSProperties = {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  flex: 1,
};

const selectStyle: React.CSSProperties = {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

export default SearchFilter;
