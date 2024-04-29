import { createSlice } from '@reduxjs/toolkit';

const defaultChannel = { id: '1', name: 'general', removable: false };

const initialState = {
  modalChannel: { type: null, channel: null },
  activeChannel: defaultChannel,
  defaultChannel,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setModalChannel: (state, action) => {
      const modalChannel = action.payload;
      return { ...state, modalChannel };
    },
    setActiveChannel: (state, action) => {
      const activeChannel = action.payload;
      return { ...state, activeChannel };
    },
    setDefaultChannel: (state, action) => {
      const channel = action.payload;
      return { ...state, defaultChannel: channel };
    },
  },
});

export const { setModalChannel, setActiveChannel, setDefaultChannel } = uiSlice.actions;

export default uiSlice.reducer;

export const getCurrentModalChannel = (state) => state.ui.modalChannel;
export const getCurrentActiveChannel = (state) => state.ui.activeChannel;
export const getCurrentDefaultChannel = (state) => state.ui.defaultChannel;
