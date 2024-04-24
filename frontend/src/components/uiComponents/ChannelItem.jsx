import React, { useState } from 'react';
import {
  Button, Dropdown, ButtonGroup, Nav,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import ChannelRemove from './ChannelRemove';
import ChannelRename from './ChannelRename';

export const ChannelDefault = ({ item, selectedChannel, handleSelect }) => (
  <Nav.Item className="w-100">
    <Button
      variant={selectedChannel === item.id ? 'secondary' : 'light'}
      className="w-100 rounded-0 text-start text-truncate"
      onClick={() => handleSelect(item.id)}
    >
      {'# '}
      {item.name}
    </Button>
  </Nav.Item>
);

export const ChannelUser = ({ item, selectedChannel, handleSelect }) => {
  const { t } = useTranslation();
  const [renameModalShow, setRenameModalShow] = useState(false);
  const [removeModalShow, setRemoveModalShow] = useState(false);

  const handleRenameModal = () => setRenameModalShow(true);
  const handleRemoveModal = () => setRemoveModalShow(true);

  return (
    <Nav.Item className="w-100">
      <Dropdown className="d-flex btn-group" as={ButtonGroup}>
        <Button
          variant={selectedChannel === item.id ? 'secondary' : 'light'}
          className="w-100 rounded-0 text-start text-truncate"
          onClick={() => handleSelect(item.id)}
        >
          {'# '}
          {item.name}
        </Button>
        <Dropdown.Toggle variant={selectedChannel === item.id ? 'secondary' : 'light'} className="flex-grow-0 dropdown-toggle-split">
          <span className="visually-hidden">{t('channel.channelControl')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#" onClick={handleRenameModal}>{t('channel.rename')}</Dropdown.Item>
          <Dropdown.Item href="#" onClick={handleRemoveModal}>{t('channel.delete')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {renameModalShow && (
      <ChannelRename
        close={() => setRenameModalShow(false)}
        channelId={item.id}
      />
      )}
      {removeModalShow && (
      <ChannelRemove
        close={() => setRemoveModalShow(false)}
        channelId={item.id}
      />
      )}
    </Nav.Item>
  );
};
