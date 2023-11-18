import { Button, Form } from "react-bootstrap";
import img from "../assets/imageSignupPage.jpg";

const SignupPage = () => (
  <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
            <div>
              <img src={img} className="rounded-circle" alt="Регистрация" />
            </div>
            <Form className="w-50">
              <h1 className="text-center mb-4">Регистрация</h1>
              <Form.Floating className="mb-3">
                <Form.Control
                  name="username"
                  autoComplete="username"
                  required
                  placeholder="От 3 до 20 символов"
                  id="username"
                  className="is-invalid"
                  value=""
                />
                <Form.Label htmlFor="username">Имя пользователя</Form.Label>
              </Form.Floating>
              <Form.Floating className="mb-4">
                <Form.Control
                  name="password"
                  aria-description="passwordHelpBlock"
                  autoComplete="new-password"
                  required
                  placeholder="Не менее 6 символов"
                  type="password"
                  id="password"
                  className="is-invalid"
                  value=""
                />
                <Form.Label htmlFor="password">Пароль</Form.Label>
              </Form.Floating>
              <Form.Floating className="mb-4">
                <Form.Control
                  name="confirmPassword"
                  autoComplete="new-password"
                  required
                  placeholder="Пароли должны совпадать"
                  type="password"
                  id="password"
                  className="is-invalid"
                  value=""
                />
                <Form.Label htmlFor="confirmPassword">
                  Подтвердите пароль
                </Form.Label>
              </Form.Floating>
              <Button
                type="submit"
                className="w-100 mb-3"
                variant="outline-primary"
              >
                Зарегистрироваться
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default SignupPage;
