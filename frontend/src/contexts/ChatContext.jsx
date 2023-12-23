/* eslint-disable react/jsx-no-constructed-context-values */

import React, { createContext } from 'react';
import useSocket from '../hooks/useSocket';

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const socket = useSocket();

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
      }
    );
  };

  const value = {
    socket,
    addNewChannel,
    addNewMessage,
    removeChannel,
    renameChannel,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatProvider;
