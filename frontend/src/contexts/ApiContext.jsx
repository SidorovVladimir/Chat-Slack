/* eslint-disable react/jsx-no-constructed-context-values */

import React, { createContext } from 'react';
import { io } from 'socket.io-client';

export const ApiContext = createContext();

const ApiContextProvider = ({ children }) => {
  const socket = io();

  const addNewMessage = (message) => {
    socket.volatile.emit('newMessage', message);
  };

  const addNewChannel = (channel, cb) => {
    socket.volatile.timeout(1000).emit('newChannel', channel, (err, res) => {
      if (err) {
        const error = { status: 'Network error' };
        cb(error);
      } else {
        cb(res);
      }
    });
  };
  const removeChannel = (id, cb) => {
    socket.volatile.timeout(1000).emit('removeChannel', { id }, (err, res) => {
      if (err) {
        const error = { status: 'Network error' };
        cb(error);
      } else {
        cb(res);
      }
    });
  };
  const renameChannel = (channel, cb) => {
    socket.volatile.timeout(1000).emit(
      'renameChannel',
      {
        id: channel.id,
        name: channel.name,
      },
      (err, res) => {
        if (err) {
          const error = { status: 'Network error' };
          cb(error);
        } else {
          cb(res);
        }
      },
    );
  };

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
