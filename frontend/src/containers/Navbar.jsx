import {
  Container, Navbar as Nav, Button, Dropdown,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';
import routes from '../utils/routes.js';

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">
        {t('navbar.language')}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleLanguageChange('en')}>
          English
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleLanguageChange('ru')}>
          Русский
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const AuthButton = () => {
  const { currentUser, logOut } = useAuth();
  const { t } = useTranslation();

  return currentUser ? (
    <Button onClick={logOut} as={Link} to={routes.login()}>
      {t('navbar.button')}
    </Button>
  ) : <LanguageSelector />;
};

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <Nav expand="lg" className="shadow-sm bg-white">
      <Container>
        <Nav.Brand as={Link} to={routes.chatPage()}>
          {t('navbar.title')}
        </Nav.Brand>
        <AuthButton />
      </Container>
    </Nav>
  );
};

export default Navbar;
