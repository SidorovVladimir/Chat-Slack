import { Container, Navbar, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';
import routes from '../routes.js';

const AuthButton = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return auth.currentUser ? (
    <Button onClick={auth.logOut} as={Link} to={routes.loginPagePath()}>
      {t('navbar.button')}
    </Button>
  ) : null;
};
const Nav = () => {
  const { t } = useTranslation();
  return (
    <Navbar expand="lg" className="shadow-sm bg-white">
      <Container>
        <Navbar.Brand as={Link} to={routes.chatPagePath()}>
          {t('navbar.title')}
        </Navbar.Brand>
        <AuthButton />
      </Container>
    </Navbar>
  );
};

export default Nav;
