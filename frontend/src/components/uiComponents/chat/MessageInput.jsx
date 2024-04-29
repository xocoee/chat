import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Button, Container, Form, InputGroup,
} from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';

import filter from 'leo-profanity';
import { addMessage } from '../../../store/messagesApi';
import { getCurrentUser } from '../../../store/authSlice';

const MessageInput = ({ activeChannel }) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);
  const [onSubmitMessage, { isLoading }] = addMessage();
  const username = useSelector(getCurrentUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    const modaratedMessage = filter.clean(message);
    onSubmitMessage({ body: modaratedMessage, channelId: activeChannel?.id, username });
    setMessage('');
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [activeChannel]);

  return (
    <Container className="mt-auto px-5 py-3">
      <Form onSubmit={handleSubmit}>
        <InputGroup size="lg">
          <Form.Control
            type="text"
            name="body"
            aria-label={t('messages.newMessage')}
            placeholder={t('messages.messageFormPlaceholder')}
            className=""
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            ref={inputRef}
          />
          <Button variant="group-vertical" type="submit" disabled={!message || isLoading}>
            <ArrowRightSquare size={20} />
            <span className="visually-hidden">{t('messages.send')}</span>
          </Button>
        </InputGroup>
      </Form>
    </Container>
  );
};

export default MessageInput;
