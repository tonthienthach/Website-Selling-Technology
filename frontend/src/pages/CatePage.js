import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import ProductPreview from "../components/ProductPreview";
import { Col, Container, Row } from "react-bootstrap";
import "./Category.css";
import productApi from "../axios/productApi";
import { useSelector } from "react-redux";

function Cate() {
  const category = useSelector((state) => state.category);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    const getProductByCate = async (id) => {
      const productByCate = await productApi.getListProductByCate(id);
      // console.log(productByCate);
      setProducts(productByCate.data.data);
    };
    getProductByCate(category._id);
  }, [category]);

  if (loading) {
    <Loading />;
  }

  // console.log(category);

  const productsSearch = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // function ProductSearch({ _id, category, name, pictures }) {
  //   return (
  //     <ProductPreview
  //       _id={_id}
  //       category={category}
  //       name={name}
  //       pictures={pictures}
  //     />
  //   );
  // }

  return (
    <div className="category-page-container">
      <div
        className={`pt-3 ${category}-banner-container category-banner-container`}
      >
        <h1 className="text-center">
          {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
        </h1>
      </div>
      <div className="filters-container d-flex justify-content-center pt-4 pb-4">
        <input
          type="search"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {productsSearch.length === 0 ? (
        <h1>No products to show</h1>
      ) : (
        <Container>
          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <div className="d-flex justify-content-center align-items-center flex-wrap">
                {productsSearch.map((product) => (
                  <ProductPreview key={product._id} {...product} />
                ))}
              </div>
              {/* <Pagination data={productsSearch} RenderComponent={ProductSearch} pageLimit={1} tablePagination={false}/> */}
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default Cate;
