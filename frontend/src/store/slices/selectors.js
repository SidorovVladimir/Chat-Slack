import { createSelector } from '@reduxjs/toolkit';

export const getCurrentChannelId = (state) => state.channels.currentChannelId;

export const getChannels = (state) => state.channels;

export const getMessages = (state) => state.messages;

export const getTypeModal = (state) => state.modal.type;

export const getChannelId = (state) => state.modal.channelId;

export const getCurrentChannelMessages = createSelector(
  [
    getMessages,
    getCurrentChannelId,
  ],
  (messages, currentChannelId) => Object.values(messages.entities).filter(
    (msg) => msg.channelId === currentChannelId,
  ),
);

export const getCurrentChannel = createSelector(
  [
    getChannels,
    getCurrentChannelId,
  ],
  (channels, currentChannelId) => Object.values(channels.entities).find(
    ({ id }) => id === currentChannelId,
  ),
);
export const getChannelsName = createSelector(
  [getChannels],
  (channels) => Object.values(channels.entities).map(
    (channel) => channel.name,
  ),
);
