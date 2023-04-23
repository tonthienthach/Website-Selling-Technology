import React from "react";
import { useAddToCartMutation } from "../services/appApi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// import ToastMessage from "./ToastMessage";

function ProductPreview(props) {
  const [addToCart] = useAddToCartMutation();
  const handleAddToCart = async (id) => {
      let check = await addToCart({id: id});
      // console.log(check);
     check?toast.success("Added Successful Product"):toast.error("Added Failed Product");
  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
      <div className="product-item bg-light mb-4">
        <div className="product-img position-relative overflow-hidden">
          <img
            style={{ height: "200px", objectFit: "scale-down" }}
            className="img-fluid w-100"
            src={props.image[0].url}
            alt=""
          />
          <div className="product-action">
            <Link
              className="btn btn-outline-dark btn-square"
              onClick={() => handleAddToCart(props._id)}
            >
              <i className="fa fa-shopping-cart"></i>
            </Link>

            {/* {isSuccess && toast.success("asda")} */}
            <Link
              className="btn btn-outline-dark btn-square"
              to={`/product/${props._id}`}
            >
              <i className="fa fa-search"></i>
            </Link>
          </div>
        </div>
        <div className="text-center py-4">
          <Link className="h6 text-decoration-none text-truncate">
            {props.name}
          </Link>
          <div className="d-flex align-items-center justify-content-center mt-2">
            <h5>{props.price} VNĐ</h5>
          </div>
          <div className="d-flex align-items-center justify-content-center mb-1">
            <small className="fa fa-star text-primary mr-1"></small>
            <small className="fa fa-star text-primary mr-1"></small>
            <small className="fa fa-star text-primary mr-1"></small>
            <small className="fa fa-star text-primary mr-1"></small>
            <small className="fa fa-star text-primary mr-1"></small>
            <small>(99)</small>
          </div>
        </div>
      </div>
    </div>
    // </LinkContainer>
  );
}

export default ProductPreview;
