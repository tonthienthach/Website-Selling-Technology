import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import adminApi from "../../axios/adminApi";
import Loading from "../../components/Loading";
import { Badge, Button, Col, Container, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";

function OrderAdminPage() {
  const [orders, setOrders] = useState([]);
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
      // console.log(data);
      if (data.success) {
        toast.success(data.message);
        setOrders(data.data);
      }
    } else {
      toast.warning("Can't update status");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <Row>
        <Col md={12}>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Client Name</th>
                <th>Items</th>
                <th>Order Total</th>
                <th>Status</th>
                <th>Address ID</th>
              </tr>
            </thead>
            <tbody>
              {/* <Pagination data={orders} RenderComponent={TableRow} pageLimit={1} dataLimit={10} tablePagination={true} /> */}
              {orders.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.user.name}</td>
                  <td>
                    {item.detail.reduce((quantity, current) => {
                      return (quantity += current.quantity);
                    }, 0)}
                  </td>
                  <td>{item.total}</td>
                  <td>
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
        </Col>
      </Row>
    </Container>
  );
}

export default OrderAdminPage;
