import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CheckOrder.css";
import { Alert, Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import orderApi from "../axios/orderApi";

function CheckOrder() {
  const [listOrder, setListOrder] = useState([]);
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const handleSelectedStatus = async (st) => {
      const { data } = await orderApi.getListOrderByStatus(st);
      console.log(data);
      setListOrder(data.data);
    };
    handleSelectedStatus(status);
  }, [status]);

  return (
    <>
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
        <Row>
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
        </Row>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8" style={{ left: "17%" }}>
            {listOrder.length !== 0 ? (
              listOrder.map((item) => (
                <div className="card-page mb-4">
                  <div className="card-container">
                    <div className="mb-3 d-flex justify-content-between">
                      <div>
                        <span className="me-3">{item.createdAt.fort}</span>
                        <span className="me-3">{item._id}</span>
                        <span className="badge rounded-pill bg-info">
                          {item.Status}
                        </span>
                      </div>
                      <div className="d-flex">
                        <button className="btn btn-link p-0 me-3 d-none d-lg-block btn-icon-text">
                          <i className="bi bi-download"></i>{" "}
                          <span className="text">Invoice</span>
                        </button>
                        <div className="dropdown">
                          <button
                            className="btn btn-link p-0 text-muted"
                            type="button"
                            data-bs-toggle="dropdown"
                          >
                            <i className="bi bi-three-dots-vertical"></i>
                          </button>
                          <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                              <Link className="dropdown-item" href="#">
                                <i className="bi bi-pencil"></i> Edit
                              </Link>
                            </li>
                            <li>
                              <Link className="dropdown-item" href="#">
                                <i className="bi bi-printer"></i> Print
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
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
        </div>
      </div>
    </>
  );
}

export default CheckOrder;
