import React from "react";
import { Col, Container, Nav, NavItem, Row, Tab } from "react-bootstrap";
import DashboardProduct from "../../components/DashboardProduct";
import OrderAdminPage from "../../components/OrderAdminPage";
import ClientAdminPage from "../../components/ClientAdminPage";

function AdminHome() {
  return (
    <Container>
      <Tab.Container defaultActiveKey="products">
        <Row>
          {/* <Col md={3}>
            <Nav
              variant="pills"
              className="flex-column"
              style={{ textAlign: "center" }}
            >
              <Nav.Item>
                <Nav.Link eventKey="products">Products</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="orders">Orders</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="clients">Clients</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col> */}
          {/* <Col md={9}>
            <Tab.Content>
              <Tab.Pane eventKey="products">
                <DashboardProduct />
              </Tab.Pane>
            </Tab.Content>
            <Tab.Content>
              <Tab.Pane eventKey="orders">
                <OrderAdminPage />
              </Tab.Pane>
            </Tab.Content>
            <Tab.Content>
              <Tab.Pane eventKey="clients">
                <ClientAdminPage />
              </Tab.Pane>
            </Tab.Content>
          </Col> */}
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default AdminHome;
