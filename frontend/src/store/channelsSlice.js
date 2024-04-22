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
  chats: [],
  selectedChatIndex: 0,
};

export const channelsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    reset: (state) => ({
      ...state,
      chats: [],
    }),
    setSelectedChatIndex: (state, action) => ({
      ...state,
      selectedChatIndex: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, action) => ({
        ...state,
        chats: action.payload,
      }))
      .addCase(fetchChannels.rejected, (state) => ({
        ...state,
        chats: [],
      }))

      .addCase(addChannels.fulfilled, (state) => ({
        ...state,
        selectedChatIndex: state.chats.length,
      }))
      .addCase(addChannels.rejected, (state) => ({
        ...state,
        chats: [],
      }))

      .addCase(removeChannel.fulfilled, (state) => ({
        ...state,
        selectedChatIndex: 0,
      }))
      .addCase(removeChannel.rejected, (state) => state)

      .addCase(renameChannel.fulfilled, (state, action) => {
        const index = state.chats.findIndex((el) => el.id === action.payload.id);
        console.log('index', index);
        return {
          ...state,
          selectedChatIndex: index,
        };
      })
      .addCase(renameChannel.rejected, (state) => state);
  },
});

export const { reset, setSelectedChatIndex } = channelsSlice.actions;

export default channelsSlice.reducer;
