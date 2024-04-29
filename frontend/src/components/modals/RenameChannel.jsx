import React, { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import {
  Button, Modal, Form,
  InputGroup,
} from 'react-bootstrap';
import filter from 'leo-profanity';

import { editChannel } from '../../store/channelsApi';

const RenameChannel = (props) => {
  const { t } = useTranslation();
  const [onSubmitChannel] = editChannel();
  const { onHide, nameChannels, modalChannel } = props;
  const { id, name: currentName } = modalChannel.channel;

  const onSubmitRenameChannel = async (newNameChannel) => {
    const { name } = newNameChannel;
    const filteredName = filter.clean(name);
    onSubmitChannel({ id, name: filteredName })
      .unwrap()
      .then(() => {
        toast.success(t('toastMessage.channelRenamed'));
      })
      .catch((error) => {
        toast.error(t('toastMessage.dataLoadingError'));
        console.log(error);
      });

    onHide();
  };

  const channelsSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(t('modal.shemaRequired'))
      .min(3, t('modal.shemaNameChannel'))
      .max(20, t('modal.shemaNameChannel'))
      .notOneOf(nameChannels, t('modal.duplicate')),
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  return (
    <Formik
      validationSchema={channelsSchema}
      onSubmit={onSubmitRenameChannel}
      initialValues={{ name: currentName }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        errors,
      }) => (
        <Modal show onHide={onHide} centered>
          <Modal.Header closeButton>
            <Modal.Title>{t('modal.renameChannel')}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <InputGroup hasValidation>
                  <Form.Label htmlFor="name" className="visually-hidden">{t('modal.channelName')}</Form.Label>
                  <Form.Control
                    type="text"
                    ref={inputRef}
                    required
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.name}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group className="d-flex justify-content-end mt-2">
                <Button variant="secondary" type="button" className="me-2" onClick={onHide}>{t('modal.cancel')}</Button>
                <Button variant="primary" type="submit">{t('modal.send')}</Button>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </Formik>
  );
};

export default RenameChannel;
