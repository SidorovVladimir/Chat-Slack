import { Container, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
import routes from "../routes.js";

const AuthButton = () => {
  const auth = useAuth();

  return auth.currentUser ? (
    <Button onClick={auth.logOut} as={Link} to={routes.loginPagePath()}>
      Выйти
    </Button>
  ) : null;
};
const Nav = () => (
  <Navbar expand="lg" className="shadow-sm bg-white">
    <Container>
      <Navbar.Brand as={Link} to={routes.chatPagePath()}>
        Hexlet Chat
      </Navbar.Brand>
      <AuthButton />
    </Container>
  </Navbar>
);

export default Nav;
