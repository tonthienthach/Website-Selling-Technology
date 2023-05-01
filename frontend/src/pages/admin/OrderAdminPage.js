import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import adminApi from "../../axios/adminApi";
import Loading from "../../components/Loading";
import { Badge, Col, Container, Row, Table } from "react-bootstrap";

function OrderAdminPage() {
  const [orders, setOrders] = useState([]);
  const products = useSelector((state) => state.products);
  const [ordersToShow, setOrdersToShow] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    const ordersApi = async () => {
      const { data } = await adminApi.getListAllOrder();
      setLoading(false);
      console.log(data);
      setOrders(data.data);
    };
    ordersApi();
    console.log(orders);
  }, []);

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
                <th>Client ID</th>
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
                        item.Status == "pending"
                          ? "dark"
                          : item.Status == "confirmed"
                          ? "info"
                          : item.Status == "shipping"
                          ? "warning"
                          : item.Status == "completed"
                          ? "success"
                          : "danger"
                      }
                    >
                      {item.Status}
                    </Badge>
                  </td>
                  <td>{item.address?.city}</td>
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
