import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Form, InputGroup, FormControl, Col, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';

import { getMessages } from '../../store/chatSelector.js';
import { addMessage } from '../../store/messagesSlice.js';
import { getUserData } from '../../utils/storageUtils.js';
import getMessageCountLabel from '../../utils/messageUtils.js';

const Message = ({ selectedChannel, chats }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { messages } = useSelector(getMessages);
  const refContainer = useRef(null);
  useEffect(() => {
    if (refContainer.current) {
      refContainer.current.focus();
    }
  }, [selectedChannel, messages]);

  const validationSchema = yup.object().shape({
    body: yup
      .string()
      .trim()
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema,
    onSubmit: async ({ body }) => {
      const message = {
        body: filter.clean(body),
        channelId: selectedChannel,
        username: getUserData(),
      };

      try {
        await dispatch(addMessage(message));
        formik.resetForm();
      } catch (error) {
        toast.error(t('toastMessage.dataLoadingError'));
      }
      formik.setSubmitting(false);
    },
  });

  const isInvalid = !formik.dirty || !formik.isValid;

  const messageCountLabel = getMessageCountLabel(messages.length, t);

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {' '}
              {selectedChannel ? (
                chats.find((channel) => channel.id === selectedChannel)?.name || ''
              ) : ''}
            </b>
          </p>
          <span className="text-muted">{`${messages.length} ${messageCountLabel}`}</span>
        </div>
        <div className="chat-messages overflow-auto px-5 ">
          {messages.map((message) => (
            <div key={message.id} className="text-break mb-2">
              <b>{message.username}</b>
              :
              {' '}
              {message.body}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <Form noValidate onSubmit={formik.handleSubmit}>
            <InputGroup hasValidation={isInvalid}>
              <FormControl
                type="text"
                name="body"
                value={formik.values.body}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                ref={refContainer}
                aria-label={t('messages.newMessage')}
                placeholder={t('messages.messageFormPlaceholder')}
              />
              <Button variant="group-vertical" type="submit" disabled={isInvalid}>
                <ArrowRightSquare size={20} />
                <span className="visually-hidden">{t('messages.send')}</span>
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </Col>
  );
};

export default Message;
