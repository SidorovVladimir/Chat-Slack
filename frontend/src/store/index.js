import { configureStore } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

import channelsReducer,
{
  setCurrentChannel,
  addChannel,
  removeChannel,
  renameChannel,
  fetchContent,
} from './slices/channelsSlice.js';

import messagesReducer, { addMessage } from './slices/messagesSlice.js';
import modalsReducer, { openModal, closeModal } from './slices/modalsSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalsReducer,
  },
});

export const useCustomDispatch = () => useDispatch();
export const useCustomSelector = (selector) => useSelector(selector);

export const wrapAddMessage = (payload) => addMessage(payload);
export const wrapAddChannel = (payload) => addChannel(payload);
export const wrapRemoveChannel = (payload) => removeChannel(payload);
export const wrapRenameChannel = (payload) => renameChannel(payload);
export const wrapCloseModal = () => closeModal();
export const wrapOpenModal = (type, id) => openModal(type, id);
export const wrapSetCurrentChannel = (payload) => setCurrentChannel(payload);
export const getContentFromServer = () => fetchContent();
