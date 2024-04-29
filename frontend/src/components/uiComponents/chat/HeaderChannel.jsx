import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { PlusSquare } from 'react-bootstrap-icons';

const HeaderChannel = ({ showModal }) => {
  const { t } = useTranslation();

  return (
    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
      <b>{t('homePage.channels')}</b>
      <Button onClick={() => { showModal('adding'); }} variant="light" className="p-0 text-primary btn-group-vertical">
        <PlusSquare size={20} />
        <span className="visually-hidden">+</span>
      </Button>
    </div>
  );
};

export default HeaderChannel;
