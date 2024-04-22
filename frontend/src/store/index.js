import { configureStore } from '@reduxjs/toolkit';
import channelReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';

const store = configureStore({
  reducer: {
    channel: channelReducer,
    messages: messagesReducer,
  },
});

export default store;
