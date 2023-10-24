import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
// import categories from "../categories";
import { useDispatch } from "react-redux";
import { updateProducts } from "../features/productSlice";
import { updateCategory } from "../features/cateSlice";
// import axios from "../axios/axios";
// import { instanceGetProduct } from "../axios/axios";
import ProductPreview from "../components/ProductPreview";
import "./style.css";
import productApi from "../axios/productApi";
import categoryApi from "../axios/categoryApi";
import Slider from "react-slick";
import CarouselItem from "../components/CarouselItem";
import "./Home.css";
import voucherApi from "../axios/voucherApi";

function Home() {
  // const products = useSelector((state) => state.products);
  const [vouchers, setVouchers] = useState([]);
  const [productTopRecommend, setProductTopRecommend] = useState([]);
  const [categories, setCategory] = useState([]);
  // console.log(products);
  const dispatch = useDispatch();

  useEffect(() => {
    const getVoucherActiveHandle = async () => {
      const { data } = await voucherApi.getVoucherActive();
      console.log("voucher", data);
      setVouchers(data.data);
    };
    getVoucherActiveHandle();
    const getListProductTopRecommendHandler = async () => {
      const { data } = await productApi.getListProductTopRecommend();
      console.log(data);
      setProductTopRecommend(data.data);
    };
    getListProductTopRecommendHandler();
    const getListProductHandle = async () => {
      const { data } = await productApi.getListProduct();
      dispatch(updateProducts(data.data));
    };
    getListProductHandle();
    const getListCategoryHandle = async () => {
      const category = await categoryApi.getListCategory();
      // dispatch(updateCategory(category.data.allCate));
      setCategory(category.data.allCate);
    };
    getListCategoryHandle();
    // console.log("success");
  }, [dispatch]);

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
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">Voucher</span>
        </h2>
        <Slider
          {...settings}
          slidesToShow={vouchers.length > 4 ? 4 : vouchers.length}
        >
          {vouchers?.length > 0 &&
            vouchers.map((voucher, idx) => (
              <div key={"voucher" + idx}>
                <CarouselItem voucher={voucher} />
              </div>
            ))}
          {/* <div>
            <CarouselItem></CarouselItem>
          </div>
          <div>
            <CarouselItem></CarouselItem>
          </div>
          <div>
            <CarouselItem></CarouselItem>
          </div>
          <div>
            <CarouselItem></CarouselItem>
          </div>
          <div>
            <CarouselItem></CarouselItem>
          </div>
          <div>
            <CarouselItem></CarouselItem>
          </div> */}
        </Slider>
      </div>
      <div className="recent-products-container container mt-4">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">Categories</span>
        </h2>
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
                      backgroundImage: `url(${item.image})`,
                      gap: "10px",
                    }}
                    className="category-title"
                  ></div>
                </Col>
              </LinkContainer>
            );
          })}
        </Row>
      </div>

      <div className="recent-products-container container pt-5 pb-3 ">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">Recommended Products</span>
        </h2>
        <div className="row px-xl-6">
          <div className="d-flex justify-content-center flex-wrap pt-5 pb-4">
            {productTopRecommend &&
              productTopRecommend.map((product) => (
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

export const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToScroll: 1,
};

export default Home;
