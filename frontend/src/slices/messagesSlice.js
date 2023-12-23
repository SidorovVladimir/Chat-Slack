import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { fetchContent, removeChannel } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, { payload }) => {
        const filteredMessage = Object.values(state.entities).filter(
          (message) => message.channelId !== payload,
        );
        messagesAdapter.setAll(state, filteredMessage);
      })
      .addCase(fetchContent.fulfilled, (state, { payload }) => {
        messagesAdapter.addMany(state, payload.messages);
      });
  },
});
export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
