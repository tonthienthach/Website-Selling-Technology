import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
// import categories from "../categories";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../features/productSlice";
import { updateCategory } from "../features/cateSlice";
// import axios from "../axios/axios";
// import { instanceGetProduct } from "../axios/axios";
import ProductPreview from "../components/ProductPreview";
import "./style.css";
import productApi from "../axios/productApi";
import categoryApi from "../axios/categoryApi";

function Home() {
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const [categories, setCategory] = useState([]);
  // console.log(products);
  const dispatch = useDispatch();

  useEffect(() => {
    const getListProductHandle = async () => {
      const { data } = await productApi.getListProduct();

      dispatch(updateProducts(data.product));
    };
    getListProductHandle();
    const getListCategoryHandle = async () => {
      const category = await categoryApi.getListCategory();
      // dispatch(updateCategory(category.data.allCate));
      setCategory(category.data.allCate);
    };
    getListCategoryHandle();
    // console.log("success");
  }, [cart]);

  const handleSelectedCart = (category) => {
    dispatch(updateCategory(category));
  };

  // console.log(categories);/

  return (
    <div>
      <div className="sale_banner--container mt-4">
        <img
          src="https://res.cloudinary.com/learn-code-10/image/upload/v1654093280/xkia6f13xxlk5xvvb5ed.png"
          alt=""
        />
      </div>
      <div className="featured-product-container container mt4">
        <div>
          <Link
            to="/category/all"
            style={{
              textAlign: "right",
              display: "block",
              textDecoration: "none",
            }}
          >
            See more {">>"}
          </Link>
        </div>
      </div>

      <div className="recent-products-container container mt-4">
        <h2>Categories</h2>
        <Row>
          {categories.map((item) => {
            return (
              <LinkContainer
                key={item.name}
                to={"/category"}
                onClick={() => handleSelectedCart(item)}
              >
                <Col md={4}>
                  <div
                    key={item.name}
                    style={{
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))`,
                      gap: "10px",
                    }}
                    className="category-title"
                  >
                    {item.name}
                  </div>
                </Col>
              </LinkContainer>
            );
          })}
        </Row>
      </div>

      <div className="container-fluid pt-5 pb-3">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">Featured Products</span>
        </h2>
        <div className="row px-xl-5">
          <div className="d-flex justify-content-center flex-wrap pt-5 pb-4">
            {products &&
              products.map((product) => (
                <ProductPreview key={product._id} {...product} />
              ))}
          </div>
        </div>
      </div>
      {/* {products.map((product) => (
          <ProductPreview {...product} />
        ))} */}
    </div>
  );
}

export default Home;
