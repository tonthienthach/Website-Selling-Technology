import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userApi from "../axios/userApi";

function ForgotPassword() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleForgot = async (e) => {
    e.preventDefault();
    const { data } = await userApi.forgotPassword({ username });
    console.log(data);
    if (data?.success) {
      toast.success("Password was sent to your email");

      setTimeout(() => {
        navigate("/login");
      }, 500);
    } else {
      toast.error("Change password failed");
    }
  };

  return (
    <Container>
      <Row>
        <Col md={6} className="login__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleForgot}>
            <h1>Forgotten Password</h1>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Button type="submit" className="w-100">
                Send
              </Button>
            </Form.Group>
            <p className="w-100 text-center">
              <Link to="/login">Cancel </Link>
            </p>
          </Form>
        </Col>
        <Col md={6} className="login__image--container"></Col>
      </Row>
    </Container>
  );
}

export default ForgotPassword;
