import React, { useRef, useEffect } from 'react';
import {
  Button, Dropdown, ButtonGroup, Nav,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ChannelList = (props) => {
  const {
    channels,
    onActive,
    activeId,
    showModal,
  } = props;
  const { t } = useTranslation();
  const activeChannelRef = useRef(null);

  const scrollToActiveChannel = () => {
    if (activeChannelRef.current) {
      activeChannelRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  useEffect(() => {
    scrollToActiveChannel();
  }, [channels]);

  const getChannel = (channel) => {
    const isActive = channel.id === activeId;
    const ref = isActive ? activeChannelRef : null;
    const variant = isActive ? 'secondary' : 'light';
    const onClick = () => { onActive(channel); };
    const dropdown = () => (
      <>
        <Dropdown.Toggle split variant={variant} id="dropdown-split-basic">
          <span className="visually-hidden">{t('channel.channelControl')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => { showModal('removing', channel); }}>
            {t('modal.delete')}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => { showModal('renaming', channel); }}>
            {t('modal.rename')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </>
    );

    return (
      <Nav.Item key={channel.id} ref={ref} className="w-100">
        <Dropdown as={ButtonGroup} className="d-flex dropdown btn-group">
          <Button onClick={onClick} variant={variant} className="w-100 rounded-0 text-start text-truncate">
            <span className="me-1">#</span>
            {channel.name}
          </Button>
          {channel.removable && dropdown()}
        </Dropdown>
      </Nav.Item>
    );
  };

  return (
    <Nav className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels.map(getChannel)}
    </Nav>
  );
};

export default ChannelList;
