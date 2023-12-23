import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Form,
  Button,
} from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';
import routes from '../routes.js';
import img from '../assets/imageLoginPage.jpeg';

const LoginForm = () => {
  const rollbar = useRollbar();
  const { t } = useTranslation();
  const { logIn } = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const response = await axios.post(routes.loginPath(), values);
        logIn(response);
        navigate(routes.chatPagePath());
      } catch (err) {
        rollbar.error(err);
        if (err.message === 'Network Error') {
          toast.error(t('errors.networkError'));
        }
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
      <h1 className="text-center mb-4">{t('login.title')}</h1>
      <Form.Floating className="mb-3">
        <Form.Control
          ref={inputRef}
          name="username"
          autoComplete="username"
          required
          placeholder={t('login.labelName')}
          id="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          isInvalid={authFailed}
        />
        <Form.Label htmlFor="username">{t('login.labelName')}</Form.Label>
      </Form.Floating>
      <Form.Floating className="mb-4">
        <Form.Control
          name="password"
          autoComplete="current-password"
          required
          placeholder={t('login.labelPassword')}
          type="password"
          id="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          isInvalid={authFailed}
        />
        <Form.Label htmlFor="password">{t('login.labelPassword')}</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip>
          {t('login.formFeedback')}
        </Form.Control.Feedback>
      </Form.Floating>
      <Button type="submit" className="w-100 mb-3" variant="outline-primary">
        {t('login.buttonLogIn')}
      </Button>
    </Form>
  );
};

const LoginPage = () => {
  const { t } = useTranslation();
  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col md={8} xxl={6} className="col-12">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <Image src={img} roundedCircle alt={t('login.title')} />
              </div>
              <LoginForm />
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('login.noAccount')}</span>
                <a href="/signup">{t('login.signup')}</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
