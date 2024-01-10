/* eslint-disable react/jsx-no-constructed-context-values */

import React, { createContext } from 'react';
import { io } from 'socket.io-client';
import handleResponse from '../utils/handleResponse';

export const ApiContext = createContext();

const ApiContextProvider = ({ children }) => {
  const socket = io();

  const addNewMessage = (message, cb, resetForm) => socket
    .volatile
    .emit('newMessage', message, (res) => cb(res, resetForm));

  const addNewChannel = (channel, cb) => socket
    .volatile
    .timeout(1000)
    .emit('newChannel', channel, (err, res) => handleResponse(err, res, cb));

  const removeChannel = (id, cb) => socket
    .volatile
    .timeout(1000)
    .emit('removeChannel', { id }, (err, res) => handleResponse(err, res, cb));

  const renameChannel = (channel, cb) => socket
    .volatile
    .timeout(1000)
    .emit('renameChannel', channel, (err, res) => handleResponse(err, res, cb));

  const value = {
    socket,
    addNewChannel,
    addNewMessage,
    removeChannel,
    renameChannel,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export default ApiContextProvider;
