import React, { useState, useEffect } from "react";

export const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const [pageRange, setPageRange] = useState([]);
  const delta = 2; // Number of pages to show before and after the current page

  useEffect(() => {
    const range = [];
    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    // Always show the first page and the last page
    if (start > 2) {
      range.push(1, "...");
    } else if (start === 2) {
      range.push(1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    if (end < totalPages - 1) {
      range.push("...", totalPages);
    } else if (end === totalPages - 1) {
      range.push(totalPages);
    }

    setPageRange(range);
  }, []);

  // return <>PAginacion</>;
  return (
    <div style={{ padding: 10, margin: "auto", width: "50%" }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {pageRange.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={currentPage === page ? "active" : ""}
          >
            {page}
          </button>
        ) : (
          <span key={index}>{page}</span>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};
