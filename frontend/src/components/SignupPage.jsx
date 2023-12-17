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
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../hooks/useAuth.jsx";
import routes from "../routes.js";
import img from "../assets/imageSignupPage.jpg";

const SignupForm = () => {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const [registrationFailed, setRegistrationFailed] = useState(false);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const signupSchema = Yup.object().shape({
    username: Yup.string()
      .required("Обязательное поле")
      .trim()
      .min(3, "От 3 до 20 символов")
      .max(20, "От 3 до 20 символов"),
    password: Yup.string()
      .min(6, "Не менее 6 символов")
      .trim()
      .required("Обязательное поле"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Пароли должны совпадать")
      .required("Обязательное поле"),
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      setRegistrationFailed(false);
      const registrationData = {
        username: values.username,
        password: values.password,
      };
      try {
        const response = await axios.post(
          routes.registrationPath(),
          registrationData
        );
        logIn(response);
        navigate(routes.chatPagePath());
      } catch (err) {
        if (err.response.status === 409) {
          setRegistrationFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });
  return (
    <Form className="w-50" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Регистрация</h1>
      <Form.Floating className="mb-3">
        <Form.Control
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          ref={inputRef}
          name="username"
          autoComplete="username"
          required
          placeholder="От 3 до 20 символов"
          id="username"
          value={formik.values.username}
          isInvalid={
            (formik.touched.username && formik.errors.username) ||
            registrationFailed
          }
        />
        <Form.Label htmlFor="username">Имя пользователя</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.username}
        </Form.Control.Feedback>
      </Form.Floating>
      <Form.Floating className="mb-4">
        <Form.Control
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          aria-description="passwordHelpBlock"
          autoComplete="new-password"
          required
          placeholder="Не менее 6 символов"
          type="password"
          id="password"
          value={formik.values.password}
          isInvalid={
            (formik.touched.password && formik.errors.password) ||
            registrationFailed
          }
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.password}
        </Form.Control.Feedback>

        <Form.Label htmlFor="password">Пароль</Form.Label>
      </Form.Floating>
      <Form.Floating className="mb-4">
        <Form.Control
          name="confirmPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete="new-password"
          required
          placeholder="Пароли должны совпадать"
          type="password"
          id="confirmPassword"
          value={formik.values.confirmPassword}
          isInvalid={
            (formik.touched.confirmPassword && formik.errors.confirmPassword) ||
            registrationFailed
          }
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {registrationFailed
            ? "Такой пользователь уже существует"
            : formik.errors.confirmPassword}
        </Form.Control.Feedback>
        <Form.Label htmlFor="confirmPassword">Подтвердите пароль</Form.Label>
      </Form.Floating>
      <Button type="submit" className="w-100 mb-3" variant="outline-primary">
        Зарегистрироваться
      </Button>
    </Form>
  );
};

const SignupPage = () => (
  <Container fluid className="h-100">
    <Row className="justify-content-center align-content-center h-100">
      <Col md={8} xxl={6} className="col-12">
        <Card className="shadow-sm">
          <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
            <div>
              <Image src={img} roundedCircle alt="Регистрация" />
            </div>
            <SignupForm />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default SignupPage;
