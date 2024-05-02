import { createContext } from 'react';
import { io } from 'socket.io-client';

import store from '../store';
import { channelsApi } from '../store/channelsApi.js';
import { messagesApi } from '../store/messagesApi.js';
import {
  getCurrentActiveChannel,
  getCurrentDefaultChannel,
  setActiveChannel,
} from '../store/uiSlice.js';

export const ChatContext = createContext(null);

const socket = io();

const listenerAddChannel = (event) => {
  store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
    draft.push(event);
  }));
};

const listenerDeleteChannel = (event) => {
  store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
    const index = draft.findIndex((item) => item.id === event.id);
    if (index !== -1) { draft.splice(index, 1); }
    const activeChannel = getCurrentActiveChannel(store.getState());
    if (event.id === activeChannel.id) {
      const defaultChannel = getCurrentDefaultChannel(store.getState());
      store.dispatch(setActiveChannel(defaultChannel));
    }
  }));
};

const listenerEditChannel = (event) => {
  store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
    const channel = draft.find((item) => item.id === event.id);
    channel.name = event.name;
    if (channel) { channel.name = event.name; }
  }));
};

const listenerNewMessage = (event) => {
  store.dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draft) => {
    draft.push(event);
  }));
};

socket.on('newChannel', listenerAddChannel);
socket.on('removeChannel', listenerDeleteChannel);
socket.on('renameChannel', listenerEditChannel);
socket.on('newMessage', listenerNewMessage);

export default socket;
