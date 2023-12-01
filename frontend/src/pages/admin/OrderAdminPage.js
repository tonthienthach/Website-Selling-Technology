import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import adminApi from "../../axios/adminApi";
import Loading from "../../components/Loading";
import "./OrderAdminPage.css";
import {
  Alert,
  Badge,
  Button,
  Col,
  Container,
  Modal,
  Nav,
  Row,
  Table,
} from "react-bootstrap";
import { toast } from "react-toastify";
import moment from "moment";

function OrderAdminPage() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("All");
  // const [status, setStatus] = useState("");
  // const products = useSelector((state) => state.products);
  // const [ordersToShow, setOrdersToShow] = useState([]);
  const [loading, setLoading] = useState();
  const [show, setShow] = useState(false);
  const [orderID, setOrderID] = useState("");

  useEffect(() => {
    setLoading(true);
    const ordersApi = async () => {
      const { data } = await adminApi.getListAllOrder();
      setLoading(false);
      setOrders(data.data);
    };

    ordersApi();
    // console.log(orders);
  }, []);

  const handleUpdateStatus = async (body) => {
    if (body.status !== "completed" && body.status !== "cancelled") {
      const { data } = await adminApi.updateStatusOrderByID(body.id);
      if (data.success) {
        toast.success(data.message);
        if (status !== "All") {
          const productByStatus = data.data.filter(
            (item) => item.Status === status
          );
          setOrders(productByStatus);
        } else {
          setOrders(data.data);
        }
      }
    } else {
      toast.warning("Can't update status");
    }
  };

  const handleOrderAll = async () => {
    setLoading(true);
    setStatus("All");
    const { data } = await adminApi.getListAllOrder();
    setLoading(false);
    // console.log(data);
    setOrders(data.data);
  };
  const handleOrderByStatus = async (body) => {
    setLoading(true);
    setStatus(body.status);
    const { data } = await adminApi.getListOrderByStatus(body);
    setOrders(data.data);
    setLoading(false);
  };

  const handleCancelOrder = async (id) => {
    const { data } = await adminApi.cancelOrderByID(id);
    if (data.success) {
      toast.success(data.message);
      if (status !== "All") {
        const productByStatus = data.data.filter(
          (item) => item.Status === status
        );
        setOrders(productByStatus);
      } else {
        setOrders(data.data);
      }
    } else {
      toast.error(data.message);
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <Row>
        <Col md={12}>
          <Nav
            variant="pills"
            defaultActiveKey={status}
            className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-around mb-3"
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
        <Col md={12}>
          <div className="card-style-order">
            <Table responsive bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Created Date</th>
                  <th>Client Name</th>
                  <th>Status</th>
                  <th>Address ID</th>
                  <th>Payment Method</th>
                  <th>Paid Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* <Pagination data={orders} RenderComponent={TableRow} pageLimit={1} dataLimit={10} tablePagination={true} /> */}
                {orders.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{moment(item.createdAt).format("DD/MM/YYYY")}</td>
                    <td>{item.user?.name}</td>

                    <td>
                      <Badge
                        className="w-100"
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
                    </td>
                    <td>{item.address?.city}</td>
                    <td>{item.paymentMethod}</td>
                    <td>{item.paid ? <>Paid</> : <>Unpaid</>}</td>
                    <td>
                      <div className="d-flex align-items-center justify-content-center">
                        <Button
                          onClick={() => {
                            setShow(true);
                            setOrderID(item._id);
                          }}
                          value={item._id}
                          variant="warning"
                        >
                          <img
                            style={{ width: "25px", height: "25px" }}
                            src="https://cdn4.iconfinder.com/data/icons/basic-user-interface-elements/700/search-zoom-fit-512.png"
                            alt=""
                          />
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
                                    <tr key={detail.product._id}>
                                      <td colSpan="2">
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
                                              {detail.product.name}
                                            </h6>
                                            <span className="small">
                                              Quantity: {detail.quantity}
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="text-end">
                                        {(
                                          detail.product.price * detail.quantity
                                        ).toLocaleString("vi-VN", {
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
                                      {item.shippingAmount.toLocaleString(
                                        "vi-VN",
                                        {
                                          style: "currency",
                                          currency: "VND",
                                        }
                                      )}
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
                        )}{" "}
                        &nbsp;
                        {item.Status === "completed" ||
                        item.Status === "cancelled" ? (
                          <></>
                        ) : (
                          <>
                            <Button
                              onClick={async () =>
                                handleUpdateStatus({
                                  id: item._id,
                                  status: item.Status,
                                })
                              }
                              variant="warning"
                            >
                              <img
                                style={{ width: "25px", height: "25px" }}
                                src={
                                  item.Status === "pending"
                                    ? "https://res.cloudinary.com/dtksctz3g/image/upload/v1688233073/business_odzfyu.png"
                                    : item.Status === "confirmed"
                                    ? "https://res.cloudinary.com/dtksctz3g/image/upload/v1688232709/truck_q60nxv.png"
                                    : "https://res.cloudinary.com/dtksctz3g/image/upload/v1688230362/receipts_ugqgfj.png"
                                }
                                alt=""
                              />
                            </Button>{" "}
                            &nbsp;
                            {item.Status === "shipping" ? (
                              <></>
                            ) : (
                              <Button
                                onClick={() => handleCancelOrder(item._id)}
                                value={item._id}
                                variant="danger"
                              >
                                <img
                                  style={{ width: "25px", height: "25px" }}
                                  src="https://res.cloudinary.com/dtksctz3g/image/upload/v1688228958/document_1_cegn0q.png"
                                  alt=""
                                />
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {!orders.length && (
              <Alert className="text-center" variant="info">
                No order to show.
              </Alert>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default OrderAdminPage;
