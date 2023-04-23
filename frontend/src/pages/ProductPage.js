import axios from "../axios/axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import {
  Badge,
  ButtonGroup,
  Col,
  Container,
  Row,
  Form,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import "./ProductPage.css";
import ToastMessage from "../components/ToastMessage";
import { LinkContainer } from "react-router-bootstrap";
import { useAddToCartMutation } from "../services/appApi";
import { toast } from "react-toastify";


function ProductPage() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const [addToCart, {isSuccess}] = useAddToCartMutation();

  const handleDragStart = (e) => e.preventDefault();
  useEffect(() => {
    axios.get(`/api/product/${id}`).then(({ data }) => {
      setProduct(data.data);
    });
  }, [id]);
  if (!product) {
    return <Loading />;
  }

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

  const images = product.image.map((picture) => (
    <img
      className="product__carousel--image"
      src={picture.url}
      onDragStart={handleDragStart}
    />
  ));

  const handleAddToCart = async (id) => {
    let check = await addToCart({id: id});
    // console.log(check);
   check?toast.success("Added Successful Product"):toast.error("Added Failed Product");
};

  return (
    // <Container className="pt-4" style={{ position: "relative" }}>
    //   <Row>
    //     <Col lg={6}>
    //       <AliceCarousel
    //         mouseTracking
    //         items={images}
    //         controlsStrategy="alternate"
    //       />
    //     </Col>
    //     <Col lg={6} className="pt-4">
    //       <h1>{product.name}</h1>
    //       <p>
    //         <Badge bg="primary">{product.category}</Badge>
    //       </p>
    //       <p className="product__price">${product.price}</p>
    //       <p style={{ textAlign: "justify" }} className="py-3">
    //         <strong>Description:</strong>
    //         {product.description}
    //       </p>
    //       {user && !user.isAdmin && (
    //         <ButtonGroup style={{ width: "90%" }}>
    //           <Form.Select
    //             size="lg"
    //             style={{ width: "40%", borderRadius: "0" }}
    //           >
    //             <option value="1">1</option>
    //             <option value="2">2</option>
    //             <option value="3">3</option>
    //             <option value="4">4</option>
    //             <option value="5">5</option>
    //           </Form.Select>
    //           <Button
    //             size="lg"
    //             onClick={() =>
    //               addToCart({
    //                 productId: id,
    //               })
    //             }
    //           >
    //             {" "}
    //             Add to cart
    //           </Button>
    //         </ButtonGroup>
    //       )}
    //       {user && user.isAdmin && (
    //         <LinkContainer to={`/product/${product._id}/edit`}>
    //           <Button size="lg">Edit Product</Button>
    //         </LinkContainer>
    //       )}
    //       {/* {isSuccess && <ToastMessage bg='info' title="Added to cart" body={`${product.name} is in your cart`} />} */}
    //     </Col>
    //   </Row>
    /* <div className="my-4">
        <h2>Similar Products</h2>
        <div className="d-flex justify-content-center align-items-center flex-wrap">
          <AliceCarousel
            mouseTracking
            items={similarProduct}
            responsive={responsive}
            controlsStrategy="alternate"
          />
        </div>
      </div> */
    <div style={{ textAlign: "left" }} className="container-fluid pb-5">
      <div className="row px-xl-5">
        <div className="col-lg-5 mb-30">
          <div
            id="product-carousel"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner bg-light">
              <AliceCarousel
                mouseTracking
                items={images}
                controlsStrategy="alternate"
              />
            </div>
          </div>
        </div>

        <div className="col-lg-7 h-auto mb-30">
          <div className="h-100 bg-light p-30">
            <h3 style={{ textAlign: "left" }}>{product.name}</h3>
            <div className="d-flex mb-3">
              <div className="text-primary mr-2">
                <small className="fas fa-star"></small>
                <small className="fas fa-star"></small>
                <small className="fas fa-star"></small>
                <small className="fas fa-star-half-alt"></small>
                <small className="far fa-star"></small>
              </div>
              <small className="pt-1">(99 Reviews)</small>
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
            <p className="mb-4">
              Volup erat ipsum diam elitr rebum et dolor. Est nonumy elitr erat
              diam stet sit clita ea. Sanc ipsum et, labore clita lorem magna
              duo dolor no sea Nonumy
            </p>
            {/* <div className="d-flex mb-3">
              <strong className="text-dark mr-3">Sizes:</strong>
              <form>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="size-1"
                    name="size"
                  />
                  <label className="custom-control-label" for="size-1">
                    XS
                  </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="size-2"
                    name="size"
                  />
                  <label className="custom-control-label" for="size-2">
                    S
                  </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="size-3"
                    name="size"
                  />
                  <label className="custom-control-label" for="size-3">
                    M
                  </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="size-4"
                    name="size"
                  />
                  <label className="custom-control-label" for="size-4">
                    L
                  </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="size-5"
                    name="size"
                  />
                  <label className="custom-control-label" for="size-5">
                    XL
                  </label>
                </div>
              </form>
            </div> */}
            {/* <div className="d-flex mb-4">
              <strong className="text-dark mr-3">Colors:</strong>
              <form>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="color-1"
                    name="color"
                  />
                  <label className="custom-control-label" for="color-1">
                    Black
                  </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="color-2"
                    name="color"
                  />
                  <label className="custom-control-label" for="color-2">
                    White
                  </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="color-3"
                    name="color"
                  />
                  <label className="custom-control-label" for="color-3">
                    Red
                  </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="color-4"
                    name="color"
                  />
                  <label className="custom-control-label" for="color-4">
                    Blue
                  </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="color-5"
                    name="color"
                  />
                  <label className="custom-control-label" for="color-5">
                    Green
                  </label>
                </div>
              </form>
            </div> */}
            <div className="d-flex align-items-center mb-4 pt-2">
              <button
                className="btn btn-primary px-3"
                onClick={() => handleAddToCart(product._id)
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
            <div className="tab-content">
              <div className="tab-pane fade show active" id="tab-pane-2">
                <h4 className="mb-3">Additional Information</h4>
                <div className="row">
                  <div className="col-md-2">
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
                  <div className="col-md-2">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item px-0">{product.CPU}</li>
                      <li className="list-group-item px-0">{product.ram}</li>
                      <li className="list-group-item px-0">{product.rom}</li>
                      <li className="list-group-item px-0">{product.VGA}</li>
                      <li className="list-group-item px-0">{product.display}</li>
                      <li className="list-group-item px-0">{product.battery}</li>
                      <li className="list-group-item px-0">{product.OS}</li>
                      <li className="list-group-item px-0">{product.weight}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </Container>
  );
}

export default ProductPage;
