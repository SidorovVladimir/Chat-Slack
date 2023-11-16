// import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import img from "../assets/imageLoginPage.jpeg";

const LoginPage = () => (
  <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <img src={img} className="rounded-circle" alt="Войти" />
            </div>
            <Form className="col-12 col-md-6 mt-3 mt-mb-0">
              <h1 className="text-center mb-4">Войти</h1>
              <Form.Floating className="mb-3">
                <Form.Control
                  name="username"
                  autocomplete="username"
                  required
                  placeholder="Ваш ник"
                  id="username"
                  className="is-invalid"
                  value=""
                />
                <Form.Label htmlFor="username">Ваш ник</Form.Label>
              </Form.Floating>
              <Form.Floating className="mb-4">
                <Form.Control
                  name="password"
                  autocomplete="current-password"
                  required
                  placeholder="Пароль"
                  type="password"
                  id="password"
                  className="is-invalid"
                  value=""
                />
                <Form.Label htmlFor="password">Пароль</Form.Label>
              </Form.Floating>
              <Button
                type="submit"
                className="w-100 mb-3"
                variant="outline-primary"
              >
                Войти
              </Button>
            </Form>
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <span>Нет aккаунта? </span>
              <a href="/signup">Регистрация</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LoginPage;
