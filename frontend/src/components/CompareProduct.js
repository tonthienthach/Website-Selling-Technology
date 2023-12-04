import React, { useState } from "react";
import "./CompareProduct.css";

const CompareProduct = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <span
        className="badge bg-info title-badge p-2"
        onClick={() => setShow(true)}
      >
        Compare (2)
      </span>
      {show && <div className="card section-compare">Thach</div>}
    </div>
  );
};

export default CompareProduct;
