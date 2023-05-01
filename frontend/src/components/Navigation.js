import React, { useEffect, useState } from "react";
import { Container, Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../features/userSlice";
import "./Navigation.css";
import { Link, useNavigate } from "react-router-dom";
import { logoutCart } from "../features/cartSlice";
import { toast } from "react-toastify";
import categoryApi from "../axios/categoryApi";
import { updateCategory } from "../features/cateSlice";

function Navigation() {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [categories, setCategory] = useState([]);
  const navigate = useNavigate();

  // console.log(user?.token);
  const dispatch = useDispatch();

  // const [totalQuantity, setTotalQuantity] = useState(0);
  const totalQuantity = cart?.reduce((total, item) => {
    total += item.quantity;
    return total;
  }, 0);

  // console.log(totalQuantity);

  useEffect(() => {
    const getListCategoryHandle = async () => {
      const category = await categoryApi.getListCategory();
      // dispatch(updateCategory(category.data.allCate));
      setCategory(category.data.allCate);
    };
    getListCategoryHandle();
    // console.log("success");
  }, []);

  const handleSelectedCart = (category) => {
    // console.log("success");
    dispatch(updateCategory(category));
  };
  function handleLogout() {
    dispatch(logout());
    dispatch(logoutCart());
    localStorage.clear();
    navigate("/login");
    toast.success("Logout Successful");
  }
  // console.log(window.location.pathname);

  return (
    // <Navbar style={{ background: "#EAEAEA" }} expand="lg">
    //   <Container>
    //     <LinkContainer to="/">
    //       <Navbar.Brand>Tech Store</Navbar.Brand>
    //     </LinkContainer>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="ms-auto">
    //         {/* if no user */}
    //         {!user && (
    //           <LinkContainer to="/login">
    //             <Nav.Link>Login</Nav.Link>
    //           </LinkContainer>
    //         )}
    //         {user && !user.admin && (
    //           <LinkContainer to="/cart">
    //             <Nav.Link>
    //               <i className="fas fa-shopping-cart"></i>
    //               {totalQuantity > 0 && (
    //                 <span className="badge badge-warning" id="cartcount">
    //                   {totalQuantity}
    //                 </span>
    //               )}
    //             </Nav.Link>
    //           </LinkContainer>
    //         )}
    //         {/* if user */}
    //         {user && (
    //           <NavDropdown
    //             title={`${user.user.username}`}
    //             id="basic-nav-dropdown"
    //           >
    //             {user.admin && (
    //               <>
    //                 <LinkContainer to="/dashboard ">
    //                   <NavDropdown.Item>Dashboard</NavDropdown.Item>
    //                 </LinkContainer>
    //                 <LinkContainer to="/new-product">
    //                   <NavDropdown.Item>Create Product</NavDropdown.Item>
    //                 </LinkContainer>
    //               </>
    //             )}
    //             {!user.admin && (
    //               <>
    //                 <LinkContainer to="/cart ">
    //                   <NavDropdown.Item>Cart</NavDropdown.Item>
    //                 </LinkContainer>
    //                 <LinkContainer to="/orders">
    //                   <NavDropdown.Item>My Orders</NavDropdown.Item>
    //                 </LinkContainer>
    //               </>
    //             )}
    //             <NavDropdown.Divider />
    //             <Button
    //               variant="danger"
    //               onClick={handleLogout}
    //               className="logout-btn"
    //             >
    //               Logout
    //             </Button>
    //           </NavDropdown>
    //         )}
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
    <>
      {window.location.pathname !== "/login" &&
      window.location.pathname !== "/signup" ? (
        <>
          {window.location.pathname.startsWith("/admin") ? (
            <>
              <Navbar
                className="bg-secondary navbar-secondary mb-4"
                expand="lg"
              >
                <Container>
                  <div className="col-lg-4">
                    <Link to={"/"} className="text-decoration-none">
                      <span className="h2 text-uppercase text-primary bg-dark px-2">
                        Tech
                      </span>
                      <span className="h2 text-uppercase text-dark bg-primary px-2 ml-n1">
                        Shop
                      </span>
                    </Link>
                  </div>
                  <div className="navbar-nav mr-auto py-0">
                    <Link to={"/admin"} className="nav-item nav-link">
                      Dashboard
                    </Link>
                    <Link to={"/admin/clients"} className="nav-item nav-link">
                      Clients
                    </Link>
                    <Link to={"/admin/orders"} className="nav-item nav-link">
                      Orders
                    </Link>
                    <div className="nav-item dropdown">
                      <Link
                        href="#"
                        className="nav-link dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        Products <i className="fa fa-angle-down mt-1"></i>
                      </Link>
                      <div className="dropdown-menu bg-primary rounded-0 border-0 m-0">
                        <Link to={"/admin/products"} className="dropdown-item">
                          List Products
                        </Link>
                        <Link
                          to={"/admin/new-product"}
                          className="dropdown-item"
                        >
                          New Product
                        </Link>
                      </div>
                    </div>
                  </div>
                  <NavDropdown
                    title={`${user.user.username}`}
                    id="basic-nav-dropdown"
                  >
                    <Button
                      variant="danger"
                      onClick={handleLogout}
                      className="logout-btn"
                    >
                      Logout
                    </Button>
                  </NavDropdown>
                </Container>
              </Navbar>
            </>
          ) : (
            <>
              <div className="container-fluid">
                <div className="row bg-secondary py-1 px-xl-5">
                  <div className="col-lg-6 d-none d-lg-block">
                    <div className="d-inline-flex align-items-center h-100">
                      <Link className="text-body mr-3" href="">
                        About
                      </Link>
                      <Link className="text-body mr-3" href="">
                        Contact
                      </Link>
                      <Link className="text-body mr-3" href="">
                        Help
                      </Link>
                      <Link className="text-body mr-3" href="">
                        FAQs
                      </Link>
                      {user && user.user.admin && (
                        <Link to={"/admin"} className="text-body mr-3">
                          Admin
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 text-center text-lg-right">
                    <div className="d-inline-flex align-items-center">
                      <div className="btn-group">
                        {!user && (
                          <>
                            <Button
                              type="button"
                              className="btn btn-sm btn-light dropdown-toggle"
                              data-toggle="dropdown"
                            >
                              My Account
                            </Button>
                            <div className="dropdown-menu dropdown-menu-right">
                              <LinkContainer to={"/login"}>
                                <Button className="dropdown-item" type="button">
                                  Sign in
                                </Button>
                              </LinkContainer>
                              <LinkContainer to={"/signup"}>
                                <Button className="dropdown-item" type="button">
                                  Sign up
                                </Button>
                              </LinkContainer>
                            </div>
                          </>
                        )}
                        {user && !user.admin && (
                          <>
                            <Button
                              type="button"
                              className="btn btn-sm btn-light dropdown-toggle"
                              data-toggle="dropdown"
                            >
                              {user.user.username}
                            </Button>
                            <div className="dropdown-menu dropdown-menu-right">
                              <Button
                                variant="danger"
                                onClick={handleLogout}
                                className="logout-btn dropdown-item"
                              >
                                Logout
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="d-inline-flex align-items-center d-block d-lg-none">
                      <Link className="btn px-0 ml-2">
                        <i className="fas fa-shopping-cart text-dark"></i>
                        <span
                          className="badge text-secondary text-dark"
                          style={{
                            marginLeft: "5px",
                            border: "1px solid black",
                          }}
                        >
                          {totalQuantity}
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
                  <div className="col-lg-4">
                    <Link to={"/"} className="text-decoration-none">
                      <span className="h1 text-uppercase text-primary bg-dark px-2">
                        Tech
                      </span>
                      <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">
                        Shop
                      </span>
                    </Link>
                  </div>
                  <div className="col-lg-4 col-6 text-left">
                    <form action="">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search for products"
                        />
                        <div className="input-group-append">
                          <span className="input-group-text bg-transparent text-primary">
                            <i className="fa fa-search"></i>
                          </span>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-lg-4 col-6 text-right">
                    <p className="m-0">Customer Service</p>
                    <h5 className="m-0">0356034540</h5>
                  </div>
                </div>
              </div>

              <div className="container-fluid bg-dark mb-30">
                <div className="row px-xl-5">
                  {!user?.admin && (
                    <>
                      <div className="col-lg-3 d-none d-lg-block">
                        <a
                          className="btn d-flex align-items-center justify-content-between bg-primary w-100"
                          data-toggle="collapse"
                          href="#navbar-vertical"
                          style={{ height: "65px", padding: "0 30px" }}
                        >
                          <h6 className="text-dark m-0">
                            <i className="fa fa-bars mr-2"></i>Categories
                          </h6>
                          <i className="fa fa-angle-down text-dark"></i>
                        </a>
                        <Nav
                          className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light"
                          id="navbar-vertical"
                          style={{ width: "calc(100% - 30px)", zIndex: "999" }}
                        >
                          {categories &&
                            categories.map((item) => {
                              return (
                                <LinkContainer
                                  key={item.name}
                                  to={"/category"}
                                  onClick={() => handleSelectedCart(item)}
                                >
                                  <div
                                    className="navbar-nav w-100"
                                    key={item.name}
                                  >
                                    <div
                                      className="nav-item nav-link"
                                      style={{ cursor: "pointer" }}
                                    >
                                      {item.name}
                                    </div>
                                  </div>
                                </LinkContainer>
                              );
                            })}
                        </Nav>
                      </div>
                      <div className="col-lg-9">
                        <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                          <Link
                            to={"/"}
                            className="text-decoration-none d-block d-lg-none"
                          >
                            <span className="h1 text-uppercase text-dark bg-light px-2">
                              Tech
                            </span>
                            <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">
                              Shop
                            </span>
                          </Link>
                          <Button
                            type="button"
                            className="navbar-toggler"
                            data-toggle="collapse"
                            data-target="#navbarCollapse"
                          >
                            <span className="navbar-toggler-icon"></span>
                          </Button>
                          <div
                            className="collapse navbar-collapse justify-content-between"
                            id="navbarCollapse"
                          >
                            <div className="navbar-nav mr-auto py-0">
                              <Link to={"/"} className="nav-item nav-link">
                                Home
                              </Link>
                              <Link
                                to={"/products"}
                                className="nav-item nav-link"
                              >
                                Shop
                              </Link>
                              {user && (
                                <Link
                                  to={"/checkorder"}
                                  className="nav-item nav-link"
                                >
                                  My Order
                                </Link>
                              )}
                              {user && (
                                <div className="nav-item dropdown">
                                  <Link
                                    href="#"
                                    className="nav-link dropdown-toggle"
                                    data-toggle="dropdown"
                                  >
                                    Pages{" "}
                                    <i className="fa fa-angle-down mt-1"></i>
                                  </Link>
                                  <div className="dropdown-menu bg-primary rounded-0 border-0 m-0">
                                    <Link
                                      to={"/cart"}
                                      className="dropdown-item"
                                    >
                                      Shopping Cart
                                    </Link>
                                    <Link
                                      to={"/checkout"}
                                      className="dropdown-item"
                                    >
                                      Checkout
                                    </Link>
                                  </div>
                                </div>
                              )}
                            </div>
                            {user && (
                              <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                                <Link to={"/cart"} className="btn px-0 ml-3">
                                  <i className="fas fa-shopping-cart text-primary"></i>
                                  <span
                                    className="badge text-secondary"
                                    style={{
                                      marginLeft: "5px",
                                      border: "1px solid white",
                                    }}
                                  >
                                    {totalQuantity}
                                  </span>
                                </Link>
                              </div>
                            )}
                          </div>
                        </nav>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <Navbar style={{ background: "#EAEAEA" }} expand="lg">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Tech Store</Navbar.Brand>
            </LinkContainer>
          </Container>
        </Navbar>
      )}
    </>
  );
}

export default Navigation;
