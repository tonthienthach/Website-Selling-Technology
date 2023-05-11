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
  Nav,
  Row,
  Table,
} from "react-bootstrap";
import { toast } from "react-toastify";

function OrderAdminPage() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("All");
  // const [status, setStatus] = useState("");
  // const products = useSelector((state) => state.products);
  // const [ordersToShow, setOrdersToShow] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    const ordersApi = async () => {
      const { data } = await adminApi.getListAllOrder();
      setLoading(false);
      // console.log(data);
      setOrders(data.data);
    };
    ordersApi();
    // console.log(orders);
  }, []);

  const handleUpdateStatus = async (body) => {
    console.log(body.status);
    if (body.status !== "completed" && body.status !== "cancelled") {
      const { data } = await adminApi.updateStatusOrderByID(body.id);
      console.log(data);
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
                  <th>Client Name</th>
                  <th>Items</th>
                  <th>Order Total</th>
                  <th>Status</th>
                  <th>Address ID</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* <Pagination data={orders} RenderComponent={TableRow} pageLimit={1} dataLimit={10} tablePagination={true} /> */}
                {orders.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.user.username}</td>
                    <td>
                      {item.detail.reduce((quantity, current) => {
                        return (quantity += current.quantity);
                      }, 0)}
                    </td>
                    <td>{item.total}</td>
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
                    <td>
                      <Button
                        onClick={async () =>
                          handleUpdateStatus({
                            id: item._id,
                            status: item.Status,
                          })
                        }
                        variant="warning"
                      >
                        Update
                      </Button>
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
