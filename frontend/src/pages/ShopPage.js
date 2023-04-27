import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductPreview from "../components/ProductPreview";
import productApi from "../axios/productApi";
import { updateProducts } from "../features/productSlice";
import { useParams } from "react-router-dom";

function ShopPage() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const getListProductHandle = async () => {
      const { data } = await productApi.getListProduct();

      dispatch(updateProducts(data.product));
    };
    getListProductHandle();
  }, []);
  return (
    <div>
      {/* <!-- Breadcrumb Start --> */}
      <div class="container-fluid">
        <div class="row px-xl-5">
          <div class="col-12">
            <nav class="breadcrumb bg-light mb-30">
              <a class="breadcrumb-item text-dark" href="#">
                Home
              </a>
              <a class="breadcrumb-item text-dark" href="#">
                Shop
              </a>
              <span class="breadcrumb-item active">Shop List</span>
            </nav>
          </div>
        </div>
      </div>
      {/* <!-- Breadcrumb End --> */}
      <div class="container-fluid">
        <div class="row px-xl-5">
          <div class="col-lg-3 col-md-4">
            <h5 class="section-title position-relative text-uppercase mb-3">
              <span class="bg-secondary pr-3">Filter by price</span>
            </h5>
            <div class="bg-light p-4 mb-30">
              <form>
                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    checked
                    id="price-all"
                  />
                  <label class="custom-control-label" for="price-all">
                    All Price
                  </label>
                </div>
                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="price-1"
                  />
                  <label class="custom-control-label" for="price-1">
                    $0 - $100
                  </label>
                </div>
                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="price-2"
                  />
                  <label class="custom-control-label" for="price-2">
                    $100 - $200
                  </label>
                </div>
                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="price-3"
                  />
                  <label class="custom-control-label" for="price-3">
                    $200 - $300
                  </label>
                </div>
                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="price-4"
                  />
                  <label class="custom-control-label" for="price-4">
                    $300 - $400
                  </label>
                </div>
                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="price-5"
                  />
                  <label class="custom-control-label" for="price-5">
                    $400 - $500
                  </label>
                </div>
              </form>
            </div>

            <h5 class="section-title position-relative text-uppercase mb-3">
              <span class="bg-secondary pr-3">Filter by color</span>
            </h5>
            <div class="bg-light p-4 mb-30">
              <form>
                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    checked
                    id="color-all"
                  />
                  <label class="custom-control-label" for="price-all">
                    All Color
                  </label>
                </div>
                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="color-1"
                  />
                  <label class="custom-control-label" for="color-1">
                    Black
                  </label>
                </div>
                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="color-2"
                  />
                  <label class="custom-control-label" for="color-2">
                    White
                  </label>
                </div>
                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="color-3"
                  />
                  <label class="custom-control-label" for="color-3">
                    Red
                  </label>
                </div>
                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="color-4"
                  />
                  <label class="custom-control-label" for="color-4">
                    Blue
                  </label>
                </div>
                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="color-5"
                  />
                  <label class="custom-control-label" for="color-5">
                    Green
                  </label>
                </div>
              </form>
            </div>

            <h5 class="section-title position-relative text-uppercase mb-3">
              <span class="bg-secondary pr-3">Filter by size</span>
            </h5>
            <div class="bg-light p-4 mb-30">
              <form>
                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    checked
                    id="size-all"
                  />
                  <label class="custom-control-label" for="size-all">
                    All Size
                  </label>
                </div>
                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="size-1"
                  />
                  <label class="custom-control-label" for="size-1">
                    XS
                  </label>
                </div>
                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="size-2"
                  />
                  <label class="custom-control-label" for="size-2">
                    S
                  </label>
                </div>
                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="size-3"
                  />
                  <label class="custom-control-label" for="size-3">
                    M
                  </label>
                </div>
                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="size-4"
                  />
                  <label class="custom-control-label" for="size-4">
                    L
                  </label>
                </div>
                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="size-5"
                  />
                  <label class="custom-control-label" for="size-5">
                    XL
                  </label>
                </div>
              </form>
            </div>
          </div>

          {/* <!-- Shop Product Start --> */}
          <div class="col-lg-9 col-md-8">
            <div class="row pb-3">
              <div class="col-12 pb-1">
                <div class="d-flex align-items-center justify-content-between mb-4">
                  <div>
                    <button class="btn btn-sm btn-light">
                      <i class="fa fa-th-large"></i>
                    </button>
                    <button class="btn btn-sm btn-light ml-2">
                      <i class="fa fa-bars"></i>
                    </button>
                  </div>
                  <div class="ml-2">
                    <div class="btn-group">
                      <button
                        type="button"
                        class="btn btn-sm btn-light dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        Sorting
                      </button>
                      <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" href="#">
                          Latest
                        </a>
                        <a class="dropdown-item" href="#">
                          Popularity
                        </a>
                        <a class="dropdown-item" href="#">
                          Best Rating
                        </a>
                      </div>
                    </div>
                    <div class="btn-group ml-2">
                      <button
                        type="button"
                        class="btn btn-sm btn-light dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        Showing
                      </button>
                      <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" href="#">
                          10
                        </a>
                        <a class="dropdown-item" href="#">
                          20
                        </a>
                        <a class="dropdown-item" href="#">
                          30
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {products &&
                products.map((product) => (
                  <ProductPreview key={product._id} {...product} />
                ))}
              <div class="col-12">
                <nav>
                  <ul class="pagination justify-content-center">
                    <li class="page-item disabled">
                      <a class="page-link" href="#">
                        Previous
                      </a>
                    </li>
                    <li class="page-item active">
                      <a class="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          {/* <!-- Shop Product End --> */}
        </div>
      </div>
    </div>
  );
}

export default ShopPage;
