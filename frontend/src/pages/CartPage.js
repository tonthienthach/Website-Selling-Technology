import React from "react";
import "./CartPage.css";
import { Link } from "react-router-dom";
import {
  useDecreaseCartProductMutation,
  useIncreaseCartProductMutation,
  useRemoveFromCartMutation,
} from "../services/appApi";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import productApi from "../axios/productApi";

function CartPage() {
  const cart = useSelector((state) => state.cart);
  let totalAmount = cart.reduce((total, item) => {
    total += item.price * item.quantity;
    return total;
  }, 0);
  const [increaseCart] = useIncreaseCartProductMutation();
  const [decreaseCart] = useDecreaseCartProductMutation();
  const [removeItemCart] = useRemoveFromCartMutation();

  const handleRemove = async (id) => {
    if (window.confirm("Must you want to remove product?")) {
      await removeItemCart({ id: id });
      toast.success("Remove Product Successfully");
    }
  };

  const handleDecrease = async (product) => {
    const quantity = product.quantity;
    if (quantity === 1) {
      if (window.confirm("Must you want to remove product?")) {
        await removeItemCart({ id: product.id });
        toast.success("Remove product successful");
      }
    } else {
      decreaseCart({ id: product.id });
    }
  };

  const handleIncrease = async (product) => {
    const quantity = product.quantity;
    const productDetail = await productApi.getProductByID(product.id);
    // console.log(productDetail);
    // let quantityData = productDetail.data.data.quantity - quantity;
    if (productDetail.data.data.quantity > quantity) {
      await increaseCart({ id: product.id });
    } else {
      toast.error("The number of products has exceeded the limit");
    }
  };

  return (
    <div>
      {/* <Container style={{ minHeight: "95vh" }} className="cart-container">
        <Row>
          <Col md={7}>
            <h1 className="pt-2 h3">Shopping Cart</h1>
            {cart.length == 0 ? (
              <Alert variant="info">
                Shopping cart is empty. Add products to your cart
              </Alert>
            ) : (
              <div>Payment</div>
            )}
          </Col>
          <Col md={5}>
            {cart.length > 0 && (
              <>
                <Table responsive="sm" className="cart-table">
                  <thead>
                    <tr>
                      <th>&nbsp;</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    // loop to the cart products 
                    {cart.map((item) => (
                      <tr>
                        <td>&nbsp;</td>
                        <td>
                          {!isLoading && (
                            <i
                              className="fa fa-times"
                              style={{ marginRight: 10, cursor: "pointer" }}
                              onClick={() =>
                                removeFromCart({
                                  productId: item._id,
                                  price: item.price,
                                })
                              }
                            ></i>
                          )}
                          <img
                            src={item.image}
                            style={{
                              width: 100,
                              height: 100,
                              objectFit: "cover",
                            }}
                          />
                        </td>
                        <td>${item.price}</td>
                        <td>
                          <span className="quantity-indicator">
                            <i
                              className="fa fa-minus-circle"
                              onClick={() =>
                                handleDecrease({
                                  productId: item._id,
                                  price: item.price,
                                })
                              }
                            ></i>
                            <span>{item.quantity}</span>
                            <i
                              className="fa fa-plus-circle"
                              onClick={() => handleIncreaseItem({productId: item._id})}
                            ></i>
                          </span>
                        </td>
                        <td>${item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div>
                  <h3 className="h4 pt-4">Total: ${totalAmount}</h3>
                </div>
              </>
            )}
          </Col>
        </Row>
      </Container> */}
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-lg-8 table-responsive mb-5">
            <table className="table table-light table-borderless table-hover text-center mb-0">
              <thead className="thead-dark">
                <tr>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody className="align-middle">
                {/* loop to the cart products */}
                {cart.length !== 0 &&
                  cart.map((item) => (
                    <tr key={item.name}>
                      <td className="d-flex align-middle justify-content-start">
                        <img
                          className="me-3"
                          src={item.image}
                          alt=""
                          style={{ width: "50px" }}
                        />
                        {""}
                        {item.name}
                      </td>
                      <td className="align-middle">
                        {item.price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                      <td className="align-middle">
                        <div
                          className="input-group quantity mx-auto"
                          style={{ width: "100px" }}
                        >
                          <div className="input-group-btn">
                            <button
                              className="btn btn-sm btn-primary btn-minus"
                              onClick={() => handleDecrease(item)}
                            >
                              <i className="fa fa-minus"></i>
                            </button>
                          </div>
                          <input
                            readOnly
                            id="quantity"
                            type="text"
                            className="form-control form-control-sm bg-secondary border-0 text-center"
                            value={item.quantity}
                          />
                          <div className="input-group-btn">
                            <button
                              className="btn btn-sm btn-primary btn-plus"
                              onClick={() => handleIncrease(item)}
                            >
                              <i className="fa fa-plus"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">
                        {(item.price * item.quantity).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                      <td className="align-middle">
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={async () => handleRemove(item.id)}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {cart.length === 0 && (
              <Alert variant="info">
                Shopping cart is empty. Add products to your cart
              </Alert>
            )}
          </div>
          <div className="col-lg-4">
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Cart Summary</span>
            </h5>
            <div className="bg-light p-30 mb-5">
              <div className="pt-2">
                <div className="d-flex justify-content-between mt-2">
                  <h5>Total</h5>
                  <h5>
                    {totalAmount.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </h5>
                </div>
                <Link
                  className="btn btn-block btn-primary font-weight-bold my-3 py-3"
                  to="/checkout"
                >
                  Proceed To Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
