import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div class="container-fluid bg-dark text-secondary mt-5 pt-5">
        <div class="row px-xl-5 pt-5">
          <div class="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
            <h5 class="text-secondary text-uppercase mb-4">Get In Touch</h5>
            <p class="mb-4">
              No dolore ipsum accusam no lorem. Invidunt sed clita kasd clita et
              et dolor sed dolor. Rebum tempor no vero est magna amet no
            </p>
            <p class="mb-2">
              <i class="fa fa-map-marker-alt text-primary mr-3"></i>1 Vo Van
              Ngan, Linh Chieu ward, Thu Duc district
            </p>
            <p class="mb-2">
              <i class="fa fa-envelope text-primary mr-3"></i>
              techstore1121@gmail.com
            </p>
            <p class="mb-0">
              <i class="fa fa-phone-alt text-primary mr-3"></i>0356034540
            </p>
          </div>
          <div class="col-lg-8 col-md-12">
            <div class="row">
              <div class="col-md-4 mb-5">
                <h5 class="text-secondary text-uppercase mb-4">Quick Shop</h5>
                <div class="d-flex flex-column justify-content-start">
                  <Link class="text-secondary mb-2" href="#">
                    <i class="fa fa-angle-right mr-2"></i>Home
                  </Link>
                  <Link class="text-secondary mb-2" href="#">
                    <i class="fa fa-angle-right mr-2"></i>Our Shop
                  </Link>
                  <Link class="text-secondary mb-2" href="#">
                    <i class="fa fa-angle-right mr-2"></i>Shop Detail
                  </Link>
                  <Link class="text-secondary mb-2" href="#">
                    <i class="fa fa-angle-right mr-2"></i>Shopping Cart
                  </Link>
                  <Link class="text-secondary mb-2" href="#">
                    <i class="fa fa-angle-right mr-2"></i>Checkout
                  </Link>
                  <Link class="text-secondary" href="#">
                    <i class="fa fa-angle-right mr-2"></i>Contact Us
                  </Link>
                </div>
              </div>
              <div class="col-md-4 mb-5">
                <h5 class="text-secondary text-uppercase mb-4">My Account</h5>
                <div class="d-flex flex-column justify-content-start">
                  <Link class="text-secondary mb-2" href="#">
                    <i class="fa fa-angle-right mr-2"></i>Home
                  </Link>
                  <Link class="text-secondary mb-2" href="#">
                    <i class="fa fa-angle-right mr-2"></i>Our Shop
                  </Link>
                  <Link class="text-secondary mb-2" href="#">
                    <i class="fa fa-angle-right mr-2"></i>Shop Detail
                  </Link>
                  <Link class="text-secondary mb-2" href="#">
                    <i class="fa fa-angle-right mr-2"></i>Shopping Cart
                  </Link>
                  <Link class="text-secondary mb-2" href="#">
                    <i class="fa fa-angle-right mr-2"></i>Checkout
                  </Link>
                  <Link class="text-secondary" href="#">
                    <i class="fa fa-angle-right mr-2"></i>Contact Us
                  </Link>
                </div>
              </div>
              <div class="col-md-4 mb-5">
                <h5 class="text-secondary text-uppercase mb-4">Newsletter</h5>
                <p>Duo stet tempor ipsum sit amet magna ipsum tempor est</p>
                <form action="">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Your Email Address"
                    />
                    <div class="input-group-append">
                      <button class="btn btn-primary">Sign Up</button>
                    </div>
                  </div>
                </form>
                <h6 class="text-secondary text-uppercase mt-4 mb-3">
                  Follow Us
                </h6>
                <div class="d-flex">
                  <Link class="btn btn-primary btn-square mr-2" href="#">
                    <i class="fab fa-twitter"></i>
                  </Link>
                  <Link class="btn btn-primary btn-square mr-2" href="#">
                    <i class="fab fa-facebook-f"></i>
                  </Link>
                  <Link class="btn btn-primary btn-square mr-2" href="#">
                    <i class="fab fa-linkedin-in"></i>
                  </Link>
                  <Link class="btn btn-primary btn-square" href="#">
                    <i class="fab fa-instagram"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="row border-top mx-xl-5 py-4"
          style={{ borderColor: "rgba(256, 256, 256, .1) !important" }}
        >
          <div class="col-md-6 px-xl-0">
            <p class="mb-md-0 text-center text-md-left text-secondary">
              &copy;{" "}
              <Link class="text-primary" href="#">
                Domain
              </Link>
              . All Rights Reserved. Designed by
              <Link class="text-primary" href="https://htmlcodex.com">
                HTML Codex
              </Link>
            </p>
          </div>
          <div class="col-md-6 px-xl-0 text-center text-md-right">
            <img class="img-fluid" src="img/payments.png" alt="" />
          </div>
        </div>
      </div>
      <Link href="#" class="btn btn-primary back-to-top">
        <i class="fa fa-angle-double-up"></i>
      </Link>
    </>
  );
}

export default Footer;
