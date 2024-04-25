import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAuthConfig } from '../utils/storageUtils';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (thunkAPI) => {
    try {
      const { data } = await axios.get('/api/v1/channels', getAuthConfig());
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

export const addChannels = createAsyncThunk(
  'channels/addChannels',
  async (channelData, thunkAPI) => {
    try {
      const { data } = await axios.post('/api/v1/channels', channelData, getAuthConfig());
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async (channelId, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/api/v1/channels/${channelId}`, getAuthConfig());
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

export const renameChannel = createAsyncThunk(
  'channels/renameChannel',
  async ({ channelId, newName }, thunkAPI) => {
    try {
      const { data } = await axios.patch(`/api/v1/channels/${channelId}`, { name: newName }, getAuthConfig());
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

const initialState = {
  channels: [],
  selectedChannelsIndex: 0,
};

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    reset: (state) => ({
      ...state,
      channels: [],
    }),
    setSelectedChannelsIndex: (state, action) => ({
      ...state,
      selectedChannelsIndex: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, action) => ({
        ...state,
        channels: action.payload,
      }))
      .addCase(fetchChannels.rejected, (state) => ({
        ...state,
        channels: [],
      }))

      .addCase(addChannels.fulfilled, (state) => ({
        ...state,
        selectedChannelsIndex: state.channels.length,
      }))
      .addCase(addChannels.rejected, (state) => ({
        ...state,
        channels: [],
      }))

      .addCase(removeChannel.fulfilled, (state) => ({
        ...state,
        selectedChannelsIndex: 0,
      }))
      .addCase(removeChannel.rejected, (state) => state)

      .addCase(renameChannel.fulfilled, (state, action) => {
        const index = state.channels.findIndex((el) => el.id === action.payload.id);
        return {
          ...state,
          selectedChannelsIndex: index,
        };
      })
      .addCase(renameChannel.rejected, (state) => state);
  },
});

export const { reset, setSelectedChannelsIndex } = channelsSlice.actions;

export default channelsSlice.reducer;
