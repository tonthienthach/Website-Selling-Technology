import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductPreview from "../components/ProductPreview";
import productApi from "../axios/productApi";
import { updateProducts } from "../features/productSlice";
import { Link } from "react-router-dom";
import ProductSideBar from "../components/ProductSideBar";

function ShopPage() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const getListProductHandle = async () => {
      const { data } = await productApi.getListProduct();

      dispatch(updateProducts(data.product));
    };
    getListProductHandle();
  }, [dispatch]);
  return (
    <div>
      {/* <!-- Breadcrumb Start --> */}
      <div class="container-fluid">
        <div class="row px-xl-5">
          <div class="col-12">
            <nav class="breadcrumb bg-light mb-30">
              <Link class="breadcrumb-item text-dark" href="#">
                Home
              </Link>
              <Link class="breadcrumb-item text-dark" href="#">
                Shop
              </Link>
              <span class="breadcrumb-item active">Shop List</span>
            </nav>
          </div>
        </div>
      </div>
      {/* <!-- Breadcrumb End --> */}
      <div class="container-fluid">
        <div class="row px-xl-5">
          <ProductSideBar />

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
                        <Link class="dropdown-item" href="#">
                          Latest
                        </Link>
                        <Link class="dropdown-item" href="#">
                          Popularity
                        </Link>
                        <Link class="dropdown-item" href="#">
                          Best Rating
                        </Link>
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
                        <Link class="dropdown-item" href="#">
                          10
                        </Link>
                        <Link class="dropdown-item" href="#">
                          20
                        </Link>
                        <Link class="dropdown-item" href="#">
                          30
                        </Link>
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
                      <Link class="page-link" href="#">
                        Previous
                      </Link>
                    </li>
                    <li class="page-item active">
                      <Link class="page-link" href="#">
                        1
                      </Link>
                    </li>
                    <li class="page-item">
                      <Link class="page-link" href="#">
                        2
                      </Link>
                    </li>
                    <li class="page-item">
                      <Link class="page-link" href="#">
                        3
                      </Link>
                    </li>
                    <li class="page-item">
                      <Link class="page-link" href="#">
                        Next
                      </Link>
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
