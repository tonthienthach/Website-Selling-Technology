import axios from "../axios/axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useParams } from "react-router-dom";
import moment from "moment";
import Loading from "../components/Loading";
import "./ProductPage.css";
import { useAddToCartMutation } from "../services/appApi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Rating from "react-rating";
import rateApi from "../axios/rateApi";
import { updateRate } from "../features/rateSlice";
import CompareProduct from "../components/CompareProduct";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [ratingAVG, setRatingAVG] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [review, setReview] = useState("");
  // const [listRate, setListRate] = useState([]);
  const user = useSelector((state) => state.user);
  const listRate = useSelector((state) => state.rate);
  const [addToCart] = useAddToCartMutation();
  const dispatch = useDispatch();

  const handleDragStart = (e) => e.preventDefault();
  useEffect(() => {
    axios.get(`/api/product/${id}`).then(({ data }) => {
      setProduct(data.data);
    });
    const getAllRating = async () => {
      const { data } = await rateApi.getAllRating(id);
      dispatch(updateRate(data.data));
      let scoreTemp = 0;
      data.data.forEach((item) => {
        scoreTemp += item.score;
      });
      setRatingAVG((scoreTemp / data.data.length).toFixed());
      // setListRate(data.data);
    };
    getAllRating();
  }, [id, dispatch]);
  if (!product) {
    return <Loading />;
  }

  // const responsive = {
  //   0: { items: 1 },
  //   568: { items: 2 },
  //   1024: { items: 3 },
  // };

  const images = product.image.map((picture) => (
    <img
      className="product__carousel--image"
      src={picture.url}
      onDragStart={handleDragStart}
      alt=""
    />
  ));

  const handleAddToCart = async (id, quantityProduct, quantity) => {
    if (quantityProduct) {
      if (quantityProduct >= quantity) {
        let check = await addToCart({ id: id, quantity: quantity });
        // console.log(check);
        check
          ? toast.success("Added Successful Product")
          : toast.error("Added Failed Product");
      } else {
        toast.error("Product not enough quantity");
      }
    } else {
      toast.warning("Product sold out");
    }
  };

  const handleAddRate = async (e, body) => {
    e.preventDefault();
    if (user) {
      const { data } = await rateApi.addRateByUser(body);
      if (data.success) {
        toast.success("Add Rate Successful");
        dispatch(updateRate(data.data));
      } else {
        toast.error(data.message);
      }
    } else {
      toast.error("Please log in to review");
    }
  };

  const handleRating = (value) => {
    setRating(value);
  };

  const handleDecrease = async () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      toast.error("Can't decrease quantity");
    }
    // const quantity = product.quantity;

    // if (quantity === 1) {
    //   if (window.confirm("Must you want to remove product?")) {
    //     await removeItemCart({ id: product.id });
    //     toast.success("Remove product successful");
    //   }
    // } else {
    //   decreaseCart({ id: product.id });
    // }
  };

  return (
    <div style={{ textAlign: "left" }} className="container-fluid pb-5">
      <div className="row px-xl-5">
        <div className="col-lg-4 mb-30">
          <div
            id="product-carousel"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner bg-light">
              <AliceCarousel
                mouseTracking
                autoPlay
                items={images}
                controlsStrategy="alternate"
              />
            </div>
          </div>
        </div>

        <div className="col-lg-8 h-auto mb-30">
          <div className="h-100 bg-light p-30">
            <div className="d-flex">
              <h3 style={{ textAlign: "left" }}>
                {product.name}{" "}
                <small className="pt-1">
                  {product.quantity ? "" : "(Sold out)"}
                </small>
              </h3>
              <button className="btn">Compare</button>
            </div>
            <div className="d-flex mb-3">
              <div className="text-primary mr-2">
                <Rating
                  initialRating={ratingAVG}
                  emptySymbol={<i className="far fa-star"></i>}
                  fullSymbol={<i className="fas fa-star"></i>}
                  readonly
                />
              </div>
              <small className="pt-1">({listRate.length})</small>
            </div>
            <h3
              style={{ textAlign: "left" }}
              className="font-weight-semi-bold mb-4"
            >
              {window
                .currency(product.price, {
                  symbol: "đ",
                  separator: ".",
                  decimal: ",",
                })
                .format()}
            </h3>
            <p className="mb-4">{product.description}</p>

            <div className="d-flex align-items-center mb-4 pt-2">
              <div
                className="input-group quantity mr-3"
                style={{ width: "100px" }}
              >
                <div className="input-group-btn">
                  <button
                    className="btn btn-sm btn-primary btn-minus"
                    onClick={() => handleDecrease()}
                  >
                    <i className="fa fa-minus"></i>
                  </button>
                </div>
                <input
                  readOnly
                  id="quantity"
                  type="text"
                  className="form-control form-control-sm bg-secondary border-0 text-center"
                  value={quantity}
                />
                <div className="input-group-btn">
                  <button
                    className="btn btn-sm btn-primary btn-plus"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
              </div>
              <button
                className="btn btn-primary px-3"
                onClick={() =>
                  handleAddToCart(product._id, product.quantity, quantity)
                }
              >
                <i className="fa fa-shopping-cart mr-1"></i> Add To Cart
              </button>

              {/* {isSuccess && (
                <ToastMessage
                  bg="info"
                  title="Added to cart"
                  body={`${product.name} is in your cart`}
                />
              )} */}
            </div>
          </div>
        </div>
      </div>
      <div className="row px-xl-5">
        <div className="col">
          <div className="bg-light p-30">
            <div className="nav nav-tabs mb-4">
              <a
                className="nav-item nav-link text-dark active"
                data-toggle="tab"
                href="#tab-pane-2"
              >
                Information
              </a>
              <a
                className="nav-item nav-link text-dark"
                data-toggle="tab"
                href="#tab-pane-3"
              >
                Reviews ({listRate.length})
              </a>
            </div>
            <div className="tab-content">
              <div className="tab-pane fade show active" id="tab-pane-2">
                <h4 className="mb-3">Additional Information</h4>
                <div className="row">
                  <div className="col-md-3">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item px-0">CPU:</li>
                      <li className="list-group-item px-0">RAM:</li>
                      <li className="list-group-item px-0">Storage:</li>
                      <li className="list-group-item px-0">VGA:</li>
                      <li className="list-group-item px-0">Display:</li>
                      <li className="list-group-item px-0">Battery:</li>
                      <li className="list-group-item px-0">OS:</li>
                      <li className="list-group-item px-0">Weight:</li>
                    </ul>
                  </div>
                  <div className="col-md-3">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item px-0">{product.CPU}</li>
                      <li className="list-group-item px-0">{product.ram}</li>
                      <li className="list-group-item px-0">{product.rom}</li>
                      <li className="list-group-item px-0">{product.VGA}</li>
                      <li className="list-group-item px-0">
                        {product.display}
                      </li>
                      <li className="list-group-item px-0">
                        {product.battery}
                      </li>
                      <li className="list-group-item px-0">{product.OS}</li>
                      <li className="list-group-item px-0">{product.weight}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="tab-pane-3">
                <div className="row">
                  <div className="col-md-6">
                    <h4 className="mb-4">Product Rating</h4>
                    {listRate.map((item) => (
                      <div className="media mb-4" key={item._id}>
                        <img
                          src={item.user.avatar}
                          alt=""
                          className="img-fluid mr-3 mt-1"
                          style={{ width: "45px" }}
                        />
                        <div className="media-body">
                          <h6>
                            {item.user.name}
                            <small>
                              {" "}
                              -{" "}
                              <i>
                                {moment(item.createdAt).format("DD/MM/YYYY")}
                              </i>
                            </small>
                          </h6>
                          <div className="text-primary mb-2">
                            <Rating
                              initialRating={item.score}
                              emptySymbol={<i className="far fa-star"></i>}
                              fullSymbol={<i className="fas fa-star"></i>}
                              readonly
                            />
                          </div>
                          <p>{item.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="col-md-6">
                    <h4 className="mb-4">Leave a review</h4>
                    <small>Required fields are marked *</small>
                    <div className="d-flex my-3">
                      <p className="mb-0 mr-2">Your Rating * :</p>
                      <div className="text-primary">
                        <Rating
                          initialRating={rating}
                          emptySymbol={<i className="far fa-star"></i>}
                          fullSymbol={<i className="fas fa-star"></i>}
                          onClick={handleRating}
                        />
                      </div>
                    </div>
                    <form
                      onSubmit={(e) =>
                        handleAddRate(e, {
                          product: product._id,
                          content: review,
                          score: rating,
                        })
                      }
                    >
                      <div className="form-group">
                        <label htmlFor="message">Your Review *</label>
                        <textarea
                          id="message"
                          cols="30"
                          rows="5"
                          className="form-control"
                          onChange={(e) => setReview(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="form-group mb-0">
                        <input
                          type="submit"
                          value="Leave Your Review"
                          className="btn btn-primary px-3"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CompareProduct />
    </div>
    // </Container>
  );
}

export default ProductPage;
