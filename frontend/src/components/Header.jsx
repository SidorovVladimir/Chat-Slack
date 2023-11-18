import { Container, Navbar, Button } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import useAuth from "../hooks/index.jsx";

const AuthButton = () => {
  const auth = useAuth();
  const location = useLocation();
  const userId = JSON.parse(localStorage.getItem("userId"));

  return userId && userId.token ? (
    <Button
      onClick={auth.logOut}
      as={Link}
      to="/login"
      state={{ from: location }}
    >
      Выйти
    </Button>
  ) : null;
};
const Header = () => {
  console.log("Header", 4);
  return (
    <Navbar expand="lg" className="shadow-sm bg-white">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Hexlet Chat
        </Navbar.Brand>
        <AuthButton />
      </Container>
    </Navbar>
  );
};

export default Header;
