import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import ProductPreview from "../components/ProductPreview";
import { Col, Row } from "react-bootstrap";
import "./Category.css";
import productApi from "../axios/productApi";
import { useSelector } from "react-redux";
import brandApi from "../axios/brandApi";

function Cate() {
  const category = useSelector((state) => state.category);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    const getProductByCate = async (id) => {
      const productByCate = await productApi.getListProductByCate(id);
      // console.log(productByCate);
      setProducts(productByCate.data.data);
    };
    getProductByCate(category._id);
    const getBrandByCate = async (id) => {
      const brandByCate = await brandApi.getListBrandByCate(id);
      console.log(brandByCate.data.data);
      setBrands(brandByCate.data.data);
    };
    getBrandByCate(category._id);
  }, [category]);

  if (loading) {
    <Loading />;
  }

  // console.log(category);

  let productsSearch = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductByBrand = async (e) => {
    if (e.target.value !== "all") {
      const { data } = await productApi.getListProductByBrand(e.target.value);
      setProducts(data.data);
    } else {
      const productByCate = await productApi.getListProductByCate(category._id);
      // console.log(productByCate);
      setProducts(productByCate.data.data);
    }
  };

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
      <div className="filters-container d-flex justify-content-end pt-4 pb-4 pe-4 ">
        <input
          type="search"
          placeholder="Search for products by category"
          className="form-input w-25"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div>
        <Row className="px-xl-5">
          <Col md={{ span: 3 }}>
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Filter by Brand</span>
            </h5>
            <div className="bg-light p-4 mb-30">
              <form>
                <div className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="radio"
                    className="custom-control-input"
                    name="group-brand"
                    id="brand-all"
                    value="all"
                    onClick={handleProductByBrand}
                  />
                  <label className="custom-control-label" htmlFor="brand-all">
                    All
                  </label>
                </div>
                {brands &&
                  brands.map((brand) => (
                    <div className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
                      <input
                        type="radio"
                        className="custom-control-input"
                        name="group-brand"
                        id={brand._id}
                        value={brand._id}
                        onClick={handleProductByBrand}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor={brand._id}
                      >
                        {brand.name}
                      </label>
                    </div>
                  ))}
              </form>
            </div>
          </Col>

          <Col md={{ span: 9 }}>
            <div className="d-flex justify-content-start align-items-start flex-wrap mt-5">
              {productsSearch ? (
                productsSearch.map((product) => (
                  <ProductPreview key={product._id} {...product} />
                ))
              ) : (
                <h1>No products to show</h1>
              )}
            </div>
            {/* <Pagination data={productsSearch} RenderComponent={ProductSearch} pageLimit={1} tablePagination={false}/> */}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Cate;
