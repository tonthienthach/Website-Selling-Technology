import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function NavigationLogin() {
  return (
    <Navbar style={{ background: "#EAEAEA" }} expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Tech Store</Navbar.Brand>
        </LinkContainer>
      </Container>
    </Navbar>
  );
}

export default NavigationLogin;
