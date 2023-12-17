import React from "react";
import { Button, Container, NavDropdown, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutCart } from "../features/cartSlice";
import { logout } from "../features/userSlice";
import { toast } from "react-toastify";

function NavigationAdmin() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    dispatch(logoutCart());
    localStorage.clear();
    navigate("/login");
    toast.success("Logout Successful");
  }
  return (
    <>
      <Navbar className="bg-secondary navbar-secondary mb-4" expand="lg">
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
            <Link to={"/admin/messages"} className="nav-item nav-link">
              Messages
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
                <Link to={"/admin/new-product"} className="dropdown-item">
                  New Product
                </Link>
              </div>
            </div>
            <div className="nav-item dropdown">
              <Link
                href="#"
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
              >
                Vouchers <i className="fa fa-angle-down mt-1"></i>
              </Link>
              <div className="dropdown-menu bg-primary rounded-0 border-0 m-0">
                <Link to={"/admin/vouchers"} className="dropdown-item">
                  List Voucher
                </Link>
                <Link to={"/admin/new-voucher"} className="dropdown-item">
                  New Voucher
                </Link>
              </div>
            </div>
          </div>
          <NavDropdown title={`${user.user.name}`} id="basic-nav-dropdown">
            <Button
              variant="danger"
              onClick={handleLogout}
              className="logout-btn"
            >
              <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
            </Button>
          </NavDropdown>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationAdmin;
