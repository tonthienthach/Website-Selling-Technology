import React from "react";
import ProductPreview from "./ProductPreview";

function ProductsPagination({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((product) => (
          <ProductPreview key={product._id} {...product} />
        ))}
    </>
  );
}

export default ProductsPagination;
