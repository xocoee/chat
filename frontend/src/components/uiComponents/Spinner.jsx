import React from 'react';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'react-bootstrap';

const CustomSpinner = () => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Spinner animation="border" role="status">
        <span className="visually-hidden">{t('spinner.title')}</span>
      </Spinner>
    </div>
  );
};

export default CustomSpinner;
