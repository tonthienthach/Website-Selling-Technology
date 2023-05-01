import React from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./DashboardProduct.css";

function DashboardProduct() {
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);

  return (
    <Container>
      <Row>
        <Col md={12}>
          <Table striped border hover responsive>
            <thead>
              <tr>
                <th></th>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Product Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={product.image[0].url}
                      alt=""
                      className="dashboard-product-preview"
                    />
                  </td>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center">
                      <Button variant="danger">Delete</Button> &nbsp;
                      <Link className="btn btn-warning">Edit</Link>
                    </div>
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

export default DashboardProduct;
