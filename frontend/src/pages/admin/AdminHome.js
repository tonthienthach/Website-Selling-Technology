import React from "react";
import { Container, Row, Tab } from "react-bootstrap";
import "./AdminHome.css";
import Chart, { CategoryScale } from "chart.js/auto";

import { Bar, Line } from "react-chartjs-2";

function AdminHome() {
  Chart.register(CategoryScale);

  return (
    <Container>
      <Tab.Container defaultActiveKey="products">
        <Row>
          {/* <Col md={3}>
            <Nav
              variant="pills"
              className="flex-column"
              style={{ textAlign: "center" }}
            >
              <Nav.Item>
                <Nav.Link eventKey="products">Products</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="orders">Orders</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="clients">Clients</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col> */}
          {/* <Col md={9}>
            <Tab.Content>
              <Tab.Pane eventKey="products">
                <DashboardProduct />
              </Tab.Pane>
            </Tab.Content>
            <Tab.Content>
              <Tab.Pane eventKey="orders">
                <OrderAdminPage />
              </Tab.Pane>
            </Tab.Content>
            <Tab.Content>
              <Tab.Pane eventKey="clients">
                <ClientAdminPage />
              </Tab.Pane>
            </Tab.Content>
          </Col> */}
          <section className="section">
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-3 col-lg-4 col-sm-6">
                  <div className="icon-card mb-30">
                    <div className="icon purple">
                      <i className="lni lni-cart-full"></i>
                    </div>
                    <div className="content">
                      <h6 className="mb-10">New Orders</h6>
                      <h3 className="text-bold mb-10">34567</h3>
                      <p className="text-sm text-success">
                        <i className="lni lni-arrow-up"></i> +2.00%
                        <span className="text-gray">(30 days)</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-sm-6">
                  <div className="icon-card mb-30">
                    <div className="icon success">
                      <i className="lni lni-dollar"></i>
                    </div>
                    <div className="content">
                      <h6 className="mb-10">Total Income</h6>
                      <h3 className="text-bold mb-10">$74,567</h3>
                      <p className="text-sm text-success">
                        <i className="lni lni-arrow-up"></i> +5.45%
                        <span className="text-gray">Increased</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-sm-6">
                  <div className="icon-card mb-30">
                    <div className="icon primary">
                      <i className="lni lni-credit-cards"></i>
                    </div>
                    <div className="content">
                      <h6 className="mb-10">Total Expense</h6>
                      <h3 className="text-bold mb-10">$24,567</h3>
                      <p className="text-sm text-danger">
                        <i className="lni lni-arrow-down"></i> -2.00%
                        <span className="text-gray">Expense</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-sm-6">
                  <div className="icon-card mb-30">
                    <div className="icon orange">
                      <i className="lni lni-user"></i>
                    </div>
                    <div className="content">
                      <h6 className="mb-10">New User</h6>
                      <h3 className="text-bold mb-10">34567</h3>
                      <p className="text-sm text-danger">
                        <i className="lni lni-arrow-down"></i> -25.00%
                        <span className="text-gray"> Earning</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-7">
                  <div className="card-style mb-30">
                    <div className="chart-height">
                      <div
                        className="
                    title
                    d-flex
                    flex-wrap
                    align-items-center
                    justify-content-between
                  "
                        style={{ height: "10%" }}
                      >
                        <div className="left">
                          <h6 className="text-medium mb-30">Sales/Revenue</h6>
                        </div>
                        <div className="right">
                          <div className="select-style-1">
                            <div className="select-position select-sm">
                              <select className="light-bg">
                                <option value="">Yearly</option>
                                <option value="">Monthly</option>
                                <option value="">Weekly</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Line
                        data={{
                          labels: [
                            "Jan",
                            "Fab",
                            "Mar",
                            "Apr",
                            "May",
                            "Jun",
                            "Jul",
                            "Aug",
                            "Sep",
                            "Oct",
                            "Nov",
                            "Dec",
                          ],
                          // Information about the dataset
                          datasets: [
                            {
                              label: "Amount",
                              backgroundColor: "transparent",
                              borderColor: "#4A6CF7",
                              data: [
                                600, 800, 750, 880, 940, 880, 900, 770, 920,
                                890, 976, 1100,
                              ],
                            },
                          ],
                        }}
                        options={{
                          title: {
                            display: true,
                            text: "World population per region (in millions)",
                          },
                          legend: {
                            display: true,
                            position: "bottom",
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="card-style mb-30">
                    <div className="chart-height">
                      <div
                        className="
                    title
                    d-flex
                    flex-wrap
                    align-items-center
                    justify-content-between
                  "
                        style={{ height: "10%" }}
                      >
                        <div className="left">
                          <h6 className="text-medium mb-30">Sales/Revenue</h6>
                        </div>
                        <div className="right">
                          <div className="select-style-1">
                            <div className="select-position select-sm">
                              <select className="light-bg">
                                <option value="">Yearly</option>
                                <option value="">Monthly</option>
                                <option value="">Weekly</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <Bar
                          width="100%"
                          height="75%"
                          data={{
                            labels: [
                              "Jan",
                              "Fab",
                              "Mar",
                              "Apr",
                              "May",
                              "Jun",
                              "Jul",
                              "Aug",
                              "Sep",
                              "Oct",
                              "Nov",
                              "Dec",
                            ],
                            // Information about the dataset
                            datasets: [
                              {
                                label: "Amount",
                                backgroundColor: "#4A6CF7",
                                barThickness: 6,
                                maxBarThickness: 8,
                                data: [
                                  600, 700, 1000, 700, 650, 800, 690, 740, 720,
                                  1120, 876, 900,
                                ],
                              },
                            ],
                          }}
                          options={{
                            legend: { display: false },
                            title: {
                              display: true,
                              text: "Predicted world population (millions) in 2050",
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default AdminHome;
