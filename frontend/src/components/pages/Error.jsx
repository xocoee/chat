import React from 'react';
import { Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import errorImages from '../../images/notFound.jpg';

const Error = () => {
  const { t } = useTranslation();

  return (
    <Alert variant="white" className="text-center">
      <img
        src={errorImages}
        className="rounded-circle"
        alt={t('errorPage.error404')}
      />
      <h3>{t('errorPage.error404')}</h3>
      <h5>
        {t('errorPage.errorNavigate')}
        {' '}
        <NavLink to="/">{t('errorPage.homePage')}</NavLink>
      </h5>
    </Alert>
  );
};

export default Error;
