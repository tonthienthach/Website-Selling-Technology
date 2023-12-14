import React, { useEffect, useState } from "react";
import { useAddToCartMutation } from "../services/appApi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import rateApi from "../axios/rateApi";
import Rating from "react-rating";

function ProductPreview(props) {
  const [addToCart] = useAddToCartMutation();
  const [rate, setRate] = useState([]);
  const [score, setScore] = useState(0);
  const handleAddToCart = async (id) => {
    let check = await addToCart({ id: id });
    // console.log(check);
    check
      ? toast.success("Added Successful Product")
      : toast.error("Added Failed Product");
  };

  useEffect(() => {
    const getAllRating = async () => {
      const { data } = await rateApi.getAllRating(props._id);
      setRate(data.data);
      let scoreTemp = 0;
      data.data.forEach((item) => {
        scoreTemp += item.score;
      });
      setScore((scoreTemp / data.data.length).toFixed());
      // setListRate(data.data);
    };
    getAllRating();
  }, [props]);

  return (
    <div className="col-lg-3 col-md-5 col-sm-6 pb-1">
      <div className="product-item bg-light mb-4 w-100">
        <div className="product-img position-relative overflow-hidden">
          <img
            style={{ height: "200px", objectFit: "scale-down" }}
            className="img-fluid w-100 mt-2"
            src={props.image[0].url}
            alt=""
          />
          {props.quantity > 0 ? (
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
          ) : (
            <div className="product-action">
              <Link className="btn">
                <h4>Sold out</h4>
              </Link>{" "}
            </div>
          )}
        </div>
        <div className="d-flex justify-content-center">
          <div style={{ minHeight: "200px" }} className="text-center py-4 w-75">
            <div className="h-50">
              <Link
                to={`/product/${props._id}`}
                className="h6 text-decoration-none"
              >
                {props.name}
              </Link>
            </div>
            {props.salePrice ? (
              <>
                <div className="d-flex align-items-center justify-content-center mt-2">
                  <h5 className=" text-danger">
                    {props.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </h5>
                </div>
                <div className="d-flex align-items-center justify-content-center text-decoration-line-through">
                  <h5>
                    {props.salePrice.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </h5>
                </div>
              </>
            ) : (
              <>
                <div className="d-flex align-items-center justify-content-center mt-2">
                  <h5>
                    {props.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </h5>
                </div>
              </>
            )}

            <div className="d-flex align-items-center justify-content-center mb-1">
              <Rating
                className="text-primary"
                initialRating={score}
                emptySymbol={<i className="far fa-star"></i>}
                fullSymbol={<i className="fas fa-star"></i>}
                readonly
              />
              <small>({props.sellQuantity})</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </LinkContainer>
  );
}

export default ProductPreview;
