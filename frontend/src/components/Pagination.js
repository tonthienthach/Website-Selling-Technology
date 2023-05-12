import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import ProductsPagination from "./ProductsPagination";

function Pagination({ itemsPerPage, items }) {
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <ProductsPagination currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        className="pagination justify-content-center"
        pageClassName="page-item"
        activeClassName=" active"
        pageLinkClassName="page-link"
        nextLabel="next >"
        previousClassName="page-item"
        nextClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
      {/* <div className="col-12">
        <nav>
          <ul className="pagination justify-content-center"></ul>
        </nav>
      </div> */}
    </>
  );
}

export default Pagination;
