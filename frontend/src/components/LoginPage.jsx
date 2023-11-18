import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Image,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/index.jsx";
import routes from "../routes.js";
import img from "../assets/imageLoginPage.jpeg";

const LoginPage = () => {
  const { logIn } = useAuth();
  const location = useLocation();
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
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem("userId", JSON.stringify(res.data));
        logIn();
        navigate(location.state.from);
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
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col md={8} xxl={6} className="col-12">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <Image src={img} roundedCircle alt="Войти" />
              </div>

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
                    value={formik.values.password}
                    isInvalid={authFailed}
                  />
                  <Form.Label htmlFor="password">Пароль</Form.Label>

                  <div className="invalid-tooltip">
                    Неверные имя пользователя или пароль
                  </div>
                </Form.Floating>
                <Button
                  type="submit"
                  className="w-100 mb-3"
                  variant="outline-primary"
                >
                  Войти
                </Button>
              </Form>
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
};

export default LoginPage;
