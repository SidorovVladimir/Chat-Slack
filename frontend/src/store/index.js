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

export const useDispatchCustom = () => useDispatch();
export const useSelectorCustom = (selector) => useSelector(selector);

export const addMessageCustom = (payload) => addMessage(payload);
export const addChannelCustom = (payload) => addChannel(payload);
export const removeChannelCustom = (payload) => removeChannel(payload);
export const renameChannelCustom = (payload) => renameChannel(payload);
export const closeModalCustom = () => closeModal();
export const openModalCustom = (type, id) => openModal(type, id);
export const setCurrentChannelCustom = (payload) => setCurrentChannel(payload);
export const fetchContentCustom = () => fetchContent();
