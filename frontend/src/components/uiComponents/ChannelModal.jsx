import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import {
  Modal, FormGroup, FormControl, FormLabel, Button, Form,
} from 'react-bootstrap';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';

import { addChannels } from '../../store/channelsSlice.js';
import { getAuthConfig } from '../../utils/storageUtils.js';
import { getChats } from '../../store/chatSelector.js';

const ChannelModal = ({ closeHandler }) => {
  const { t } = useTranslation();
  const refContainer = useRef('');
  const dispatch = useDispatch();
  const { channels } = useSelector(getChats);

  const namesChats = channels.map((item) => item.name);

  useEffect(() => {
    refContainer.current.focus();
  }, []);

  const channelsSchema = (channel) => yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(t('modal.shemaRequired'))
      .min(3, t('modal.shemaNameChannel'))
      .max(20, t('modal.shemaNameChannel'))
      .notOneOf(channel, t('modal.duplicate')),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: channelsSchema(namesChats),
    validateOnChange: false,
    onSubmit: async ({ name }) => {
      const filterName = filter.clean(name);
      const channel = { name: filterName };
      formik.setSubmitting(true);
      try {
        await dispatch(addChannels(channel, getAuthConfig()));
        closeHandler();
        toast.success(t('toastMessage.channelAdded'));
      } catch (error) {
        toast.error(t('toast.dataLoadingError'));
      }
    },
  });

  return (
    <Modal show onHide={closeHandler} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              className="mb-2"
              ref={refContainer}
              id="name"
              name="name"
              required=""
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={!!formik.errors.name}
            />
            <FormLabel htmlFor="name" className="visually-hidden">{t('modal.channelName')}</FormLabel>
            <FormControl.Feedback type="invalid">
              {formik.errors.name}
            </FormControl.Feedback>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" type="button" className="me-2" onClick={closeHandler}>{t('modal.cancel')}</Button>
              <Button variant="primary" type="submit" onClick={formik.handleSubmit} disabled={formik.isSubmitting}>{t('modal.send')}</Button>
            </div>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ChannelModal;
