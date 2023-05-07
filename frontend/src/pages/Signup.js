import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { useSignupMutation } from "../services/appApi";
import { toast } from "react-toastify";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [signup, { error, isLoading, isError }] = useSignupMutation();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password === passwordConfirm) {
      const { data } = await signup({ name, username, email, password });
      if (data.success) {
        toast.success("Register User Successful");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } else {
      toast.warning("Incorrect password confirmation");
    }
  };

  return (
    <Container>
      <Row>
        <Col md={6} className="signup__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleSignup}>
            <h1>Create an account</h1>
            {isError && <Alert variant="danger">{error.data}</Alert>}
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
                type="text"
                placeholder="Enter Username"
                value={username}
                required
                onChange={(e) => setUserName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={passwordConfirm}
                required
                onChange={(e) => setPasswordConfirm(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email Address"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Button type="submit" disabled={isLoading}>
                Create Account
              </Button>
            </Form.Group>
            <p>
              Don't have an account? <Link to="/login">Login</Link>
            </p>
          </Form>
        </Col>
        <Col md={6} className="signup__image--container"></Col>
      </Row>
    </Container>
  );
}

export default Signup;
