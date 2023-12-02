import React, { useEffect } from "react";
import { Container, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Navigation.css";
import NavigationAdmin from "./NavigationAdmin";
import { useLocation } from "react-router-dom";
import NavigationUser from "./NavigationUser";

function Navigation() {
  const location = useLocation();
  useEffect(() => {}, [location]);
  return (
    <>
      {window.location.pathname !== "/login" &&
      window.location.pathname !== "/forgot-password" &&
      window.location.pathname !== "/signup" ? (
        <>
          {window.location.pathname.startsWith("/admin") ? (
            <NavigationAdmin />
          ) : (
            <NavigationUser />
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
