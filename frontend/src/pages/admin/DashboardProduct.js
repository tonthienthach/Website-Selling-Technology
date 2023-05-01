import React from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./DashboardProduct.css";
import { useRemoveProductMutation } from "../../services/appApi";
import { updateProducts } from "../../features/productSlice";
import { toast } from "react-toastify";

function DashboardProduct() {
  const products = useSelector((state) => state.products);
  const [removeProduct] = useRemoveProductMutation();
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);

  const handleRemoveProduct = async (productID) => {
    if (window.confirm("You want to remove product?")) {
      const { data } = await removeProduct(productID);
      if (data.success) {
        toast.success("Remove Product Successful");
        dispatch(updateProducts(data.data));
      } else {
        toast.error(data.message);
      }
    }
  };

  return (
    <Container>
      <Row>
        <Col md={12}>
          <Table striped hover responsive>
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
                      <Button
                        onClick={async () => handleRemoveProduct(product._id)}
                        variant="danger"
                      >
                        Delete
                      </Button>{" "}
                      &nbsp;
                      <Link
                        to={`/admin/edit-product/${product._id}`}
                        className="btn btn-warning"
                      >
                        Edit
                      </Link>
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