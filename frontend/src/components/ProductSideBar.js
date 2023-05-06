import React from "react";

function ProductSideBar() {
  return (
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
            <input type="checkbox" class="custom-control-input" id="price-1" />
            <label class="custom-control-label" for="price-1">
              $0 - $100
            </label>
          </div>
          <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input type="checkbox" class="custom-control-input" id="price-2" />
            <label class="custom-control-label" for="price-2">
              $100 - $200
            </label>
          </div>
          <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input type="checkbox" class="custom-control-input" id="price-3" />
            <label class="custom-control-label" for="price-3">
              $200 - $300
            </label>
          </div>
          <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input type="checkbox" class="custom-control-input" id="price-4" />
            <label class="custom-control-label" for="price-4">
              $300 - $400
            </label>
          </div>
          <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between">
            <input type="checkbox" class="custom-control-input" id="price-5" />
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
            <input type="checkbox" class="custom-control-input" id="color-1" />
            <label class="custom-control-label" for="color-1">
              Black
            </label>
          </div>
          <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input type="checkbox" class="custom-control-input" id="color-2" />
            <label class="custom-control-label" for="color-2">
              White
            </label>
          </div>
          <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input type="checkbox" class="custom-control-input" id="color-3" />
            <label class="custom-control-label" for="color-3">
              Red
            </label>
          </div>
          <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input type="checkbox" class="custom-control-input" id="color-4" />
            <label class="custom-control-label" for="color-4">
              Blue
            </label>
          </div>
          <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between">
            <input type="checkbox" class="custom-control-input" id="color-5" />
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
            <input type="checkbox" class="custom-control-input" id="size-1" />
            <label class="custom-control-label" for="size-1">
              XS
            </label>
          </div>
          <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input type="checkbox" class="custom-control-input" id="size-2" />
            <label class="custom-control-label" for="size-2">
              S
            </label>
          </div>
          <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input type="checkbox" class="custom-control-input" id="size-3" />
            <label class="custom-control-label" for="size-3">
              M
            </label>
          </div>
          <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input type="checkbox" class="custom-control-input" id="size-4" />
            <label class="custom-control-label" for="size-4">
              L
            </label>
          </div>
          <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between">
            <input type="checkbox" class="custom-control-input" id="size-5" />
            <label class="custom-control-label" for="size-5">
              XL
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductSideBar;
