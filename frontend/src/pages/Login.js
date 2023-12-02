import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../services/appApi";
import { useDispatch } from "react-redux";
import { updateCart } from "../features/cartSlice";
import { updateUser } from "../features/userSlice";
import { toast } from "react-toastify";
import Divider from "@mui/material/Divider";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { error, isError, isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = await login({ username, password });
    console.log(user);
    if (user.data?.success) {
      toast.success("Login Successful");
      dispatch(updateUser(user.data));
      dispatch(updateCart(user.data.user.cart));
      setTimeout(() => {
        navigate("/");
      }, 500);
    } else {
      toast.error("Invalid Username or Password");
    }
  };

  const handleLoginGoogle = () => {
    window.location.replace("http://localhost:5000/api/auth/google");
    // navigate("http://localhost:5000/api/auth/google");
  };

  return (
    <Container>
      <Row>
        <Col md={6} className="login__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleLogin}>
            <h1>Login to your account</h1>
            {isError && <Alert variant="danger">{error.data}</Alert>}
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
              <Button type="submit" disabled={isLoading} className="w-100">
                Login
              </Button>
            </Form.Group>
            <p className="w-100 text-center">
              <Link to="/forgot-password">Forgotten Password </Link>
            </p>
            <p className="w-100 text-center">
              Don't have an account? <Link to="/signup">Create Account</Link>
            </p>

            <Divider>Or</Divider>
            <Button onClick={() => handleLoginGoogle()} className="w-100 mt-4">
              Google
            </Button>
          </Form>
        </Col>
        <Col md={6} className="login__image--container"></Col>
      </Row>
    </Container>
  );
}

export default Login;
