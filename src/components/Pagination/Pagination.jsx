import React from "react";

const Pagination = ({ page, setPage }) => {
  return (
    <ul className="pagination">
      {[...Array(3)].map((_, index) => (
        <li
          key={index}
          onClick={() => setPage(index + 1)}
          className={page == index + 1 ? "active" : ""}
        >
          {index + 1}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
