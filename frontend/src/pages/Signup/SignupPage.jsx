import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Form,
  Button,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../../api/index.js';
import useAuth from '../../hooks/useAuth.jsx';
import routes from '../../utils/routes.js';
import img from '../../assets/signup.jpg';

const SignupForm = () => {
  const { t } = useTranslation();
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const [registrationFailed, setRegistrationFailed] = useState(false);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const signupSchema = Yup.object().shape({
    username: Yup.string()
      .required(t('validate.required'))
      .trim()
      .min(3, t('validate.min_max'))
      .max(20, t('validate.min_max')),
    password: Yup.string()
      .min(6, t('validate.passwordMin'))
      .trim()
      .required(t('validate.required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('validate.mustMatch'))
      .required(t('validate.required')),
  });
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      setRegistrationFailed(false);
      const registrationData = {
        username: values.username,
        password: values.password,
      };
      try {
        const response = await api.post(
          routes.signup(),
          registrationData,
        );
        logIn(response);
        navigate(routes.chatPage());
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
    <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('signup.title')}</h1>
      <Form.Floating className="mb-3">
        <Form.Control
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          ref={inputRef}
          name="username"
          autoComplete="username"
          required
          placeholder={t('validate.min_max')}
          id="username"
          value={formik.values.username}
          isInvalid={
            (formik.touched.username && formik.errors.username)
            || registrationFailed
          }
        />
        <Form.Label htmlFor="username">{t('signup.labelName')}</Form.Label>
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
          placeholder={t('validate.passwordMin')}
          type="password"
          id="password"
          value={formik.values.password}
          isInvalid={
            (formik.touched.password && formik.errors.password)
            || registrationFailed
          }
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.password}
        </Form.Control.Feedback>

        <Form.Label htmlFor="password">{t('signup.labelPassword')}</Form.Label>
      </Form.Floating>
      <Form.Floating className="mb-4">
        <Form.Control
          name="confirmPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete="new-password"
          required
          placeholder={t('validate.mustMatch')}
          type="password"
          id="confirmPassword"
          value={formik.values.confirmPassword}
          isInvalid={
            (formik.touched.confirmPassword && formik.errors.confirmPassword)
            || registrationFailed
          }
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {registrationFailed
            ? t('signup.alreadyExists')
            : formik.errors.confirmPassword}
        </Form.Control.Feedback>
        <Form.Label htmlFor="confirmPassword">
          {t('signup.labelConfirmPassword')}
        </Form.Label>
      </Form.Floating>
      <Button type="submit" className="w-100 mb-3" variant="outline-primary">
        {t('signup.buttonSignup')}
      </Button>
    </Form>
  );
};

const SignupPage = () => {
  const { t } = useTranslation();
  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col md={8} xxl={6} className="col-12">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <Image src={img} alt={t('signup.title')} />
              </div>
              <SignupForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
