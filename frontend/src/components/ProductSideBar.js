import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function ProductSideBar() {
  // const [price, setPrice] = useState(0);
  const [query] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handlePrice = async (e) => {
    if (query.get("q")) {
      navigate(
        `${location.pathname}?q=${query.get("q")}&price=${e.target.value}`
      );
    } else {
      navigate(`${location.pathname}?price=${e.target.value}`);
    }
  };
  return (
    <div className="col-lg-3 col-md-4">
      <h5 className="section-title position-relative text-uppercase mb-3">
        <span className="bg-secondary pr-3">Filter by price</span>
      </h5>
      <div className="bg-light p-4 mb-30">
        <form>
          <div className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
            <input
              type="radio"
              className="custom-control-input"
              name="group-price"
              id="price-all"
              value="0"
              onClick={handlePrice}
            />
            <label className="custom-control-label" htmlFor="price-all">
              All Price
            </label>
          </div>
          <div className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
            <input
              type="radio"
              className="custom-control-input"
              name="group-price"
              id="price-1"
              value="0-5000000"
              onClick={handlePrice}
            />
            <label className="custom-control-label" htmlFor="price-1">
              0 - 5.000.000đ
            </label>
          </div>
          <div className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
            <input
              type="radio"
              className="custom-control-input"
              name="group-price"
              id="price-2"
              value="5000000-10000000"
              onClick={handlePrice}
            />
            <label className="custom-control-label" htmlFor="price-2">
              5.000.000đ - 10.000.000đ
            </label>
          </div>
          <div className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
            <input
              type="radio"
              className="custom-control-input"
              name="group-price"
              id="price-3"
              value="10000000-15000000"
              onClick={handlePrice}
            />
            <label className="custom-control-label" htmlFor="price-3">
              10.000.000đ - 15.000.000đ
            </label>
          </div>
          <div className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
            <input
              type="radio"
              className="custom-control-input"
              name="group-price"
              id="price-4"
              value="15000000-20000000"
              onClick={handlePrice}
            />
            <label className="custom-control-label" htmlFor="price-4">
              15.000.000đ - 20.000.000đ
            </label>
          </div>
          <div className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
            <input
              type="radio"
              className="custom-control-input"
              name="group-price"
              id="price-5"
              value="20000000-30000000"
              onClick={handlePrice}
            />
            <label className="custom-control-label" htmlFor="price-5">
              20.000.000đ - 30.000.000đ
            </label>
          </div>
          <div className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
            <input
              type="radio"
              className="custom-control-input"
              name="group-price"
              id="price-6"
              value="30000000-9999999999"
              onClick={handlePrice}
            />
            <label className="custom-control-label" htmlFor="price-6">
              {">"} 30.000.000đ
            </label>
          </div>
        </form>
      </div>

      {/* <h5 className="section-title position-relative text-uppercase mb-3">
        <span className="bg-secondary pr-3">Filter by size</span>
      </h5>
      <div className="bg-light p-4 mb-30">
        <form>
          <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input
              type="checkbox"
              className="custom-control-input"
              checked
              id="size-all"
            />
            <label className="custom-control-label" htmlFor="size-all">
              All Size
            </label>
          </div>
          <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input
              type="checkbox"
              className="custom-control-input"
              id="size-1"
            />
            <label className="custom-control-label" htmlFor="size-1">
              XS
            </label>
          </div>
          <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input
              type="checkbox"
              className="custom-control-input"
              id="size-2"
            />
            <label className="custom-control-label" htmlFor="size-2">
              S
            </label>
          </div>
          <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input
              type="checkbox"
              className="custom-control-input"
              id="size-3"
            />
            <label className="custom-control-label" htmlFor="size-3">
              M
            </label>
          </div>
          <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input
              type="checkbox"
              className="custom-control-input"
              id="size-4"
            />
            <label className="custom-control-label" htmlFor="size-4">
              L
            </label>
          </div>
          <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
            <input
              type="checkbox"
              className="custom-control-input"
              id="size-5"
            />
            <label className="custom-control-label" htmlFor="size-5">
              XL
            </label>
          </div>
      //   </form> 
       </div>*/}
    </div>
  );
}

export default ProductSideBar;
