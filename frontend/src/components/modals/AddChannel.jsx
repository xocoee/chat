import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import {
  Button, Modal, Form, InputGroup,
} from 'react-bootstrap';
import filter from 'leo-profanity';

import { addChannel } from '../../store/channelsApi';
import { setActiveChannel } from '../../store/uiSlice';

const AddChannel = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { onHide, nameChannels } = props;
  const [onSubmitChannel] = addChannel();

  const onSubmitAddNewChannel = async (newChannel) => {
    const { name } = newChannel;
    const filteredName = filter.clean(name);

    onSubmitChannel({ name: filteredName })
      .unwrap()
      .then((response) => {
        dispatch(setActiveChannel(response));
        toast.success(t('toastMessage.channelAdded'));
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
  }, []);

  return (
    <Formik
      validationSchema={channelsSchema}
      onSubmit={onSubmitAddNewChannel}
      initialValues={{ name: '' }}
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
            <Modal.Title>{t('modal.addChannel')}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <InputGroup hasValidation>
                  <Form.Control
                    id="name"
                    ref={inputRef}
                    required
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Label htmlFor="name" className="visually-hidden">{t('modal.channelName')}</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </InputGroup>
                <Form.Group className="d-flex justify-content-end mt-2">
                  <Button variant="secondary" type="button" className="me-2" onClick={onHide}>{t('modal.cancel')}</Button>
                  <Button variant="primary" type="submit">{t('modal.send')}</Button>
                </Form.Group>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </Formik>
  );
};

export default AddChannel;
