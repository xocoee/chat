import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';
import {
  Navbar, Button, Container, ButtonGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { getCurrentUser, removeCredentials } from '../../store/authSlice';
import routes from '../../utils/routes.js';

const Header = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const username = useSelector(getCurrentUser);

  const logOut = () => { dispatch(removeCredentials()); };

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="d-flex flex-column h-100">
      <Navbar bg="white" expand="lg" className="shadow-sm">
        <Container>
          <ButtonGroup>
            <Button
              variant={i18n.language === 'ua' ? 'primary' : 'light'}
              onClick={() => changeLanguage('ua')}
            >
              UA
            </Button>
            <Button
              variant={i18n.language === 'en' ? 'primary' : 'light'}
              onClick={() => changeLanguage('en')}
            >
              EN
            </Button>
          </ButtonGroup>
          <Navbar.Brand className="col-1" as={Link} to={routes.root()}>{t('header.nameChat')}</Navbar.Brand>
          {username && <Button onClick={logOut}>{t('header.exit')}</Button>}
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default Header;
