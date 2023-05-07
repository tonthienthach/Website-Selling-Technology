import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Signup.css";
//import { useSignupMutation } from '../services/appApi'

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  //const [signup, {error, isLoading, isError}] = useSignupMutation();

  function handleSignup(e) {
    e.preventDefault();
    //signup({name, email, password});
  }

  return (
    <Container>
      <Row>
        <Col md={6} className="signup__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleSignup}>
            <h1>Create an account</h1>
            {/* {isError && <Alert variant='danger'>{error.data}</Alert>} */}
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>UserName </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Username"
                value={username}
                required
                onChange={(e) => setUserName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Email Address"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Button type="submit" /*disabled={isLoading}*/>
                Create Account
              </Button>
            </Form.Group>
            <p>
              Don't have an account? <Link to="/Login">Login</Link>
            </p>
          </Form>
        </Col>
        <Col md={6} className="signup__image--container"></Col>
      </Row>
    </Container>
  );
}

export default Signup;
