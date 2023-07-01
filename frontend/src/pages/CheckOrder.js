import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CheckOrder.css";
import {
  Alert,
  Badge,
  Button,
  Col,
  Container,
  Modal,
  Nav,
  Row,
} from "react-bootstrap";
import orderApi from "../axios/orderApi";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import ModalReview from "../components/ModalReview";
import moment from "moment";
import vnpayApi from "../axios/vnpayApi";
import axios from "../axios/axios";

function CheckOrder() {
  const [listOrder, setListOrder] = useState([]);
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState();
  const [show, setShow] = useState(false);
  const [orderID, setOrderID] = useState("");
  // const ref = useRef(null);

  // const element = ref.current;
  // console.log(element);
  // console.log(element?.id);

  useEffect(() => {
    const handleSelectedStatus = async (st) => {
      const { data } = await orderApi.getListOrderByStatus(st);
      setListOrder(data.data);
    };
    handleSelectedStatus(status);
  }, [status]);

  const handleOrderAll = async () => {
    setLoading(true);
    setStatus("All");
    const { data } = await orderApi.getListAllOrder();
    setLoading(false);
    console.log(data);
    setListOrder(data.data);
  };
  const handleOrderByStatus = async (body) => {
    setLoading(true);
    setStatus(body.status);
    const { data } = await orderApi.getListOrderByStatus(body);
    setLoading(false);
    setListOrder(data.data);
  };

  const handlePayment = async (body) => {
    const urlVNPay = await vnpayApi.createPaymentByVNPay({
      OrderId: body.orderId,
      amount: body.amount,
      bankCode: "",
    });
    // navigate(urlVNPay.data.vnpUrl);
    window.location.replace(urlVNPay.data.vnpUrl);
    console.log(urlVNPay);
  };

  const handleCancelOrder = async (body) => {
    // let transactionDate = new Date("14/05/2023 22:50:51");
    // let tra
    if (window.confirm("Must you want to cancel order?")) {
      setLoading(true);
      const { data } = await orderApi.cancelOrder(body._id);
      if (data.success) {
        toast.success(data.message);
        if (body.paid) {
          const { data } = await vnpayApi.createRefund();
          console.log(data);
          // Gửi yêu cầu hoàn tiền đến VNPay
          const response = await axios.post(
            "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction",
            data.data,
            {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );
          console.log(response);

          if (response.data && response.data.errorCode === "00") {
            console.log("Hoàn tiền thành công");
          } else {
            console.log("Hoàn tiền thất bại");
          }
        }
        if (status !== "All") {
          const productByStatus = data.data.filter(
            (item) => item.Status === status
          );
          setListOrder(productByStatus);
        } else {
          setListOrder(data.data);
        }
      } else {
        toast.error(data.message);
      }
      setLoading(false);
    }
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (e) => {
    // console.log(typeof e.target.value);
    // const element = document.getElementById(e.target.value);
    // console.log(element);
    // // console.log(element.id);
    setOrderID(e.target.value);
    setShow(true);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <div className="recent-products-container container ">
        {/* <Row>
          <LinkContainer
            to={"/checkorder"}
            onClick={() => setStatus("pending")}
          >
            <Col md={2}>
              <div
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))`,
                  gap: "10px",
                  height: "40px",
                  width: "180px",
                  fontSize: "20px",
                  marginBottom: "15px",
                }}
                className="category-title"
              >
                Pending
              </div>
            </Col>
          </LinkContainer>
          <LinkContainer
            to={"/checkorder"}
            onClick={() => setStatus("confirmed")}
          >
            <Col md={2}>
              <div
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))`,
                  gap: "10px",
                  height: "40px",
                  width: "180px",
                  fontSize: "20px",
                  marginBottom: "15px",
                }}
                className="category-title"
              >
                Comfirmed
              </div>
            </Col>
          </LinkContainer>
          <LinkContainer
            to={"/checkorder"}
            onClick={() => setStatus("shipping")}
          >
            <Col md={2}>
              <div
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))`,
                  gap: "10px",
                  height: "40px",
                  width: "180px",
                  fontSize: "20px",
                  marginBottom: "15px",
                }}
                className="category-title"
              >
                Shipping
              </div>
            </Col>
          </LinkContainer>
          <LinkContainer
            to={"/checkorder"}
            onClick={() => setStatus("completed")}
          >
            <Col md={2}>
              <div
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))`,
                  gap: "10px",
                  height: "40px",
                  width: "180px",
                  fontSize: "20px",
                  marginBottom: "15px",
                }}
                className="category-title"
              >
                Completed
              </div>
            </Col>
          </LinkContainer>
          <LinkContainer
            to={"/checkorder"}
            onClick={() => setStatus("cancelled")}
          >
            <Col md={2}>
              <div
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))`,
                  gap: "10px",
                  height: "40px",
                  width: "180px",
                  fontSize: "20px",
                  marginBottom: "15px",
                }}
                className="category-title"
              >
                Cancelled
              </div>
            </Col>
          </LinkContainer>
        </Row> */}
      </div>
      <Row>
        <Col md={12}>
          <Nav
            variant="pills"
            defaultActiveKey={status}
            className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-around mb-3 mr-3 ml-3 rounded"
            style={{ textAlign: "center" }}
          >
            <Nav.Item className="text-warning">
              <Nav.Link
                className="text-dark"
                eventKey="All"
                onClick={() => handleOrderAll()}
              >
                All
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="text-warning">
              <Nav.Link
                className="text-dark"
                eventKey="pending"
                onClick={() => handleOrderByStatus({ status: "pending" })}
              >
                Pending
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="text-warning">
              <Nav.Link
                className="text-dark"
                eventKey="confirmed"
                onClick={() => handleOrderByStatus({ status: "confirmed" })}
              >
                Confirmed
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="text-warning">
              <Nav.Link
                className="text-dark"
                eventKey="shipping"
                onClick={() => handleOrderByStatus({ status: "shipping" })}
              >
                Shipping
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="text-warning">
              <Nav.Link
                className="text-dark"
                eventKey="completed"
                onClick={() => handleOrderByStatus({ status: "completed" })}
              >
                Completed
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className="text-dark"
                eventKey="cancelled"
                onClick={() => handleOrderByStatus({ status: "cancelled" })}
              >
                Cancelled
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col md={12} className="d-flex justify-content-around">
          <div className="col-lg-12">
            {listOrder.length !== 0 ? (
              listOrder.map((item) => (
                <div className="card-page mb-4" key={item._id}>
                  <div className="card-container">
                    <div className="mb-3 d-flex justify-content-between">
                      <div>
                        <span className="me-3">{item._id}</span>
                        <span className="me-3">
                          {moment(item.createdAt).format("DD/MM/YYYY")}
                        </span>
                        <span className="me-3">{item.paymentMethod}</span>

                        <Badge
                          bg={
                            item.Status === "pending"
                              ? "dark"
                              : item.Status === "confirmed"
                              ? "info"
                              : item.Status === "shipping"
                              ? "warning"
                              : item.Status === "completed"
                              ? "success"
                              : "danger"
                          }
                        >
                          {item.Status}
                        </Badge>
                      </div>
                      <div className="d-flex">
                        {item.paymentMethod === "VNPAY" && !item.paid && (
                          <Button
                            onClick={() =>
                              handlePayment({
                                orderId: item._id,
                                amount: item.total,
                              })
                            }
                            variant="success"
                            className="rounded px-4 me-2"
                          >
                            Pay
                          </Button>
                        )}
                        {(item.Status === "pending" ||
                          item.Status === "confirmed") && (
                          <div className="d-flex">
                            <Button
                              onClick={() => handleCancelOrder(item)}
                              variant="danger"
                              className="rounded"
                            >
                              Cancel
                            </Button>
                          </div>
                        )}
                        {item.Status === "completed" && (
                          <div className="d-flex">
                            <Button
                              variant="info"
                              className="rounded"
                              onClick={handleShow}
                              value={item._id}
                              // data-toggle="modal"
                              // data-target={item._id}
                            >
                              Review
                            </Button>

                            {orderID === item._id && (
                              <Modal
                                key={item._id}
                                show={show}
                                onHide={handleClose}
                              >
                                <Modal.Header closeButton>
                                  <Modal.Title>Review Product</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  <table className="table table-borderless">
                                    <tbody>
                                      {item.detail.map((detail) => (
                                        <tr
                                          className="d-flex justify-content-between"
                                          key={detail.product._id}
                                        >
                                          <td>
                                            <div className="d-flex mb-2">
                                              <div className="flex-shrink-0">
                                                <img
                                                  src={
                                                    detail.product.image[0].url
                                                  }
                                                  alt=""
                                                  width="35"
                                                  className="img-fluid"
                                                />
                                              </div>
                                              <div className="flex-lg-grow-1 ms-3">
                                                <h6 className="small mb-0">
                                                  <Link
                                                    href="#"
                                                    className="text-reset"
                                                  >
                                                    {detail.product.name}
                                                  </Link>
                                                </h6>
                                                <span className="small">
                                                  Quantity: {detail.quantity}
                                                </span>
                                              </div>
                                            </div>
                                          </td>
                                          <td>
                                            <div className="d-flex justify-content-end w-100">
                                              <ModalReview {...detail} />
                                            </div>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button
                                    variant="danger"
                                    className="rounded"
                                    onClick={handleClose}
                                  >
                                    Close
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <table className="table table-borderless">
                      <tbody>
                        {item.detail.map((detail) => (
                          <tr key={detail._id}>
                            <td>
                              <div className="d-flex mb-2">
                                <div className="flex-shrink-0">
                                  <img
                                    src={detail.product.image[0].url}
                                    alt=""
                                    width="35"
                                    className="img-fluid"
                                  />
                                </div>
                                <div className="flex-lg-grow-1 ms-3">
                                  <h6 className="small mb-0">
                                    <Link href="#" className="text-reset">
                                      {detail.product.name}
                                    </Link>
                                  </h6>
                                  <span className="small">
                                    Quantity: {detail.quantity}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td></td>
                            <td className="text-end">
                              {detail.product.price.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan="2">Shipping</td>
                          <td className="text-end">
                            {item.shippingAmount.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </td>
                        </tr>
                        <tr className="fw-bold">
                          <td colSpan="2">TOTAL</td>
                          <td className="text-end">
                            {item.total.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              ))
            ) : (
              <Alert variant="info" style={{ textAlign: "center" }}>
                No order to show
              </Alert>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CheckOrder;
