import React from "react";
import { useSearchParams } from "react-router-dom";

function Pagination({ pageNumber, MaxPageNumber }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePage = (direction) => {
    if (direction === "prev" && pageNumber > 1) {
      searchParams.set("page", pageNumber - 1);
      setSearchParams(searchParams);
    } else if (direction === "next" && pageNumber < MaxPageNumber) {
      searchParams.set("page", pageNumber + 1);
      setSearchParams(searchParams);
    }
  };

  return (
    <div className="mb-10 flex flex-col items-center justify-center gap-5">
      <div className="flex gap-5">
        {pageNumber > 1 && (
          <button
            className="rounded-md bg-blue-400 px-8 py-4 text-white  hover:bg-blue-500 hover:text-gray-200 "
            onClick={() => handlePage("prev")}
          >
            Previous Page
          </button>
        )}

        {pageNumber < MaxPageNumber && (
          <button
            className="rounded-md bg-blue-400 px-8 py-4 text-white  hover:bg-blue-500 hover:text-gray-200 "
            onClick={() => handlePage("next")}
          >
            Next Page
          </button>
        )}
      </div>
      <p>
        {pageNumber}/{MaxPageNumber}
      </p>
    </div>
  );
}

export default Pagination;
