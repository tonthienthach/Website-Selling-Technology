import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CheckOrder.css";
import {
  Alert,
  Badge,
  Button,
  Col,
  Container,
  Nav,
  Row,
} from "react-bootstrap";
import orderApi from "../axios/orderApi";
import Loading from "../components/Loading";
import { toast } from "react-toastify";

function CheckOrder() {
  const [listOrder, setListOrder] = useState([]);
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState();

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
    // console.log(data);
    setListOrder(data.data);
  };
  const handleOrderByStatus = async (body) => {
    setLoading(true);
    setStatus(body.status);
    const { data } = await orderApi.getListOrderByStatus(body);
    setLoading(false);
    setListOrder(data.data);
  };

  const handleCancelOrder = async (id) => {
    if (window.confirm("Must you want to cancel order?")) {
      setLoading(true);
      const { data } = await orderApi.cancelOrder(id);
      setLoading(false);
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      setListOrder(data.data);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      {/* <div className="row">
        <ul className="nav nav-tabs">
          <li className="active">
            <Link href="#">Home</Link>
          </li>
          <li className="dropdown">
            <Link className="dropdown-toggle" data-toggle="dropdown" href="#">
              Menu 1<span className="caret"></span>
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link href="#">Submenu 1-1</Link>
              </li>
              <li>
                <Link href="#">Submenu 1-2</Link>
              </li>
              <li>
                <Link href="#">Submenu 1-3</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="#">Menu 2</Link>
          </li>
          <li>
            <Link href="#">Menu 3</Link>
          </li>
        </ul>
      </div> */}
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
                        <span className="me-3">{item.createdAt.fort}</span>
                        <span className="me-3">{item._id}</span>
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
                      {(item.Status === "pending" ||
                        item.Status === "confirmed") && (
                        <div className="d-flex">
                          <Button
                            onClick={() => handleCancelOrder(item._id)}
                            variant="danger"
                            className="rounded"
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                    <table className="table table-borderless">
                      <tbody>
                        {item.detail.map((detail) => (
                          <tr>
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
                              {detail.product.price} VND
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan="2">Shipping</td>
                          <td className="text-end">
                            {item.shippingAmount} VND
                          </td>
                        </tr>
                        <tr className="fw-bold">
                          <td colSpan="2">TOTAL</td>
                          <td className="text-end">{item.total} VND</td>
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
