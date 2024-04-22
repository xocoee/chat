import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Modal, Form,
  FormGroup, FormControl, FormLabel,
} from 'react-bootstrap';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';

import { fetchChannels, renameChannel } from '../../store/channelsSlice';
import { getChats } from '../../store/chatSelector';

const ChannelRename = ({ close, channelId }) => {
  const { t } = useTranslation();
  const refContainer = useRef(null);

  useEffect(() => {
    refContainer.current.focus();
  }, []);

  const dispatch = useDispatch();
  const { chats } = useSelector(getChats);
  const namesChats = chats.map((item) => item.name);

  const channelsSchema = (channels) => yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(t('modal.shemaRequired'))
      .min(3, t('modal.shemaNameChannel'))
      .max(20, t('modal.shemaNameChannel'))
      .notOneOf(channels, t('modal.duplicate')),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: channelsSchema(namesChats),
    validateOnChange: false,
    onSubmit: async (values) => {
      const { name } = values;
      const filterName = filter.clean(name);
      formik.setSubmitting(true);
      try {
        await dispatch(renameChannel({ channelId, newName: filterName }));
        close();
        dispatch(fetchChannels());
        toast.success(t('toastMessage.channelRenamed'));
      } catch (error) {
        toast.error(t('toastMessage.dataLoadingError'));
      }
    },
  });

  return (
    <Modal show onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.renameChannel')}</Modal.Title>
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
              <Button variant="secondary" type="button" className="me-2" onClick={close}>{t('modal.cancel')}</Button>
              <Button variant="primary" type="submit" onClick={formik.handleSubmit}>{t('modal.send')}</Button>
            </div>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ChannelRename;
