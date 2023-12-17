import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Form,
  Button,
} from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
import routes from "../routes.js";
import img from "../assets/imageLoginPage.jpeg";

const LoginForm = () => {
  const { logIn } = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const response = await axios.post(routes.loginPath(), values);
        logIn(response);
        navigate(routes.chatPagePath());
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });
  return (
    <Form
      className="col-12 col-md-6 mt-3 mt-mb-0"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-center mb-4">Войти</h1>
      <Form.Floating className="mb-3">
        <Form.Control
          ref={inputRef}
          name="username"
          autoComplete="username"
          required
          placeholder="Ваш ник"
          id="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          isInvalid={authFailed}
        />
        <Form.Label htmlFor="username">Ваш ник</Form.Label>
      </Form.Floating>
      <Form.Floating className="mb-4">
        <Form.Control
          name="password"
          autoComplete="current-password"
          required
          placeholder="Пароль"
          type="password"
          id="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          isInvalid={authFailed}
        />
        <Form.Label htmlFor="password">Пароль</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip>
          Неверные имя пользователя или пароль
        </Form.Control.Feedback>
      </Form.Floating>
      <Button type="submit" className="w-100 mb-3" variant="outline-primary">
        Войти
      </Button>
    </Form>
  );
};

const LoginPage = () => (
  <Container fluid className="h-100">
    <Row className="justify-content-center align-content-center h-100">
      <Col md={8} xxl={6} className="col-12">
        <Card className="shadow-sm">
          <Card.Body className="row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <Image src={img} roundedCircle alt="Войти" />
            </div>
            <LoginForm />
          </Card.Body>
          <Card.Footer className="p-4">
            <div className="text-center">
              <span>Нет aккаунта? </span>
              <a href="/signup">Регистрация</a>
            </div>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default LoginPage;
