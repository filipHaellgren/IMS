// src/Components/SearchFilter.tsx
import React, { useState, useEffect } from "react";
import { Product } from "./videoCard"; // Import the Product type

interface SearchFilterProps {
  products: Product[];
  onFilter: (filteredProducts: Product[]) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ products, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default"); // State to handle sorting options

  // Effect to filter and sort products whenever the search term or sort option changes
  useEffect(() => {
    filterProducts(searchTerm, sortOption);
  }, [searchTerm, sortOption]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  // Filter and sort products based on search term and sort option
  const filterProducts = (term: string, sort: string) => {
    let filtered = products.filter((product) => product.name.toLowerCase().includes(term.toLowerCase()));

    // Sort the filtered products based on the selected sort option
    switch (sort) {
      case "price":
        filtered = filtered.sort((a, b) => (b.price || 0) - (a.price || 0)); // Most expensive first
        break;
      case "category":
        filtered = filtered.sort((a, b) => a.category.localeCompare(b.category)); // Sort by length descending
        break;
      case "amount_in_stock":
        filtered = filtered.sort((a, b) => b.amountInStock - a.amountInStock); // Sort by memory descending
        break;
      case "name":
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name)); // Sort by core clock descending
        break;
      default:
        // Default case (no sorting)
        break;
    }

    // Pass filtered and sorted products to the parent component
    onFilter(filtered);
  };

  return (
    <div style={filterContainerStyle}>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearch}
        style={inputStyle}
      />

      {/* Sort Dropdown */}
      <select value={sortOption} onChange={handleSortChange} style={selectStyle}>
        <option value="default">Sort By</option>
        <option value="price">Most Expensive</option>
        <option value="category">Category</option>
        <option value="amount_in_stock">Amount In Stock</option>
        <option value="name">Name</option>
      </select>
    </div>
  );
};

// Inline styles (replace with CSS module or external styles if needed)
const filterContainerStyle: React.CSSProperties = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
};

const inputStyle: React.CSSProperties = {
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  flex: 1,
};

const selectStyle: React.CSSProperties = {
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

export default SearchFilter;
