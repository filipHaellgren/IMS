// src/Components/Pagination.tsx
import { useState } from "react";
import styles from "../CSS/Pagination.module.css"; // Import the CSS module

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}: {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}) => {
  const [currentPageGroup, setCurrentPageGroup] = useState(0); // Track the current page group

  const totalPages = Math.ceil(totalPosts / postsPerPage); // Calculate total pages based on the filtered products
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1); // Create an array of page numbers

  const pagesPerGroup = 15; // Define how many pages you want to show per group
  const startIndex = currentPageGroup * pagesPerGroup; // Calculate the start index of the current page group
  const endIndex = startIndex + pagesPerGroup; // Calculate the end index of the current page group
  const visiblePages = pages.slice(startIndex, endIndex); // Get the pages to display in the current group

  const handlePreviousGroup = () => {
    if (currentPageGroup > 0) {
      setCurrentPageGroup(currentPageGroup - 1);
    }
  };

  const handleNextGroup = () => {
    if (endIndex < totalPages) {
      setCurrentPageGroup(currentPageGroup + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      {/* Previous Group Button */}
      <button
        onClick={handlePreviousGroup}
        disabled={currentPageGroup === 0}
        className={styles.button}
      >
        &laquo;
      </button>

      {/* Page Number Buttons */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`${styles.button} ${
            page === currentPage ? styles.active : ""
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Group Button */}
      <button
        onClick={handleNextGroup}
        disabled={endIndex >= totalPages}
        className={styles.button}
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
