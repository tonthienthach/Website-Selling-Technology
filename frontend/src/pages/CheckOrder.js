import React from "react";
import { Link } from "react-router-dom";
import "./CheckOrder.css";

function CheckOrder() {
  return (
    <div className="container-fluid">
      <div className="row">
      <ul class="nav nav-tabs">
        <li class="active">
          <Link href="#">Home</Link>
        </li>
        <li class="dropdown">
          <Link class="dropdown-toggle" data-toggle="dropdown" href="#">
            Menu 1<span class="caret"></span>
          </Link>
          <ul class="dropdown-menu">
            <li>
              <Link href="#">Submenu 1-1</Link>
            </li>
            <li>
              <Link href="#">Submenu 1-2</Link>
            </li>
            <li>
              <Link href="#">Submenu 1-3</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href="#">Menu 2</Link>
        </li>
        <li>
          <Link href="#">Menu 3</Link>
        </li>
      </ul>
      </div>
      <div className="row">
        <div className="col-lg-8" style={{ left: "17%" }}>
          <div className="card-page mb-4">
            <div class="card-container">
              <div class="mb-3 d-flex justify-content-between">
                <div>
                  <span class="me-3">22-11-2021</span>
                  <span class="me-3">#16123222</span>
                  <span class="me-3">Visa -1234</span>
                  <span class="badge rounded-pill bg-info">SHIPPING</span>
                </div>
                <div class="d-flex">
                  <button class="btn btn-link p-0 me-3 d-none d-lg-block btn-icon-text">
                    <i class="bi bi-download"></i>{" "}
                    <span class="text">Invoice</span>
                  </button>
                  <div class="dropdown">
                    <button
                      class="btn btn-link p-0 text-muted"
                      type="button"
                      data-bs-toggle="dropdown"
                    >
                      <i class="bi bi-three-dots-vertical"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                      <li>
                        <Link class="dropdown-item" href="#">
                          <i class="bi bi-pencil"></i> Edit
                        </Link>
                      </li>
                      <li>
                        <Link class="dropdown-item" href="#">
                          <i class="bi bi-printer"></i> Print
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <table class="table table-borderless">
                <tbody>
                  <tr>
                    <td>
                      <div class="d-flex mb-2">
                        <div class="flex-shrink-0">
                          <img
                            src="https://www.bootdey.com/image/280x280/87CEFA/000000"
                            alt=""
                            width="35"
                            class="img-fluid"
                          />
                        </div>
                        <div class="flex-lg-grow-1 ms-3">
                          <h6 class="small mb-0">
                            <Link href="#" class="text-reset">
                              Wireless Headphones with Noise Cancellation Tru
                              Bass Bluetooth HiFi
                            </Link>
                          </h6>
                          <span class="small">Color: Black</span>
                        </div>
                      </div>
                    </td>
                    <td>1</td>
                    <td class="text-end">$79.99</td>
                  </tr>
                  <tr>
                    <td>
                      <div class="d-flex mb-2">
                        <div class="flex-shrink-0">
                          <img
                            src="https://www.bootdey.com/image/280x280/87CEFA/000000"
                            alt=""
                            width="35"
                            class="img-fluid"
                          />
                        </div>
                        <div class="flex-lg-grow-1 ms-3">
                          <h6 class="small mb-0">
                            <Link href="#" class="text-reset">
                              Wireless Headphones with Noise Cancellation Tru
                              Bass Bluetooth HiFi
                            </Link>
                          </h6>
                          <span class="small">Color: Black</span>
                        </div>
                      </div>
                    </td>
                    <td>1</td>
                    <td class="text-end">$79.99</td>
                  </tr>
                  <tr>
                    <td>
                      <div class="d-flex mb-2">
                        <div class="flex-shrink-0">
                          <img
                            src="https://www.bootdey.com/image/280x280/87CEFA/000000"
                            alt=""
                            width="35"
                            class="img-fluid"
                          />
                        </div>
                        <div class="flex-lg-grow-1 ms-3">
                          <h6 class="small mb-0">
                            <Link href="#" class="text-reset">
                              Wireless Headphones with Noise Cancellation Tru
                              Bass Bluetooth HiFi
                            </Link>
                          </h6>
                          <span class="small">Color: Black</span>
                        </div>
                      </div>
                    </td>
                    <td>1</td>
                    <td class="text-end">$79.99</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr class="fw-bold">
                    <td colSpan="2">TOTAL</td>
                    <td class="text-end">$169,98</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOrder;
