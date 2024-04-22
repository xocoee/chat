import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Container, Row, Col,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { PlusSquare } from 'react-bootstrap-icons';

import { getChats } from '../../store/chatSelector.js';
import { fetchChannels } from '../../store/channelsSlice.js';
import { fetchMessages } from '../../store/messagesSlice.js';
import { getIsAuthorized } from '../../utils/storageUtils.js';

import Message from '../ui-components/Messages.jsx';
import ChannelModal from '../ui-components/ChannelModal.jsx';
import { ChannelDefault, ChannelUser } from '../ui-components/ChannelItem.jsx';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { chats, selectedChatIndex } = useSelector(getChats);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [body, setBody] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const channelId = chats[selectedChatIndex]?.id;
    if (channelId) {
      setSelectedChannel(channelId);
      dispatch(fetchMessages(channelId));
    }
  }, [chats, selectedChatIndex, dispatch]);

  useEffect(() => {
    if (!getIsAuthorized()) {
      navigate('/login');
    }
    dispatch(fetchChannels());
    if (selectedChannel) {
      dispatch(fetchMessages(selectedChannel));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, navigate]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleSelect = (id) => {
    setSelectedChannel(id);
    dispatch(fetchMessages(id));
  };

  return (
    <Container className="my-4 overflow-hidden rounded shadow" style={{ height: '100%' }}>
      <Row className="h-100 bg-white d-flex flex-md-row">
        <Col xs={4} md={2} className="border-end px-0 bg-light d-flex flex-column" style={{ height: '100%' }}>
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>{t('homePage.channels')}</b>
            <Button
              type="button"
              variant="group-vertical"
              className="p-0 text-primary"
              onClick={handleShow}
            >
              <PlusSquare size={20} />
              <span className="visually-hidden">+</span>
            </Button>
          </div>
          <ul
            id="channels-box"
            className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
          >
            {chats.map((item) => (
              !item.removable ? (
                <ChannelDefault
                  key={item.id}
                  item={item}
                  selectedChannel={selectedChannel}
                  handleSelect={handleSelect}
                />
              ) : (
                <ChannelUser
                  key={item.id}
                  item={item}
                  selectedChannel={selectedChannel}
                  handleSelect={handleSelect}
                />
              )
            ))}
          </ul>
        </Col>
        <Message
          selectedChannel={selectedChannel}
          chats={chats}
          body={body}
          setBody={setBody}
          handleSelect={handleSelect}
        />
      </Row>
      {showModal && <ChannelModal closeHandler={handleClose} />}
    </Container>

  );
};

export default Home;
