import { createContext } from 'react';
import { io } from 'socket.io-client';
import store from '../store';
import { fetchMessages } from '../store/messagesSlice';
import { fetchChannels } from '../store/channelsSlice';

export const ChatContext = createContext(null);

const socket = io();

socket.on('newMessage', (payload) => {
  store.dispatch(fetchMessages(payload.channelId));
});

socket.on('newChannel', () => {
  store.dispatch(fetchChannels());
});

socket.on('renameChannel', () => {
  store.dispatch(fetchChannels());
});

socket.on('removeChannel', () => {
  store.dispatch(fetchChannels());
});

export default socket;
