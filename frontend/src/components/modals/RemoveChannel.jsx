import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import { removeChannel } from '../../store/channelsApi';

const RemoveChannel = (props) => {
  const { t } = useTranslation();
  const { onHide, modalChannel } = props;
  const [onSubmitChannel] = removeChannel();
  const { id } = modalChannel.channel;

  const onDelete = async () => {
    onSubmitChannel(id)
      .unwrap()
      .then(() => {
        toast.success(t('toastMessage.channelRemoved'));
      })
      .catch((error) => {
        toast.error(t('toastMessage.dataLoadingError'));
        console.log(error);
      });
    onHide();
  };

  return (
    <Modal show onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('channelRemovePage.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('channelRemovePage.body')}</p>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary" onClick={onHide}>
            {t('channelRemovePage.buttomCancel')}
          </Button>
          <Button variant="danger" onClick={onDelete}>
            {t('channelRemovePage.buttomDelete')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
