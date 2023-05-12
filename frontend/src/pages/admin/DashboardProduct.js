import React, { useEffect, useState } from "react";
import { Button, Col, Container, Nav, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./DashboardProduct.css";
import { useRemoveProductMutation } from "../../services/appApi";
import productApi from "../../axios/productApi";
import { toast } from "react-toastify";
import categoryApi from "../../axios/categoryApi";
import Loading from "../../components/Loading";

function DashboardProduct() {
  const [products, setProducts] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [removeProduct] = useRemoveProductMutation();
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState();
  // const user = useSelector((state) => state.user);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const { data } = await productApi.getListProduct();
      setProducts(data.data);
      setLoading(false);
    };
    getProducts();
    const getAllCate = async () => {
      setLoading(true);
      const { data } = await categoryApi.getListCategory();
      //   console.log(data.allCate);
      setListCategory(data.allCate);
      setLoading(false);
    };
    getAllCate();
  }, []);

  const handleRemoveProduct = async (productID) => {
    if (window.confirm("You want to remove product?")) {
      const { data } = await removeProduct(productID);
      if (data.success) {
        toast.success("Remove Product Successful");
        setProducts(data.data);
      } else {
        toast.error(data.message);
      }
    }
  };

  const handleAllProduct = async () => {
    setLoading(true);
    const { data } = await productApi.getListProduct();
    setProducts(data.data);
    setStatus("All");
    setLoading(false);
  };

  const handleGetProductByCate = async (body) => {
    setLoading(true);
    const { data } = await productApi.getListProductByCate(body.id);
    setProducts(data.data);
    setStatus(body.name);
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
            <Nav.Item>
              <Nav.Link
                className="text-dark"
                eventKey="All"
                onClick={() => handleAllProduct()}
              >
                All
              </Nav.Link>
            </Nav.Item>
            {listCategory.map((item) => (
              <Nav.Item>
                <Nav.Link
                  className="text-dark"
                  eventKey={item.name}
                  onClick={() =>
                    handleGetProductByCate({ id: item._id, name: item.name })
                  }
                >
                  {item.name}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>
        <Col md={12}>
          <div className="card-style-dashboard">
            <Table responsive>
              <thead>
                <tr>
                  <th></th>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th></th>
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
                    <td>
                      {product.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
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
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default DashboardProduct;
