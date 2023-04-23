import React, { useEffect, useState } from "react";
import { Container, Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../features/userSlice";
import "./Navigation.css";
import {instance} from "../axios/axios";
import { useNavigate } from "react-router-dom";
import { logoutCart } from "../features/cartSlice";
import { toast } from "react-toastify"

function Navigation() {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  
  // console.log(user?.token);
  const dispatch = useDispatch();

  // const [totalQuantity, setTotalQuantity] = useState(0);
  const totalQuantity = cart?.reduce((total, item) => {
      total+=item.quantity;
      return total;
  }, 0)

  // console.log(totalQuantity);

  // useEffect(() => {
  //   if(user && user.token) {
  //     instance.get('/api/cart').then(({data}) => {
  //       setTotalQuantity(data.totalQuantity);
  //     });
  //   }
  //   }
  //   ,[user, totalQuantity])

  function handleLogout() {
    dispatch(logout(),);
    dispatch(logoutCart());
    localStorage.clear();
    navigate("/login");
    toast.success("Logout Successful")
  }
  // console.log(totalQuantity);

  return (
    <Navbar style={{ background: "#EAEAEA" }} expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Tech Store</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* if no user */}
            {!user && (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}
            {user && !user.isAdmin && (
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>
                  {totalQuantity > 0 && (
                    <span className="badge badge-warning" id="cartcount">
                      {totalQuantity}
                    </span>
                  )}
                </Nav.Link>
              </LinkContainer>
            )}
            {/* if user */}
            {user && (
              <NavDropdown
                title={`${user.user.username}`}
                id="basic-nav-dropdown"
              >
                {user.isAdmin && (
                  <>
                    <LinkContainer to="/dashboard ">
                      <NavDropdown.Item>Dashboard</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/new-product">
                      <NavDropdown.Item>Create Product</NavDropdown.Item>
                    </LinkContainer>
                  </>
                )}
                {!user.isAdmin && (
                  <>
                    <LinkContainer to="/cart ">
                      <NavDropdown.Item>Cart</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orders">
                      <NavDropdown.Item>My Orders</NavDropdown.Item>
                    </LinkContainer>
                  </>
                )}
                <NavDropdown.Divider />
                <Button
                  variant="danger"
                  onClick={handleLogout}
                  className="logout-btn"
                >
                  Logout
                </Button>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
