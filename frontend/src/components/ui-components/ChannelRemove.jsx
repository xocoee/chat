import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { removeChannel } from '../../store/channelsSlice';

const ChannelRemove = ({ close, channelId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleDeleteChannel = () => {
    dispatch(removeChannel(channelId));
    close();
    toast.success(t('toastMessage.channelRemoved'));
  };

  return (
    <Modal show onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('channelRemovePage.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('channelRemovePage.body')}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          {t('channelRemovePage.buttomCancel')}
        </Button>
        <Button variant="danger" onClick={handleDeleteChannel}>
          {t('channelRemovePage.buttomDelete')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChannelRemove;
