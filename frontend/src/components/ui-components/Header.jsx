import React from 'react';
import {
  Navbar, Button, Container,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getIsAuthorized, removeUserData } from '../../utils/storageUtils';

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const token = getIsAuthorized();

  const handleLogout = () => {
    removeUserData();
    navigate('/login');
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">{t('header.nameChat')}</Navbar.Brand>
        {token && <Button onClick={handleLogout}>{t('header.exit')}</Button>}
      </Container>
    </Navbar>
  );
};

export default Header;
