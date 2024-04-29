import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';
import {
  Navbar, Button, Container,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { getCurrentUser, removeCredentials } from '../../store/authSlice';
import routes from '../../utils/routes.js';

const Header = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const username = useSelector(getCurrentUser);

  const logOut = () => { dispatch(removeCredentials()); };

  return (
    <div className="d-flex flex-column h-100">
      <Navbar bg="white" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to={routes.root()}>{t('header.nameChat')}</Navbar.Brand>
          {username && <Button onClick={logOut}>{t('header.exit')}</Button>}
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default Header;
