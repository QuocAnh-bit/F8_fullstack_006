/* eslint-disable react/prop-types */
// import React from "react";
import "../pagination/pagination.scss";

export default function Pagination({ pagination, onPageChange }) {
  const { current_page: page, total_page } = pagination;
  const arrPage = [];
  for (let page = 1; page <= total_page; page++) {
    arrPage.push(page);
  }

  const handlePageChange = (newPage) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };
  return (
    <div className="paginate">
      <button
        className="prev"
        disabled={page <= 1}
        onClick={() => handlePageChange(page - 1)}
      >
        Prev
      </button>
      <div className="list-page">
        {arrPage.map((item, index) => (
          <span
            key={index}
            onClick={() => handlePageChange(item)}
            className={item === page ? "active-page" : ""}
          >
            {item}
          </span>
        ))}
      </div>
      <button
        className="prev"
        disabled={page >= total_page}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
