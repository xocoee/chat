import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCurrentToken } from './authSlice';
import routes from '../utils/routes.js';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: routes.channelsPath(),
    prepareHeaders: (headers, { getState }) => {
      const token = getCurrentToken(getState());

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Channels'],
  endpoints: (builder) => ({
    addChannel: builder.mutation({
      query: (channel) => ({
        url: '',
        method: 'POST',
        body: channel,
      }),
      invalidatesTags: [{ type: 'Channels', id: 'LIST' }],
    }),
    getChannels: builder.query({
      query: () => '',
      providesTags: (result) => (
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Channels', id })),
            { type: 'Channels', id: 'LIST' },
          ]
          : [{ type: 'Channels', id: 'LIST' }]),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Channels', id: 'LIST' }],
    }),
    editChannel: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: id,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: [{ type: 'Channels', id: 'LIST' }],
    }),
  }),
});

const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
  useEditChannelMutation,
} = channelsApi;

export {
  useGetChannelsQuery as getChannels,
  useAddChannelMutation as addChannel,
  useRemoveChannelMutation as removeChannel,
  useEditChannelMutation as editChannel,
};
